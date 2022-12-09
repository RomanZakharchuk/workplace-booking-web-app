const initialState = {
    user: {}
};

const AuthReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case "LOGIN_SUCCESS": {
            return {
                ...state,
                user: action.payload
            };
        }
        case "SIGN_UP_SUCCESS": {
            return {
                ...state,
                user: action.payload
            };
        }
        case "SUBMIT_NEW_PASSWORD": {
            return {
                ...state,
                user: action.payload
            };
        }
        case "CREATE_PASSWORD": {
            return {
                ...state,
                user: action.payload
            };
        }

        default:
            return state;
    }
};

export default AuthReducer;
