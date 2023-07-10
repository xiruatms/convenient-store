import * as React from "react";
export const DetailStyle = {
  PageList: {
    padding: "16px",
    paddingTop: "0px",
  },
  ListItem: {
    marginBottom: "20px", marginRight: "14px", marginLeft: "14px",
    background: "#FFFFFF",
  },
  ButtonDiv: {
    marginBottom: "12px",
    marginUp: "5px",
    marginRight: "14px",
    background: "#FFFFFF",
  },
  Image: {
    borderRadius: "2%",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: "100%",
  },
  Button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    display: "inline-block",
    borderRadius: "4px",
    position: "sticky",
    border: "none",
    zIndex: "9999",
    marginBottom: "10px", marginTop: "5px",
    textAlign: "center",
  } as React.CSSProperties,
  Icon: {
    position: "sticky",
    top: "0px",
    marginLeft: "6px",
    padding: "10px",
    backgroundColor: "#F8F9FC",
  } as React.CSSProperties,
  Title: {
    height: "15px",
    paddingRight: "8px",
    verticalAlign: "-2px",
  },
};
