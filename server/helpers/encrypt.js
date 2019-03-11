const bcrypt = require('bcrypt');
const saltRounds = 10;

function encrypt(User,callback) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) {
            callback(err,null)
        } else {
            bcrypt.hash(User.password, salt, function(err, hash) {
                if (err) {
                    calback(err,null)
                } else {
                    callback(null,hash)
                }
            });
        }
    });
}

module.exports = encrypt