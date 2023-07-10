import React from "react";

interface IMaskProps {
  visible: boolean;
  style: object;
}
export default class Mask extends React.Component<IMaskProps> {
  constructor(props, context) {
    super(props, context);
  }

  setVisible(value: boolean) {
    this.setState({ visible: value });
  }

  render() {
    if (!this.props.visible) {
      return <div />;
    }

    return <div style={this.props.style}></div>;
  }
}
