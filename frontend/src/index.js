import HomeScreen from './screens/HomeScreen.js'
import ProductScreen from './screens/ProductScreen.js';
import { parseRequestUrl } from './utils.js';
import Error404Screen from './screens/Error404Screen.js';
import CartScreen from './screens/cartScreen.js'
import signinScreen from './screens/signinScreen.js';

const routes = {
    "/": HomeScreen,
    '/product/:id': ProductScreen,
    '/cart/:id': CartScreen,
    '/cart': CartScreen,
    '/signin': signinScreen,
};

async function router() {
    const request = parseRequestUrl();
    const parseUrl =
        (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    const container = document.getElementById('container');
    container.innerHTML = await screen.render();
    await screen.after_render()
};

window.addEventListener('load', router)
window.addEventListener('hashchange', router)