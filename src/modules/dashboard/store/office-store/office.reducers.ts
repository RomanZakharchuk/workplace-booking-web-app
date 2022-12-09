import { IOffice } from "../../../../interfaces/office.interface";

const initialState = {
    offices: [],
    activeOffice: null,
    meta: {},
    officeById: {}
};

const OfficeReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case 'GET_OFFICES_SUCCESS': {
            const { items, meta } = action?.payload;
            return {
                ...state,
                offices: Array.from(new Set([ ...state.offices, ...items ])),
                meta,
            };
        }
        case 'SET_OFFICES': {
            const { items, meta } = action?.payload;
            return {
                ...state,
                offices: items,
                meta,
            };
        }
        case 'SET_ACTIVE_OFFICE': {
            const { office } = action?.payload;
            return {
                ...state,
                activeOffice: office,
            };
        }
        case 'CREATE_OFFICE_SUCCESS': {
            const data = action?.payload;

            return {
                ...state,
                offices: Array.from(new Set([ data, ...state.offices ]))
            }
        }
        case 'UPDATE_OFFICE_SUCCESS': {
            const data = action?.payload;

            return {
                ...state,
                offices: state.offices.map((office: IOffice) => (office.id === data.id) ? data : office)
            }
        }
        case 'REMOVE_ITEM_OFFICES': {
            const id = action.payload;

            return {
                ...state,
                offices: state.offices.filter((item: IOffice) => item.id !== id)
            }
        }
        case 'GET_OFFICE_BY_ID_SUCCESS': {
            return {
                ...state,
                officeById: action.payload
            }
        }

        default:
            return state;
    }
};

export default OfficeReducer;