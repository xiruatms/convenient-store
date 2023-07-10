import * as React from "react";
import { DefaultButton, Panel, PrimaryButton } from "@fluentui/react";
import Button from "./Button";
import { FilterStyle } from "./FilterPanel.style";
import App from "../App";
import { api } from "../../../api/config";
import { get } from "../../../utils/request";
import { SearchParams } from "../../../api/search";

interface CheckButtonProps {
  text: string;
  tagId: string;
  addCallBack: (id) => void;
  removeCallBack: (id) => void;
  resetCallBack: () => void;
  needReset: boolean;
}

interface CheckButtonState {
  muted: boolean;
  text: string;
  tagId: string;
}

class CheckButton extends React.Component<CheckButtonProps, CheckButtonState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      muted: false,
      text: this.props.text,
      tagId: this.props.tagId,
    };
  }

  toggle = () => {
    const muted = this.state.muted;
    this.setState({ muted: !this.state.muted });
    if (muted) {
      this.props.removeCallBack(this.state.tagId);
    } else {
      this.props.addCallBack(this.state.tagId);
    }
  };

  render() {
    if (this.props.needReset && this.state.muted) {
      this.setState({ muted: false });
      this.props.resetCallBack();
      return null;
    }
    return (
      <DefaultButton
        styles={{ rootHovered: { background: "#FDF6F4" } }}
        key={this.state.tagId}
        toggle={this.state.muted}
        text={this.state.text}
        onClick={this.toggle}
        style={this.state.muted ? FilterStyle.tagButtonClicked : FilterStyle.tagButton}
      ></DefaultButton>
    );
  }
}

interface FilterPanelProps {
  isOpen: boolean;
  filterCallBack: (seletedTags) => void;
}

interface TagFirstLevel {
  title: string;
  tags: TagSecondLevel[];
}

interface TagSecondLevel {
  title: string;
  id: string;
}

export default class FilterPanel extends React.Component<FilterPanelProps> {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount(): void {
    this.init();
  }

  state = {
    isOpen: this.props.isOpen,
    needReset: false,
    tagFirstLevelList: [],
    selectedTags: new Set<string>(),
  };

  addCallBack = (id) => {
    this.setState({ selectedTags: this.state.selectedTags.add(id) });
  };

  removeCallBack = (id) => {
    this.setState({ selectedTags: this.state.selectedTags.delete(id) });
  };

  resetCallBack = () => {
    this.setState({ needReset: false });
  };

  init = () => {
    const host = App.host.toString();
    get(api.tag.url).then((res) => {
      let { features } = res.data;
      for (const feature of features) {
        let { category } = feature;
        if (category == api.tag.cat[host]) {
          let { tags } = feature;
          var tagFirstLevelList = [];
          for (const cat of tags) {
            let { title, l2Tags } = cat;
            var tagSecondLevelList = [];
            for (const tagJson of l2Tags) {
              let { title, id } = tagJson;
              const tagObj: TagSecondLevel = { id: id, title: title };
              tagSecondLevelList.push(tagObj);
            }
            const tagFirstLevel: TagFirstLevel = { title: title, tags: tagSecondLevelList };
            tagFirstLevelList.push(tagFirstLevel);
          }
          this.setState({ tagFirstLevelList: tagFirstLevelList });
        }
      }
    });
  };

  openPanel = () => {
    this.setState({ isOpen: true });
  };

  closePanel = () => {
    this.setState({ isOpen: false, selectedTags: new Set<string>() });
  };

  clear = () => {
    this.setState({ selectedTags: new Set<string>() });
    this.setState({ needReset: true });
  };

  ok = () => {
    this.closePanel();
    const params: SearchParams = { ordering: "2", l2Tags: Array.from(this.state.selectedTags) };
    this.props.filterCallBack(params);
  };

  onRenderFooterContent = () => {
    return (
      <div>
        <DefaultButton style={FilterStyle.reset} onClick={this.clear} styles={{root:{background: "#FFFFFF"}, rootHovered:{background: "#F0F0F0"}}}>
          重置
        </DefaultButton>
        <PrimaryButton style={FilterStyle.ack} onClick={this.ok} styles={{root:{background: "#D44519"}, rootHovered:{background: "#B64020"}}}>
          确认
        </PrimaryButton>
      </div>
    );
  };

  render() {
    let displayTags;
    if (this.state.tagFirstLevelList.length !== 0) {
      displayTags = this.state.tagFirstLevelList.map((tagL1, index) => {
        let { title, tags } = tagL1;
        return (
          <div id={title} key={index}>
            <div key={index + "t"} style={FilterStyle.tagFirstLevel}>
              {title}
            </div>
            <div key={index + "c"} style={FilterStyle.tagsContainer}>
              {tags.map((tag) => {
                const { title, id }: { title: string; id: string } = tag;
                return (
                  <CheckButton
                    key={id}
                    tagId={id}
                    text={title}
                    //styles={{ rootHovered: { backgroundColor: "#FDF6F4" } }}
                    // muted={this.state.selectedTags.has(id)}
                    needReset={this.state.needReset}
                    resetCallBack={this.resetCallBack}
                    addCallBack={this.addCallBack}
                    removeCallBack={this.removeCallBack}
                  ></CheckButton>
                );
              })}
            </div>
            <br />
          </div>
        );
      });
    }

    return (
      <div>
        <div onClick={this.openPanel}>
          <Button iconProps={{ iconName: "filter",
          styles: {
            root: { color: "#D44519" },
          }, }} title="过滤" ariaLabel="过滤" />
        </div>
        <Panel
          isOpen={this.state.isOpen}
          onDismiss={this.closePanel}
          headerText="高级筛选"
          closeButtonAriaLabel="关闭"
          onRenderFooterContent={this.onRenderFooterContent}
          isFooterAtBottom={true}
          styles={{commands:{padding:"18px"}}}
        >
          {displayTags}
        </Panel>
      </div>
    );
  }
}
