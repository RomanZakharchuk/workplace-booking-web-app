import css from './PopupAboutManager.module.scss';
import { FC } from "react";

type PropsType = {
    manager: any;
}

const PopupAboutManager: FC<PropsType> = ({ manager }) => {
    const { fullName, email, imageUrl } = manager;

    return (
        <div className={css.popupAboutManager}>
            <div className={css.wrapUserImg}>
                <img className={css.userImg} src={imageUrl} alt="user" />
            </div>
            <h3 className={css.title}>{fullName}</h3>
            <p className={css.text}>{email}</p>
            <p className={css.text}>Your test organization</p>
        </div>
    )
}

export { PopupAboutManager };