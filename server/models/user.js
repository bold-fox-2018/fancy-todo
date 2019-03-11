const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('../helpers/bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        validate: [
            {
                validator: function (val) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    console.log(re.test(String(val).toLowerCase()));
                    return re.test(String(val).toLowerCase());
                },
                message: `Email invalid format`
            },
            {
                validator: function (val) {
                    return new Promise((resolve, reject) => {
                        User.findOne({ email: val })
                            .then(user => {
                                if (user) reject(`Olala Email already Exist`);
                                else resolve();
                            })
                            .catch(err => reject(err))
                    })
                },
                message: `Email already Exist`
            }
        ]
    },
    password: String,
    source: String,
    todoList: [{ type: Schema.Types.ObjectId, ref: 'Todos' }]
});


userSchema.pre('save', function (next) {
    this.password = bcrypt.hash(this.password);
    next();
})

const User = mongoose.model('Users', userSchema);

module.exports = User;