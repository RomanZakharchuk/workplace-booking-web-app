import { FC, ReactNode } from "react";

import css from "./ContainerLeftForm.module.scss";

type PropsType = {
    title: string;
    children?: ReactNode;
}

const ContainerLeftForm: FC<PropsType> = ({title, children}) => {
    return (
        <div className={css.containerLeftForm}>
            <h4 className={css.title}>{title}</h4>
            {children}
        </div>
    )
}

export { ContainerLeftForm };