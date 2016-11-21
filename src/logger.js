import bunyan from 'bunyan'

export default bunyan.createLogger({
  name: 'myapp',
  streams: [{
    level: 'trace',
    stream: process.stdout
  }]
})
