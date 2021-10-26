import { createOrder } from "../api";
import checkoutSteps from "../component/checkOutSteps";
import { cleanCart, getCartItems, getPayment, getShipping } from "../localStorage";
import { showLoading, hideLoading, showMessage } from '../utils.js'

const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if (orderItems.length === 0) {
        document.location.hash = '/cart';
    }
    const shipping = getShipping();
    if (!shipping) {
        document.location.hash = '/shipping';
    }
    const payment = getPayment();
    if (!payment.paymentMethod) {
        document.location.hash = '/payment';
    }
    const itemsPrice = orderItems.reduce((a, b) => a + b.price * b.qty, 0).toFixed(2);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Math.round(.21 * itemsPrice * 100) / 100;
    const totalPrice = Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);
    return {
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    };
};

const PlaceorderScreen = {
        after_render: async() => {
            document.getElementById('placeorder-button').addEventListener('click', async() => {
                const order = convertCartToOrder();
                showLoading();
                const data = await createOrder(order);
                hideLoading();
                if (data.error) {
                    showMessage(data.error);
                } else {
                    cleanCart();
                    document.location.hash = `/order/${data.order._id}`
                }
            });
        },
        render: () => {
                const {
                    orderItems,
                    shipping,
                    payment,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice
                } = convertCartToOrder()

                return `
        <div>
            ${checkoutSteps.render({step1:true, step2:true, step3:true, step4:true, })}
             <div class="order">
                <div class="order-info">
                    <div>
                        <h2>Shipping</h2>
                        <div>
                            ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, ${shipping.country}
                        </div>
                    </div>
                    <div>
                        <h2>Paymenent</h2>
                        <div>
                            Payment Method: ${payment.paymentMethod}
                        </div>
                    </div>
                    <div class="cart-list">
                        <ul class="cart-list-container">
                            <li>
                                <h2>Shopping Cart</h2>
                                <div>Price</div>
                            </li>
                        ${
                            orderItems.map(item => `
                            <li>
                                <div class="cart-img">
                                    <img src="${item.img}" alt="${item.name}" />
                                </div>
                                <div class="cart-name">
                                    <div>
                                        <a href="/#/product/${item.product}">${item.name}</a>
                                    </div>
                                    <div> Items: ${item.qty}</div>
                                </div>
                                <div class="cart-price">$${item.price}</div>
                            </li>
                            `
                            ).join('\n')
                        }
                        </ul>
                    </div>   
                </div> 
                <div class="order-action">
                    <ul>
                        <li>
                            <h2>Order-Summary</h2>
                        </li>
                        <li>
                            <div>
                                Item
                            </div>
                            <div>
                                $${itemsPrice}
                            </div>
                        </li>
                        <li>
                            <div>
                                Shipping
                            </div>
                            <div>
                                $${shippingPrice}
                            </div>
                        </li>
                        <li>
                            <div>
                                Tax
                            </div>
                            <div>
                                $${taxPrice}
                            </div>
                         </li>
                         <li class="total">
                            <div>
                                Order Total
                            </div>
                            <div>
                                $${parseFloat(totalPrice).toFixed(2)}
                            </div>
                        </li>
                        <li>
                        <button class="primary fw" id="placeorder-button">Place Order</button>
                        </li>
                    </ul>
                </div>
            </div>    
        `
    }
};

export default PlaceorderScreen;