import { FC } from "react";

import css from './Description.module.scss';

type PropsType = {
    title: string;
    text: string;
}

const Description: FC<PropsType> = ({ text, title }) => {
    return (
        <div className={css.wrapper}>
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
    )
}

export { Description };