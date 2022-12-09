import { IRoom } from "../../../../interfaces/room.interface";

const initialState = {
    rooms: [],
    meta: {},
    room: {}
};

const RoomReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case 'GET_ALL_ROOMS_BY_OFFICE_ID_SUCCESS': {
            const { items, meta } = action?.payload;

            return {
                ...state,
                rooms: Array.from(new Set([ ...state.rooms, ...items ])),
                meta
            }
        }
        case 'SET_ROOMS': {
            const { items, meta } = action?.payload;

            return {
                ...state,
                rooms: items,
                meta,
            };
        }
        case 'CREATE_ROOM_SUCCESS': {
            const data = action?.payload;

            return {
                ...state,
                rooms: Array.from(new Set([ data, ...state.rooms ]))
            }
        }
        case 'GET_ROOM_BY_ID_SUCCESS': {
            return {
                ...state,
                room: action.payload
            }
        }
        case 'UPDATE_ROOM_BY_ID_SUCCESS': {
            const data = action?.payload;

            return {
                ...state,
                rooms: state.rooms.map((room: IRoom) => (room.id === data.id) ? data : room)
            }
        }
        case 'REMOVE_ROOM_BY_ID': {
            const id = action.payload;

            return {
                ...state,
                rooms: state.rooms.filter((item: IRoom) => item.id !== id)
            }
        }

        default:
            return state;
    }
};

export default RoomReducer;