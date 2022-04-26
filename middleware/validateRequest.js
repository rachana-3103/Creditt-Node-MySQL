const crypto = require('crypto');

exports.validateRequest = (req, next, schema) => {
    const options = {
        abortEarly: false, 
        allowUnknown: true, 
        stripUnknown: true 
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}

exports.errorHandler = (err, req, res, next) => {
    switch (true) {
        case typeof err === 'string':
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        default:
            return res.status(500).json({ message: err.message });
    }
}

exports.comparePassword = (paramPass, dbPass) => {
    const password = crypto.createHash("md5").update(paramPass).digest("hex");
  
    if (password === dbPass) {
      return true;
    }
    return false;
};

exports.passwordEncrypt = (password) => {
    const pwd = crypto.createHash("md5").update(password).digest("hex");
    return pwd;
  };
