const request = require('supertest');
const expect = require('expect');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

beforeEach(done => {
  Todo.remove({}).then(done());
})

describe('POST /todos', () => {
  it('should create a new todo', done => {
    let text = 'Test todo';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        };

        Todo.find().then(todos => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text, done());
        }).catch(err => done(err))
      });
  });

  it('should not create a new todo with a invalid body data', done => {
    request(app)
      .post('/todos')
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        };
        Todo.find().then(todos => {
          expect(todos.length).toBe(0, done());
        }).catch(err => done(err))
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