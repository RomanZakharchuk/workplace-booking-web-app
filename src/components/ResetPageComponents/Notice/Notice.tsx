import { FC } from "react";

import css from './Notice.module.scss';

type PropsType = {
    title: string;
}

const Notice: FC<PropsType> = ({ title }) => {
    return (
        <h3 className={css.notice}>{title}</h3>
    )
}

export { Notice };