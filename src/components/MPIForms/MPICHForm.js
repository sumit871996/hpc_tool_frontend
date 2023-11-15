// FilterExample.js
import React, { useState } from "react";
import {
  Box,
  Button,
  CheckBoxGroup,
  Form,
  FormField,
  Header,
  Heading,
  Select,
  Text,
  TextArea,
  TextInput,
} from "grommet";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-docker";
import "prismjs/themes/prism.css";
import { useNavigate } from "react-router-dom";

const mpich_version = ["4.1.2"];

export const MPICHForm = () => {
  const [finalfile, setFinalFile] = useState("");

  const navigate = useNavigate();
  const navigatefunction = (data) => {
    console.log(data);
    navigate("/dockerfileMPICH/show", {
      state: { data: { ...data, dockercommands: finalfile } },
    });
  };

  const [formValues, setFormValues] = React.useState({
    mpich_Version: "4.1.2",
    mpi_configure_options: "--disable-fortran",
    mpi_make_options: "-j4",
    user: "mpi",
    workdir: "/project",
    imagename: "mpich",
    imagetag: "4.1.2",
    singularityimagename: "",
    finalimagename: "",
    finalimagetag: "",
    // dockercommands: finalfile,
  });

  const applyFilters = () => {
    // Mock function to demonstrate implementation
  };

  const onFormChange = (value) => {
    setFormValues(value);
    applyFilters();
  };

  return (
    <Box gap="medium" width="large">
      <Header
        direction="column"
        align="start"
        gap="xxsmall"
        pad={{ horizontal: "xxsmall" }}
      >
        <Heading level={2} margin="none">
          MPICH Specifications
        </Heading>
      </Header>
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
          <Box direction="row" justify="between">
            <Box>
              <FormField
                // error="required"
                required
                htmlFor="mpich_Version"
                name="mpich_Version"
                label="MPICH Version"
              >
                <Select
                  id="mpich_Version"
                  name="mpich_Version"
                  options={mpich_version}
                  defaultValue="4.1.2"
                />
              </FormField>
              <FormField
                // error="required"
                required
                htmlFor="mpi_configure_options"
                name="mpi_configure_options"
                label="MPI configure options"
              ></FormField>
              <FormField
                // error="required"
                required
                htmlFor="mpi_make_options"
                name="mpi_make_options"
                label="MPI make options"
              ></FormField>
            </Box>
            <Box>
              <FormField
                // error="required"
                required
                htmlFor="user"
                name="user"
                label="User"
              ></FormField>
              <FormField
                // error="required"
                required
                htmlFor="workdir"
                name="workdir"
                label="Working Directory"
              ></FormField>
            </Box>
            <Box>
              <FormField
                // error="required"
                required
                htmlFor="imagename"
                name="imagename"
                label="Base Image Name"
              ></FormField>
              <FormField
                // error="required"
                required
                htmlFor="imagetag"
                name="imagetag"
                label="Base Image Tag"
              ></FormField>
            </Box>
          </Box>

          <Text>Write docker commands for running the applications</Text>

          <Box
            width="100%"
            // border="all"
            style={{
              maxHeight: "350px",
              overflow: "auto",
              backgroundColor: "white",
              minWidth: "550px",
            }}
            id="dockerfile"
          >
            <FormField>
              <Editor
                required
                id="dockercommands"
                name="dockercommands"
                value={finalfile}
                onValueChange={(code) => setFinalFile(code)}
                highlight={(code) => highlight(code, languages.dockerfile)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
              />
            </FormField>
          </Box>
          <Box>
            <FormField
              // error="required"
              required
              htmlFor="finalimagename"
              name="finalimagename"
              label="Application Image Name"
              defaultValue=""
            ></FormField>
            <FormField
              // error="required"
              required
              htmlFor="finalimagetag"
              name="finalimagetag"
              label="Application Image Tag"
              defaultValue=""
            ></FormField>
          </Box>
          <FormField
            // error="required"
            required
            htmlFor="singularityimagename"
            name="singularityimagename"
            label="Application Singularity Image Name"
            defaultValue=""
          ></FormField>

          <Box direction="row-responsive" gap="medium" pad={{ top: "medium" }}>
            <Button label="Submit" primary type="submit" />
            <Button label="Cancel" type="reset" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};
