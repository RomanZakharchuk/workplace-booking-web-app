import { IOffice } from "../../../../interfaces/office.interface";
import { IBookingList } from "../../../../interfaces/bookingList.interface";

const initialState = {
    bookingList: [],
    meta: {},
};

const BookingReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case 'GET_BOOKING_LIST_SUCCESS': {
            const { items, meta } = action?.payload;

            return {
                ...state,
                bookingList: Array.from(new Set([ ...state.bookingList, ...items ])),
                meta
            };
        }
        case 'SET_BOOKING_LIST': {
            const { items, meta } = action?.payload;
            return {
                ...state,
                bookingList: items,
                meta,
            };
        }
        case 'CANCEL_BOOKING_BY_ID': {
            const id = action.payload;

            return {
                ...state,
                bookingList: state.bookingList.filter((item: IBookingList) => item.id !== id)
            }
        }

        default:
            return state;
    }
}

export default BookingReducer;