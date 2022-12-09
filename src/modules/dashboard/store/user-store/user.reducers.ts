import { IUser } from "../../../../interfaces/user.interface";

const initialState = {
    profile: {},
    user: {},
    users: [],
    meta: {},
    userById: {},
    usersFile: '',
    errorMassage: {}
};

const UsersReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case 'GET_USER_PROFILE_SUCCESS': {
            return {
                ...state,
                profile: action.payload
            }
        }
        case 'UPDATE_USER_PROFILE_SUCCESS': {
            return {
                ...state,
                profile: action.payload
            }
        }
        case 'GET_USERS_SUCCESS': {
            const { items, meta } = action?.payload;
            return {
                ...state,
                users: Array.from(new Set([ ...state.users, ...items ])),
                meta
            };
        }
        case 'SET_USERS': {
            const { items, meta } = action?.payload;
            return {
                ...state,
                users: items,
                meta,
            };
        }
        case 'INVITE_USER_SUCCESS': {
            const data = action?.payload;
            return {
                ...state,
                users: Array.from(new Set([  data, ...state.users, ]))
            }
        }
        case 'GET_USER_BY_ID_SUCCESS': {
            return {
                ...state,
                userById: action.payload
            };
        }
        case 'UPDATE_USER_SUCCESS': {
            const data = action.payload;

            return {
                ...state,
                users: state.users.map((user: IUser) => (user.id === data.id) ? data : user)
            }
        }
        case 'IMPORT_USERS': {
            return {
                ...state,
                usersFile: action.payload
            }
        }

        default:
            return state;
    }
};

export default UsersReducer;