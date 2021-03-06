import { getMyOrders, update } from "../api";
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
        render: async() => {
                const { email, name } = getUserInfo()
                if (!name) {
                    document.location.hash = '/';
                }
                const orders = await getMyOrders();
                return `
        <div class="profile">
            <div class="profile-info">
                <div class="form-container-profile">
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
            </div>
            <div class="profile-orders">
                <h2>Order History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ORDER ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.length === 0 ? `<tr><td colspan="6">No Orders</td></tr>` : orders.map(order =>
                            `
                            <tr>
                                <td>${order._id}</td>
                                <td>${order.createdAT}</td>
                                <td>${order.totalPrice}</td>
                                ${order.paidAT? `<td class="success">${order.paidAT}</td>` : `<td>No</td>`}
                                ${order.deliveredAT? `<td class="success">${order.deliveredAT}</td>` : `<td>No</td>`}
                                <td><a href="/#/order/${order._id}">Details</a></td>
                            </tr>
                            `
                        ).join('\n')}
                    </tbody>
                </table>
            </div>
        </div>
        `
    }
}

export default ProfileScreen;