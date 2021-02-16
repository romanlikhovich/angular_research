import React from "react";
import {Link as ReactLink} from "react-router-dom";

import "./index.scss";

const Link = (props: any) => {
    const {children, href, router, ...rest} = props;

    return router ? (
        <ReactLink to={href} {...rest}>
            {children}
        </ReactLink>
    ) : (
        <a href={href} {...rest}>
            {children}
        </a>
    );
};

export default Link;
