import ManWorking from '../../../assets/png/man-working.png';
import css from './Focus.module.scss';

const Focus = () => {
    return (
        <section>
            <div className={'container'}>
                <div className={css.focus}>
                    <div className={css.focus__wrap}>
                        <h2 className={css.title}>Focus on what really matters. Automate the rest.</h2>
                        <p className={css.text}>Remove the hassle of manually managing rules, policies, limitations & payments. One-time
                            setup. Let smart automations do the work for you.</p>
                        <ul>
                            <li>One-time platform setup</li>
                            <li>Rock-solid data security</li>
                            <li>Self-service bookings</li>
                        </ul>
                    </div>

                    <div className={css.wrapImg}>
                        <img src={ManWorking} alt={'Man working'}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export { Focus };