const bcryptjs = require('bcryptjs')

module.exports = {
    hash: (password) => {
        let salt = bcryptjs.genSaltSync(8)
        let hash = bcryptjs.hashSync(password, salt)
        return hash
    },
    compare: (input, userPassword) => {
        return bcryptjs.compareSync(input, userPassword)
    }
}