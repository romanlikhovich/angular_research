import React from "react";

import "./index.scss";

const Container = (props: any) => {
    const {children} = props;

    return <div className="container">{children}</div>;
};

export default Container;
