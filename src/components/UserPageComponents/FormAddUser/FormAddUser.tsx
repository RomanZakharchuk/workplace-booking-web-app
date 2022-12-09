import { ChangeEvent, FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import css from './FormAddUser.module.scss';
import '../../../scss/AddRoomFormReactSelect.scss';
import imagePreview from '../../../assets/png/uncnown-avatar.png';
import { MAX_FILE_SIZE } from "../../../constants";
import { useDispatch } from "react-redux";
import { roleOptions, statusUserOptions } from "../../../constants/general.constants";
import { inviteUser } from "../../../modules/dashboard/store/user-store/user.actions";
import { WPSelect } from "../../WPSelect/WPSelect";
import WPInput from "../../WPInput/WPInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { IDefaultInviteUserFormFields } from "../../../pages/UserPage/UserPage";

type InputType = {
    picture: string;
    firstName: string;
    lastName: string;
    email: string;
}

type PropsType = {
    closeWindow: () => void;
    setPreviewIconUser: (value: undefined) => void;
    previewIconUser: undefined;
    setInviteUserFormFields: (value: IDefaultInviteUserFormFields) => void;
    inviteUserFormFields: IDefaultInviteUserFormFields;
}

const FormAddUser: FC<PropsType> = (props) => {
    const [ nameFile, setNameFile ] = useState('');
    const [ file, setFile ] = useState();
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ disabledBtn, setDisabledBtn ] = useState<boolean>(false);

    const dispatch = useDispatch();

    const [ selectedStatusValue, setSelectedStatusValue ] = useState<string>('');
    const [ selectedRoleValue, setSelectedRoleValue ] = useState<string>('');

    useEffect(() => {
        if (!selectedStatusValue) {
            setSelectedStatusValue('USER');
        }
        if (!selectedRoleValue) {
            setSelectedRoleValue('ACTIVE');
        }
    }, [ selectedStatusValue, selectedRoleValue ]);

    const handleChangeInviteUser = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setInviteUserFormFields({ ...inviteUserFormFields, [name]: value });
    };

    useEffect(() => {
        setInviteUserFormFields({...inviteUserFormFields, 'status': selectedStatusValue});
    }, [selectedStatusValue]);

    useEffect(() => {
        setInviteUserFormFields({...inviteUserFormFields, 'role': selectedRoleValue});
    }, [selectedRoleValue]);

    const {
        closeWindow,
        setPreviewIconUser,
        previewIconUser,
        setInviteUserFormFields,
        inviteUserFormFields
    } = props;

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

        dispatch(inviteUser.request({
            email,
            firstName,
            lastName,
            status: selectedStatusValue,
            role: selectedRoleValue,
            file: data.picture[0],
        }));

        reset();
        closeWindow();
    };

    useEffect(() => {
        if (!file) {
            setPreviewIconUser(undefined);
            return;
        }

        const objectUrl: any = URL.createObjectURL(file); // I don't know how to fix
        setPreviewIconUser(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [ file, setPreviewIconUser ]);

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

    return (
        <form onSubmit={handleSubmit(submit)} className={css.form} autoComplete={'off'}>
            <div>
                <div className={css.fileContainer}>
                    <label className={css.label}>Image *</label>
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
                            <img src={!previewIconUser ? imagePreview : previewIconUser} alt="User photo" />
                        </div>
                    </div>

                    {errorMsg === '' ? null : <p className={css.errorMsg}>{errorMsg}</p>}
                </div>

                <div className={css.fullNameContainer}>
                    <div className={css.firstNaneContainer}>
                        <WPInput
                            name={'firstName'}
                            labelName={'First name *'}
                        >
                            <input
                                {...register('firstName')}
                                type="text"
                                className={css.input}
                                placeholder={'Yurii'}
                                style={{ border: errors.firstName ? '2px solid #FF7A7A' : '' }}
                                onChange={handleChangeInviteUser}
                            />
                        </WPInput>
                    </div>

                    <div className={css.lastNameContainer}>
                        <WPInput
                            name={'lastName'}
                            labelName={'Last name *'}
                        >
                            <input
                                {...register('lastName')}
                                type="text"
                                className={css.input}
                                placeholder={'Fedotov'}
                                style={{ border: errors.lastName ? '2px solid #FF7A7A' : '' }}
                                onChange={handleChangeInviteUser}
                            />
                        </WPInput>
                    </div>
                </div>

                <div className={css.emailContainer}>
                    <WPInput
                        name={'email'}
                        labelName={'Email *'}
                    >
                        <input
                            {...register('email')}
                            type="email"
                            className={css.input}
                            placeholder={'Testbooking@gmaik.com'}
                            style={{ border: errors.email ? '2px solid #FF7A7A' : '' }}
                            onChange={handleChangeInviteUser}
                        />
                    </WPInput>
                </div>

                <div className={css.organizationContainer}>
                    <WPSelect
                        setSelectedValue={setSelectedRoleValue}
                        selectedValue={selectedRoleValue}
                        valueOfOptions={roleOptions}
                        nameOfLabel={'Role *'}
                    />
                </div>

                <div className={css.statusContainer}>
                    <WPSelect
                        setSelectedValue={setSelectedStatusValue}
                        selectedValue={selectedStatusValue}
                        valueOfOptions={statusUserOptions}
                        nameOfLabel={'Status *'}
                    />
                </div>
            </div>


            <div>
                <button
                    onClick={() => {
                        closeWindow();
                        reset();
                    }}
                    className={css.btnCancel}
                    type={'button'}
                >Cancel
                </button>

                <button
                    className={css.btn}
                    style={{ background: !isValid ? 'rgba(73, 138, 254, 0.25)' : '' }}
                    type={'submit'}
                    disabled={disabledBtn}
                >Add
                </button>
            </div>
        </form>
    )
}

export { FormAddUser };