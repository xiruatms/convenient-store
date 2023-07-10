import * as React from "react";
import Home from "./Home";
import Detail from "./Detail";
import { AppStyle } from "./App.style";

/* global Office */

export interface AppProps {
  title: string;
  host: string;
}

enum Page {
  Home = 0,
  Detail,
}

export interface AppState {
  currentPage: Page;
}

export default class App extends React.Component<AppProps, AppState> {
  public static host: Office.HostType;
  private _contentId: string;
  private _fileName: string;

  constructor(props, context) {
    super(props, context);
    App.host = props.host;
    this.state = {
      currentPage: Page.Home,
    };
  }

  componentDidMount() {}

  // here is a sample to use officejs
  click = async () => {
    /**
     * Insert your PowerPoint code here
     */
  };

  toDetail = (id, fileName) => {
    this._contentId = id;
    this._fileName = fileName;
    this.setState({
      currentPage: Page.Detail,
    });
  };

  toHome = () => {
    this.setState({
      currentPage: Page.Home,
    });
  };

  render() {
    // Detail page
    if (this.state.currentPage === Page.Detail) {
      return (
        <div style={AppStyle.Page}>
          <Detail toHome={this.toHome} contentId={this._contentId} fileName={this._fileName}/>
        </div>
      );
    }

    return (
      <div style={AppStyle.Page}>
        <Home toDetail={this.toDetail} />
      </div>
    );
  }
}
