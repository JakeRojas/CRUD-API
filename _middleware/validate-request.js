module.exports = validateRequest;

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next('Validation error: ${error.details.map(x => x.message).join(', ')}');
    } else {
        req.body = value;
        next();
    }
}
//==========================================================
// module.exports = validateChangePassword;

// function validateChangePassword(req, next, schema) {
//     //const { newPassword } = req.body;
//     const { password, newPassword, value } = schema.validate(req.body, next);
//     if (!password || !newPassword) {
//         next('Old password and new password are required');
//     } else {
//         req.body = value;
//         next();
//     }
// }
