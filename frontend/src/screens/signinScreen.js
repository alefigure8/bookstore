import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";

const signinScreen = {
    after_render: () => {
        document.getElementById('signin-form').addEventListener('submit', async(e) => {
            e.preventDefault();
            const data = await signin({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });
            if (data.error) {
                alert(data.error)
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
            <form id="signin-form">
                <ul class="form-items">
                    <li>
                    <h1>Sign-In</h1>
                    </li>
                    <li>
                        <input type="email" name="email" id="email" placeholder="E-mail"/>
                    </li>
                    <li>
                        <input type="password" name="password" id="password" placeholder="Password"/>
                    </li>
                    <li>
                        <button type="submit" class="primary fw">Signin</button>
                    </li>
                    <li>
                        <div>
                            New User?
                            <a href="/#/register">Create your account</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
        `
    }
}

export default signinScreen;