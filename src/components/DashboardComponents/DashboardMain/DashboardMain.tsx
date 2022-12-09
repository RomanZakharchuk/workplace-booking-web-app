import css from './DashboardMain.module.scss';
import { Outlet } from "react-router-dom";

const DashboardMain = () => {
    return (
        <main className={css.main}>
            <Outlet />
        </main>
    )
}

export { DashboardMain };