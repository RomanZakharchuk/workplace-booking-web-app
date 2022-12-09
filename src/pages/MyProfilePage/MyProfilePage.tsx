import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"

import css from './MyProfilePage.module.scss';
import './MyProfilePage.scss';
import arrowRight from '../../assets/svg/chevrons-right.svg';
import { updateUserProfile } from "../../modules/dashboard/store/user-store/user.actions";
import { IconLock } from "../../components/SvgComponents/IconLock";
import { MAX_FILE_SIZE } from "../../constants";
import defaultUserIcon from '../../assets/png/uncnown-avatar.png';
import { submitToMail } from "../../modules/auth/store/auth.actions";
import { IconSend } from "../../components/SvgComponents/IconSend";

type InputType = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    repeatPassword: string;
    organization: string;
    picture: any;
    isNotEmptyPassword: boolean;
}

const MyProfilePage: FC = () => {
    const dispatch = useDispatch();
    const [ selectedFile, setSelectedFile ] = useState();
    const [ preview, setPreview ] = useState();
    const [ nameFile, setNameFile ] = useState('');
    const profile = useSelector((store: any) => store?.users?.profile);
    const [ currentProfile, setCurrentProfile ] = useState(profile);
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ disabledBtn, setDisabledBtn ] = useState<boolean>(false);
    const [ spinnerBtn, setSpinnerBtn ] = useState<boolean>(false);
    const [ hoverRequestPassword, setHoverRequestPassword ] = useState<boolean>(false)

    const { firstName, lastName, email, imageUrl } = currentProfile;

    const formSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required!').min(0),
        lastName: Yup.string().required('Last name is required!').min(0)
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm<InputType>({
        mode: 'onTouched',
        resolver: yupResolver(formSchema)
    });

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl: any = URL.createObjectURL(selectedFile);
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl);
    }, [ selectedFile ]);

    const onSelectFile = (e: any) => {
        const file = e.target.files;

        if (!file || file.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        if (file[0].size > MAX_FILE_SIZE) {
            setErrorMsg('The file size is too large. Max size 10MB!');
            setNameFile('');
            setDisabledBtn(true);
            return;
        } else {
            setSelectedFile(file[0]);
            setNameFile(file[0].name);
            setErrorMsg('');
            setDisabledBtn(false);
            return;
        }
    }

    const submit: SubmitHandler<InputType> = (data) => {
        setDisabledBtn(true);
        setSpinnerBtn(true);
        const callback = {
            onSuccess: () => {
                setDisabledBtn(false);
                setSpinnerBtn(false);
            }
        };

        dispatch(updateUserProfile.request({
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.repeatPassword,
            file: data.picture[0],
            callback
        }));
    };

    useEffect(() => {
        if (profile) {
            setCurrentProfile(profile)
        }
    }, [ profile ]);


    useEffect(() => {
        reset();
    }, [ currentProfile ]);

    const requestPassword = () => {
        dispatch(submitToMail.request({ email }));
        alert('A link to change your password was sent to your email!');
    };

    return (
        <div>
            <h3 className={css.title}>Profile setting</h3>
            <div className={css.wrapPath}>
                <p className={css.pathTitle}>Profile setting</p>
                <img src={arrowRight} alt="arrow right" />
            </div>

            <div className={css.line} />

            <form onSubmit={handleSubmit(submit)} className={css.form}>
                <div>
                    <div className={css.wrapFile}>
                        <label className={css.label}>Image</label>
                        <div className={css.wrapUpload}>
                            <label style={{ border: !errorMsg ? '' : '2px solid #FF7A7A' }}
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
                                    <img src={defaultUserIcon} alt="User Photo" />
                                ) : (
                                    <img src={!preview ? imageUrl : preview} alt="User photo" />
                                )}

                            </div>
                        </div>

                        {!errorMsg ? null : <p className={css.errorText}>{errorMsg}</p>}
                    </div>

                    <div className={css.wrapNames}>
                        <div className={css.wrapName}>
                            <label className={css.label} htmlFor="firstNameInput">First name</label>
                            <input {...register('firstName', { required: true })}
                                   className={css.input}
                                   style={{ border: errors.firstName ? '2px solid #FF7A7A' : '' }}
                                   defaultValue={firstName}
                                   placeholder={'Johnny'}
                                   autoComplete='disabled'
                                   id='firstNameInput'
                                   type="text" />
                            {errors.firstName && <p className={css.errorText}>{errors.firstName.message}</p>}
                        </div>

                        <div className={css.wrapName}>
                            <label className={css.label} htmlFor="lastNameInput">Last name</label>
                            <input {...register('lastName', { required: true })}
                                   className={css.input}
                                   style={{ border: errors.lastName ? '2px solid #FF7A7A' : '' }}
                                   defaultValue={lastName}
                                   placeholder={'Depp'}
                                   autoComplete='disabled'
                                   id='lastNameInput'
                                   type="text"
                            />
                            {errors.lastName && <p className={css.errorText}>{errors.lastName.message}</p>}
                        </div>
                    </div>

                    <div className={css.wrapEmail}>
                        <label className={css.label} htmlFor="emailInput">Email</label>
                        <input {...register('email', { required: true, disabled: true })}
                               className={`${css.input} ${css.emailInput}`}
                               type="email"
                               defaultValue={email}
                               placeholder={'testbooking@gmaik.com'} />
                        <IconLock colorIconLock={'#BBBBBB'} />
                    </div>
                </div>

                <div className={css.btnGroup}>
                    <button
                        className={css.btn}
                        style={{
                            background: disabledBtn || !isValid ? 'rgba(73, 138, 254, 0.25)' : '',
                            cursor: spinnerBtn ? 'progress' : ''
                        }}
                        type={'submit'}
                        disabled={disabledBtn}
                    >Save
                    </button>

                    <div
                        onClick={requestPassword}
                        className={css.requestPasswordContainer}
                        onMouseEnter={() => setHoverRequestPassword(true)}
                        onMouseLeave={() => setHoverRequestPassword(false)}
                    >
                        <div className={css.sendIconContainer}>
                            <IconSend colorIconSend={hoverRequestPassword ? '#9FC0FA' : '#C7D9FA'} />
                        </div>
                        <span
                            style={{color: hoverRequestPassword ? '#9FC0FA' : '#C7D9FA'}}
                            className={css.requestPasswordText}
                        >Request password</span>
                    </div>
                </div>

            </form>
        </div>
    )
}

export { MyProfilePage };