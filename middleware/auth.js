const HttpError = require('../error/index').HttpError;

module.exports = function (req, res, next) {
    if (!req.session.user) {
        return next(new HttpError(401, 'нет доступа'))
    }
    next();
}
