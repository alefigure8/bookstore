export const getCartItems = () => { //Obtener elementos del local storage
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    return cartItems;
}

export const setCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export const setUserInfo = ({
    _id = '',
    name = '',
    email = '',
    password = '',
    token = '',
    isAdmin = false
}) => {
    localStorage.setItem('userInfo', JSON.stringify({ _id, name, email, password, token, isAdmin }));
};

export const getUserInfo = () => {
    return localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : { _id: '', name: '', email: '', password: '' }
};

export const clearUser = () => {
    localStorage.removeItem('userInfo');
};

export const getShipping = () => {
    return localStorage.getItem('shipping') ?
        JSON.parse(localStorage.getItem('shipping')) : {
            city: '',
            address: '',
            postalCode: '',
            country: ''
        }
};

export const setShipping = ({
    city = '',
    address = '',
    postalCode = '',
    country = ''
}) => {
    localStorage.setItem('shipping', JSON.stringify({ city, address, postalCode, country }));
};

export const getPayment = () => {
    return localStorage.getItem('payment') ?
        JSON.parse(localStorage.getItem('payment')) : {
            paymentMethod: 'paypal'
        }
};

export const setPayment = ({ paymentMethod = 'paypal' }) => {
    localStorage.setItem('payment', JSON.stringify({ paymentMethod }));
};

export const cleanCart = () => {
    localStorage.removeItem('cartItems');
}