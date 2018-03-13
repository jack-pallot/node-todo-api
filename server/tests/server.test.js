const request = require('supertest');
const expect = require('expect');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { ObjectID } = require('mongodb');


const todos = [{
  _id: new ObjectID(),
  text: 'example todo item one'
}, {
  _id: new ObjectID(),
  text: 'example todo item two'
}];

beforeEach(done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
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

  it('should not create a new todo with a invalid body data', done => {
    request(app)
      .post('/todos')
      .send({})
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

  describe('GET /todos', () => {
    it('should return a 200 response header', done => {
      request(app)
        .get('/todos')
        .expect(200, done)
    });

    it('should fetch all todo items', done => {
      let text = 'Test todo';

      // setup data
      request(app)
        .post('/todos')
        .send({ text })
        .expect(200)
        .then(() => {
          request(app)
            .get('/todos')
            .expect(200)
            .end((err, res) => {
              if (err) {
                return done(err);
              };
              Todo.find().then(todos => {
                expect(todos.length).toBeGreaterThan(0, done());
              }).catch(err => done(err))
            });
        }).catch(err => done(err));
    });
  });
});

describe('GET /todos/:id', () => {
  it('should fetch a single todo when a valid ID is passed', done => {
    let id = todos[0]._id.toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return a 404 when no todos are found', done => {
    let id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return no data and a 400 with an invalid ID', done => {
    let id = 123;
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });
});