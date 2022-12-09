const initialState = {
    company: {},
    socialMedia: {}
};

const CompanyReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case 'GET_COMPANY_SUCCESS': {
            return {
                ...state,
                company: action.payload
            }
        }
        case 'UPDATE_COMPANY_SUCCESS': {
            return {
                ...state,
                company: action.payload
            }
        }
        case 'GET_COMPANY_SOCIAL_MEDIA_SUCCESS': {
            return {
                ...state,
                socialMedia: action.payload
            }
        }
        case 'UPDATE_COMPANY_SOCIAL_MEDIA_SUCCESS': {
            return {
                ...state,
                socialMedia: action.payload
            }
        }

        default:
            return state;
    }
};

export default CompanyReducer;