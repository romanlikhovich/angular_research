import React from "react";
import cn from "classnames";

import "./index.scss";
import {IIcon} from "interfaces";

const Icon = (props: IIcon) => {
    const {variant, className} = props;

    return <i className={cn(`icon-${variant}`, [className])}/>;
};

export default Icon;
