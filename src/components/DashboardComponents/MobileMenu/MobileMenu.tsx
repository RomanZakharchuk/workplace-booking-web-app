import { FC, useState } from "react";
import { Link } from "react-router-dom";

import css from './MobileMenu.module.scss';
import { DOVE_GRAY_COLOR, SILVER_COLOR } from "../../../constants";
import { DocumentSvg, SettingSvg, UserSvg } from "../../SvgComponents";
import Linkedin from '../../../assets/svg/LinkedIN.svg';
import Twitter from '../../../assets/svg/Twitter1.svg';
import Instagram from '../../../assets/svg/Instagram_black.svg';
import Facebook from '../../../assets/svg/facebook1.svg';

const socialIcons = [
    {
        id: 1,
        img: Linkedin
    },
    {
        id: 2,
        img: Twitter
    },
    {
        id: 3,
        img: Instagram
    },
    {
        id: 4,
        img: Facebook
    }
];

type PropsType = {
    open: boolean;
    toggleMenu: () => void;
};

const MobileMenu: FC<PropsType> = ({ toggleMenu, open }) => {
    const iconDocument = 'icon-document';
    const iconUser = 'icon-user';
    const iconSetting = 'icon-setting';

    const mobileMenuOpen = open ? css.show : css.hide;
    const [currenSvgFocused, setCurrentSvgFocused] = useState<string>(null as unknown as string);

    const colorIconDocument = currenSvgFocused === iconDocument ? DOVE_GRAY_COLOR : SILVER_COLOR;
    const colorIconUser = currenSvgFocused === iconUser ? DOVE_GRAY_COLOR : SILVER_COLOR;
    const colorIconSetting = currenSvgFocused === iconSetting ? DOVE_GRAY_COLOR : SILVER_COLOR;

    return (
        <div className={`${mobileMenuOpen} ${css.sidebar}`}>
            <div
                className={css.burger}
                onClick={() => toggleMenu()}
            >
                <span></span>
                <span></span>
            </div>

            <nav className={css.nav}>
                <ul className={css.wrapList}>
                    <li
                        className={css.list}
                        onMouseEnter={() => setCurrentSvgFocused(iconDocument)}
                        onMouseLeave={() => setCurrentSvgFocused('')}
                    >
                        <DocumentSvg colorIconDocument={colorIconDocument} />
                        <Link to={'/dashboard/document'} className={css.link}>List of offices</Link>
                    </li>

                    <li
                        className={css.list}
                        onMouseEnter={() => setCurrentSvgFocused(iconUser)}
                        onMouseLeave={() => setCurrentSvgFocused('')}
                    >
                        <UserSvg colorIconUser={colorIconUser} />
                        <Link to={'/dashboard/user'} className={css.link}>List of users</Link>
                    </li>
                    <li
                        className={css.list}
                        onMouseEnter={() => setCurrentSvgFocused(iconSetting)}
                        onMouseLeave={() => setCurrentSvgFocused('')}
                    >
                        <SettingSvg colorIconSetting={colorIconSetting} />
                        <Link to={'/dashboard/setting'} className={css.link}>Company setting</Link>
                    </li>
                </ul>
            </nav>

            <div className={css.socialGroup}>
                {socialIcons.map(social => (
                    <div key={social.id} className={css.wrapImg}>
                        <img src={social.img} alt="icon" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export { MobileMenu };