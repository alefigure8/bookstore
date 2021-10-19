import { getUserInfo } from "../localStorage";

const Header = {
        render: async() => {
                const { name } = getUserInfo()
                return ` 
        <div class="header-container">
            <div class="brand">
                <a href="/#/"><span><i class="fas fa-book"></i></span>Franny <span class="brand-anchor">&</span> Zooey</a>
            </div>
            <div>
            ${await getUserInfo().name
                ? `<a href="/#/profile">${name}</a>`
                : `<a href="/#/signin">Sign-in</a>`}
                <a href="/#/cart">Cart</a>
            </div>
        </div>
        `;
    },

};

export default Header;