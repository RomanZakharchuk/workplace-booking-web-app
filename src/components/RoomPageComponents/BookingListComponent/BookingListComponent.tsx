import css from './BookingListComponent.module.scss';
import { RoomContainerComponent } from "../RoomContainerComponent/RoomContainerComponent";
import { PalygonDownSvg, PalygonUpSvg } from "../../SvgComponents";
import { BLUE_COLOR, SILVER_COLOR, SORT_OPTIONS } from "../../../constants";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelBookingById, getBookingList } from "../../../modules/dashboard/store/booking-store/booking.actions";
import { AppState } from "../../../store/store";
import InfiniteScroll from "react-infinite-scroller";
import { IBookingList } from "../../../interfaces/bookingList.interface";
import { PopupWarningRemoveItem } from "../../OfficePageComponents";

const BookingListComponent: FC = () => {
    const bookingList = useSelector((state: AppState) => state?.booking.bookingList);
    const meta = useSelector((state: AppState) => state?.booking.meta);
    const [ currentBookingList, setCurrentBookingList ] = useState(bookingList);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ sortBy, setSortBy ] = useState<string>('');
    const [ direction, setDirection ] = useState<string>('');
    const [ warningModalWindow, setWarningModalWindow ] = useState<boolean>(false);
    const [bookingId, setBookingId] = useState<number | null>(null);
    const dispatch = useDispatch();

    const { currentPage = 0, totalPages } = meta;

    useEffect(() => {
        if (bookingList) {
            setCurrentBookingList(bookingList)
        }
    }, [ bookingList ]);

    const getNextBookingListPage = (page: number = 0) => {
        setLoading(true);
        const nextPage = page || currentPage + 1;
        const callback = {
            onSuccess: () => {
                setLoading(false);
            }
        };
        dispatch(getBookingList.request({ page: nextPage, direction, sortBy, callback }));
    }

    useEffect(() => {
        getNextBookingListPage(1);
    }, [ sortBy, direction ]);

    const handleColumnClick = (name: string) => {
        if (sortBy !== name) {
            setSortBy(name);
            setDirection(SORT_OPTIONS.ASC);
            return;
        }
        switch (direction) {
            case SORT_OPTIONS.ASC:
                setDirection(SORT_OPTIONS.DESC);
                return
            case SORT_OPTIONS.DESC:
                setSortBy('');
                setDirection(null as unknown as string);
                return;
            default:
                setDirection(SORT_OPTIONS.ASC);
                return;
        }
    };

    const cancelBooking = () => {
        dispatch(cancelBookingById.request({ id: bookingId }));
        const newList = currentBookingList.filter((item: IBookingList) => item.id !== bookingId);
        setCurrentBookingList(newList);
    }

    return (
        <div className={css.bookingListContainer}>
            <div className={css.headerContainer} onClick={() => handleColumnClick('name')}>
                <div className={css.numberRoomContainer}>
                    <p className={css.text}>Number</p>
                    <div className={css.sortDirection}>
                        <PalygonUpSvg color={direction === SORT_OPTIONS.ASC ? BLUE_COLOR : SILVER_COLOR} />
                        <PalygonDownSvg color={direction === SORT_OPTIONS.DESC ? BLUE_COLOR : SILVER_COLOR} />
                    </div>
                </div>

                <div>
                    <p className={css.text}>Data & Time</p>
                </div>
            </div>

            <div className={css.roomsContainer}>
                <div
                    className={css.wrapBookingList}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={() => {
                            if (!loading) {
                                getNextBookingListPage();
                            }
                        }}
                        hasMore={!currentPage || (currentPage < totalPages)}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                        useWindow={false}
                    >
                        {currentBookingList.map((booking: IBookingList, index: number) => (
                            <RoomContainerComponent
                                key={index}
                                booking={booking}
                                setWarningModalWindow={setWarningModalWindow}
                                setBookingId={setBookingId}
                            />
                        ))}
                    </InfiniteScroll>
                </div>
            </div>

            {warningModalWindow && (
                <div className={css.popup}>
                    <PopupWarningRemoveItem
                        setWarningModalWindow={setWarningModalWindow}
                        removeById={cancelBooking}
                        warningText={'Are you sure to cancel this booking?'}
                    />
                </div>
            )}
        </div>
    )
}

export { BookingListComponent };