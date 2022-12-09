import { FC } from "react";

type PropsType = {
    colorIconProfile: string
}

const ProfileSvg: FC<PropsType> = ({colorIconProfile}) => {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M8.88341 16.2465C6.11455 16.2465 3.75 15.8156 3.75 14.09C3.75 12.3644 6.09955 10.7715 8.88341 10.7715C11.6523 10.7715 14.0168 12.349 14.0168 14.0746C14.0168 15.7995 11.6673 16.2465 8.88341 16.2465Z"
                  stroke={colorIconProfile} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M8.87836 8.38028C10.6954 8.38028 12.1681 6.90755 12.1681 5.0905C12.1681 3.27346 10.6954 1.80005 8.87836 1.80005C7.06132 1.80005 5.58791 3.27346 5.58791 5.0905C5.58177 6.90141 7.04427 8.37414 8.85518 8.38028C8.86336 8.38028 8.87086 8.38028 8.87836 8.38028Z"
                  stroke={colorIconProfile} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export { ProfileSvg };