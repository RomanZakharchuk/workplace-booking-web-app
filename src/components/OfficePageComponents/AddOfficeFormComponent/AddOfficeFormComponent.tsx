import { ChangeEvent, FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import GooglePlacesAutocomplete, { geocodeByAddress } from "react-google-places-autocomplete";

import css from './AddOfficeFormComponent.module.scss';
import { GOOGLE_API_KEY } from "../OfficeLocationMap/map.constants";
import { closesAtOptions, openAtOptions } from "../../../constants/general.constants";
import { ComponentDayOfWeekForm } from "../../ComponentDayOfWeekForm/ComponentDayOfWeekForm";
import { WPSelect } from "../../WPSelect/WPSelect";
import WPInput from "../../WPInput/WPInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { createOffice } from "../../../modules/dashboard/store/office-store/office.actions";
import { IDefaultOfficeFormFields } from "../../../pages/OfficePage/OfficePage";

type PropsType = {
    closeForm: () => void;
    setOfficeFormFields: (value: IDefaultOfficeFormFields) => void;
    officeFormFields: IDefaultOfficeFormFields;
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
    { name: 'Mon', isSelected: true },
    { name: 'Tue', isSelected: true },
    { name: 'Wed', isSelected: true },
    { name: 'Thu', isSelected: true },
    { name: 'Fri', isSelected: true },
    { name: 'Sat', isSelected: false },
]

const AddOfficeFormComponent: FC<PropsType> = (props) => {
    const [ days, setDays ] = useState(initialDays);
    const [ address, setAddress ] = useState('');
    const [ selectedOpensAtValue, setSelectedOpensAtValue ] = useState('');
    const [ selectedClosesAtValue, setSelectedClosesAtValue ] = useState('');
    const dispatch = useDispatch();

    const {
        closeForm,
        setOfficeFormFields,
        officeFormFields
    } = props;

    const handleChangeOffice = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setOfficeFormFields({ ...officeFormFields, [name]: value });
    };

    const handleChangeMap = (event: any) => { // I don't know how to fix
        const value = event.label;

        setOfficeFormFields({ ...officeFormFields, 'address': value });
    };

    useEffect(() => {
        if (!selectedClosesAtValue) {
            setSelectedClosesAtValue('9:00 am');
        }

        if (!selectedOpensAtValue) {
            setSelectedOpensAtValue('9:00 am');
        }

    }, [ selectedOpensAtValue, selectedClosesAtValue ]);

    useEffect(() => {
        setOfficeFormFields({ ...officeFormFields, 'closesAt': selectedClosesAtValue });
    }, [ selectedClosesAtValue ])

    useEffect(() => {
        setOfficeFormFields({ ...officeFormFields, 'opensAt': selectedOpensAtValue });
    }, [ selectedOpensAtValue ])

    const formSchema = Yup.object().shape({
        name: Yup.string().required()
    });

    const { setValue, register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IFormInput>(
        {
            mode: 'onTouched',
            resolver: yupResolver(formSchema)
        }
    );

    const submit: SubmitHandler<IFormInput> = (data) => {
        const { address, name } = data;

        const workingDays = days
            .filter(day => day.isSelected)
            .map(day => day.name.toUpperCase());

        dispatch(createOffice.request({
            closesAt: selectedClosesAtValue.toUpperCase(),
            opensAt: selectedOpensAtValue.toUpperCase(),
            address,
            name,
            workingDays
        }));

        reset();
        closeForm();
    };

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
                            placeholder={'Office №1'}
                            style={{ border: errors.name ? '2px solid #FF7A7A' : '' }}
                            onChange={handleChangeOffice}
                        />
                    </WPInput>
                </div>

                <div className={css.wrapAddress}>
                    <label className={css.label} htmlFor="address">Address *</label>
                    <GooglePlacesAutocomplete
                        apiKey={GOOGLE_API_KEY}
                        selectProps={{
                            value: address,
                            onChange: (a) => {
                                setAddress(a);
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
                                handleChangeMap(a);
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
                    }}
                    className={css.btnCancel}
                    type={'button'}>Cancel
                </button>
                <button
                    style={{ background: !isValid ? 'rgba(73, 138, 254, 0.25)' : '' }}
                    className={css.btnAdd}
                    type={'submit'}>Add
                </button>
            </div>
        </form>
    )
}

export { AddOfficeFormComponent };