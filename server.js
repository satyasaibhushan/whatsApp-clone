const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {

  res.send('welcome to back-end');
});



app.listen(port, () => `Server running on port ${port}`);