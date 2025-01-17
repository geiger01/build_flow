const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')


async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)

    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    return user
}

async function signup(username, password, fullname, isGoogle = null) {
    const saltRounds = 10
    logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
    if (!username || !password || !fullname) return Promise.reject('fullname, username and password are required!')

    const isUser = await userService.getByUsername(username)
    // Google user is already signedup. Redirects to login
    if (isGoogle && isUser) {
        login(username, password)
        return

    }
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ username, password: hash, fullname, isGoogle })
}

module.exports = {
    signup,
    login,
}

