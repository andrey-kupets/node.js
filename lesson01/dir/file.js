// const var22 = 22;

function createUser(name, age) {
    // eslint-disable-next-line no-use-before-define
    logger(`Hello, ma name is ${name} and i'm ${age} y.o.`);
}

function logger(string) {
    console.log(string);
}

// console.log(55555555555)

exports.test = 'Beck!!';

module.exports = {
    // var22,
    createUser,
    // f: (() => {
    //     console.log('tttt');
    // })(),
    // tt: logger(777)
};
