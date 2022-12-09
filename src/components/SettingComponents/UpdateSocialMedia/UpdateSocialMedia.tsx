import css from './UpdateSocialMedia.module.scss';
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import WPInput from "../../WPInput/WPInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Linkedin from '../../../assets/svg/LinkedIN.svg';
import Twitter from '../../../assets/svg/Twitter1.svg';
import Instagram from '../../../assets/svg/Instagram_black.svg';
import Facebook from '../../../assets/svg/facebook.svg';
import { ISocialMedia } from "../../../interfaces/social-media.interface";
import { useDispatch, useSelector } from "react-redux";
import { updateCompanySocialMedia } from "../../../modules/dashboard/store/company-store/company.actions";
import { AppState } from "../../../store/store";

interface IFormInput {
    linkedinUrl: string;
    twitterUrl: string;
    instagramUrl: string;
    facebookUrl: string;
}

const UpdateSocialMedia: FC = () => {
    const socialMediaState: ISocialMedia = useSelector((state: AppState) => state?.company.socialMedia);

    const [ currentSocialMedia, setCurrentSocialMedia ] = useState<ISocialMedia>(socialMediaState);
    const [ disabledBtn, setDisabledBtn ] = useState<boolean>(false);
    const [ spinnerBtn, setSpinnerBtn ] = useState<boolean>(false);
    const dispatch = useDispatch();

    const { facebookUrl, twitterUrl, linkedinUrl, instagramUrl } = currentSocialMedia;

    const formSchema = Yup.object().shape({
        linkedinUrl: Yup.string().required(),
        twitterUrl: Yup.string().required(),
        instagramUrl: Yup.string().required(),
        facebookUrl: Yup.string().required(),
    });

    useEffect(() => {
        if (socialMediaState) {
            setCurrentSocialMedia(socialMediaState)
        }
    }, [ socialMediaState ]);

    useEffect(() => {
        reset();
    }, [ currentSocialMedia ]);

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IFormInput>(
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
        const { facebookUrl, twitterUrl, linkedinUrl, instagramUrl } = data;

        dispatch(updateCompanySocialMedia.request({
            facebookUrl,
            twitterUrl,
            linkedinUrl,
            instagramUrl,
            id: companyId,
            callback
        }))
    };

    return (
        <form onSubmit={handleSubmit(submit)} className={css.form}>
            <div>
                <div className={css.socialGroup}>
                    <div>
                        <div className={`${css.socialIcon} ${css.linkedinIcon}`}>
                            <img src={Linkedin} alt="Linkedin" />
                        </div>
                        <WPInput
                            name={'linkedinUrl'}
                            labelName={'Linkedin'}
                        >
                            <input
                                {...register('linkedinUrl')}
                                type="text"
                                className={css.input}
                                placeholder={'yuri-fedotov'}
                                style={{ border: errors.linkedinUrl ? '2px solid #FF7A7A' : '' }}
                            />
                        </WPInput>
                    </div>

                    <div>
                        <div className={`${css.socialIcon} ${css.twitterIcon}`}>
                            <img src={Twitter} alt="Twitter" />
                        </div>
                        <WPInput
                            name={'twitterUrl'}
                            labelName={'Twitter'}
                        >
                            <input
                                {...register('twitterUrl')}
                                type="text"
                                className={css.input}
                                placeholder={'yuri-fedotov'}
                                style={{ border: errors.twitterUrl ? '2px solid #FF7A7A' : '' }}
                            />
                        </WPInput>
                    </div>
                </div>

                <div className={css.socialGroup}>
                    <div>
                        <div className={`${css.socialIcon} ${css.instagramIcon}`}>
                            <img src={Instagram} alt="Instagram" />
                        </div>
                        <WPInput
                            name={'instagramUrl'}
                            labelName={'Instagram'}
                        >
                            <input
                                {...register('instagramUrl')}
                                type="text"
                                className={css.input}
                                placeholder={'yuri-fedotov'}
                                style={{ border: errors.instagramUrl ? '2px solid #FF7A7A' : '' }}
                            />
                        </WPInput>
                    </div>

                    <div>
                        <div className={`${css.socialIcon} ${css.facebookIcon}`}>
                            <img src={Facebook} alt="Facebook" />
                        </div>
                        <WPInput
                            name={'facebookUrl'}
                            labelName={'Facebook'}
                        >
                            <input
                                {...register('facebookUrl')}
                                type="text"
                                className={css.input}
                                placeholder={'yuri-fedotov'}
                                style={{ border: errors.facebookUrl ? '2px solid #FF7A7A' : '' }}
                            />
                        </WPInput>
                    </div>
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

export { UpdateSocialMedia };