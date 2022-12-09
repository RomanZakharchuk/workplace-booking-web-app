import { FC, ReactNode } from "react";

import css from './BlockNamePosition.module.scss';

type PropsType = {
    title: string;
    children?: ReactNode;
    onPress?: () => void;
}

const BlockNamePosition: FC<PropsType> = ({title, children, onPress}) => {
    return (
        <div className={css.wrapper} onClick={onPress}>
            <p className={css.title}>{title}</p>
            <div className={css.wrap}>
                {children}
            </div>
        </div>
    )
}

export { BlockNamePosition };