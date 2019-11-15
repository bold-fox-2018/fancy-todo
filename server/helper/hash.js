const bcrypt = require('bcrypt');

const saltRounds = 5;
const salt = bcrypt.genSaltSync(saltRounds);

function hash(password) {
    return bcrypt.hashSync(password, salt);
}

module.exports = hash