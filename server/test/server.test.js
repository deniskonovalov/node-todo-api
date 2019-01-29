const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('../server');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos',() => {
    it('Should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
    
    it('Should not create a new todo with invalid data', (done) => {
        
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('Should return todo by ID', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('Should return 404 if todo not found', (done) => {

        var id = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('Should return 404 if id is invalid', (done) => {

        var id = '123';

        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });
});


describe('DELETE /todos/:id', () => {
    it('Should delete todo', (done) => {

        var id = todos[0]._id.toHexString();

        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(id);
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Todo.findById(id).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch(e => done(e));
            });
    });

    it('Should return 404 if todo not found', (done) => {
        var id = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });  

    it('Should return 404 if id is invalid', (done) => {

        var id = '123';

        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {

    it('Should update todo', (done) => {
        var id = todos[0]._id.toHexString();
        var body = {
            text: 'Testing todo updating',
            completed: true
        }

        request(app)
            .patch(`/todos/${id}`)
                .send(body)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo.text).toBe(body.text);
                    expect(res.body.todo.completed).toBeA('boolean').toBe(true);
                    expect(res.body.todo.completedAt).toBeA('number');
                }).end(done);
    });

    it('Should clear completedAt if tidi is not completed', (done) => {
        var id = todos[1]._id.toHexString();
        var body = {
            text: 'Testing clearing completedAt',
            completed: false
        }

        request(app)
            .patch(`/todos/${id}`)
                .send(body)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo.text).toBe(body.text);
                    expect(res.body.todo.completed).toBeA('boolean').toBe(false);
                    expect(res.body.todo.completedAt).toNotExist();
                }).end(done);
    });
});

describe('GET /users/me', () => {
    it('Should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            }).end(done); 
    });

    it('Should return 401 if user not authenticated', (done) => {
        request(app)
            .get('/users/me') 
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            }).end(done); 
    });
});

describe('POST /users', () => {
    it('Should create a new user', (done) => {
        var body = {
            email: 'testuser@test.com',
            password: 'password!123'
        }

        request(app)
            .post('/users')
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(body.email);
            }).end((err) => {
                if (err) {
                    return done(err);
                }

                User.findOne({email: body.email}).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(body.password);
                    done();
                });
            });
    });

    it('Should return validation error if email is not valid', (done) => {
        var body = {
            email: 'testuser@test',
            password: 'password!123'
        }

        request(app)
            .post('/users')
            .send(body)
            .expect(400)
            .end(done)
    });

    it('Should return error if email exist', (done) => {
        var body = {
            email: 'testuser@mail.com',
            password: 'password!123'
        }

        request(app)
            .post('/users')
            .send(body)
            .expect(400)
            .end(done)
    });
});
