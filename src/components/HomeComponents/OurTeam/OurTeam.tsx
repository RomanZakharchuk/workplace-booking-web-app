import { InnerEmployee } from "./InnerEmployee";
import Employee1 from '../../../assets/png/Employee1.png';
import Employee2 from '../../../assets/png/Employee2.png';
import Employee3 from '../../../assets/png/Employee3.png';
import Employee4 from '../../../assets/png/Employee4.png';
import css from './OurTeam.module.scss';

const OurTeam = () => {
    return (
        <section id={'team'} className={css.ourTeamBackground}>
            <div className={'container'}>
                <div className={css.ourTeam}>
                    <div className={css.ourTeam__description}>
                        <h2 className={css.title}>Our Team</h2>
                        <p className={css.text}>Discover how organizations across the globe have implemented Skedda to reduce administration
                            and automate complex booking tasks.</p>
                    </div>

                    <div className={css.ourTeam__wrap}>
                        <InnerEmployee src={Employee1} alt={'Chris Visser'} name={'Chris Visser'} position={'Ryerson University'}/>
                        <InnerEmployee src={Employee2} alt={'Chris Visser'} name={'Chris Visser'} position={'Ryerson University'}/>
                        <InnerEmployee src={Employee3} alt={'Chris Visser'} name={'Chris Visser'} position={'Ryerson University'}/>
                        <InnerEmployee src={Employee4} alt={'Chris Visser'} name={'Chris Visser'} position={'Ryerson University'}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export { OurTeam };