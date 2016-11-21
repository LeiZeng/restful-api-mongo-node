import restify from 'restify'
import config from 'config'

import logger from './logger'

import './database'
import * as user from './apis/user'
import passport from './passport'

const server = restify.createServer({ log: logger })
const port = config.get('port')

server.pre(restify.pre.userAgentConnection())
server.use(restify.bodyParser())
server.use(restify.queryParser())

passport(server)

if (process.env.NODE_ENV === 'development') {
  require('./swagger').default(server)
}

restify.defaultResponseHeaders = function(data) {
    this.header('Access-Control-Allow-Origin', '*')
}

server.post('/login', user.login)
server.post('/register', user.register)
server.get('/profile/:id', user.profile)

console.log(`running at ${process.env.NODE_ENV} mode.`)
server.listen(port)

console.log(`server start at ${port}`)
