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

  const [fileZip, setFileZip] = useState(null);

  const navigate = useNavigate();
  const navigatefunction = (dataip) => {
    console.log(data);
    const formData = new FormData();

    formData.append("inputData", JSON.stringify(data));
    formData.append("file", fileZip);

    axios.post("http://localhost:8081/home/buildandpush", formData);
  };
  const onFormChange = (value) => {
    setFormValues(value);
    applyFilters();
  };
  const applyFilters = () => {
    // Mock function to demonstrate implementation
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // setFormValues((prevValues) => ({
    //   ...prevValues,
    //   zipFile: file,
    // }));

    setFileZip(file);

    setFilename(file.name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission here, including the zip file
    console.log(formValues);
  };

  const [filename, setFilename] = useState("");
  const [data, setData] = useState({
    imagename: location.state.imagename,
    imagetag: location.state.imagetag,
    dockerfile: location.state.dockerfile,
    buildcommand: location.state.dockerbuildcommand,
    dockeruser: "",
    dockerpassword: "",
    dockerfilename: location.state.dockerfilename,
  });

  const sendData = (data) => {
    setData({
      imagename: location.state.imagename,
      imagetag: location.state.imagetag,
      buildcommand: location.state.dockerpushbuildcommand,
      dockerfile: location.state.dockerfile,
      dockeruser: formValues.dockerhubusername,
      dockerpassword: formValues.dockerhubpassword,
      dockerfilename: location.state.dockerfilename,
    });
  };

  const [formValues, setFormValues] = React.useState({
    dockerhubusername: "",
    dockerhubpassword: "",
    // zipFile: null,
  });

  return (
    <Box gap="medium" width="large" pad={{bottom:"small"}}>
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

          <FormField
            // error="required"
            type="file"
            accept=".zip"
            onChange={handleFileChange}
            required
            htmlFor="zipFile"
            name="zipFile"
            label="Application Source Code"
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
