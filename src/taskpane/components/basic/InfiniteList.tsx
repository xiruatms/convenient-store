import * as React from "react";
import { FocusZone, FocusZoneDirection } from "@fluentui/react/lib/FocusZone";
import { List } from "@fluentui/react/lib/List";
import { HomeStyle } from "../Home.style";
import InfiniteScroll from "react-infinite-scroller";
import { getSearchedData, SearchParams } from "../../../api/search";
import { Spinner } from "@fluentui/react";
import Mask from "./Mask";
import ListItem from "./ListItem";

interface IInfiniteListProps {
  onItemSelected: (id, fileName) => void;
}
export class InfiniteList extends React.Component<IInfiniteListProps> {
  private _searchParams: SearchParams = {};
  private _skip: number = 0;
  private _pageSize: number = 3;
  private _emptyPage: boolean = false;
  private _mask: Mask;
  state = {
    data: [],
    loading: false,
    hasMore: true,
  };

  constructor(props, context) {
    super(props, context);
  }

  refresh(params: SearchParams) {
    this._skip = 0;
    this._searchParams = params;
    this._emptyPage = false;
    this.handleInfiniteOnLoad();
  }

  handleInfiniteOnLoad = () => {
    let data = this._skip === 0 ? new Array() : this.state.data;
    this.setState({
      loading: true,
    });

    this.fetchData(this._searchParams, (res) => {
      let returnData = res.data.documents;
      if (returnData.length < this._pageSize) {
        this.setState({
          hasMore: false,
        });
      }

      data = data.concat(returnData);
      this._emptyPage = data.length === 0 ? true : false;
      this._skip = data.length;

      this.setState({
        loading: false,
        data,
      });
    });
  };

  fetchData = (params: SearchParams, callback) => {
    params.start = this._skip.toString();
    params.size = this._pageSize.toString();

    getSearchedData(params).then((res) => {
      callback(res);
    });
  };

  onRenderCell = (ele: any) => {
    return <ListItem element={ele} onItemSelected={this.props.onItemSelected}></ListItem>;
  };

  render() {
    if (this._emptyPage) {
      return <img style={HomeStyle.errorPage} src="../../../assets/noResult.png" alt="no result"></img>;
    }

    // if (this.state.loading && this._skip === 0) {
    //   return (
    //     <div>
    //       <Label>Spinner with label positioned below</Label>
    //       <Spinner label="I am definitely loading..." />
    //     </div>
    //   );
    // }

    return (
      <div style={HomeStyle.List} id="List">
        {this.state.loading && this._skip === 0 && (
          <div>
            <Spinner
              style={HomeStyle.spinner}
              size={3}
              label="Loading"
              styles={{
                circle: { borderTopColor: "#D44519" },
                label: { color: "#D44519" },
              }}
            />
            <Mask visible={true} style={HomeStyle.ListMask} />
          </div>
        )}

        <FocusZone direction={FocusZoneDirection.vertical}>
          <InfiniteScroll
            initialLoad={true}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
          >
            <List items={this.state.data} onRenderCell={this.onRenderCell} />
            {this.state.data.length > 0 && this.state.loading && this.state.hasMore && (
              <div>
                <Spinner
                  size={2}
                  styles={{
                    circle: { borderTopColor: "#D44519" },
                  }}
                />
              </div>
            )}
          </InfiniteScroll>
        </FocusZone>
      </div>
    );
  }
}
