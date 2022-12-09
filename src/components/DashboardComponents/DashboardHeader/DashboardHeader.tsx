import { FC } from "react";
import { useSelector } from "react-redux";

import css from './DashboardHeader.module.scss';
import Logo from '../../../assets/svg/Logo-old.svg';
import Mitsubishi from '../../../assets/svg/mitsubishi.svg';
import Linkedin from '../../../assets/svg/LinkedIN.svg';
import Twitter from '../../../assets/svg/Twitter1.svg';
import Instagram from '../../../assets/svg/Instagram_black.svg';
import Facebook from '../../../assets/svg/facebook1.svg';
import { HeaderDropDown  } from "../HeaderDropDown/HeaderDropDown";
import { BurgerComponent } from "../../BurgerComponent";

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
    toggleMenu: () => void;
    toggleMenuProfile: () => void;
};

const DashboardHeader: FC<PropsType> = ({ toggleMenu, toggleMenuProfile }) => {
    const profile = useSelector((store: any) => store?.users?.profile);

    const { imageUrl } = profile;

    return (
        <header className={css.header}>
            <div className={css.logoWrap}>
                <div className={css.logo}>
                    <img src={Logo} alt="Logo" />
                </div>

                <HeaderDropDown />
            </div>

            <div className={css.socialGroup}>
                <div className={css.wrapImg}>
                    <img src={Mitsubishi} alt="mitsubishi" />
                </div>
                {socialIcons.map(social => (
                    <div key={social.id} className={css.wrapImg}>
                        <img src={social.img} alt="icon" />
                    </div>
                ))}
            </div>

            <div className={css.box}>
                <div onClick={() => toggleMenuProfile()} className={css.wrapImgUser}>
                    <img src={imageUrl} alt="User" />
                </div>

                <BurgerComponent toggleMenu={toggleMenu} />
            </div>
        </header>
    )
}

export { DashboardHeader };