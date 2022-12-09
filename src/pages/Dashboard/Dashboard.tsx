import { FC, useState } from "react";

import {
    DashboardHeader,
    DashboardMain,
    DashboardSidebar,
    MobileMenu,
    ProfileMenu
} from "../../components/DashboardComponents";
import css from './Dashboard.module.scss';

const Dashboard: FC = () => {
    const [ open, setOpen ] = useState<boolean>(false);
    const [ openProfile, setOpenProfile ] = useState<boolean>(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    const toggleMenuProfile = () => {
        setOpenProfile(!openProfile);
    };

    return (
        <div className={css.basePage}>
            <ProfileMenu openProfile={openProfile} toggleMenuProfile={toggleMenuProfile} />
            <MobileMenu open={open} toggleMenu={toggleMenu} />
            <DashboardHeader toggleMenuProfile={toggleMenuProfile} toggleMenu={toggleMenu} />
            <div className={css.mainContainer}>
                <DashboardSidebar />
                <DashboardMain />
            </div>
        </div>
    )
}

export { Dashboard };