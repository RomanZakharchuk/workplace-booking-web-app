import { FC } from "react";

type PropsType = {
    colorIconUser: string
}

const UserSvg: FC<PropsType> = ({colorIconUser}) => {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M8.9796 15.2766C6.55035 15.2766 4.4751 14.9091 4.4751 13.4376C4.4751 11.9661 6.53685 10.6851 8.9796 10.6851C11.4088 10.6851 13.4841 11.9541 13.4841 13.4248C13.4841 14.8956 11.4223 15.2766 8.9796 15.2766Z"
                  stroke={colorIconUser} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M8.97931 8.58675C10.5738 8.58675 11.8668 7.2945 11.8668 5.7C11.8668 4.1055 10.5738 2.8125 8.97931 2.8125C7.38481 2.8125 6.09181 4.1055 6.09181 5.7C6.08731 7.2885 7.36981 8.5815 8.95906 8.58675H8.97931Z"
                  stroke={colorIconUser} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M13.772 7.79377C14.6997 7.54552 15.3837 6.69952 15.3837 5.69227C15.3837 4.64152 14.639 3.76402 13.6475 3.56152"
                stroke={colorIconUser} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M14.2075 10.1587C15.523 10.1587 16.6465 11.0504 16.6465 11.8469C16.6465 12.3157 16.2588 12.8264 15.6708 12.9644"
                stroke={colorIconUser} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M4.18818 7.79377C3.25968 7.54552 2.57568 6.69952 2.57568 5.69227C2.57568 4.64152 3.32118 3.76402 4.31193 3.56152"
                stroke={colorIconUser} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M3.7515 10.1587C2.436 10.1587 1.3125 11.0504 1.3125 11.8469C1.3125 12.3157 1.70025 12.8264 2.289 12.9644"
                stroke={colorIconUser} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export { UserSvg };