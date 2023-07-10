import * as React from "react";
import { IIconProps } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";

interface ButtonProps {
  title: string;
  ariaLabel: string;
  iconProps: IIconProps;
}

export default class Button extends React.Component<ButtonProps> {
  click = () => {};
  render() {
    const { title, ariaLabel, iconProps } = this.props;
    return <IconButton iconProps={iconProps} title={title} ariaLabel={ariaLabel} onClick={() => this.click} color="#D44519"/>;
  }
}
