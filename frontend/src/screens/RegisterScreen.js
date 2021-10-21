import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const RegisterScreen = {
    after_render: () => {
        document.getElementById('register-form').addEventListener('submit', async(e) => {
            e.preventDefault();
            showLoading()
            const data = await register({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });
            hideLoading()
            if (data.error) {
                showMessage(data.error)
            } else {
                setUserInfo(data);
                document.location.hash = '/'
            }
        })
    },
    render: () => {
        if (getUserInfo().name) {
            document.location.hash = '/';
        }
        return `
        <div class="form-container">
            <form id="register-form">
                <ul class="form-items">
                    <li>
                    <h1>Create Account</h1>
                    </li>
                    <li>
                        <input type="name" name="name" id="name" placeholder="Name"/>
                     </li>
                    <li>
                        <input type="email" name="email" id="email" placeholder="E-mail"/>
                    </li>
                    <li>
                        <input type="password" name="password" id="password" placeholder="Password"/>
                    </li>
                    <li>
                        <input type="password" name="repassword" id="repassword" placeholder="Re-Enter Password"/>
                     </li>
                    <li>
                        <button type="submit" class="primary fw">Register</button>
                    </li>
                    <li>
                    <div>
                        Alredy have an Account?
                        <a href="/#/signin">Sign-in</a>
                    </div>
                </li>
                </ul>
            </form>
        </div>
        `
    }
}

export default RegisterScreen;