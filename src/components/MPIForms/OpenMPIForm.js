// FilterExample.js
import React, { useState } from "react";
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
} from "grommet";
import { useNavigate } from "react-router-dom";

const open_mpi_major_versions = ["v4.0", "v4.1", "v5.0"];

const open_mpi_version = {
  "v4.0": [
    "4.0.0",
    "4.0.1",
    "4.0.2",
    "4.0.3",
    "4.0.4",
    "4.0.5",
    "4.0.6",
    "4.0.7",
  ],
  "v4.1": ["4.1.0", "4.1.1", "4.1.2", "4.1.3", "4.1.4", "4.1.5", "4.1.6"],
  "v5.0": ["5.0.0"],
};

export const OpenMPIForm = () => {
  const navigate = useNavigate();
  const [selectedMajorVersion, setSelectedMajorVersion] = useState("v4.0");
  const [formValues, setFormValues] = React.useState({
    openMPI_Major_Version: "v4.0",
    openMPI_Version: open_mpi_version["v4.0"][0],
    mpi_configure_options: "",
    mpi_make_options: "-j4",
    user: "mpi",
    workdir: "/project",
    imagename: "openmpi",
    imagetag: `${open_mpi_version[selectedMajorVersion][0]}`,
    singularityimagename: "openmpi",
  });

  const applyFilters = () => {
    // Mock function to demonstrate implementation
  };

  const navigatefunction = (data) => {
    console.log(data);
    navigate("/dockerfileOpenMPI/show", { state: { data: data } });
  };
  const onFormChange = (value) => {
    setFormValues(value);
    console.log(value);
    setSelectedMajorVersion(value.openMPI_Major_Version);
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
          OpenMPI Specifications
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
                htmlFor="openMPI_Major_Version"
                name="openMPI_Major_Version"
                label="OpenMPI Major Version"
                defaultValue={open_mpi_major_versions[0]}
              >
                <Select
                  id="openMPI_Major_Version"
                  name="openMPI_Major_Version"
                  options={open_mpi_major_versions}
                  defaultValue={open_mpi_major_versions[0]}
                />
              </FormField>
              <FormField
                htmlFor="openMPI_Version"
                name="openMPI_Version"
                label="OpenMPI Version"
                defaultValue={open_mpi_version[selectedMajorVersion][0]}
              >
                <Select
                  id="openMPI_Version"
                  name="openMPI_Version"
                  options={open_mpi_version[selectedMajorVersion]}
                  defaultValue={open_mpi_version[selectedMajorVersion][0]}
                />
              </FormField>
              <FormField
                htmlFor="mpi_configure_options"
                name="mpi_configure_options"
                label="MPI configure options"
              ></FormField>
              <FormField
                htmlFor="mpi_make_options"
                name="mpi_make_options"
                label="MPI make options"
              ></FormField>
            </Box>
            <Box>
              <FormField htmlFor="user" name="user" label="User"></FormField>
              <FormField
                htmlFor="workdir"
                name="workdir"
                label="Working Directory"
              ></FormField>
            </Box>
            <Box>
              <FormField
                htmlFor="imagename"
                name="imagename"
                label="Image Name"
              ></FormField>
              <FormField
                htmlFor="imagetag"
                name="imagetag"
                label="Image Tag"
              ></FormField>
              <FormField
                htmlFor="singularityimagename"
                name="singularityimagename"
                label="Singularity Image Name"
              ></FormField>
            </Box>
          </Box>
          <Box direction="row-responsive" gap="medium" pad={{ top: "medium" }}>
            <Button label="Submit" primary type="submit" />
            <Button label="Reset" type="reset" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};
