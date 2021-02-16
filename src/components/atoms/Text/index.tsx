import React from "react";
import cn from "classnames";

import "./index.scss";

const Text = (props: any) => {
    const {children, type, className, tag} = props;
    const Tag = tag ? tag : "p";
    return <Tag className={cn([className], type)}>{children}</Tag>;
};

export default Text;
