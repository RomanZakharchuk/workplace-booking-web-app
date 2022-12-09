import css from './RoomContainerComponent.module.scss';
import { DeleteSvg } from "../../SvgComponents";
import { FC } from "react";
import { IBookingList } from "../../../interfaces/bookingList.interface";
import moment from "moment";

type PropsType = {
    booking: IBookingList;
    setWarningModalWindow: (value: boolean) => void;
    setBookingId: (value: number | null) => void;
}

const RoomContainerComponent: FC<PropsType> = ({ booking, setWarningModalWindow, setBookingId }) => {
    const {id, room, dateFrom, dateTo, date, desk } = booking;

    const currentDate = moment(date).format('DDD MMM');
    const opensAt = moment(dateFrom).format('LT');
    const closesAt = moment(dateTo).format('LT');

    return (
        <div className={css.roomContainer}>
            <div className={css.container}>

                <div className={css.textContainer}>
                    <h4>{room}</h4>
                    <p>{desk}</p>
                </div>

                <div className={css.textContainer}>
                    <h4>{currentDate}</h4>
                    <p>{opensAt} - {closesAt}</p>
                </div>

            </div>

            <div onClick={() => {
                setWarningModalWindow(true);
                setBookingId(id);
            }} className={css.bucketContainer}>
                <DeleteSvg colorIconDelete={'#FF7A7A'} />
            </div>
        </div>
    );
};

export { RoomContainerComponent };