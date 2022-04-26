const userService = require('./user.service');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

exports.listAllUser = (req, res, next) => {
    userService.getAll()
        .then(users => res.json({message:"User List:",User:users}))
        .catch(next);
}

exports.profile = (req, res, next) => {
    userService.getById(req.user.dataValues.id)
        .then(user => res.json({message:"User Profile",User:user}))
        .catch(next);
}

exports.create = (req, res, next) => {
    upload.single('image');
    req.body.image = req.files[0].originalname;
    userService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}

exports.login = (req, res, next) => {
    const token = jwt.sign(req.body, process.env.SECRECTKEY);
    userService.login(req.body)
        .then((userData) => res.json({ message: 'User login', token: token, user: userData }))
        .catch(next);
}

exports.updateProfile = (req, res, next) => {
    upload.single('image');
    req.body.image = req.files[0].originalname;
    userService.updateProfile(req.user.dataValues.id, req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname);
    }
});

function checkFileType(file, cb) {
    // Allowed Extension
    const fileTypes = /jpeg|jpg|png|gif/;
    // check ext
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // check mimetype
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: Images Only');
  }
  
const upload = multer({
    storage,
    limits: { fileSize: 100000000 },
    fileFilter(req, file, cb) {
      checkFileType(file, cb);
    },
  });