import { update } from "../api";
import { clearUser, getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const ProfileScreen = {
    after_render: () => {
        document.getElementById('signout-button').addEventListener('click', () => {
            clearUser();
            document.location.hash = '/'
        })
        document.getElementById('profile-form').addEventListener('submit', async(e) => {
            e.preventDefault();
            showLoading()
            const data = await update({
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
        });
    },
    render: () => {
        const { email, name } = getUserInfo()
        if (!name) {
            document.location.hash = '/';
        }
        return `
        <div class="form-container">
            <form id="profile-form">
                <ul class="form-items">
                    <li>
                    <h1>User Profile</h1>
                    </li>
                    <li>
                        <input type="name" name="name" id="name" value="${name}"/>
                     </li>
                    <li>
                        <input type="email" name="email" id="email" value="${email}"/>
                    </li>
                    <li>
                        <input type="password" name="password" id="password" placeholder="Password"/>
                    </li>
                    <li>
                        <button type="submit" class="primary fw">Update</button>
                    </li>
                    <li>
                    <button type="button" id="signout-button" class="fw">Signout</button>
                </li>
                </ul>
            </form>
        </div>
        `
    }
}

export default ProfileScreen;