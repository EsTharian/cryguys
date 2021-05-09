const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const fs = require('fs')
const http = require('http')
const https = require('https')
const express = require('express')
const rateLimit = require('express-rate-limit')
const route = require('./router')
const {httpsMiddleware} = require('./middleware')
const {socket} = require('./socket')

const app = express()

app.use(express.json())

if (process.env.CORS) {
  const cors = require('cors')
  app.use(cors())
}

const port = parseInt(process.env.PORT) || 3001

const limiter = rateLimit({
  windowMs: 15 * 1000,
  max: 100
})

if (port === 80) {
  const privateKey  = fs.readFileSync(path.join(__dirname + '/ssl/private.key'), 'utf8')
  const certificate = fs.readFileSync(path.join(__dirname + '/ssl/certificate.crt'), 'utf8')

  if (process.env.JWT_USE_SSL === 'true') {
    process.env.JWT_SECRET = privateKey
  }

  const ssl = {key: privateKey, cert: certificate}

  app.use(httpsMiddleware)
}

app.use(limiter)

app.use(express.urlencoded({
  extended: true
}))

route(app)

const httpServer = http.createServer(app)

let server = httpServer

if (port === 80) {
  server = https.createServer(ssl, app)
}

socket(server)

httpServer.listen(port)

if (port === 80) {
  server.listen(443)
}

console.log(`CryGuys API service listening ${port === 80 ? 443 : port}`)
