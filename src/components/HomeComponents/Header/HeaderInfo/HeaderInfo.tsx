import YoungMan from '../../../../assets/png/young-man.png';
import css from './HeaderInfo.module.scss';

const HeaderInfo = () => {
    return (
        <div className={css.wrapper}>
            <div className={css.wrapText}>
                <h1 className={css.title}>The smartest way to manage your spaces</h1>
                <p className={css.text}>Skedda removes the hassle of manually managing the booking and scheduling of your spaces. The perfect
                    booking platform for your rooms, desks, studios, labs, courts and more.</p>
                <a className={css.link} href={"#create-account"}>Create Account</a>
            </div>

            <div className={css.wrapImg}>
                <img src={YoungMan} alt="Young man"/>
            </div>
        </div>

    )
}

export { HeaderInfo };
