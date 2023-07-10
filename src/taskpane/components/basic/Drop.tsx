import * as React from "react";
import { Dropdown, IDropdownStyles, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { SearchParams } from "../../../api/search";

interface IOrderbyProps {
  orderByCallback: (query: any) => void;
}

const dropDownOptions: IDropdownOption[] = [
  { key: 0, text: "全部" },
  { key: 1, text: "最新" },
  { key: 2, text: "最热" },
];

const defaultSelectedKey: number = 0;

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdownItemsWrapper: {
    marginTop: "10px",
  },
};

export default class Drop extends React.Component<IOrderbyProps> {
  constructor(props, context) {
    super(props, context);
  }

  onChange = (_: React.FormEvent<HTMLDivElement>, selectedItem: IDropdownOption): void => {
    const ordering = selectedItem.key;
    this.changeOrderBy(ordering);
  };

  changeOrderBy = (ordering) => {
    let param: SearchParams = { ordering: ordering };
    this.props.orderByCallback(param);
  };

  render() {
    return (
      <Dropdown
        defaultSelectedKey={defaultSelectedKey}
        options={dropDownOptions}
        styles={dropdownStyles}
        onChange={this.onChange}
      />
    );
  }
}
