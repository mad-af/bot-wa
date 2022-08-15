
const AuthController = require('../controllers/auth')

module.exports = {
  init: (app) => {
    app.get('/', (req, res) => {
      res.send({ hello: 'world' })
    })

    new AuthController(app).server()
  }
}
