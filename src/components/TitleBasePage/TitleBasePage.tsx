import { FC } from "react";

import css from './TitleBasePage.module.scss';

type PropsType = {
    title: string;
}

const TitleBasePage: FC<PropsType> = ({ title }) => {
    return (
        <h3 className={css.title}>{title}</h3>
    )
}

export { TitleBasePage };