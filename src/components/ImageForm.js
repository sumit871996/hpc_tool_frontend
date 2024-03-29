
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
  Spinner,
  Layer,
  Notification,
} from "grommet";
import { useLocation, useNavigate } from "react-router-dom";

export const ImageForm = (props) => {
  const location = useLocation();
  const [fileZip, setFileZip] = useState(null);

  const navigate = useNavigate();
  const getBuildStatus = () => {
    const buildId = sessionStorage.getItem("buildId");
    axios
      .get(`http://localhost:8081/home/getStatus/${buildId}`)
      .then((response) => {
        console.log(response);
        const buildStatus = response.data;
        console.log(`Jenkins Build Status: ${buildStatus}`);

        // Implement your logic to handle the build status (e.g., success, failure, in-progress)
      })
      .catch((error) => {
        console.error("Error fetching Jenkins build status:", error);
      });
  };
  const navigatefunction = (dataip) => {
    // console.log(data);
    const formData = new FormData();

    formData.append("inputData", JSON.stringify(data));
    formData.append("file", fileZip);

    console.log(data);

    axios
      .post("http://localhost:8081/home/buildandpush", formData)
      .then((response) => {
        console.log(response);
        // Handle the immediate response and extract the build ID
        const buildId = response.data.buildId;
        sessionStorage.setItem("buildId", buildId);
        console.log(`Immediate Jenkins Build ID: ${buildId}`);

        // Use the build ID to poll Jenkins for the build status
        getBuildStatus();
      })
      .catch((error) => {
        console.error("Error triggering Jenkins build:", error);
      });
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
    dockeruser: "",
    dockerpassword: "",

    imagename: location.state.imagename,
    imagetag: location.state.imagetag,
    dockerfile: location.state.dockerfile,
    buildcommand: location.state.dockerbuildcommand,
    dockerfilename: location.state.dockerfilename,

    baseimagename: location.state.baseimagename,
    baseimagetag: location.state.baseimagetag,
    basedockerfile: location.state.basedockerfile,
    basebuildcommand: location.state.basedockerbuildcommand,
    basedockerfilename: location.state.basedockerfilename,
  });

  const sendData = (data) => {
    setData({
      imagename: location.state.imagename,
      imagetag: location.state.imagetag,
      buildcommand: location.state.dockerbuildcommand.replace(
        `-t ${location.state.imagename}`,
        `-t ${formValues.dockerhubusername}/${location.state.imagename}`
      ),
      dockerfile: (() => {
        const finaldockerfile = location.state.dockerfile;
        finaldockerfile[0] = location.state.dockerfile[0].replace(
          `FROM ${location.state.imagename}`,
          `FROM ${formValues.dockerhubusername}/${location.state.imagename}`
        );
        return finaldockerfile;
      })(),
      dockeruser: formValues.dockerhubusername,
      dockerpassword: formValues.dockerhubpassword,
      dockerfilename: location.state.dockerfilename,

      baseimagename: location.state.baseimagename,
      baseimagetag: location.state.baseimagetag,
      basedockerfile: location.state.basedockerfile,
      basebuildcommand: location.state.basedockerbuildcommand.replace(
        `-t ${location.state.baseimagename}`,
        `-t ${formValues.dockerhubusername}/${location.state.baseimagename}`
      ),
      basedockerfilename: location.state.basedockerfilename,
    });
  };

  const [formValues, setFormValues] = React.useState({
    dockerhubusername: "",
    dockerhubpassword: "",
    // zipFile: null,
  });

  return (
    <Box gap="medium" width="large" pad={{ bottom: "small" }}>
      {/* <Box>{JSON.stringify(data)}</Box> */}
      {/* {JSON.stringify(data)} */}
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
            <Button label="Check status" onClick={getBuildStatus} />
          </Box>
        </Form>
      </Box>
      {showLoading && 
      <Layer>
        <Box style={{justifyContent:"center"}}>
          <Box fill style={{justifyContent:"center"}}><Spinner/></Box>
        <Text>Pushing Image To Docker</Text></Box>
      </Layer>
      }
      {showNotification && 
      <Notification 
      toast
      title={notificationTitle}
      message={notificationMessage}
      status={notificationStatus}
      onClose={()=>setShowNotification(false)}
      time={5000}
      />}
    </Box>
  );
};
