import React, { Component } from "react";
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Layer,
  Grid,
  Text,
  ResponsiveContext,
} from "grommet";
import { FormClose, Notification } from "grommet-icons";
import { hpe } from "grommet-theme-hpe";
import AppHeader from "./components/UI/AppHeader";
import AppFooter from "./components/UI/AppFooter";
import AppRouting from "./routes/AppRouting";

const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

class App extends Component {
  state = {
    showSidebar: false,
  };
  render() {
    const { showSidebar } = this.state;
    return (
      <Grommet theme={hpe} >
        <ResponsiveContext.Consumer>
          {(size) => (
            <Box background={"rgb(247, 247, 247)"} fill>
              <AppHeader />
              <Box fill align="start" justify="start" >
                <AppRouting />
              </Box>
              <AppFooter />
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default App;
