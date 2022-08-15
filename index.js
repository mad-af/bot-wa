const express = require('express')
const server = require('./bin/app/server');
const app = express()
const port = 3000

app.set('views', './bin/views');
app.set('view engine', 'ejs');

server.init(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})