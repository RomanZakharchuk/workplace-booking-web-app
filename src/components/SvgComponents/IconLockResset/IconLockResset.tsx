import { FC } from "react";

type PropsType = {
    currentInputFocused: string;
}

const IconLockReset: FC<PropsType> = ({ currentInputFocused }) => {
    return (
        <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M16.4706 9.40335V7.25435C16.4396 4.73535 14.3716 2.71935 11.8536 2.75035C9.38661 2.78135 7.39161 4.76735 7.34961 7.23435V9.40335"
                    stroke={currentInputFocused} strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
                <path d="M11.9102 14.1562V16.3772" stroke={currentInputFocused}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M11.91 8.82422C6.165 8.82422 4.25 10.3922 4.25 15.0952C4.25 19.7992 6.165 21.3672 11.91 21.3672C17.655 21.3672 19.571 19.7992 19.571 15.0952C19.571 10.3922 17.655 8.82422 11.91 8.82422Z"
                      stroke={currentInputFocused} strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export { IconLockReset };