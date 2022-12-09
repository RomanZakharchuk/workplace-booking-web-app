import { FC } from "react";

import css from './Sidebar.module.scss';
import CloseBtn from '../../../../assets/svg/CloseBtn.svg';

type PropsType = {
    open: boolean;
    toggleMenu: () => void;
};

const Sidebar: FC<PropsType> = ({ open, toggleMenu}) => {
    const sidebarOpen = open ? css.sidebarShow : css.sidebarHide;

    return (
        <div className={`${sidebarOpen} ${css.sidebar}`}>
            <div
                className={css.burger}
                onClick={() => toggleMenu()}
            >
                <img src={CloseBtn} alt="Close btn" />
            </div>

            <nav className={css.nav}>
                <ul>
                    <li>
                        <a onClick={() => toggleMenu()} className={css.link} href={'#home'}>Home</a>
                    </li>
                    <li>
                        <a onClick={() => toggleMenu()} className={css.link} href={"#about"}>About</a>
                    </li>
                    <li>
                        <a onClick={() => toggleMenu()} className={css.link} href={"#benefits"}>Benefits</a>
                    </li>
                    <li>
                        <a onClick={() => toggleMenu()} className={css.link} href={"#reviews"}>Reviews</a>
                    </li>
                    <li>
                        <a onClick={() => toggleMenu()} className={css.link} href={"#team"}>Team</a>
                    </li>
                    <li>
                        <a onClick={() => toggleMenu()} className={css.linkBtn} href={"#create-account"}>Create Account</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export { Sidebar };