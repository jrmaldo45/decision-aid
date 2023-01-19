const express = require('express');
const db = require('../db/index.js');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('./client/public'));

app.get('/games', async (req, res) => {
  let games = await db.getGames(req.query.category_id, req.query.favoritesOnly);
  res.send(games);
});

app.get('/categories', async (req, res) => {
  let categories = await db.getCategories(req.query.id);
  res.send(categories);
});

app.get('/categories/find', async (req, res) => {
  let matchingCategory = await db.findCategoryId(req.query.category);
  res.send(matchingCategory);
})

app.post('/games', (req, res) => {
  db.addGame(req.body.title, req.body.category, (err, res) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(res);
    }
  });
});

app.post('/categories', (req, res) => {
  db.addCategory(req.body.name, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});