import css from './AddRoomComponent.module.scss';
import { DotsSvg } from "../../SvgComponents";
import { SILVER_ALTO_COLOR } from "../../../constants";
import { FC } from "react";
import { IInitialRoomFormFields } from "../../../pages/RoomPage/RoomPage";

type PropsType = {
    room: IInitialRoomFormFields
}

const AddRoomComponent: FC<PropsType> = ({ room }) => {
    const { name, status, address, opensAt, closesAt, seats } = room;

    return (
        <div className={css.userContainer}>
            <div className={css.nameBlock}>
                <p className={css.text}>{name}</p>
            </div>
            <div className={css.statusBlock}>
                <p className={css.text}>{status}</p>
            </div>
            <div className={css.seatsBlock}>
                <p className={css.text}>{seats}</p>
            </div>
            <div className={css.addressBlock}>
                <p className={css.text}>{address}</p>
            </div>
            <div className={css.workTimeBlock}>
                <p className={css.text}>{opensAt} - {closesAt}</p>
            </div>

            <div className={css.dotsContainer}>
                <DotsSvg color={SILVER_ALTO_COLOR} />
            </div>
        </div>
    )
}

export { AddRoomComponent };