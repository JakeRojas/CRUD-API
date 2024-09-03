const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    updatePass
};
async function getAll() {
    return await db.User.findAll();
}
async function getById(id) {
    return await getUser(id);
}
async function create(params) {
    if (await db.User.findOne({ where: { email: params.email }})) {
        throw 'Email "' + params.email + '" is already registered';

    }
    const user = new db.User(params);

    user.passwordHash = await bcrypt.hash(params.password, 10);

    await user.save();
}
async function update(id, params) {
    const user = await getUser(id);

    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username }})) {
        throw 'Username "' + params.username + '" is already taken';

    }
    // if (params.newPassword) {
    //     params.passwordHash = await bcrypt.hash(params.newPassword, 10);
    // }

    Object.assign(user, params);
    await user.save();
}
async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}
async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

//==================================================================
// async function changePass(id, params, newPassword) {
//     const user = await db.User.findById(id);

//     if (!user) throw 'User not found';

//     const isMatch = await bcrypt.compare(params.password, user.password);
//     if (!isMatch) throw 'Old password is incorrect';

//     user.password = await bcrypt.hash(newPassword, 10);

//     await user.save();
//     return { message: 'Password changed successfully' };
// }

async function updatePass(id, params) {
    const user = await getUser(id);

    // const hashedPassword = params.passwordHash;
    // const plainPassword = params.currentPassword;

    // const isMatch = await bcrypt.compare(hashedPassword, plainPassword)
    //     if (!isMatch) throw new Error ('Current password is incorrect');
        
    // params.passwordHash = bcrypt.hash(params.newPassword, 10);

    // const changeUsername = params.username && user.username !== params.username;
    // if (usernameChanged && await db.User.findOne({ where: { username: params.username }})) {
    //     throw 'Username "' + params.username + '" is already taken';
    // }
    // if (params.newPassword) {
    //     params.passwordHash = await bcrypt.hash(params.newPassword, 10);
    // }


    // const changePassword = params.newPassword && user.password !== params.newPassword;
    // //if (!changePassword) throw 'werverger';   
    // if (changePassword == await bcrypt.compare(params.currentPassword, user.passwordHash)) 
    //     params.passwordHash = await bcrypt.hash(params.newPassword, 10);

    const isMatch = await bcrypt.compare(params.currentPassword, user.passwordHash);
    if (!isMatch) throw new Error ('Current password is incorrect');
    
    user.passwordHash = await bcrypt.hash(params.newPassword, 10);
      

    // const verified = await bcrypt.compare(password, params.password);
    // if (!verified) {
    //     throw 'Invalid current password';
    // }

    // bcrypt.compare(params.currentPassword, user.passwordHash, (err, isMatch) => {
    //     if (err) {
    //         console.error('Error comparing passwords:', err);
    //     } else if (isMatch) {
    //         params.passwordHash = bcrypt.hash(params.newPassword, 10);
    //     } else {
    //         console.log('Password is incorrect.');
    //     }
    // })

    Object.assign(user, params);
    await user.save();
}