const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
  windowMs: 60 * 100,
  max: 5,
  message: {
    message: 'Too many login attempts from this IP, please try again later.',
  },
  handler: (req, res, next, options) => {
    console.log(
      `Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      'errLogo.log'
    )
    res.status(options.statusCode).send(options.message)
  },
})

module.exports = loginLimiter
