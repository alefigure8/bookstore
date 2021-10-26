import HomeScreen from './screens/HomeScreen.js'
import ProductScreen from './screens/ProductScreen.js';
import { hideLoading, parseRequestUrl, showLoading } from './utils.js';
import Error404Screen from './screens/Error404Screen.js';
import CartScreen from './screens/cartScreen.js'
import signinScreen from './screens/signinScreen.js';
import Header from './component/Header.js';
import RegisterScreen from './screens/RegisterScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceorderScreen from './screens/PlaceorderScreen.js';
import OrderScreen from './screens/orderScreen.js';

const routes = {
    "/": HomeScreen,
    '/product/:id': ProductScreen,
    '/cart/:id': CartScreen,
    '/cart': CartScreen,
    '/signin': signinScreen,
    '/register': RegisterScreen,
    '/profile': ProfileScreen,
    '/shipping': ShippingScreen,
    '/payment': PaymentScreen,
    '/placeorder': PlaceorderScreen,
    '/order/:id': OrderScreen,
};

async function router() {
    showLoading();
    const request = parseRequestUrl();
    const parseUrl =
        (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const header = document.getElementById('header');
    header.innerHTML = await Header.render()
    const container = document.getElementById('container');
    container.innerHTML = await screen.render();
    if (screen.after_render) await screen.after_render();
    hideLoading();
};

window.addEventListener('load', router)
window.addEventListener('hashchange', router)