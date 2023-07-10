import React from "react";
import { HomeStyle } from "../Home.style";
import Mask from "./Mask";

interface IListItemProps {
  element: any;
  onItemSelected: (id, fileName) => void;
}
export default class ListItem extends React.Component<IListItemProps> {
  private _mask: Mask;
  state = {
    visible: true,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (

      <div
        style={HomeStyle.ListItem}
        key={this.props.element.id}
        onMouseEnter={() => {
          this.setState({ visible: false });
        }}
        onMouseLeave={() => {
          this.setState({ visible: true });
        }}
      >
        <Mask visible={!this.state.visible} style={HomeStyle.ListItemMask} />
        <img
          id="listItem"
          src={this.props.element.attachments[0]}
          alt={this.props.element.description}
          style={HomeStyle.Img}
          onClick={() => this.props.onItemSelected(this.props.element.id, this.props.element.fileName)}
        />
        <span style={HomeStyle.ItemTitle}>{this.props.element.title}</span>
      </div>
    );
  }
}
