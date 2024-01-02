// FilterExample.js
import axios from "axios";
import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-docker";
import "prismjs/themes/prism.css";
import {
  Text,
  Box,
  Button,
  CheckBoxGroup,
  Form,
  FormField,
  Header,
  Heading,
  Select,
  TextInput,
  TextArea,
} from "grommet";
import { useLocation, useNavigate } from "react-router-dom";

export const ImageForm = (props) => {
  const location = useLocation();

  const navigate = useNavigate();
  const navigatefunction = (data) => {
    axios.post("/home/buildandpush", data);
  };
  const onFormChange = (value) => {
    setFormValues(value);
    applyFilters();
  };
  const applyFilters = () => {
    // Mock function to demonstrate implementation
  };
  const [data, setData] = useState({
    imagename: location.state.imagename,
    imagetag: location.state.imagetag,
    dockerfile: location.state.dockerfile,
    dockeruser: "",
    dockerpassword: "",
  });

  const sendData = (data) => {
    setData({
      imagename: location.state.imagename,
      imagetag: location.state.imagetag,
      dockerfile: location.state.dockerfile,
      dockeruser: formValues.dockerhubusername,
      dockerpassword: formValues.dockerhubpassword,
    });
  };

  const [formValues, setFormValues] = React.useState({
    finalimagename: "",
    finalimagetag: "",
    dockerhubusername: "",
    dockerhubpassword: "",
  });

  return (
    <Box gap="medium" width="large">
      <Box>{JSON.stringify(data)}</Box>
      <Header
        direction="column"
        align="start"
        gap="xxsmall"
        pad={{ horizontal: "xxsmall" }}
      ></Header>
      <Box
        // Padding used to prevent focus from being cutoff
        pad={{ horizontal: "xxsmall" }}
      >
        <Form
          onSubmit={({ value }) => navigatefunction({ value })}
          value={formValues}
          onChange={onFormChange}
          method="post"
        >
          <FormField
            // error="required"
            required
            htmlFor="dockerhubusername"
            name="dockerhubusername"
            label="Dockerhub User Name"
            defaultValue=""
          ></FormField>

          <FormField
            // error="required"
            required
            htmlFor="dockerhubpassword"
            name="dockerhubpassword"
            label="Dockerhub Password"
            defaultValue=""
          ></FormField>

          <Box direction="row-responsive" gap="medium" pad={{ top: "medium" }}>
            <Button label="Submit" primary type="submit" onClick={sendData} />
            <Button label="Reset" type="reset" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};
