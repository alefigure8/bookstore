import express from 'express';
import data from './data.js';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

//INIT
const app = express();

//PORT
app.set('port', process.env.PORT || 5000);

//MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//DATABASE
mongoose
    .connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to Database'))
    .catch((error) => { console.log(error) })

//API JSON
app.use('/api/users', userRouter);
app.use('/api/order', orderRouter);
app.get('/api/paypal/clientid', (req, res) => {
    res.send({ clientId: config.PAYPAL_CLIENT_ID })
})
app.get('/api/products', (req, res) => {
    res.send(data.products);
});
app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(x => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found!' })
    }
});

app.use((err, req, res, next) => {
    const status = err.name && err.name === 'ValidationError' ? 400 : 500;
    res.status(status).send({ message: err.message });
});

//LISTEN
app.listen(app.get('port'), () => {
    console.log('Server at http://localhost:5000');
});