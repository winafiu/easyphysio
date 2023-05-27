const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * @desc Login
 * @route POST /auth
 * @access Public
 */
async function login(req, res) {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(404).json({ message: 'All fields are required!' })
  }

  try {
    const foundUser = await User.findOne({ username })

    if (!foundUser) {
      return res.status(400).json({ message: 'Unauthorized!' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(400).json({ message: 'Unauthorized!' })

    const accessToken = jwt.sign(
      {
        username: foundUser.username,
        role: foundUser.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15m',
      }
    )

    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: false,
      samesite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.json({ accessToken })
  } catch (err) {
    console.log(err)
  }
}

/**
 * @desc Refresh if token is expired
 * @route GET /auth/refresh
 * @access Public
 */
async function refresh(req, res) {
  const cookies = req.cookies

  try {
    if (!cookies?.jwt) {
      return res.status(404).json({ message: 'Unauthorized! cookie' })
    }

    const refreshToken = cookies.jwt

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(400).json({ message: 'Forbidden!' })

        const foundUser = await User.findOne({
          username: decoded.username,
        })

        if (!foundUser)
          return res.status(400).json({ message: 'Unauthorized! user' })

        const accessToken = jwt.sign(
          {
            username: foundUser.username,
            role: foundUser.role,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '15m',
          }
        )

        res.json({ accessToken })
      }
    )
  } catch (err) {
    console.log(err)
  }
}

/**
 * @desc Logout and clear cookies
 * @route POST /auth/logout
 * @access Public
 */
async function logout(req, res) {
  const cookies = req.cookies

  try {
    if (!cookies?.jwt) return res.sendStatus(200)

    res.clearCookie('jwt', {
      httpOnly: true,
      samesite: 'None',
      secure: false,
    })

    res.json({ message: 'Logged out!' })
  } catch (err) {}
}

module.exports = {
  login,
  refresh,
  logout,
}
