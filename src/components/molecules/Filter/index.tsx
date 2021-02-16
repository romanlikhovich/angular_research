import React, {useRef, useState} from "react";
import cn from "classnames";

import {Icon, Text} from "../../atoms";

import useOutsideClick from "../../../hooks";

import "./index.scss";

const Filter = ({options, activeOption, onClick}: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const entries = Object.entries(options);
    const filterRef = useRef<HTMLDivElement>(null);

    useOutsideClick(filterRef, () => setIsOpen(false));

    const filterOptions = entries.map((ent, index) => {
        return (
            ent[0] !== activeOption && (
                <div
                    className="filter__option"
                    data-value={ent[0]}
                    key={index}
                    onClick={(e) => {
                        onClick(e);
                        setIsOpen(false);
                    }}
                >
                    <Text tag="span">{ent[0]}</Text>
                </div>
            )
        );
    });

    return (
        <div className="filter" ref={filterRef}>
            <div
                className={cn("filter__selected", isOpen && "filter__selected--open")}
                onClick={() =>
                    setIsOpen((prev) => {
                        return !prev;
                    })
                }
            >
                <div className="filter__selected-option">
                    <Text tag="span">{activeOption}</Text>
                </div>
                <Icon variant="arrow" className="filter__selected-arrow"/>
            </div>
            <div className={cn("filter__options", isOpen && "filter__options--open")}>
                {filterOptions}
            </div>
        </div>
    );
};

export default Filter;
