import { getProduct } from "../api";
import { parseRequestUrl, rerender } from "../utils"
import { getCartItems, setCartItems } from '../localStorage.js'


//Add and Update element in LocalStorage
const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find(x => x.product === item.product);
    if (existItem) {
        if (forceUpdate) {
            cartItems = cartItems.map(x => x.product === existItem.product ? item : x) //Update items
        };
    } else {
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if (forceUpdate) {
        rerender(CartScreen)
    }
};

//Delete elements in LocalStorage
const removeFromCart = (id) => {
    setCartItems(getCartItems().filter(x => x.product !== id));
    if (id === parseRequestUrl().id) {
        document.location.hash = '/cart';
    } else {
        rerender(CartScreen)
    }
};

const CartScreen = {
        after_render: () => {
            //Update Items
            const qtySelects = document.getElementsByClassName('qty-select');
            Array.from(qtySelects).forEach(qtySelect => {
                qtySelect.addEventListener('change', (e) => {
                    const item = getCartItems().find(x => x.product === qtySelect.id);
                    addToCart({...item, qty: Number(e.target.value) }, true)
                });
            });

            //Delete Items
            const deleteButtons = document.getElementsByClassName('delete-button');
            Array.from(deleteButtons).forEach(deleteButton => {
                deleteButton.addEventListener('click', () => {
                    removeFromCart(deleteButton.id);
                });
            });

            document.getElementById('checkout-button').addEventListener('click', () => {
                document.location.hash = '/signin';
            });
        },
        render: async() => {
                const request = parseRequestUrl();
                //Check if the URL has the product ID
                if (request.id) {
                    const product = await getProduct(request.id);
                    addToCart({
                        product: product._id,
                        name: product.name,
                        img: product.img,
                        price: product.price,
                        countInStock: product.countInStock,
                        qty: 1
                    });
                };

                //Search in localStorage
                const cartItems = getCartItems()
                return `
        <div class="content cart">
            <div class="cart-list">
                <ul class="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    ${
                        cartItems.length === 0? '<div>Cart is empty. <a href="/#/">Go Shopping</a></div>' :
                        cartItems.map(item => `
                            <li>
                                <div class="cart-img">
                                        <a href="/#/product/${item.product}">
                                            <img src="${item.img}" alt="${item.name}" />
                                        </a>
                                </div>
                                <div class="cart-name">
                                    <div>
                                        <a href="/#/product/${item.product}">
                                        ${item.name}
                                        </a>
                                    </div>
                                    <div>
                                        qty: 
                                        <select class="qty-select" id="${item.product}">
                                             ${[...Array(item.countInStock).keys()].map((x)=> 
                                                    item.qty === x + 1
                                                    ? `<option selected value="${x + 1}">${x + 1}</option>` : `<option value="${x + 1}">${x + 1}</option>` 
                                                )}
                                        </select>
                                        <button class="delete-button" id="${item.product}">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div class="cart-price">
                                    $${item.price}
                                </div>
                            </li>
                        `).join('\n')
                    }
                </ul>
            </div>
            <div class="cart-action">
                <h3>
                    Subtotal ( ${cartItems.reduce((a, c) =>  a+c.qty, 0)} items)
                    :
                    $${cartItems.reduce((a, c) => a+c.price * c.qty, 0).toFixed(2)}
                </h3>
                <button id="checkout-button" class="primary fw">
                    Proceed to Checkout
                </button>
            </div>
        </div>
        `;
    },
};

export default CartScreen