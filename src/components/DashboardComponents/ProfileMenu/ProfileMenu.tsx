import { FC, useState } from "react";

import css from './ProfileMenu.module.scss';
import { LogoutSvg, ProfileSvg } from "../../SvgComponents";
import { DOVE_GRAY_COLOR, SILVER_COLOR } from "../../../constants";
import { Link } from "react-router-dom";

type PropsType = {
    openProfile: boolean;
    toggleMenuProfile: () => void;
};

const ProfileMenu: FC<PropsType> = ({ openProfile, toggleMenuProfile }) => {
    const iconProfile = 'icon-profile';
    const iconLogout = 'icon-logout';

    const profileMenuOpen = openProfile ? css.show : css.hide;
    const [currenSvgFocused, setCurrentSvgFocused] = useState<string>(null as unknown as string);

    const colorIconProfile = currenSvgFocused === iconProfile ? DOVE_GRAY_COLOR : SILVER_COLOR;
    const colorIconLogout = currenSvgFocused === iconLogout ? DOVE_GRAY_COLOR : SILVER_COLOR;

    return (
        <div className={`${profileMenuOpen} ${css.sidebar}`}>
            <div
                className={css.burger}
                onClick={() => toggleMenuProfile()}
            >
                <span></span>
                <span></span>
            </div>

            <nav className={css.nav}>
                <ul className={css.wrapList}>
                    <li
                        className={css.list}
                        onMouseEnter={() => setCurrentSvgFocused(iconProfile)}
                        onMouseLeave={() => setCurrentSvgFocused('')}
                    >
                        <ProfileSvg colorIconProfile={colorIconProfile} />
                        <Link to={'/dashboard/my-profile'} className={css.link}>My profile</Link>
                    </li>

                    <li
                        className={css.list}
                        onMouseEnter={() => setCurrentSvgFocused(iconLogout)}
                        onMouseLeave={() => setCurrentSvgFocused('')}
                    >
                        <LogoutSvg colorIconLogout={colorIconLogout} />
                        <Link to={''} className={css.link}>Log out</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export { ProfileMenu };