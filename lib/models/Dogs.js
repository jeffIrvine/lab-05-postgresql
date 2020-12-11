const pool = require('../utils/pool');

module.exports = class Dog{
    id;
    name;
    type;

    constructor(row) {
      this.id = String(row.id);
      this.name = row.name;
      this.type = row.type;

    }

    static async insert({ name, type }) {
      const { rows } = await pool.query('INSERT INTO dogs (name, type) VALUES ($1, $2) RETURNING *',
        [name, type]
      );
      return new Dog(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * from dogs');

      return rows.map(row => new Dog(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM dogs WHERE id=$1',
        [id]
      );

      if(!rows[0]) throw new Error(`No dogs with the id ${id}`);
      return new Dog(rows[0]);
    }

    static async update(id, { name, type }) {
      const { rows } = await pool.query(
        `UPDATE dogs
            SET name=$1,
            type=$2
            WHERE id=$3
            RETURNING *`,
        [name, type, id]
      );
      return new Dog(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM dogs WHERE id=$1 RETURNING *',
        [id]
      );
      return new Dog(rows[0]);
    }
};
