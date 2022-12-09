import css from './PowerAndFlexibility.module.scss';

const PowerAndFlexibility = () => {
    return (
        <section id={'benefits'} className={css.section}>
            <div className={'container'}>
                <div className={css.backgroundContainer}>
                    <div className={css.wrapper}>
                        <h2 className={css.title}>The power and flexibility your organization needs</h2>
                        <p className={css.text}>Skedda brings together everything that’s required to handle the
                            scheduling of any space, large or
                            small. A booking platform with a strong focus on performance, reliability, security,
                            integrations and support. Reduce administration with self-service bookings.</p>
                        <a className={css.link} href={"#create-account"}>Create Account</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export { PowerAndFlexibility };