import {IImage} from "interfaces";
import React from "react";

const Image = (props: IImage) => {
    const {src, alt, className} = props;

    return <img alt={alt} src={src} className={className}/>;
};

export default Image;
