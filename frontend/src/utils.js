import { getCartItems } from "./localStorage";

//Split URL
export const parseRequestUrl = () => {
    const url = document.location.hash.toLocaleLowerCase();
    const request = url.split('/');
    return {
        resource: request[1],
        id: request[2],
        action: request[3]
    }
}

//Update main page when change some parameter
export const rerender = async(component) => {
    document.getElementById('container').innerHTML = await component.render();
    await component.after_render()
}

//Show loading when de page is charging
export const showLoading = () => {
    document.getElementById('loading-overlay').classList.add('active')
}

export const hideLoading = () => {
    document.getElementById('loading-overlay').classList.remove('active')
}

//Show a mmessage
export const showMessage = (message, callback) => {
    document.getElementById('message-overlay').innerHTML = `
    <div>
        <div class="message-overlay"-content>
            ${message}
        </div>
        <button id="message-overlay-close-button" class="primary">OK</button>
    </div>
    `;
    document.getElementById('message-overlay').classList.add('active');
    document.getElementById('message-overlay-close-button').addEventListener('click', () => {
        document.getElementById('message-overlay').classList.remove('active');
        if (callback) {
            callback()
        }
    })
};

//rediredct the user if is alredy signin
export const redirectUser = () => {
    if (getCartItems().length !== 0) {
        document.location.hash = '/shipping';
    } else {
        document.location.hash = '/';
    }
};