import { FC } from "react";

import css from "./BurgerComponent.module.scss";
import Burger from '../../assets/svg/Burger.svg';

type PropsType = {
    toggleMenu: () => void;
};

const BurgerComponent: FC<PropsType> = ({toggleMenu}) => {
    return (
        <div
            className={css.menuBtn}
            onClick={() => toggleMenu()}
        >
            <img src={Burger} alt="Burger" />
        </div>
    )
}

export { BurgerComponent };