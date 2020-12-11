const pool = require('../lib/utils/pool');
const State = require('../lib/models/States');
const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');


describe('', () => {

  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a state with post', async() => {
    const res = await request(app)
      .post('/states')
      .send({ 
        name: 'test1',
        description: 'test1', 
        url: 'test1' 
      });

    expect(res.body).toEqual({ 
      id: '1', 
      name: 'test1', 
      description: 'test1', 
      url: 'test1' 
    });
  });

  it('finds all states', async() => {
    const states = await Promise.all([
      {
        name: 'Oregon',
        description: 'very wet and green',
        url: 'huh?.com'
      },
      {
        name: 'Wa',
        description: 'green',
        url: 'huh?.com'
      },
      {
        name: 'Ca',
        description: 'very dry and brown',
        url: 'huh?.com'
      }
    ].map(states => State.insert(states)));

    const res = await request(app)
      .get('/states');

    expect(res.body).toEqual(expect.arrayContaining(states));
    expect(res.body).toHaveLength(states.length);
  });


  it('finds a state by id', async() => {
    const state = await State.insert({
      name: 'Oregon',
      description: 'very wet and green',
      url: 'huh?.com'
    });

    const res = await request(app)
      .get(`/states/${state.id}`);

    expect(res.body).toEqual(state);
  });


  it('updates a state with put', async() => {
    const state = await State.insert({
      name: 'Oregon',
      description: 'very wet and green',
      url: 'huh?.com'
    });

    const res = await request(app)
      .put(`/states/${state.id}`)
      .send({
        name: 'Oregon',
        description: 'supa cool',
        url: 'huh?.com'
      });

    expect(res.body).toEqual({
      id: '1', 
      name: 'Oregon', 
      description: 'supa cool', 
      url: 'huh?.com' 
    });
  });


  it('deletes a state with Delete', async() => {
    const state = await State.insert({
      name: 'Oregon',
      description: 'very wet and green',
      url: 'huh?.com'
    });

    const res = await request(app)
      .delete(`/states/${state.id}`)
      .send({
        name: 'Oregon',
        description: 'supa cool',
        url: 'huh?.com'
      });

    expect(res.body).toEqual(state);
  });
});
