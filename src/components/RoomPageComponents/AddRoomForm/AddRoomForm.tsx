import { ChangeEvent, FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import css from './AddRoomForm.module.scss';
import './AddRoomFormReactSelect.scss';
import { statusOptions } from "../../../constants/general.constants";
import WPInput from "../../WPInput/WPInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { WPSelect } from "../../WPSelect/WPSelect";
import { useDispatch } from "react-redux";
import { createRoom } from "../../../modules/dashboard/store/room-store/room.actions";
import { IInitialRoomFormFields } from "../../../pages/RoomPage/RoomPage";

type PropsType = {
    closeForm: () => void;
    setRoomFormFields: (value: IInitialRoomFormFields) => void;
    initialRoomFormFields: IInitialRoomFormFields;
}

type InputType = {
    name: string;
}

const AddRoomForm: FC<PropsType> = ({ closeForm, setRoomFormFields, initialRoomFormFields }) => {
    const [ selectedStatusValue, setSelectedStatusValue ] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selectedStatusValue) {
            setSelectedStatusValue('OPENED');
        }
    }, [ selectedStatusValue ]);

    const handleChangeRoom = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setRoomFormFields({ ...initialRoomFormFields, [name]: value });
    }

    const formSchema = Yup.object().shape({
        name: Yup.string().required()
    });

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<InputType>(
        {
            mode: 'onTouched',
            resolver: yupResolver(formSchema)
        }
    );

    const submit: SubmitHandler<InputType> = (data) => {
        const officeId = sessionStorage.getItem('officeId');

        dispatch(createRoom.request({
            name: data.name,
            officeId,
            status: selectedStatusValue,
            description: {}, // Temporarily. Description is empty.
        }));

        closeForm();
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className={css.formContainer}
        >
            <div>
                <div className={css.nameContainer}>
                    <WPInput
                        name={'name'}
                        labelName={'Name *'}
                    >
                        <input
                            {...register('name')}
                            type="text"
                            className={css.input}
                            placeholder={'Room #0'}
                            style={{ border: errors.name ? '2px solid #FF7A7A' : '' }}
                            onChange={handleChangeRoom}
                        />
                    </WPInput>
                </div>

                <div className={css.statusContainer}>
                    <WPSelect
                        setSelectedValue={setSelectedStatusValue}
                        selectedValue={selectedStatusValue}
                        nameOfLabel={'Status *'}
                        valueOfOptions={statusOptions}
                    />
                </div>
            </div>

            <div className={css.wrapBtn}>
                <button
                    onClick={closeForm}
                    className={css.btnCancel}
                    type={'button'}>Cancel
                </button>
                <button
                    style={{ background: !isValid ? 'rgba(73, 138, 254, 0.25)' : '' }}
                    className={css.btnAdd}
                    type={'submit'}
                >Add
                </button>
            </div>
        </form>
    )
}

export { AddRoomForm };