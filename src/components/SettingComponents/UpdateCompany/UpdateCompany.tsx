import css from './UpdateCompany.module.scss';
import WPInput from "../../WPInput/WPInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import imagePreview from "../../../assets/png/uncnown-avatar.png";
import { MAX_FILE_SIZE } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { ICompany } from "../../../interfaces/company.interface";
import { WPSelect } from "../../WPSelect/WPSelect";
import { updateCompany } from "../../../modules/dashboard/store/company-store/company.actions";
import { numberOfEmployeesOptions } from "../../../constants/general.constants";
import { AppState } from "../../../store/store";

type IFormInput = {
    picture: any; // I don't know how to fix this any
    company: string;
    employeeCapacity: string;
    companySpecification: string
}

const UpdateCompany: FC = () => {
    const companyState: ICompany = useSelector((state: AppState) => state?.company.company);

    const [ errorMsg, setErrorMsg ] = useState('');
    const [ nameFile, setNameFile ] = useState('');
    const [ selectedFile, setSelectedFile ] = useState();
    const [ previewIconUser, setPreviewIconUser ] = useState();
    const [ currentCompany, setCurrentCompany ] = useState<ICompany>(companyState);
    const [ disabledBtn, setDisabledBtn ] = useState<boolean>(false);
    const [ spinnerBtn, setSpinnerBtn ] = useState<boolean>(false);
    const dispatch = useDispatch();

    const { name, logoUrl, employeeCapacity, specification } = companyState;
    const [ selectedValue, setSelectedValue ] = useState(companyState.employeeCapacity);

    useEffect(() => {
        if (employeeCapacity) {
            setSelectedValue(employeeCapacity);
        }
    }, [employeeCapacity]);

    const formSchema = Yup.object().shape({
        company: Yup.string().required(),
        companySpecification: Yup.string().required()
    });

    useEffect(() => {
        if (companyState) {
            setCurrentCompany(companyState)
        }
    }, [ companyState ]);

    useEffect(() => {
        reset();
    }, [ currentCompany ]);


    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm<IFormInput>(
        {
            mode: 'onTouched',
            resolver: yupResolver(formSchema)
        }
    );


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

        const companyId = localStorage.getItem('companyId');

        dispatch(updateCompany.request({
            name: data.company,
            specification: data.companySpecification,
            employeesCapacity: selectedValue,
            file: data.picture[0],
            id: companyId,
            callback
        }));

        console.log(data)
    };

    useEffect(() => {
        if (!selectedFile) {
            setPreviewIconUser(undefined);
            return;
        }

        const objectUrl: any = URL.createObjectURL(selectedFile); // I don't know how to fix this any
        setPreviewIconUser(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [ selectedFile, setPreviewIconUser ]);

    const onSelectFile = (e: any) => { // I don't know how to fix this any
        const file = e.target.files;

        if (!file || file.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        if (file[0].size > MAX_FILE_SIZE) {
            setErrorMsg('The file size is too large. Max size 10MB!');
            setNameFile('');
            return;
        } else {
            setSelectedFile(file[0]);
            setNameFile(file[0].name);
            setErrorMsg('');
            return;
        }
    }

    return (
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
                               className={css.imageInput}
                               type="file"
                               accept={'.jpg, .jpeg, .png, .gif, .webp'}
                               onChange={onSelectFile}
                        />
                        <div className={css.wrapImgUser}>
                            {!logoUrl ? (
                                <img src={imagePreview} alt="imagePreview" />
                            ) : (
                                <img src={!previewIconUser ? logoUrl : previewIconUser} alt="User photo" />
                            )}
                        </div>
                    </div>

                    {errorMsg === '' ? null : <p className={css.errorMsg}>{errorMsg}</p>}
                </div>
                <div className={css.companyContainer}>
                    <WPInput
                        name={'company'}
                        labelName={'Company / Registration Name *'}
                    >
                        <input
                            {...register('company')}
                            type="text"
                            className={css.input}
                            placeholder={'Your test organization'}
                            style={{ border: errors.company ? '2px solid #FF7A7A' : '' }}
                        />
                    </WPInput>
                </div>

                <div className={css.numberOfEmployeesContainer}>
                    <WPSelect
                        setSelectedValue={setSelectedValue}
                        selectedValue={selectedValue}
                        nameOfLabel={'Number of employees (selector) *'}
                        valueOfOptions={numberOfEmployeesOptions}
                    />
                </div>

                <div className={css.specificationContainer}>
                    <WPInput
                        name={'companySpecification'}
                        labelName={'Company specification *'}
                    >
                        <input
                            {...register('companySpecification')}
                            type="text"
                            className={css.input}
                            placeholder={'Your test organization'}
                            style={{ border: errors.companySpecification ? '2px solid #FF7A7A' : '' }}
                        />
                    </WPInput>
                </div>
            </div>

            <div className={css.btnSubmitContainer}>
                <button
                    style={{
                        background: disabledBtn || !isValid ? 'rgba(73, 138, 254, 0.25)' : '',
                        cursor: spinnerBtn ? 'progress' : ''
                    }}
                    className={css.btnSubmit}
                    type={'submit'}
                >Save
                </button>
            </div>
        </form>
    );
};

export { UpdateCompany };