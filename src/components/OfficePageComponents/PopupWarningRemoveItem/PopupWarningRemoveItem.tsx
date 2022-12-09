import { FC } from "react";

import css from './PopupWarningRemoveItem.module.scss';
import { CloseCross, DeleteSvg } from "../../SvgComponents";

type PropsType = {
    setWarningModalWindow: (value: boolean) => void;
    removeById: () => void;
    warningText: string;
}

const PopupWarningRemoveItem: FC<PropsType> = (props) => {
    const { setWarningModalWindow, removeById, warningText } = props;

    return (
        <div className={css.wrapperPopupWarningContainer}>
            <div className={css.headerContainer}>
                <h2 className={css.title}>Warning!</h2>
                <button onClick={() => setWarningModalWindow(false)} className={css.btnClose}>
                    <CloseCross />
                </button>
            </div>

            <div className={css.warningContainer}>
                <div className={css.warningInner}>
                    <p className={css.warningText}>{warningText}</p>
                </div>

                <div onClick={() => {
                    removeById();
                    setWarningModalWindow(false);
                }} className={css.wrapperBtn}>
                    <div className={css.wrapperSvg}>
                        <DeleteSvg colorIconDelete={'#FFFFFF'} />
                    </div>
                    <p className={css.textBtn}>Delete</p>
                </div>
            </div>

            <button onClick={() => setWarningModalWindow(false)} className={css.btnCancel}>Cancel</button>
        </div>
    )
}

export { PopupWarningRemoveItem };