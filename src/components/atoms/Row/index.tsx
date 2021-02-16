import React from "react";
import cn from "classnames";

import "./index.scss";

const Row = (props: any) => {
    const {children, className} = props;
    return <div className={cn("row", [className])}>{children}</div>;
};

export default Row;
