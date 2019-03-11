const bcrypt = require('bcrypt');
module.exports = {
    compare(password, hash) {
        return bcrypt.compareSync(password, hash);
    },
    hash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
}