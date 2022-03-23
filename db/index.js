require('dotenv').config({path: '.env'});
const {Pool} = require('pg');

const pool = new Pool({
  "user": process.env.PG_USER,
  "password": process.env.PG_PASSWORD,
  "host": process.env.PG_HOST,
  "port": process.env.PG_PORT,
  "database": process.env.PG_DATABASE
});

const db = {
  getGames: async (category_id = 0, favoritesOnly) => {
    let games;
    if (category_id === 0) {
      games = await pool.query('SELECT * FROM games');
    } else if (category_id > 0 && favoritesOnly === true) {
      games = await pool.query(`SELECT * FROM games WHERE category_id = ${category_id} AND favorite = ${true}`);
    } else {
      games = await pool.query(`SELECT * FROM games WHERE category_id = ${category_id}`);
    }
    return games.rows;
  },

  getCategories: async (id = 0) => {
    let categories;
    if (id === 0) {
      categories = await pool.query('SELECT * FROM categories');
    } else {
      categories = await pool.query(`SELECT * FROM categories WHERE id = ${id}`)
    }
    return categories.rows;
  },

  findCategoryId: async (category) => {
    let category_id = await pool.query(`SELECT * FROM categories WHERE category_name = '${category}'`);
    return category_id.rows[0];
  },

  addGame: async (title, category, callback) => {
    await pool.query(`INSERT INTO games (title, category_id) VALUES ('${title}', ${category})`), (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    };
  },

  addCategory: async (name, callback) => {
    await pool.query(`INSERT INTO categories (category_name) VALUES ('${name}')`, (err, res) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
  }
}

module.exports = db;