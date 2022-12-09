import { FC } from "react";

import css from "./WrapCreateOffice.module.scss";
import { DotsSvg } from "../../SvgComponents";
import { SILVER_ALTO_COLOR } from "../../../constants";

type PropsType = {
    officeFormFields: any;
}

const WrapCreateOffice: FC<PropsType> = ({ officeFormFields }) => {
    const { name, status, opensAt, closesAt, address, room, manager } = officeFormFields;

    const checkStatus = (status: string) => {
        switch (status) {
            case 'CLOSED':
                return css.statusClose;
            case 'OPENED':
                return css.statusAvailable;
            default:
                return null;
        }
    }

    return (
        <div className={css.wrapOffice}>
            <div className={css.nameBlock}>
                <p>{name}</p>
            </div>
            <div className={css.wrapStatusText}>
                <p className={`${css.statusBlock} ${checkStatus(status)}`}>{status}</p>
            </div>
            <div className={css.roomBlock}>
                <p>{room}</p>
            </div>
            <div className={css.managerBlock}>
                <p>{manager}</p>
            </div>
            <div className={css.addressBlock}>
                <p>{address}</p>
            </div>
            <div className={css.workTimeBlock}>
                <p>{opensAt} - {closesAt}</p>
            </div>
            <div className={css.wrapBtns}>
                <button className={css.editBtn}>
                    <DotsSvg color={SILVER_ALTO_COLOR} />
                </button>
            </div>
        </div>
    )
}

export { WrapCreateOffice };