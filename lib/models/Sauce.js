const pool = require('../utils/pool');

module.exports = class Sauce{
    id;
    name;
    description;
    url;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.description = row.description;
      this.url = row.url;
    }

    static async insert({ name, description, url }) {
      const { rows } = await pool.query('INSERT INTO sauce (name, description, url) VALUES ($1, $2, $3) RETURNING *',
        [name, description, url]
      );
      return new Sauce(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * from sauce');

      return rows.map(row => new Sauce(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM sauce WHERE id=$1',
        [id]
      );

      if(!rows[0]) throw new Error(`No sauce with the id ${id}`);
      return new Sauce(rows[0]);
    }

    static async update(id, { name, description, url }) {
      const { rows } = await pool.query(
        `UPDATE sauce
            SET name=$1,
            description=$2,
            url=$3
            WHERE id=$4
            RETURNING *`,
        [name, description, url, id]
      );
      return new Sauce(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM sauce WHERE id=$1 RETURNING *',
        [id]
      );
      return new Sauce(rows[0]);
    }
};

