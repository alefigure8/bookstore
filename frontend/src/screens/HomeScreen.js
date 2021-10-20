import axios from 'axios';
import Rating from '../component/rating';
import { hideLoading, showLoading } from '../utils';

const HomeScreen = {
        after_render: () => {
            //Add product to click button
            const buttonCart = document.getElementsByClassName('add-button')
            Array.from(buttonCart).forEach(x => {
                x.addEventListener('click', (e) => {
                    const id = e.target.id
                    document.location.hash = `/cart/${id}`
                })
            })
        },
        render: async() => {
                showLoading()
                const response = await axios({
                    url: 'http://localhost:5000/api/products',
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                hideLoading()
                if (!response || response.statusText !== 'OK') {
                    return `<div>error in getting data</div>`;
                }

                const products = response.data;

                return `
                <ul class="products"> 
                ${products.map((product) =>
                `<li>
                    <div class="product">
                        <a href="/#/product/${product._id}">
                            <img src="${product.img}" alt="${product.name}" />
                        </a>
                        <div class="product-name">
                            <a href="/#/product/${product._id}">${product.name}</a>
                        </div>
                        <div class="product-rating">
                        ${Rating.render({
                            value: product.rating, 
                            text: `${product.numReviews} Reviews`
                        })}
                        </div>
                        <div class="product-brand">
                            ${product.author}
                        </div>
                        <div class="product-price">
                            $${product.price}
                        </div>
                        <button id="${product._id}" class="add-button primary fw home-button">
                            Add to Cart
                        </button>
                    </div>
                </li>`
            ).join('\n')}
            </ul> `
        },
};

export default HomeScreen;