import { FC } from "react";

import { ImgComponent } from "../../ImgComponent/ImgComponent";
import css from './BlockBooking.module.scss';

type PropsType = {
    src: string;
    alt: string;
    title: string;
    text: string;
};

const BlockBooking: FC<PropsType> = ({ src, text, alt, title }) => {
    return (
        <div className={css.blockBooking}>
            <div className={css.blockBooking__inner}>
                <ImgComponent src={src} alt={alt}/>
                <h3 className={css.title}>{title}</h3>
            </div>
            <p className={css.text}>{text}</p>
        </div>
    )
}

export { BlockBooking };