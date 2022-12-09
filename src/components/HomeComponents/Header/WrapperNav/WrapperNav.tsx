import { FC, useState } from "react";

import Logo from '../../../../assets/svg/Logo.svg';
import css from './WrapperNav.module.scss';
import { BurgerComponent } from "../../../BurgerComponent";

type PropsType = {
    toggleMenu: () => void;
}

const WrapperNav: FC<PropsType> = ({ toggleMenu }) => {
    const [ isHover, setIsHover ] = useState(false);

    return (
        <div className={css.headerNav}>
            <div className={css.logoContainer}>
                <img src={Logo} alt="Logo" />
            </div>

            <nav className={css.nav}>
                <ul className={css.navInner}>
                    <li className={css.list}>
                        <a href={"#home"}>Home</a>
                    </li>
                    <li className={css.list}>
                        <a href={"#about"}>About</a>
                    </li>
                    <li className={css.list}>
                        <a href={"#benefits"}>Benefits</a>
                    </li>
                    <li className={css.list}>
                        <a href={"#reviews"}>Reviews</a>
                    </li>
                    <li className={css.list}>
                        <a href={"#team"}>Team</a>
                    </li>

                    <div className={css.singGroup}>

                        <a
                            className={css.logInLink}
                            href="/login"
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                        >
                            <span className={`${isHover ? css.logInLinkColor : null}`}>Log in</span>
                        </a>

                        <a
                            className={css.createAccountLink}
                            href={"#create-account"}
                        >
                            <span className={`${isHover ? css.createAccountLinkColor : null}`}>Create Account</span>
                        </a>

                        <div className={`${css.animationBox} ${isHover ? css.animationBoxPosition : null}`}></div>

                    </div>
                </ul>
            </nav>

            <BurgerComponent toggleMenu={toggleMenu} />
        </div>
    )
}

export { WrapperNav };