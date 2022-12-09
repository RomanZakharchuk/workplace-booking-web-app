import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import css from '../FormAddUser/FormAddUser.module.scss';
import { MAX_FILE_SIZE } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import defaultUserIcon from '../../../assets/png/uncnown-avatar.png';
import { roleOptions, statusUserOptions } from "../../../constants/general.constants";
import { updateUser } from "../../../modules/dashboard/store/user-store/user.actions";
import { WPSelect } from "../../WPSelect/WPSelect";
import WPInput from "../../WPInput/WPInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { AppState } from "../../../store/store";
import { IUser } from "../../../interfaces/user.interface";

type InputType = {
    picture: string;
    firstName: string;
    lastName: string;
    email: string;
}

type PropsType = {
    closeWindow: () => void;
    setIsActiveUserItem: (value: number) => void;
}

const FormEditUser: FC<PropsType> = (props) => {
    const userById: IUser = useSelector((state: AppState) => state?.users.userById);
    const [ nameFile, setNameFile ] = useState<string>('');
    const [ file, setFile ] = useState();
    const [ preview, setPreview ] = useState();
    const [ errorMsg, setErrorMsg ] = useState<string>('');
    const [ disabledBtn, setDisabledBtn ] = useState<boolean>(false);
    const [ spinnerBtn, setSpinnerBtn ] = useState<boolean>(false);
    const dispatch = useDispatch();

    const { closeWindow, setIsActiveUserItem } = props;
    const { id, imageUrl, firstName, lastName, email, status, role } = userById;
    const [ selectedStatusValue, setSelectedStatusValue ] = useState<string>(status);
    const [ selectedRoleValue, setSelectedRoleValue ] = useState<string>(role);

    useEffect(() => {
        if (status) {
            setSelectedStatusValue(status);
        }
        if (role) {
            setSelectedRoleValue(role);
        }
    }, [ status, role ]);

    const formSchema = Yup.object().shape({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().required()
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<InputType>(
        {
            mode: 'onTouched',
            resolver: yupResolver(formSchema)
        }
    );

    const submit: SubmitHandler<InputType> = (data) => {
        const { email, firstName, lastName } = data;

        setDisabledBtn(true);
        setSpinnerBtn(true);
        const callback = {
            onSuccess: () => {
                setDisabledBtn(false);
                setSpinnerBtn(false);
            }
        };

        dispatch(updateUser.request({
            id,
            email,
            firstName,
            lastName,
            status: selectedStatusValue,
            role: selectedRoleValue,
            file: data.picture[0],
            callback
        }));

        closeWindow();
        setIsActiveUserItem(0);
    }

    useEffect(() => {
        if (!file) {
            setPreview(undefined);
            return;
        }

        const objectUrl: any = URL.createObjectURL(file); // I don't know how to fix
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [ file ]);

    const onSelectFile = (e: any) => { // I don't know how to fix
        const file = e.target.files;

        if (!file || file.length === 0) {
            setFile(undefined);
            return;
        }

        if (file[0].size > MAX_FILE_SIZE) {
            setErrorMsg('The file size is too large. Max size 10MB!');
            setNameFile('');
            setDisabledBtn(true);
            return;
        } else {
            setFile(file[0]);
            setNameFile(file[0].name);
            setErrorMsg('');
            setDisabledBtn(false);
        }
    };

    useEffect(() => {
        reset();
    }, [ userById, reset ]);

    return (
        <form onSubmit={handleSubmit(submit)} className={css.form}>
            <div>
                <div className={css.fileContainer}>
                    <label className={css.label}>Image</label>
                    <div className={css.wrapUpload}>
                        <label style={{ border: errorMsg === '' ? '' : '1px solid #FF7A7A' }}
                               className={css.inputUpload}
                               htmlFor="imageInput">{nameFile ? nameFile : 'Upload image'}</label>
                        <input {...register('picture')}
                               id={'imageInput'}
                               className={`${css.input} ${css.imageInput}`}
                               type="file"
                               accept={'.jpg, .jpeg, .png, .gif, .webp'}
                               onChange={onSelectFile}
                        />
                        <div className={css.wrapImgUser}>
                            {!imageUrl ? (
                                <img src={defaultUserIcon} alt={'User Photo'} />
                            ) : (
                                <img src={!preview ? imageUrl : preview} alt="User photo" />
                            )}
                        </div>
                    </div>

                    {errorMsg === '' ? null : <p className={css.errorMsg}>{errorMsg}</p>}
                </div>

                <div className={css.fullNameContainer}>
                    <div className={css.firstNaneContainer}>
                        <WPInput
                            name={'firstName'}
                            labelName={'First name'}
                        >
                            <input
                                {...register('firstName')}
                                type="text"
                                className={css.input}
                                defaultValue={firstName}
                                style={{ border: errors.firstName ? '2px solid #FF7A7A' : '' }}
                            />
                        </WPInput>
                    </div>

                    <div className={css.lastNameContainer}>
                        <WPInput
                            name={'lastName'}
                            labelName={'Last name'}
                        >
                            <input
                                {...register('lastName')}
                                type="text"
                                className={css.input}
                                defaultValue={lastName}
                                style={{ border: errors.lastName ? '2px solid #FF7A7A' : '' }}
                            />
                        </WPInput>
                    </div>
                </div>

                <div className={css.emailContainer}>
                    <WPInput
                        name={'email'}
                        labelName={'Email'}
                    >
                        <input
                            {...register('email')}
                            type="text"
                            className={css.input}
                            defaultValue={email}
                            style={{ border: errors.email ? '2px solid #FF7A7A' : '' }}
                        />
                    </WPInput>
                </div>

                <div className={css.organizationContainer}>
                    <WPSelect
                        setSelectedValue={setSelectedRoleValue}
                        selectedValue={selectedRoleValue}
                        valueOfOptions={roleOptions}
                        nameOfLabel={'Role'}
                    />
                </div>

                <div className={css.statusContainer}>
                    <WPSelect
                        setSelectedValue={setSelectedStatusValue}
                        selectedValue={selectedStatusValue}
                        valueOfOptions={statusUserOptions}
                        nameOfLabel={'Status'}
                    />
                </div>
            </div>

            <div>
                <button
                    onClick={() => {
                        closeWindow();
                        setIsActiveUserItem(0);
                    }}
                    className={css.btnCancel}
                    type={'button'}
                >Cancel
                </button>

                <button
                    className={css.btn}
                    style={{
                        background: disabledBtn || !isValid ? 'rgba(73, 138, 254, 0.25)' : '',
                        cursor: spinnerBtn ? 'progress' : ''
                    }}
                    type={'submit'}
                    disabled={disabledBtn}
                >Edit
                </button>
            </div>
        </form>
    )
}

export { FormEditUser };