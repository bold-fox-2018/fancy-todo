const bcryptjs = require('bcryptjs')

function check(password, hash) {
    return bcryptjs.compareSync(password, hash)
}

module.exports = check