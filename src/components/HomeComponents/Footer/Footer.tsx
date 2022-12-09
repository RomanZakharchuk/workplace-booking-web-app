import Logo from '../../../assets/svg/Logo.svg';
import css from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={css.footerColor}>
            <div className={'container'}>
                <div className={css.wrapper}>
                    <div className={css.wrapper__main}>
                        <div className={css.logoContainer}>
                            <img src={Logo} alt="Logo" />
                        </div>
                        <p className={css.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut
                            labore.</p>
                        <div className={css.blockNetworks}>
                            <div className={css.blockNetworks__inner}>
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_39_499)">
                                        <path
                                            d="M24.6094 12.5C24.6094 5.81055 19.1895 0.390625 12.5 0.390625C5.81055 0.390625 0.390625 5.81055 0.390625 12.5C0.390625 18.5439 4.81885 23.5537 10.6079 24.4629V16.0005H7.53174V12.5H10.6079V9.83203C10.6079 6.79736 12.4146 5.12109 15.1816 5.12109C16.5068 5.12109 17.8926 5.35742 17.8926 5.35742V8.33594H16.3652C14.8613 8.33594 14.3921 9.26953 14.3921 10.2271V12.5H17.7505L17.2134 16.0005H14.3921V24.4629C20.1812 23.5537 24.6094 18.5439 24.6094 12.5Z"
                                            fill="#BBBBBB" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_39_499">
                                            <rect width="25" height="25" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>

                            <div className={css.blockNetworks__inner}>
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M23.8566 6.77427C23.584 5.7478 22.7808 4.93938 21.761 4.66503C19.9124 4.1665 12.5001 4.1665 12.5001 4.1665C12.5001 4.1665 5.08773 4.1665 3.23917 4.66503C2.21933 4.93942 1.41612 5.7478 1.14351 6.77427C0.648193 8.63482 0.648193 12.5167 0.648193 12.5167C0.648193 12.5167 0.648193 16.3985 1.14351 18.2591C1.41612 19.2856 2.21933 20.0603 3.23917 20.3346C5.08773 20.8332 12.5001 20.8332 12.5001 20.8332C12.5001 20.8332 19.9124 20.8332 21.761 20.3346C22.7808 20.0603 23.584 19.2856 23.8566 18.2591C24.3519 16.3985 24.3519 12.5167 24.3519 12.5167C24.3519 12.5167 24.3519 8.63482 23.8566 6.77427ZM10.0758 16.0411V8.99224L16.2711 12.5168L10.0758 16.0411Z"
                                        fill="#BBBBBB" />
                                </svg>
                            </div>

                            <div className={css.blockNetworks__inner}>
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M22.4302 7.40791C22.446 7.62998 22.446 7.8521 22.446 8.07417C22.446 14.8476 17.2906 22.6522 7.86802 22.6522C4.96509 22.6522 2.26841 21.8114 0 20.3521C0.412451 20.3997 0.808984 20.4155 1.2373 20.4155C3.63257 20.4155 5.83755 19.6065 7.59834 18.2265C5.3458 18.1789 3.45811 16.7036 2.80771 14.6731C3.125 14.7207 3.44224 14.7524 3.77539 14.7524C4.2354 14.7524 4.69546 14.689 5.12373 14.578C2.77603 14.102 1.01519 12.0399 1.01519 9.54941V9.48599C1.69727 9.8667 2.49048 10.1046 3.33115 10.1363C1.95107 9.21626 1.04692 7.64585 1.04692 5.86919C1.04692 4.91743 1.30068 4.04497 1.74487 3.28354C4.26709 6.39268 8.05835 8.4231 12.3096 8.64522C12.2303 8.2645 12.1827 7.86797 12.1827 7.47139C12.1827 4.64775 14.4669 2.34766 17.3064 2.34766C18.7816 2.34766 20.1141 2.96631 21.05 3.96567C22.208 3.7436 23.3184 3.31528 24.302 2.72837C23.9212 3.91812 23.1122 4.91748 22.0494 5.55195C23.0805 5.44097 24.0799 5.15537 24.9999 4.75884C24.302 5.77402 23.4295 6.67817 22.4302 7.40791Z"
                                        fill="#BBBBBB" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className={css.wrapper__menu}>
                        <h3 className={css.title}>Menu</h3>
                        <a className={css.link} href={"#home"}>Home</a>
                        <a className={css.link} href={"#about"}>About</a>
                        <a className={css.link} href={"#benefits"}>Benefits</a>
                        <a className={css.link} href={"#reviews"}>Reviews</a>
                        <a className={css.link} href={"#team"}>Team</a>
                    </div>

                    <div className={css.wrapper__contacts}>
                        <h3 className={css.title}>Contacts</h3>
                        <a className={css.link} href="mailto:abc@example.com">TestBooking@gmail.com</a>
                        <a className={css.link} href="tel:+380937602236">+380 937 60 2236</a>
                        <a className={css.link} href="">Telegram</a>
                        <a className={css.link} href="">Instagram</a>
                    </div>

                    <div className={css.wrapper__personalArea}>
                        <h3 className={css.title}>Personal Area</h3>
                        <a className={css.link} href="">Registration</a>
                        <a className={css.link} href="">Login</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export { Footer };