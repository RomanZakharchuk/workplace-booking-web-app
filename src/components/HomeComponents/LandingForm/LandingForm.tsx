import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp } from "../../../modules/auth/store/auth.actions";

import css from './LandingForm.module.scss';
import { Notice } from "../../ResetPageComponents";
import WPInput from "../../WPInput/WPInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { WPSelect } from "../../WPSelect/WPSelect";
import { numberOfEmployeesOptions } from "../../../constants/general.constants";

type IFormInput = {
    company: string;
    companySpecification: string;
    numberOfEmployees: string[];
    firstName: string;
    lastName: string;
    email: string;
}

const LandingForm: FC = () => {
    const [ noticeVisible, setNoticeVisible ] = useState<boolean>(false);
    const [ selectedValue, setSelectedValue ] = useState('');
    const [ disabledBtn, setDisabledBtn ] = useState<boolean>(false);
    const [ spinnerBtn, setSpinnerBtn ] = useState<boolean>(false);
    const dispatch = useDispatch();

    const formSchema = Yup.object().shape({
        company: Yup.string().required(),
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().required()
    });

    useEffect(() => {
        if (!selectedValue) {
            setSelectedValue('1-10');
        }
    }, [ selectedValue ]);

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<IFormInput>(
        {
            mode: 'onTouched',
            resolver: yupResolver(formSchema)
        }
    );

    const hideForm = (): void => {
        setNoticeVisible(true)
    }

    const submit: SubmitHandler<IFormInput> = (data) => {
        setDisabledBtn(true);
        setSpinnerBtn(true);
        const callback = {
            onSuccess: () => {
                setDisabledBtn(false);
                setSpinnerBtn(false);
            },
            onError: () => {
                setDisabledBtn(false);
                setSpinnerBtn(false);
            }
        };

        const { firstName, lastName, email, company, companySpecification } = data;

        dispatch(signUp.request({
            email,
            firstName,
            lastName,
            company: {
                name: company,
                specification: companySpecification,
                employeesCapacity: selectedValue
            },
            callback
        }));
        hideForm();
        reset();
    };

    return (
        <section id={'create-account'}>
            <div className={'container'}>
                <div className={css.landingForm}>
                    <div className={css.wrapText}>
                        <h2 className={css.title}>Create your free account today</h2>
                        <p className={css.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut
                            labore.</p>
                    </div>

                    <form onSubmit={handleSubmit(submit)} className={css.form} autoComplete="off">
                        <div className={css.inputContainer}>
                            <WPInput
                                name={'company'}
                                labelName={''}
                            >
                                <input
                                    {...register('company')}
                                    type="text"
                                    className={css.input}
                                    placeholder={'Company / Registration Name *'}
                                    style={{ border: errors.company ? '2px solid #FF7A7A' : '' }}
                                />
                            </WPInput>
                        </div>

                        <div className={css.inputContainer}>
                            <WPInput
                                name={'companySpecification'}
                                labelName={''}
                            >
                                <input
                                    {...register('companySpecification')}
                                    type="text"
                                    className={css.input}
                                    placeholder={'Company specification'}
                                />
                            </WPInput>
                        </div>

                        <div className={css.selectContainer}>
                            <WPSelect
                                setSelectedValue={setSelectedValue}
                                selectedValue={selectedValue}
                                nameOfLabel={''}
                                valueOfOptions={numberOfEmployeesOptions}
                            />
                        </div>

                        <p className={css.form__text}>Personal info</p>

                        <div className={css.inputNamesContainer}>
                            <div className={css.inputNameContainer}>
                                <WPInput
                                    name={'firstName'}
                                    labelName={''}
                                >
                                    <input
                                        {...register('firstName')}
                                        type="text"
                                        className={css.input}
                                        placeholder={'First Name *'}
                                        style={{ border: errors.firstName ? '2px solid #FF7A7A' : '' }}
                                    />
                                </WPInput>
                            </div>

                            <div className={css.inputNameContainer}>
                                <WPInput
                                    name={'lastName'}
                                    labelName={''}
                                >
                                    <input
                                        {...register('lastName')}
                                        type="text"
                                        className={css.input}
                                        placeholder={'Last Name *'}
                                        style={{ border: errors.lastName ? '2px solid #FF7A7A' : '' }}
                                    />
                                </WPInput>
                            </div>
                        </div>

                        <div className={css.inputContainer}>
                            <WPInput
                                name={'email'}
                                labelName={''}
                            >
                                <input
                                    {...register('email')}
                                    type="email"
                                    className={css.input}
                                    placeholder={'testbooking@gmail.com *'}
                                    style={{ border: errors.lastName ? '2px solid #FF7A7A' : '' }}
                                />
                            </WPInput>
                        </div>

                        {noticeVisible && (
                            <Notice
                                title={'Thank you for the registration. Please check your email in order to login into your Working Booking Dashboard.'} />
                        )}

                        <button
                            style={{
                                background: disabledBtn || !isValid ? 'rgba(73, 138, 254, 0.25)' : '',
                                cursor: spinnerBtn ? 'progress' : ''
                            }}
                            className={css.btn}
                            type={'submit'}
                        >Crete Account
                        </button>

                    </form>

                    <span className={css.line}></span>

                </div>
            </div>
        </section>
    )
}

export { LandingForm };