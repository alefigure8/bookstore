import DashboardMenu from "../component/dashboradMenu";

const DashboardScreen = {
    after_render: () => {

    },
    render: () => {
        return `
        <div class="dashboard">
            ${DashboardMenu.render({selected: 'dashboard'})}
            <div class="dashboard-content">
            <h1>Dashboard</h1>
            <div> TODO: set infi and charts</div>
            </div>
        </div>
        `
    }
};

export default DashboardScreen;