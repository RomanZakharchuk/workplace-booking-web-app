import { FC, ReactNode } from "react";

import css from './RegistrationComponent.module.scss';
import LoginBackground from "../../assets/png/login-img.png";

type PropsType = {
    children?: ReactNode;
}

const RegistrationComponent: FC<PropsType> = ({ children }) => {
    return (
        <div className={css.RegistrationContainer}>
            <div className={css.mainContainer}>
                <div className={css.formComponent}>
                    {children}
                </div>

                <div className={css.bgImgContainer}>
                    <img src={LoginBackground} alt="Login Background image" />
                </div>
            </div>
        </div>
    );
};

export { RegistrationComponent };