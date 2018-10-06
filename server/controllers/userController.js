const User = require('../models/user')
const Todo = require('../models/todo')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class userController{
    static signup(req, res){
        User.create({
            email : req.body.email,
            password : req.body.password,
            name : req.body.name
        })
        .then(user => {
            res.status(200).json({user})
        })
        .catch(err => {
            res.status(500).json({err})
        })

    }

    static signin(req, res){
        User.findOne({
            email : req.body.email,
            password : req.body.password
        })
        .then(user => {
            if(user){
                let token = jwt.sign({
                    id : user.id,
                    email : user.email,
                    name : user.name,
                    isGoogle : user.isGoogle
                }, process.env.SECRET)
                res.status(200).json({token})
            }
            else{
                res.status(200).json({message : 'Email or Password is Incorrect'})
            }
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static updateUser(req, res){
        User.findByIdAndUpdate(req.login.id,
            {
                password : req.body.password,
                name : req.body.name
            })
            .then(() => {
                res.status(200).json({message : `Update success`})
            })
            .then(err => {
                res.status(500).json({err})
            })

    }

    static findAllUser(req, res){
        User.find()
        .then(users => {
            res.status(200).json({users})
        })
        .catch(err => {
            res.status(500).json({err})
        })

    }

    static viewProfile(req, res){
        User.findOne({ _id : req.login.id})
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })
    }

    static deleteUser(req, res){
        User.findOneAndDelete(req.login.id)
        .then(() => {
            res.status(200).json({messasge : `Delete success`})
        })
        .catch(err => {
            res.status(500).json({message : err})
        })

    }
    static showAllUserTodos(req, res){
        User.findOne({ _id : req.login.id})
        .populate('todo')
        .exec()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })
    }
}

module.exports = userController