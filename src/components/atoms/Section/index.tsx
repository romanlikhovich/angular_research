import React from "react";
import cn from "classnames";

import "./index.scss";

const Section = (props: any) => {
    const {children, className, ...sectionProps} = props;

    return (
        <section className={cn([className])} {...sectionProps}>
            {children}
        </section>
    );
};

export default Section;
