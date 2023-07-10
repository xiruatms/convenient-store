import * as React from "react";
import { SearchBox } from "@fluentui/react/lib/SearchBox";

interface ISearchProp {
  searchCallback: (query: any) => void;
}

export default class Search extends React.Component<ISearchProp> {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (
      <SearchBox
        placeholder="搜索"
        iconProps={{
          styles: {
            root: { color: "#D44519" },
          },
        }}
        onSearch={(newValue) => {
          let params = {};
          if (newValue) {
            params["keyWords"] = newValue;
          }
          this.props.searchCallback(params);
        }}
      />
    );
  }
}
