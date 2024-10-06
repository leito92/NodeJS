import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/mongoDB/User.js"

const saltRounds = 10
const pass = '53cr3t_P455w0rd'

export const authController = {
    async registerUser(req, res) {
        const { fullname, email } = req.body
        const password = await hash(req.body.password, saltRounds)
        try {
            const newUser = new User({fullname, email, password})
            const saveUser = await newUser.save()
            res.status(200).json({success: true, message: 'new user registered'})
        } catch (error) {
            res.status(500).json({success: false, message: 'Internal Server Error'})
        }
    },

    async login(req, res) {
        try {
            const response = await User.find().where({email: req.body.email})
            if(!response.length){
                return res.status(401).json({success: false, message: "invalid email or password"})
            }
            const isSamePassword = await compare(req.body.password, response[0].password)
            if(!isSamePassword){
                return res.status(401).json({success: false, message: "invalid email or password"})
            }
            const dataForToken = {
                userName: response[0].fullname,
                userEmail: response[0].email,
                sub: response[0].id
            }
            const accessToken = jwt.sign(dataForToken, pass, {expiresIn: '24h'})
            res.status(200).json({success: true, message: "user authenticated", data: accessToken})
        } catch(err) {
            res.status(500).json({success: false, message: 'Internal Server Error'})
        }
    },
}