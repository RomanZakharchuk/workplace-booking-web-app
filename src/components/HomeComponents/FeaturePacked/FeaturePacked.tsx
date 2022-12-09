import { BlockBooking } from "./BlockBooking";
import Calendar from '../../../assets/svg/Calendar.svg';
import css from './FeaturePacked.module.scss';

const FeaturePacked = () => {
    return (
        <section>
            <div className={'container'}>
                <div className={css.featurePacked}>
                    <div className={css.wrapperText}>
                        <h2 className={css.title}>Feature-packed, simple to use.</h2>
                        <p className={css.text}>What if you never had to worry about space logistics again? Skedda is
                            full to the brim with
                            easy-to-use, highly-customizable features that cater specifically to your needs.</p>
                    </div>

                    <div className={css.wrapperBooking}>
                        <BlockBooking
                            src={Calendar}
                            alt={'Calendar'}
                            title={'Booking Calendar'}
                            text={'Get the full picture at a glance with multiple calendar viewing options.'}
                        />
                        <BlockBooking
                            src={Calendar}
                            alt={'Calendar'}
                            title={'Booking Calendar'}
                            text={'Get the full picture at a glance with multiple calendar viewing options.'}
                        />
                        <BlockBooking
                            src={Calendar}
                            alt={'Calendar'}
                            title={'Booking Calendar'}
                            text={'Get the full picture at a glance with multiple calendar viewing options.'}
                        />
                    </div>

                    <span className={css.line}></span>
                </div>


            </div>
        </section>
    )
}

export { FeaturePacked };