import express from 'express'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'
import { generateToken } from '../utils.js';
const userRouter = express.Router()


userRouter.get('/createadmin',
    expressAsyncHandler(async(req, res) => {
        try {
            const user = new User({
                name: 'admin',
                email: 'admin@example.com',
                password: '123456',
                isAdmin: true
            });
            const createdUser = await user.save();
            res.send(createdUser);

        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    })
);


userRouter.post('/signin',
    expressAsyncHandler(async(req, res) => {
        const { email, password } = req.body
        const signinUser = await User.findOne({
            email,
            password
        });
        if (!signinUser) {
            res.status(401).send({
                message: 'Invalid Email or Password'
            });
        } else {
            res.send({
                _id: signinUser._id,
                name: signinUser.name,
                email: signinUser.email,
                isAdmin: signinUser.isAdmin,
                token: generateToken(signinUser)
            })
        }
    })
);

export default userRouter;