import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { ThemeProvider } from "@fluentui/react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { lightTheme } from './theme';

/* global document, Office, module, require */

initializeIcons();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let isOfficeInitialized = false;
let host: Office.HostType;

const title = "Contoso Task Pane Add-in";

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <ThemeProvider theme={lightTheme}>
        <Component title={title} host={host}/>
      </ThemeProvider>
    </AppContainer>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  host = Office.context.host;
  render(App);
});

export default host;

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
