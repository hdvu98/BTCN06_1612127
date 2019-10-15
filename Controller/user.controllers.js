const User = require('../models/user.model');

exports.create = (req,res) =>{
    if(!req.body.username || !req.body.password){
        return res.status(400).send({
            message:"username and password can not be empty"
        })
    }

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        student_id: req.body.student_id,
        full_name: req.body.full_name,
        class_id: req.body.class_id,
    });

    newUser.save().then(data =>{
        res.send(data);
    }).catch(err=>{
        return res.status(500).send({
            message: err.message || "Some error occurred while creating new User."
        })
    })
}

exports.findByUsername = (req,res) =>{
    if(!req.body.username){
        return res.status(400).send({message:"username can not be empty"})
    }
    User.findOne({username: req.body.username}).then(user =>{
        if(!user){
            return res.status(404).send({
                message: "username: " + req.params.username+" not found!"
            });     
        }
        res.send(user);
    })
    .catch(err=>{
        if(err.kind === 'username') {
            return res.status(404).send({
                message: "username: " + req.params.noteId+" not found!"
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with username " + req.params.username
        });
    })
}

exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};