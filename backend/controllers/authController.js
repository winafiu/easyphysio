const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * @desc Login
 * @route POST /auth
 * @access Public
 */
async function login() {}

/**
 * @desc Refresh if token is expired
 * @route GET /auth/refresh
 * @access Public
 */
async function refresh() {}

/**
 * @desc Logout and clear cookies
 * @route POST /auth/logout
 * @access Public
 */
async function logout() {}

module.exports = {
  login,
  refresh,
  logout,
}
