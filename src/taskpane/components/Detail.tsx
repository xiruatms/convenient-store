import { DefaultButton, List, Sticky } from "@fluentui/react";
import * as React from "react";
import { IContextualMenuProps, IIconProps, Stack, IStackStyles } from '@fluentui/react';
import { CommandBarButton } from '@fluentui/react/lib/Button';
import { getDetailData } from "../../api/search";
import { DetailStyle } from "./Detail.style";
import { getDonloadUrl } from "../../api/download";
import { LoadingDialog } from "./basic/Dialog";

/* global console, Office, PowerPoint, Excel, Word*/

export interface DetailProps {
  toHome: any;
  contentId: string;
  fileName: string;
}

export interface DetailState {
  imageList: any[];
  visible: boolean;
  percentage: number;
}

export default class Detail extends React.Component<DetailProps, DetailState> {
  request: XMLHttpRequest;

  constructor(props, context) {
    super(props, context);
    this.state = {
      imageList: [],
      visible: false,
      percentage: 0,
    };
  }

  componentDidMount() {
    getDetailData(this.props.contentId).then((res) => {
      if (res.status == 200 && res.data != null) {
        let pageList = res.data.content.attachments;
        let imageList = [];
        for (let i = 0; i < pageList.length; i++) {
          imageList.push(pageList[i]);
        }
        this.setState({
          imageList,
        });
      }
    });
  }

  switchVisible = () => {
    if (this.state.visible && this.state.percentage < 1) {
      this.request.abort();
    }
    this.setState({
      visible: !this.state.visible,
    });
  };

  onRenderCell = (ele: any) => {
    return (
      <div style={DetailStyle.ListItem}>
        <img style={DetailStyle.Image} src={ele} />
      </div>
    );
  };

  static createTemplate = async (myBase64) => {
    var host = Office.context.host.toString();
    // eslint-disable-next-line no-case-declarations
    switch (host) {
      case "PowerPoint":
        PowerPoint.createPresentation(myBase64);
        break;
      case "Excel":
        Excel.createWorkbook(myBase64);
        break;
      case "Word":
        Word.run(async (context) => {
          context.application.createDocument(myBase64);
        });
        break;
      default:
        console.error("Host is not correct.");
    }
  };

  clickToDownloadTemplate = async (contentId) => {
    //const contentId = "PptContent-10032";
    //send request to get download url
    this.switchVisible();
    getDonloadUrl(contentId).then((res) => {
      const url = res.data[0];
      //const urlWithoutPrefix = url.substr("https://officeplusedogv2.blob.core.chinacloudapi.cn".length);
      // console.log("urlWithoutPrefix\n" + urlWithoutPrefix);

      //send request to get template file
      this.request = new XMLHttpRequest();
      this.request.open("GET", url, true);
      this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
      this.request.responseType = "blob";

      this.request.onload = function () {
        if (this.status === 200) {
          var blob = this.response;
          var contentTypeHeader = this.getResponseHeader("Content-Type");
          var templateBlob = new Blob([blob], { type: contentTypeHeader });

          // convert templateFile to base64, then create PPT from base64 file
          var host = Office.context.host.toString();
          var suffix;
          switch (host) {
            case "PowerPoint":
              suffix = ".pptx";
              break;
            case "Excel":
              suffix = ".xlsx";
              break;
            case "Word":
              suffix = ".docx";
              break;
            default:
              console.error("Host is not correct.");
          }

          const filename = "template" + suffix;
          const templateFile = new File([templateBlob], filename, {
            type: contentTypeHeader,
          });

          const reader = new FileReader();

          reader.onload = () => {
            // Remove the metadata before the base64-encoded string.
            const startIndex = reader.result.toString().indexOf("base64,");
            // console.log("startIndex\n" + startIndex);
            const myBase64 = reader.result.toString().substr(startIndex + 7);
            // console.log("base64\n" + myBase64);

            // create template from myBase64
            Detail.createTemplate(myBase64);
          };

          // Read in the file as a data URL so we can parse the base64-encoded string.
          reader.readAsDataURL(templateFile);

          // // download to local
          // var downloadLink = document.createElement("a");
          // downloadLink.href = URL.createObjectURL(blob);
          // downloadLink.download = pptfilename;
          // document.body.appendChild(downloadLink);
          // downloadLink.click();
          // document.body.removeChild(downloadLink);
        }
      };

      this.request.addEventListener(
        "progress",
        (evt: any) => {
          if (evt.lengthComputable) {
            this.setState(
              {
                percentage: evt.loaded / evt.total,
              },
              () => {
                if (this.state.percentage >= 1) {
                  this.switchVisible();
                  this.setState({
                    percentage: 0,
                  });
                }
              }
            );
          }
        },
        false
      );

      this.request.send();
    });
  };

  
  render() {
    const arrowIcon: IIconProps = { 
      iconName: 'ChevronLeftSmall', 
      styles:{
        root: {color: "black"},
      },
    };
    return (
      <div>
        <LoadingDialog
          visible={this.state.visible}
          onclose={this.switchVisible}
          percentage={this.state.percentage}
        ></LoadingDialog>
        <div style={DetailStyle.Icon}>
          <CommandBarButton 
                  styles={{root: {color: "black", backgroundColor: "rgb(248, 249, 252)"}, rootHovered: { color: "#D44519", backgroundColor: "rgb(248, 249, 252)"}}}
                  onClick={this.props.toHome} iconProps={arrowIcon} text="返回首页" />
        </div>
        <div style={DetailStyle.PageList}>
          <List items={this.state.imageList} onRenderCell={this.onRenderCell} />
          <div style={{position:"sticky", bottom: "0px",  backgroundColor: "white", marginLeft: "14px", marginRight: "12px"}}>
          <DefaultButton
              styles={{root:{background: "#D44519"}, rootHovered:{background: "#B64020"}}}
              style={DetailStyle.Button}
              onClick={() => {
                this.clickToDownloadTemplate(this.props.contentId);
              }}
            >
              <span style={{ color: "white" }}>用模板新建</span>
          </DefaultButton>


          </div>

        </div>
      </div>
    );
  }
}
