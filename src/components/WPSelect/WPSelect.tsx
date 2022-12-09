import css from './WPSelect.module.scss';
import { FC, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "../SvgComponents";

type PropsType = {
    setSelectedValue: (value: string) => void;
    selectedValue: string;
    nameOfLabel?: string;
    valueOfOptions: {value: string}[];
}

const WPSelect: FC<PropsType> = (props) => {
    const [ dropDown, setDropDown ] = useState(false);
    const optionRef = useRef(null);

    const { selectedValue, setSelectedValue, nameOfLabel, valueOfOptions } = props;

    const useOutsideAlerter = (ref: any) => { // I don't know how to fix
        useEffect(() => {
            const handleClickOutside = (e: any) => { // I don't know how to fix
                if (ref.current && !ref.current.contains(e.target)) {
                    setDropDown(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ ref ]);
    };

    useOutsideAlerter(optionRef);

    const isSelected = (e: any) => { // I don't know how to fix
        const innerText = e.target.innerText;
        setSelectedValue(innerText);
    };

    return (
        <div className={css.wrapper}>
            <div className={css.selectContainer}>
                {nameOfLabel && <label className={css.label}>{nameOfLabel}</label>}
                <div onClick={() => setDropDown(!dropDown)} className={css.inputContainer}>
                    <input
                        type="text"
                        className={css.input}
                        defaultValue={selectedValue}
                        autoComplete={'off'}
                    />

                    {dropDown ? (
                        <div className={css.arrow}>
                            <ChevronUp />
                        </div>
                    ) : (
                        <div className={css.arrow}>
                            <ChevronDown />
                        </div>
                    )}
                </div>
            </div>
            {dropDown ? (
                <div ref={optionRef} className={css.dropdownContainer}>
                    <div className={css.scrollContainer}>
                        {valueOfOptions.map((option, index) => (
                            <div
                                key={index}
                                className={css.option}
                                onClick={(event) => {
                                    isSelected(event);
                                    setDropDown(false);
                                }}
                            >{option.value}</div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export { WPSelect };