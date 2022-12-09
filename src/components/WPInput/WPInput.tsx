import css from './WPInput.module.scss';
import { FC, ReactNode } from "react";

type PropsType = {
    name: string;
    labelName: string;
    children: ReactNode;
}

const WPInput: FC<PropsType> = (props) => {
    const { name, labelName, children } = props;

    return (
        <div className={css.container}>
            {labelName && <label
                htmlFor={name}
                className={css.label}
            >{labelName}</label>}
            {children}
        </div>
    );
};

export default WPInput;