import { combineReducers } from "redux";
import AuthReducer from '../modules/auth/store/auth.reducers';
import OfficeReducer from "../modules/dashboard/store/office-store/office.reducers";
import UsersReducer from "../modules/dashboard/store/user-store/user.reducers";
import CompanyReducer from "../modules/dashboard/store/company-store/company.reducers";
import RoomReducer from "../modules/dashboard/store/room-store/room.reducers";
import BookingReducer from "../modules/dashboard/store/booking-store/booking.reducers";

const allReducers = combineReducers({
    auth: AuthReducer,
    offices: OfficeReducer,
    users: UsersReducer,
    company: CompanyReducer,
    rooms: RoomReducer,
    booking: BookingReducer
});

export default allReducers;
