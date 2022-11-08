const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const Thought = require('./models/Thought');

const PORT = 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", async () => {
  const thought = await Thought.find();
  console.log(thought[0]);
})

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server for social network running on port ${PORT}!`);
  });
});
