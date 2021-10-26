import express from 'express'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'
import { generateToken, isAuth } from '../utils.js';
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
            password //TODO, hashear with Bcrypt
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

userRouter.post('/register', isAuth, expressAsyncHandler(async(req, res) => {
    const { name, email, password } = req.body;
    const user = new User({
        name,
        email,
        password,
    })
    const registerUser = await user.save()
    if (!registerUser) {
        res.status(401).send({
            message: 'Invalid User Data'
        });
    } else {
        res.send({
            _id: registerUser._id,
            name: registerUser.name,
            email: registerUser.email,
            isAdmin: registerUser.isAdmin,
            token: generateToken(registerUser)
        })
    }
}));

userRouter.put('/:id', expressAsyncHandler(async(req, res) => {
    const { name, email, password } = req.body;
    const id = req.params.id
    const user = await User.findOne({ id });
    if (!user) {
        res.status(401).send({
            message: 'User Not Found'
        });
    } else {
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        const updatedUser = await user.save()
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)
        })
    }
}))

export default userRouter;