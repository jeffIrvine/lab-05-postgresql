const pool = require('../utils/pool');

module.exports = class Car{
    id;
    name;
    description;

    constructor(row) {
      this.id = String(row.id);
      this.name = row.name;
      this.description = row.description;
    }

    static async insert({ name, description }) {
      const { rows } = await pool.query('INSERT INTO cars (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
      );
      return new Car(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * from cars');

      return rows.map(row => new Car(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM cars WHERE id=$1',
        [id]
      );

      if(!rows[0]) throw new Error(`No cars with the id ${id}`);
      return new Car(rows[0]);
    }

    static async update(id, { name, description }) {
      const { rows } = await pool.query(
        `UPDATE cars
            SET name=$1,
            description=$2
            WHERE id=$3
            RETURNING *`,
        [name, description, id]
      );
      return new Car(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM cars WHERE id=$1 RETURNING *',
        [id]
      );
      return new Car(rows[0]);
    }
};
