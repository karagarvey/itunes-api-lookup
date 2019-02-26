require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

app.listen(process.env.PORT, () =>
  console.log(`app listening on port ${process.env.PORT}!`)
);
