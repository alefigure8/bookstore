import express from 'express';
import data from './data.js';
import morgan from 'morgan';
import cors from 'cors';

//INIT
const app = express();
app.use(morgan('dev'));
app.use(cors());


//PORT
app.set('port', process.env.PORT || 5000);


//API JSON
app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(x => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'product not found' })
    }

});


//LISTEN
app.listen(app.get('port'), () => {
    console.log('Server at http://localhost:5000');
});