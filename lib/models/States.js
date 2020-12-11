const pool = require('../utils/pool');

module.exports = class State{
    id;
    name;
    description;
    url;

    constructor(row) {
      this.id = String(row.id);
      this.name = row.name;
      this.description = row.description;
      this.url = row.url;
    }

    static async insert({ name, description, url }) {
      const { rows } = await pool.query('INSERT INTO states (name, description, url) VALUES ($1, $2, $3) RETURNING *',
        [name, description, url]
      );
      return new State(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * from states');

      return rows.map(row => new State(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM states WHERE id=$1',
        [id]
      );

      if(!rows[0]) throw new Error(`No states with the id ${id}`);
      return new State(rows[0]);
    }

    static async update(id, { name, description, url }) {
      const { rows } = await pool.query(
        `UPDATE states
            SET name=$1,
            description=$2,
            url=$3
            WHERE id=$4
            RETURNING *`,
        [name, description, url, id]
      );
      return new State(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM states WHERE id=$1 RETURNING *',
        [id]
      );
      return new State(rows[0]);
    }
};

