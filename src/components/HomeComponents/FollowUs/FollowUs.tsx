import { ImgComponent } from "../ImgComponent/ImgComponent";
import Office1 from '../../../assets/png/Office1.png';
import Office2 from '../../../assets/png/Office2.png';
import Office3 from '../../../assets/png/Office3.png';
import Office4 from '../../../assets/png/Office4.png';
import Office5 from '../../../assets/png/Office5.png';
import Office6 from '../../../assets/png/Office6.png';
import css from './FollowUs.module.scss';

const FollowUs = () => {
    return (
        <section id={'about'} className={css.followUsBackground}>
            <div className={'container'}>
                <div className={css.followUs}>
                    <h2 className={css.title}>Follow us on Instagram</h2>
                    <div className={css.imageWrap}>
                        <div className={css.imageWrap__twoImages}>
                            <div className={css.boxImg}>
                                <img src={Office1} alt="Office" />
                            </div>

                            <div className={css.boxImg}>
                                <img src={Office2} alt="Office" />
                            </div>
                        </div>
                        <div className={css.imageWrap__fourImages}>
                            <div className={css.boxImg}>
                                <img src={Office3} alt="Office" />
                            </div>
                            <div className={css.boxImg}>
                                <img src={Office4} alt="Office" />
                            </div>
                            <div className={css.boxImg}>
                                <img src={Office5} alt="Office" />
                            </div>
                            <div className={css.boxImg}>
                                <img src={Office6} alt="Office" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export { FollowUs };