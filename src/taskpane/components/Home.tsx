import * as React from "react";
import { HomeStyle } from "./Home.style";
import Search from "./basic/Search";
import Drop from "./basic/Drop";
import { SearchParams } from "../../api/search";
import { InfiniteList } from "./basic/InfiniteList";
import FilterPanel from "./basic/FilterPanel";

/* global console */

export interface HomeProps {
  toDetail: (id, fileName) => void;
}

export interface HomeState {
  filterPanelOpen: boolean;
}

export default class Home extends React.Component<HomeProps, HomeState> {
  private _infiniteList: InfiniteList;

  constructor(props, context) {
    super(props, context);
  }

  state = {
    filterPanelOpen: false,
  };

  componentDidMount() {}

  onSearch(params: SearchParams) {
    this._infiniteList.refresh(params);
  }

  onItemSelected(id: string, fileName: string) {
    this.props.toDetail(id, fileName);
  }

  onOrderBy(params: SearchParams) {
    this._infiniteList.refresh(params);
  }

  onFilter(params: SearchParams) {
    this.setState({ filterPanelOpen: false });
    console.log(params);
    this._infiniteList.refresh(params);
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    return (
      <div>
        <section style={HomeStyle.SearchBox}>
          <Search searchCallback={(params) => this.onSearch(params)} />
        </section>
        <section style={HomeStyle.SortbyFilter}>
          <Drop orderByCallback={(params) => this.onSearch(params)} />
          <div>
            <FilterPanel isOpen={this.state.filterPanelOpen} filterCallBack={this.onFilter.bind(this)}></FilterPanel>
          </div>
        </section>
        <section>
          <InfiniteList
            onItemSelected={(id, fileName) => this.onItemSelected(id, fileName)}
            ref={(child) => (this._infiniteList = child)}
          ></InfiniteList>
        </section>
      </div>
    );
  }
}
