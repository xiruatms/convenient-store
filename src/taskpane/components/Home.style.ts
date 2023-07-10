export const HomeStyle = {
  SearchBox: {
    // width: "100%",
    padding: "16px",
    // marginTop: "20px",
  },
  SortbyFilter: {
    margin: "0px 16px 10px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  List: {
    padding: "16px",
  },
  ListItem: {
    borderRadius: "5px",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    marginBottom: "20px",
    background: "#FFFFFF",
  },
  Img: {
    borderRadius: "2%",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: "100%",
  },
  ItemTitle: {
    width: "100%",
    height: "100%",
    background: "#FFFFFF",
    // padding: "0px 5x 5px 5px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "inline-block",
    whiteSpace: "nowrap" as "nowrap",
    marginLeft: "14px",
  },
  errorPage: {
    width: "100%",
  },
  spinner: { position: "fixed" as "fixed", top: 0, bottom: 0, left: 0, right: 0 },
  ListMask: {
    background: "rgba(240, 238, 239, 0.3)",
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  ListItemMask: {
    background: "rgba(240, 238, 239, 0.7)",
  },
  btnClass: {
    background: "#ffffff",
  },
  btnClassClicked: {
    background: "#ffb380",
  },
};
