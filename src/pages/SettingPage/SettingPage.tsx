import css from './SettingPage.module.scss';
import { TitleBasePage } from "../../components/TitleBasePage/TitleBasePage";
import arrowRight from "../../assets/svg/chevrons-right.svg";
import { UpdateCompany, UpdateSocialMedia } from "../../components/SettingComponents";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCompany, getCompanySocialMedia } from "../../modules/dashboard/store/company-store/company.actions";

const SettingPage: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const companyId = localStorage.getItem('companyId');
        dispatch(getCompany.request({ id: companyId }));
        dispatch(getCompanySocialMedia.request({id: companyId}));
    }, [dispatch]);

    return (
        <div>
            <TitleBasePage title={'Company settings'} />

            <div className={css.content}>
                <div className={css.wrapHeader}>
                    <div className={css.wrapPath}>
                        <p className={css.pathTitle}>Company settings</p>
                        <img src={arrowRight} alt="arrow right" />
                    </div>
                </div>

                <div className={css.line} />

                <div className={css.formsContainer}>
                    <UpdateCompany />
                    <UpdateSocialMedia />
                </div>
            </div>
        </div>
    )
}

export { SettingPage };