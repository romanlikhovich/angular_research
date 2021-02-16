import React from "react";
import cn from "classnames";

import { Icon } from "../../atoms";

import "./index.scss";

const Loading = (props: any) => {
  const { className } = props;

  return (
    <div className={cn("loading", className)}>
      <Icon variant="loading" className="loading__icon" />
    </div>
  );
};

export default Loading;
