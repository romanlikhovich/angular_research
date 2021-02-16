import React from "react";
import cn from "classnames";

import "./index.scss";

const Column = (props: any) => {
    const {
        children,
        xl,
        lg,
        md,
        sm,
        col,
        refName,
        className,
        ...columnProps
    } = props;

    const xlDefaultClass = `col-xl-${xl}`;
    const lgDefaultClass = `col-lg-${lg}`;
    const mdDefaultClass = `col-md-${md}`;
    const smDefaultClass = `col-sm-${sm}`;
    const colDefaultClass = `col-${col}`;

    return (
        <div
            className={cn(
                {[xlDefaultClass]: xl},
                {[lgDefaultClass]: lg},
                {[mdDefaultClass]: md},
                {[smDefaultClass]: sm},
                {[colDefaultClass]: col},
                [className]
            )}
            ref={refName}
            {...columnProps}
        >
            {children}
        </div>
    );
};

export default Column;
