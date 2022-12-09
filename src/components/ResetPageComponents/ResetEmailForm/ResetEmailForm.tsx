import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import css from "./ResetEmailForm.module.scss";
import { IconSend } from "../../SvgComponents/IconSend";
import { BLUE_COLOR, SILVER_COLOR } from '../../../constants';
import { submitToMail } from "../../../modules/auth/store/auth.actions";
import WPInput from "../../WPInput/WPInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";

type InputType = {
    email: string;
}

type PropsType = {
    hideForm: () => void;
}

const ResetEmailForm: FC<PropsType> = ({ hideForm }) => {
    const iconSend = 'icon-send';

    const [ currentInputFocused, setCurrentInputFocused ] = useState<string>(null as unknown as string);
    const [ disabledBtn, setDisabledBtn ] = useState<boolean>(false);
    const [ spinnerBtn, setSpinnerBtn ] = useState<boolean>(false);
    let dispatch = useDispatch();

    const formSchema = Yup.object().shape({
        email: Yup.string().required()
    });

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<InputType>(
        {
            mode: 'onTouched',
            resolver: yupResolver(formSchema)
        }
    );

    const colorIconSend = currentInputFocused === iconSend ? BLUE_COLOR : SILVER_COLOR;

    const submit: SubmitHandler<InputType> = (data) => {
        const { email } = data;

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

        dispatch(submitToMail.request({ email, callback }));

        hideForm();
        reset();
    };

    return (
        <form className={css.form} onSubmit={handleSubmit(submit)}>
            <div className={css.wrapInput}>
                <div className={css.wrapInput__icon}>
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

export { ResetEmailForm };