const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 8)
}

const comparePassword = (password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash)
}

module.exports = { hashPassword, comparePassword }