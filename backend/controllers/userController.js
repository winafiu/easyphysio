const User = require('../models/User')
const bcrypt = require('bcrypt')

/**
 * @desc Get all users
 * @route GET /users
 * @access Private
 */
async function getUsers(req, res) {
  try {
    const users = await User.find().select('-password').lean()
    res.json(users)
  } catch (err) {
    console.log(err)
  }
}

/**
 * @desc Create a new user
 * @route POST /users
 * @access Private
 */
async function createUser(req, res) {
  const { firstName, lastName, email, username, password, role } = req.body

  // check if all fields are availble
  if (!username || !password || !role || !firstName || !lastName || !email) {
    return res.status(400).json({ message: 'All fields are required!' })
  }

  // check for duplicate usernames
  try {
    const duplicate = await User.findOne({ username }).lean()
    if (duplicate) {
      return res
        .status(400)
        .json({ message: 'This username is not available!' })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const userObject = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: hashedPassword,
      role: role,
    }

    // store new user
    const user = await User.create(userObject)
    if (user) {
      res.status(201).json(user)
    } else {
      res.status(500).json({ message: 'Something went wrong!' })
    }
  } catch (err) {
    console.log(err)
  }
}

/**
 * @desc Updata a user
 * @route PATCH /users
 * @access Private
 */
async function updateUser(req, res) {
  const { id, firstName, lastName, email, password } = req.body

  if (!id) {
    return res.status(400).json({ message: 'User id is required!' })
  }

  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(400).json({ message: 'User not found!' })
    }

    if (firstName) {
      user.firstName = firstName
    }
    if (lastName) {
      user.lastName = lastName
    }
    if (email) {
      user.email = email
    }
    if (password) {
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10)
      user.password = hashedPassword
    }

    // save user
    const updatedUser = await user.save()

    res.json(updateUser)
  } catch (err) {
    console.log(err)
  }
}

/**
 * @desc Delete a user
 * @route DELETE /users
 * @access Private
 */
async function deleteUser(req, res) {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'User id is required!' })
  }

  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(400).json({ message: 'User not found!' })
    }

    const result = await user.deleteOne()

    return res.json({ message: 'User successfully deleted!' })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
}
