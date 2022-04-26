const db = require('../helpers/db');
const { comparePassword, passwordEncrypt } = require('../middleware/validateRequest');

exports.getAll = async () => {
   const users = await db.User.findAll();
   let  userArray = [];
    for(const user of users){
        delete user.dataValues.password;
        userArray.push(user);
    }
    return userArray;
}

exports.getById = async (id) => {
    const user =  await db.User.findOne({
        where: {
            id: id
        }
    });
    delete user.dataValues.password;
    return user;
}

exports.create = async (params) => {
    const password = await passwordEncrypt(params.password);
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }
    const user = new db.User(params);
    user.password = password;
    await user.save();
}

exports.login = async (params) => {
    let user = await db.User.findOne({
        where: {
            email: params.email,
        }
    });
    if (!user) {
        throw 'User not found';
    }
    const compassword = await comparePassword(params.password, user.password);
    const password = await passwordEncrypt(params.password);
    if (compassword === false) {
        throw 'Password not match';
    }
    const userData = await db.User.findOne({
        where: {
            email: params.email,
            password: password
        }
    });
    return userData;
}


exports.updateProfile = async (id, params) => {
    const user = await getUser(id);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    if (params.password) {
        params.password = await passwordEncrypt(params.password);
    }
    Object.assign(user, params);
    await user.save();
}

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}