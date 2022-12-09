import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import css from './EditRoomForm.module.scss';
import WPInput from "../../WPInput/WPInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import { IRoom } from "../../../interfaces/room.interface";
import { updateRoomById } from "../../../modules/dashboard/store/room-store/room.actions";
import { IOffice } from "../../../interfaces/office.interface";

type PropsType = {
    closeForm: () => void;
    setIsActiveRoom: (value: number | null) => void;
}

type InputType = {
    name: string;
}

const EditRoomForm: FC<PropsType> = ({ closeForm, setIsActiveRoom }) => {
    const roomById: IRoom = useSelector((state: AppState) => state?.rooms.room);
    const [ currentRoomById, setCurrentRoomById ] = useState<IRoom>(roomById);
    const dispatch = useDispatch();

    const { id, name } = currentRoomById;

    useEffect(() => {
        if (roomById) {
            setCurrentRoomById(roomById);
        }
    }, [ roomById ]);

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
        const { name } = data;

        dispatch(updateRoomById.request({ id, name, description: {} }));

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
                        labelName={'Name'}
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

            </div>

            <div className={css.wrapBtn}>
                <button
                    onClick={() => {
                        closeForm();
                        setIsActiveRoom(null);
                    }}
                    className={css.btnCancel}
                    type={'button'}>Cancel
                </button>
                <button
                    style={{ background: !isValid ? 'rgba(73, 138, 254, 0.25)' : '' }}
                    className={css.btnAdd}
                    type={'submit'}
                >Edit
                </button>
            </div>
        </form>
    )
}

export { EditRoomForm };