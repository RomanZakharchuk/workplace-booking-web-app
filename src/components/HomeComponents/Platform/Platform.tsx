import { ImgComponent } from "../ImgComponent/ImgComponent";
import Avatar from '../../../assets/png/Avatar.png';
import css from './Platform.module.scss';

const Platform = () => {
    return (
        <section className={css.platformSection} id={'reviews'}>
            <div className={'container'}>
                <div className={css.platform}>
                    <h2 className={css.title}>A platform for your people</h2>
                    <p className={css.text}>Optimized at every corner to be the new favorite product of your people. Mobile-friendly and
                        accessible from anywhere. Smart, simple and easy to use.</p>
                    <ImgComponent src={Avatar} alt={"Avatar"}/>
                    <h3 className={css.name}>Joe Seymour</h3>
                    <p className={css.textSmall}>The platform has been amazing for PVH. The interactive floor plans are the best. The
                        functionality within the platform almost felt custom built for our organization.</p>
                </div>

                <span className={css.line}></span>
            </div>
        </section>
    )
}

export { Platform };