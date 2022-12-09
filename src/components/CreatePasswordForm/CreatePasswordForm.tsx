import { SubmitHandler, useForm } from "react-hook-form";
import { FC, useState } from "react";

import css from "../ResetPageComponents/ResetPasswordForm/ResetPasswordForm.module.scss";
import { IconLockReset } from "../SvgComponents/IconLockResset";
import { BLUE_COLOR, SILVER_COLOR } from "../../constants";
import { useDispatch } from "react-redux";
import { createPassword } from "../../modules/auth/store/auth.actions";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import WPInput from "../WPInput/WPInput";

type InputType = {
    password: string;
    repeatPassword: string;
}

type PropsType = {
    hideForm: () => void;
    token: string | any;
}

const CreatePasswordForm: FC<PropsType> = ({ hideForm, token }) => {
    const iconPassword = 'icon-password';
    const iconRepeatPassword = 'icon-repeat-password';

    const [ passwordInput, setPasswordInput ] = useState<string>(null as unknown as string);
    const [ repeatPasswordInput, setRepeatPasswordInput ] = useState<string>(null as unknown as string);
    const [ disabledBtn, setDisabledBtn ] = useState<boolean>(false);
    const [ spinnerBtn, setSpinnerBtn ] = useState<boolean>(false);
    const dispatch = useDispatch();

    const formSchema = Yup.object().shape({
        password: Yup.string().required().min(6).max(20),
        repeatPassword: Yup.string().required().min(6).max(20)
            .oneOf([ Yup.ref('password'), null ], 'Passwords must match')
    });

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<InputType>(
        {
            mode: 'onTouched',
            resolver: yupResolver(formSchema)
        }
    );

    const colorIconLockPassword = passwordInput === iconPassword ? BLUE_COLOR : SILVER_COLOR;
    const colorIconLockRepeatPassword = repeatPasswordInput === iconRepeatPassword ? BLUE_COLOR : SILVER_COLOR;

    const submit: SubmitHandler<InputType> = (data) => {
        const { repeatPassword } = data;

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

        dispatch(createPassword.request({ password: repeatPassword, token, callback }));
        hideForm();
        reset();
    };

    return (
        <form
            className={css.form}
            onSubmit={handleSubmit(submit)}
        >
            <div className={css.wrapInput}>
                <div className={css.wrapInput__icon}>
                    <IconLockReset currentInputFocused={colorIconLockPassword} />
                </div>
                <WPInput
                    name={'password'}
                    labelName={''}
                >
                    <input
                        {...register('password')}
                        type="password"
                        className={css.input}
                        style={{ border: errors.password ? '2px solid #FF7A7A' : '' }}
                        placeholder={'Enter a new password'}
                        onFocus={() => setPasswordInput(iconPassword)}
                        onBlur={() => setPasswordInput('')}
                    />
                </WPInput>
            </div>

            <div className={css.wrapInput}>
                <div className={css.wrapInput__icon}>
                    <IconLockReset currentInputFocused={colorIconLockRepeatPassword} />
                </div>
                <WPInput
                    name={'repeatPassword'}
                    labelName={''}
                >
                    <input
                        {...register('repeatPassword')}
                        type="password"
                        className={css.input}
                        style={{ border: errors.repeatPassword ? '2px solid #FF7A7A' : '' }}
                        placeholder={'Confirm password'}
                        onFocus={() => setRepeatPasswordInput(iconRepeatPassword)}
                        onBlur={() => setRepeatPasswordInput('')}
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
            >Send
            </button>
        </form>
    )
}

export { CreatePasswordForm };