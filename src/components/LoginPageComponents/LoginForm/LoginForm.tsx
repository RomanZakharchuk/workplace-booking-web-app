import { SubmitHandler, useForm } from "react-hook-form";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import css from './LoginForm.module.scss';
import { IconSend } from "../../SvgComponents/IconSend";
import { IconLock } from "../../SvgComponents/IconLock";
import { BLUE_COLOR, SILVER_COLOR } from '../../../constants';
import WPInput from "../../WPInput/WPInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { login } from "../../../modules/auth/store/auth.actions";

type InputsType = {
    email: string;
    password: string;
}

const LoginForm: FC = () => {
    const iconLock = 'icon-lock';
    const iconSend = 'icon-send';

    const [ currentInputFocused, setCurrentInputFocused ] = useState<string>(null as unknown as string);
    const [ disabledBtn, setDisabledBtn ] = useState<boolean>(false);
    const [ spinnerBtn, setSpinnerBtn ] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formSchema = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().required().min(6).max(20)
    });

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<InputsType>(
        {
            mode: 'onTouched',
            resolver: yupResolver(formSchema)
        }
    );

    const submit: SubmitHandler<InputsType> = (data) => {
        const { email, password } = data;

        setDisabledBtn(true);
        setSpinnerBtn(true);

        const callback = {
            onSuccess: () => {
                navigate('/dashboard/office');
                setDisabledBtn(false);
                setSpinnerBtn(false);
            },
            onError: () => {
                setDisabledBtn(false);
                setSpinnerBtn(false);
            }
        };

        dispatch(login.request({ email, password, callback }));

        reset();
    };

    const colorIconLock = currentInputFocused === iconLock ? BLUE_COLOR : SILVER_COLOR;
    const colorIconSend = currentInputFocused === iconSend ? BLUE_COLOR : SILVER_COLOR;

    return (
        <form onSubmit={handleSubmit(submit)} className={css.form}>
            <div className={`${css.inputWrap}`}>
                <div className={css.input__icon}>
                    <IconSend colorIconSend={colorIconSend} />
                </div>
                <WPInput
                    name={'email'}
                    labelName={''}
                >
                    <input
                        {...register('email')}
                        type="email"
                        className={css.input}
                        placeholder={'testbooking@gmaik.com'}
                        style={{ border: errors.email ? '2px solid #FF7A7A' : '' }}
                        onFocus={() => setCurrentInputFocused(iconSend)}
                        onBlur={() => setCurrentInputFocused('')}
                    />
                </WPInput>
            </div>

            <div className={css.inputWrap}>
                <div className={css.input__icon}>
                    <IconLock colorIconLock={colorIconLock} />
                </div>
                <WPInput
                    name={'password'}
                    labelName={''}
                >
                    <input
                        {...register('password')}
                        type="password"
                        className={css.input}
                        placeholder={'************'}
                        style={{ border: errors.password ? '2px solid #FF7A7A' : '' }}
                        onFocus={() => setCurrentInputFocused(iconLock)}
                        onBlur={() => setCurrentInputFocused('')}
                    />
                </WPInput>
            </div>

            <button
                style={{
                    background: disabledBtn || !isValid ? 'rgba(73, 138, 254, 0.25)' : '',
                    cursor: spinnerBtn ? 'progress' : ''
                }}
                type='submit'
                className={css.btn}
            >Sing
            </button>
        </form>
    )
}

export { LoginForm };