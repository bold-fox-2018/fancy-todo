const bcrypt = require('bcryptjs')

function encrypt(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

function decrypt(inputPassword, userPassword) {
    return bcrypt.compareSync(inputPassword, userPassword); 
    // bcrypt.compare("B4c0/\/", hash, function(err, res) {
    //     if (err) {
    //         res
    //             .status(400)
    //             .json({
    //                 msg: `Bad Requests`
    //             })
    //     } else {    
            // cb(bcrypt.compareSync(inputPassword, userPassword)); 
        // }
    // });
}

module.exports = { encrypt, decrypt }