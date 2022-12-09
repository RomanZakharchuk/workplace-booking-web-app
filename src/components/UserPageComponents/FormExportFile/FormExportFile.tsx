import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import css from "./FormExportFile.module.scss";
import { useDispatch } from "react-redux";
import { exportUsers } from "../../../modules/dashboard/store/user-store/user.actions";
import { typeOfFileOptions } from "../../../constants/general.constants";
import { WPSelect } from "../../WPSelect/WPSelect";

type PropsType = {
    closeWindow: any;
}

const FormExportFile: FC<PropsType> = ({ closeWindow }) => {
    const dispatch = useDispatch();

    const [ selectedValue, setSelectedValue ] = useState<string>('');

    useEffect(() => {
        if (!selectedValue) {
            setSelectedValue('CSV');
        }
    }, [ selectedValue ]);

    const { handleSubmit } = useForm();

    const submit = () => {
        dispatch(exportUsers.request());
    };

    return (
        <form onSubmit={handleSubmit(submit)} className={css.form}>
            <div className={css.exportInputContainer}>
                <WPSelect
                    nameOfLabel={'Select a file type:'}
                    setSelectedValue={setSelectedValue}
                    selectedValue={selectedValue}
                    valueOfOptions={typeOfFileOptions}
                />
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
                >Export
                </button>
            </div>
        </form>
    )
}

export { FormExportFile };