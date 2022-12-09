import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import css from "../AddOfficeFormComponent/AddOfficeFormComponent.module.scss";
import { updateOffice } from "../../../modules/dashboard/store/office-store/office.actions";
import { GOOGLE_API_KEY } from "../OfficeLocationMap/map.constants";
import GooglePlacesAutocomplete, { geocodeByAddress } from "react-google-places-autocomplete";
import { closesAtOptions, openAtOptions } from "../../../constants/general.constants";
import { ComponentDayOfWeekForm } from "../../ComponentDayOfWeekForm/ComponentDayOfWeekForm";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import WPInput from "../../WPInput/WPInput";
import { WPSelect } from "../../WPSelect/WPSelect";
import { IOffice } from "../../../interfaces/office.interface";
import { AppState } from "../../../store/store";

type PropsType = {
    closeForm: () => void;
    setIsActiveOffice: (value: number | null) => void;
}

interface IFormInput {
    name: string;
    address: {
        address: string;
        longitude: number;
        latitude: number;
    };
}

let initialDays = [
    { name: 'Sun', isSelected: false },
    { name: 'Mon', isSelected: false },
    { name: 'Tue', isSelected: false },
    { name: 'Wed', isSelected: false },
    { name: 'Thu', isSelected: false },
    { name: 'Fri', isSelected: false },
    { name: 'Sat', isSelected: false },
]

const EditOfficeFormComponent: FC<PropsType> = (props) => {
    const officeById: IOffice = useSelector((state: AppState) => state?.offices.officeById);
    const [ currentOfficeById, setCurrentOfficeById ] = useState<IOffice>(officeById);
    const [ days, setDays ] = useState(initialDays);
    const [ addressMap, setAddressMap ] = useState('');
    const dispatch = useDispatch();

    const { closeForm, setIsActiveOffice, } = props;

    const { id, name, opensAt, closesAt, workingDays } = currentOfficeById;
    const [ selectedOpensAtValue, setSelectedOpensAtValue ] = useState<string>(opensAt);
    const [ selectedClosesAtValue, setSelectedClosesAtValue ] = useState<string>(closesAt);

    useEffect(() => {
        if (officeById) {
            setCurrentOfficeById(officeById);
        }
    }, [ officeById ]);

    useEffect(() => {
        if (opensAt) {
            setSelectedOpensAtValue(opensAt);
        }

        if (closesAt) {
            setSelectedClosesAtValue(closesAt);
        }

    }, [ opensAt, closesAt ]);

    const formSchema = Yup.object().shape({
        name: Yup.string().required()
    });

    const { register, handleSubmit, reset, setValue, formState: { errors, isValid } } = useForm<IFormInput>(
        {
            mode: 'onTouched',
            resolver: yupResolver(formSchema)
        }
    );

    useEffect(() => {
        initialDays = initialDays.map(day => {
            if (workingDays?.includes(day.name.toUpperCase())) {
                day.isSelected = true;
                return day;
            } else {
                day.isSelected = false;
                return day;
            }
        });

    }, [ workingDays ]);

    const submit: SubmitHandler<IFormInput> = (data) => {
        const { name, address } = data;

        const workingDays = days
            .filter(day => day.isSelected)
            .map(day => day.name.toUpperCase());

        dispatch(updateOffice.request({
            name,
            address,
            opensAt: selectedOpensAtValue,
            closesAt: selectedClosesAtValue,
            id,
            workingDays
        }));

        closeForm();
        setIsActiveOffice(null);
    };

    useEffect(() => {
        reset();
    }, [ officeById ]);

    return (
        <form onSubmit={handleSubmit(submit)} className={css.Form}>
            <div className={css.wrapperForm}>
                <div className={css.wrapNumber}>
                    <WPInput
                        name={'name'}
                        labelName={'Name *'}
                    >
                        <input
                            {...register('name')}
                            type="text"
                            className={css.input}
                            defaultValue={name}
                            style={{ border: errors.name ? '2px solid #FF7A7A' : '' }}
                        />
                    </WPInput>
                </div>

                <div className={css.wrapAddress}>
                    <label className={css.label} htmlFor="officeAddress">Address *</label>
                    <GooglePlacesAutocomplete
                        apiKey={GOOGLE_API_KEY}
                        selectProps={{
                            value: addressMap,
                            onChange: (a) => {
                                setAddressMap(a);
                                geocodeByAddress(a.label).then(res => {
                                    const { geometry = null } = res?.length ? res[0] : {};
                                    const lat = geometry?.location?.lat();
                                    const lng = geometry?.location?.lng();
                                    const fetchedAddress = {
                                        address: a.label,
                                        longitude: lng || 0,
                                        latitude: lat || 0
                                    };
                                    setValue('address', fetchedAddress);
                                });
                            },
                            classNamePrefix: 'custom-select-map',
                        }}
                    />
                </div>

                <div className={css.wrapStatus}>
                    <label className={css.labelStatus}>Working days*</label>
                    <div className={css.daysOfWeekContainer}>
                        {days.map((day, index) => (
                            <ComponentDayOfWeekForm
                                key={day.name}
                                isSelected={day.isSelected}
                                setIsSelected={() => {
                                    const daysCopy = days.slice();
                                    daysCopy[index].isSelected = !day.isSelected;
                                    setDays(daysCopy);
                                }}
                                day={day.name}
                                register={register}
                            />
                        ))}
                    </div>
                </div>

                <label className={css.labelWorkingTime}>Working hours *</label>
                <div className={css.wrapWorkingTime}>
                    <div className={css.wrapInputOpenFrom}>
                        <WPSelect
                            setSelectedValue={setSelectedOpensAtValue}
                            selectedValue={selectedOpensAtValue}
                            valueOfOptions={openAtOptions}
                        />
                    </div>

                    <div className={css.wrapInputCloseTo}>
                        <WPSelect
                            setSelectedValue={setSelectedClosesAtValue}
                            selectedValue={selectedClosesAtValue}
                            valueOfOptions={closesAtOptions}
                        />
                    </div>
                </div>
            </div>

            <div className={css.wrapBtn}>
                <button
                    onClick={() => {
                        closeForm();
                        reset();
                        setIsActiveOffice(null);
                    }}
                    className={css.btnCancel}
                    type={'button'}>Cancel
                </button>
                <button
                    style={{ background: !isValid ? 'rgba(73, 138, 254, 0.25)' : '' }}
                    className={css.btnAdd}
                    type={'submit'}
                >Update
                </button>
            </div>
        </form>
    )
}

export { EditOfficeFormComponent };