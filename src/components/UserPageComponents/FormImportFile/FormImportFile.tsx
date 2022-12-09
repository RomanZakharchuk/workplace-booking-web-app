import { FC, useState } from "react";

import css from './FormImportFile.module.scss';
import { SubmitHandler, useForm } from "react-hook-form";
import { ImportSvg } from "../../SvgComponents/BasePageSvgs";
import { useDispatch } from "react-redux";
import { importUsers } from "../../../modules/dashboard/store/user-store/user.actions";

type PropsType = {
    closeWindow: any;
}

type InputType = {
    file: string;
    setting: boolean;
    preventNotification: boolean;
    allowNotification: boolean;
}

const FormImportFile: FC<PropsType> = ({ closeWindow }) => {
    const [nameFile, setNameFile] = useState('');
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<InputType>();

    const submit: SubmitHandler<InputType> = (data) => {
        dispatch(importUsers.request({
            file: data.file[0]
        }));

        closeWindow();
    }

    const onSelectFile = (e: any) => {
        setNameFile(e.target.files[0].name);
    };

    return (
        <form onSubmit={handleSubmit(submit)} className={css.form}>
            <div>
                <div className={css.fileContainer}>
                    <label className={css.label}>Import (valid type is: cvs)</label>
                    <div className={css.wrapUpload}>
                        <div className={css.importBtn}>
                            <p className={css.textNameFile}>{nameFile ? nameFile : 'No file chosen'}</p>
                        </div>
                        <label className={css.inputUpload}
                               htmlFor="imageInput">
                            <div className={css.iconImport}>
                                <ImportSvg />
                            </div>
                        </label>
                        <input {...register('file', { required: true })}
                               id={'imageInput'}
                               className={`${css.input} ${css.imageInput}`}
                               type="file"
                               accept=".csv"
                               onChange={onSelectFile}
                        />
                    </div>
                </div>

                <div className={css.checkboxesContainer}>
                    <label className={css.labelNamesContainer}>Settings</label>
                    <div className={css.settingsContainer}
                         style={{ marginBottom: errors.setting ? '0' : '' }}>
                        <input {...register('setting', { required: true })} id={'settingId'} type="checkbox" />
                        <label htmlFor="settingId">Student id</label>
                    </div>
                    {errors.setting && <p className={css.errorMassage}>Check the box</p>}

                    <label className={css.labelNamesContainer}>Notification Settings</label>
                    <div className={css.notificationSettingsContainer}>
                        <div className={css.preventNotificationsContainer}
                             style={{ marginBottom: errors.preventNotification ? '0' : '' }}>
                            <input {...register('preventNotification', { required: true })} id={'preventNotification'}
                                   type="checkbox" />
                            <label htmlFor="preventNotification">Prevent notifications (Recommended)</label>
                        </div>
                        {errors.preventNotification && <p className={css.errorMassage}>Check the box</p>}

                        <div className={css.allowNotificationContainer}>
                            <input {...register('allowNotification', { required: true })} id={'allowNotification'}
                                   type="checkbox" />
                            <label htmlFor="allowNotification">Allow notifications</label>
                        </div>
                        {errors.allowNotification && <p className={css.errorMassage}>Check the box</p>}
                    </div>
                </div>
            </div>

            <div>
                <button
                    onClick={() => closeWindow()}
                    className={css.btnCancel}
                    type={'button'}
                >Cancel
                </button>

                <button
                    className={css.btn}
                    type={'submit'}
                >Import
                </button>
            </div>
        </form>
    )
}

export { FormImportFile };