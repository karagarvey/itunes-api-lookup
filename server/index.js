require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .send(
      err.message ||
        '<div><img style="height: 300px;" src="https://1001freedownloads.s3.amazonaws.com/vector/thumb/110621/nuts_bolts.png" /><br/><br/>Internal server error - that\'s all we know</div>'
    );
});

app.listen(process.env.PORT, () =>
  console.log(`app listening on port ${process.env.PORT}!`)
);
