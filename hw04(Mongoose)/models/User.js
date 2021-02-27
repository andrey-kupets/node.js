const { Schema, model } = require('mongoose');

// const carSubSchema = {
//     model: { type: String, required: true },
//     edition: { type: Number },
//     power_hp: { type: Number },
//     color: { type: String }
// };

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String, default: '1111' },
    // cars: [carSubSchema]
    // cars: [{ type: Schema.Types.ObjectId, ref: 'Car' }]
    cars: [{ type: Schema.Types.ObjectId }]
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

// eslint-disable-next-line func-names
userSchema.virtual('fullName').get(function() {
    return `${this.name} ${this.email}`;
});

userSchema.virtual('_userCars', {
    ref: 'Car',
    localField: 'cars',
    foreignField: '_id',
    justOne: true, // тогда попюлейт вернет один объект, а не массив (из одного объекта)
    options: {
        select: 'edition'
    }
});

userSchema
    // eslint-disable-next-line func-names
    .pre('find', function() {
        console.log('PRE FIND HOOK');
        this.populate('_userCars');
    })
    // eslint-disable-next-line func-names
    .pre('findOne', function() {
        console.log('PRE FIND_ONE HOOK');
        this.populate('_userCars');
    });

module.exports = model('User', userSchema);
