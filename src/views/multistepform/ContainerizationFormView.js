import {
  Box,
  Button,
  Form,
  FormField,
  Header,
  Heading,
  Select,
  TextInput,
} from "grommet";
import { Code } from "grommet-icons";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-docker";
import "prismjs/themes/prism.css";
import { useState } from "react";
import Editor from "react-simple-code-editor";
import { useNavigate } from "react-router-dom";
import { OpenMPIForm } from "../../components/MPIForms/OpenMPIForm";

export const ContainerizationFormView = () => {
  const navigate = useNavigate();
  const [formValues,setFormValues]=useState();
  const [finalfile, setFinalFile] = useState("");
  const [selectedMajorVersion, setSelectedMajorVersion] = useState("v4.0")
  const [formData, setFormData] = useState({
    mpi_type: "",
    imagename: "",
    imagetag: "",
    finalimagename: "",
    finalimagetag: "",
    singularityimagename: "",
  });

  const [openMPIFormData, setOpenMPIFormData] = useState({
    openMPI_Major_Version: "",
    openMPI_Version: "",
    mpi_configure_options: "",
    mpi_make_options: "",
  });

  const [commonData, setCommonData] = useState({
    user: "",
    workdir: "",
  });

  const [MPIchFormData, setMPIchFormData] = useState({
    mpi_ch_Version: "",
    mpi_configure_options: "",
    mpi_make_options: "",
  });

  const [intelMPIFormData, setIntelMPIFormData] = useState({
    intel_mpi_devel_version: "",
    intel_mkl_version: "",
    intel_icc_version: "",
    intel_tbb_version: "",
  });

  const intel_mkl_version = [
    "2021.1.1",
    "2021.2.0",
    "2021.3.0",
    "2021.4.0",
    "2022.0.1",
    "2022.0.2",
    "2022.1.0",
    "2022.2.0",
    "2022.2.1",
    "2023.0.0",
    "2023.1.0",
    "2023.2.0",
  ];

  const intel_icc_versions = [
    "2021.1.1",
    "2021.1.2",
    "2021.2.0",
    "2021.3.0",
    "2021.4.0",
    "2022.0.1",
    "2022.0.2",
    "2022.1.0",
    "2022.2.0",
    "2022.2.1",
    "2023.0.0",
    "2023.1.0",
    "2023.2.0",
    "2023.2.1",
  ];

  const intel_tbb_versions = [
    "2021.1.1",
    "2021.2.0",
    "2021.3.0",
    "2021.4.0",
    "2021.5.0",
    "2021.5.1",
    "2021.6.0",
    "2021.7.0",
    "2021.7.1",
    "2021.8.0",
    "2021.9.0",
    "2021.10.0",
  ];

  const intel_mpi_devel_versions = [
    "2021.1.1",
    "2021.2.0",
    "2021.3.0",
    "2021.3.1",
    "2021.4.0",
    "2021.5.0",
    "2021.5.1",
    "2021.6.0",
    "2021.7.0",
    "2021.7.1",
    "2021.8.0",
    "2021.9.0",
  ];

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

  const mpi_ch_version = ["4.1.2"];

  const MPI_Options = ["OpenMPI", "MPICH", "IntelMPI"];

  const changeMPIType = (e) => {
    const value = e.target.value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIntelChange = (e) => {
    const { name, value } = e.target;
    setIntelMPIFormData({ ...intelMPIFormData, [name]: value });
  };

  const handleMPIChange = (e) => {
    const { name, value } = e.target;
    setMPIchFormData({ ...MPIchFormData, [name]: value });
  };

  const handleOpenMPIChange = (e) => {
    const { name, value } = e.target;
    setOpenMPIFormData({ ...openMPIFormData, [name]: value });
  };

  const handleCommonFieldChnage = (e)=>{
    const {name, value} =e.target;
    setCommonData({...commonData,[name]:value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.mpi_type);
    // console.log(intelMPIFormData)
    let data = {};
    if (formData.mpi_type === "IntelMPI") {
      data = {
        mpi_type: formData.mpi_type,
        intel_mpi_devel_version: intelMPIFormData.intel_mpi_devel_version,
        intel_mkl_version: intelMPIFormData.intel_mkl_version,
        intel_icc_version: intelMPIFormData.intel_icc_version,
        intel_tbb_version: intelMPIFormData.intel_tbb_version,
        singularityimagename: formData.finalimagename,
        imagename: formData.imagename,
        imagetag: formData.imagetag,
        finalimagename: formData.finalimagename,
        finalimagetag: formData.finalimagetag,
        sourcecode: null,
      };
      setFormValues(...data);
    } else if (formData.mpi_type === "MPICH") {
      data = {
        mpi_type: formData.mpi_type,
        mpi_ch_version: MPIchFormData.mpi_ch_Version,
        mpi_configure_options: MPIchFormData.mpi_configure_options,
        mpi_make_options: MPIchFormData.mpi_make_options,
        user: commonData.user,
        workdir: commonData.workdir,
        imagename: formData.imagename,
        imagetag: formData.imagetag,
        singularityimagename: formData.singularityimagename,
        finalimagename: formData.finalimagename,
        finalimagetag: formData.finalimagetag,
      };
      setFormValues(...data);
    } else if (formData.mpi_type === "OpenMPI") {
      data = {
        mpi_type: formData.mpi_type,
        openMPI_Major_Version: openMPIFormData.openMPI_Major_Version,
        openMPI_Version: openMPIFormData.openMPI_Version,
        mpi_configure_options: openMPIFormData.mpi_configure_options,
        mpi_make_options: openMPIFormData.mpi_make_options,
        user: commonData.user,
        workdir: commonData.workdir,
        imagename: formData.imagename,
        imagetag: formData.imagetag,
        singularityimagename: formData.singularityimagename,
        finalimagename: formData.finalimagename,
        finalimagetag: formData.finalimagetag,
      };
      setFormValues(...data);
    }
    console.log(data);
    console.log(typeof(finalfile));
    if (formData.mpi_type === "IntelMPI") {
      navigate("/dockerfileIntelMPI/show", {
        state: { data: { ...data, dockercommands: finalfile } },
      });
    } else if (formData.mpi_type === "MPICH") {
      navigate("/dockerfileMPICH/show", {
        state: { data: { ...data, dockercommands: finalfile } },
      });
    }else if (formData.mpi_type === "OpenMPI") {
        navigate("/dockerfileOpenMPI/show", {
          state: { data: { ...data, dockercommands: finalfile } },
        });
      }
  };

  return (
    <Box fill>
      <Box align="center" gap="medium">
        <label>MPI Selection</label>
        <Select
          required
          id="mpi_type"
          name="mpi_type"
          options={MPI_Options}
          defaultValue={MPI_Options[0]}
          onChange={handleChange}
        />
      </Box>

      <Header>
        <Heading>Form Page</Heading>
      </Header>
      <Box pad={"small"} fill align="center">
        <Form onSubmit={handleSubmit}>
          <Box gap="medium">
            <Box direction="row" gap="medium">
              {/* For Intel MPI */}
              {formData.mpi_type === "IntelMPI" && (
                <Box gap="medium">
                  <FormField
                    htmlFor="intel_mpi_devel_version"
                    name="intel_mpi_devel_version"
                    label="MPI developement version"
                    required={formData.mpi_type === "IntelMPI"}
                  >
                    <Select
                      id="intel_mpi_devel_version"
                      name="intel_mpi_devel_version"
                      options={intel_mpi_devel_versions}
                      defaultValue={intel_mpi_devel_versions[0]}
                      onChange={handleIntelChange}
                    />
                  </FormField>

                  <FormField
                    htmlFor="intel_mkl_version"
                    name="intel_mkl_version"
                    label="Intel MKL version"
                    required={formData.mpi_type === "IntelMPI"}
                  >
                    <Select
                      id="intel_mkl_version"
                      name="intel_mkl_version"
                      options={intel_mkl_version}
                      defaultValue={intel_mkl_version[0]}
                      onChange={handleIntelChange}
                    />
                  </FormField>

                  <FormField
                    htmlFor="intel_icc_version"
                    name="intel_icc_version"
                    label="Intel ICC Version"
                    required={formData.mpi_type === "IntelMPI"}
                  >
                    <Select
                      id="intel_icc_version"
                      name="intel_icc_version"
                      options={intel_icc_versions}
                      defaultValue={intel_icc_versions[0]}
                      onChange={handleIntelChange}
                    />
                  </FormField>

                  <FormField
                    htmlFor="intel_tbb_version"
                    name="intel_tbb_version"
                    label="Intel TBB Version"
                    required={formData.mpi_type === "IntelMPI"}
                  >
                    <Select
                      id="intel_tbb_version"
                      name="intel_tbb_version"
                      options={intel_tbb_versions}
                      defaultValue={intel_tbb_versions[0]}
                      onChange={handleIntelChange}
                    />
                  </FormField>
                </Box>
              )}

              {/* For Open MPI */}
              {formData.mpi_type === "OpenMPI" && (
                <Box>
                  <Box gap="medium">
                    <FormField
                      // required
                      htmlFor="openMPI_Major_Version"
                      name="openMPI_Major_Version"
                      label="OpenMPI Major Version"
                      required={formData.mpi_type === "OpenMPI"}
                    >
                      <Select
                        id="openMPI_Major_Version"
                        name="openMPI_Major_Version"
                        options={open_mpi_major_versions}
                        // defaultValue={open_mpi_major_versions[0]}
                        onChange={handleOpenMPIChange}
                      />
                    </FormField>

                    <FormField
                      // required
                      htmlFor="openMPI_Version"
                      name="openMPI_Version"
                      label="OPenMPI Version"
                      required={formData.mpi_type === "OpenMPI"}
                    >
                      <Select
                        id="openMPI_Version"
                        name="openMPI_Version"
                        options={open_mpi_major_versions}
                        defaultValue={open_mpi_version[selectedMajorVersion][0]}
                        onChange={handleOpenMPIChange}
                      />
                    </FormField>
                    <FormField
                      htmlFor="mpi_configure_options"
                      name="mpi_configure_options"
                      label="MPI configure options"
                    >
                      <TextInput
                        id="mpi_configure_options"
                        name="mpi_configure_options"
                        placeholder="Enter MPI configure options"
                        onChange={handleOpenMPIChange}
                      />
                    </FormField>
                    <FormField
                      htmlFor="mpi_make_options"
                      name="mpi_make_options"
                      label="MPI make options"
                    >
                      <TextInput
                        id="mpi_make_options"
                        name="mpi_make_options"
                        placeholder="Enter MPI make options"
                        onChange={handleOpenMPIChange}
                      />
                    </FormField>
                  </Box>
                  <Box></Box>
                </Box>
              )}

              {/* For MPICH */}
              {formData.mpi_type === "MPICH" && (
                <Box>
                  <Box gap="medium">
                    <FormField
                      // required
                      htmlFor="mpi_ch_Version"
                      name="mpi_ch_Version"
                      label="MPICH Version"
                      required={formData.mpi_type === "MPICH"}
                    >
                      <Select
                        id="mpi_ch_Version"
                        name="mpi_ch_Version"
                        options={mpi_ch_version}
                        defaultValue={mpi_ch_version[0]}
                        onChange={handleMPIChange}
                      />
                    </FormField>

                    <FormField
                      // required
                      htmlFor="mpi_configure_options"
                      name="mpi_configure_options"
                      label="MPI configure options"
                      required={formData.mpi_type === "MPICH"}
                    >
                      <TextInput
                        //   required
                        id="mpi_configure_options"
                        name="mpi_configure_options"
                        placeholder="Enter Configuration Option"
                        onChange={handleMPIChange}
                      />
                    </FormField>

                    <FormField
                      htmlFor="mpi_make_options"
                      name="mpi_make_options"
                      label="MPI make options"
                      required={formData.mpi_type === "MPICH"}
                    >
                      <TextInput
                        id="mpi_make_options"
                        name="mpi_make_options"
                        placeholder="Enter MPI make options"
                        onChange={handleMPIChange}
                      />
                    </FormField>
                  </Box>
                </Box>
              )}

              {formData.mpi_type !== "IntelMPI" && (
                <Box gap="medium">
                  <FormField required htmlFor="user" name="user" label="User">
                    <TextInput
                      id="user"
                      name="user"
                      placeholder="Enter a user name"
                      required={formData.mpi_type !== "intelMPI"} 
                      onChange={handleCommonFieldChnage}
                    />
                  </FormField>
                  <FormField
                    required
                    htmlFor="workdir"
                    name="workdir"
                    label="Working Directory"
                  >
                    <TextInput
                      id="workdir"
                      name="workdir"
                      placeholder=" Please Enter "
                      required={formData.mpi_type !== "intelMPI"}
                      onChange={handleCommonFieldChnage}
                    />
                  </FormField>
                </Box>
              )}

              <Box gap="medium">
                <FormField
                  htmlFor="imagename"
                  name="imagename"
                  label="Image Name"
                  required
                >
                  <TextInput
                    id="imagename"
                    name="imagename"
                    placeholder="Please Enter Image Name"
                    onChange={handleChange}
                  />
                </FormField>

                <FormField
                  htmlFor="imagetag"
                  name="imagetag"
                  label="Image Tag"
                  required
                >
                  <TextInput
                    id="imagetag"
                    name="imagetag"
                    placeholder="Please Enter Image Tag"
                    onChange={handleChange}
                  />
                </FormField>
              </Box>
            </Box>

            <Box gap="medium">
              <FormField
                htmlFor="dockercommands"
                name="dockercommands"
                label="Write docker commands for running the applications"
              >
                <Editor
                  required
                  id="dockercommands"
                  name="dockercommands"
                  value={finalfile}
                  onValueChange={(code) => setFinalFile(code)}
                  placeholder="Enter docker commands"
                  highlight={(code) => highlight(code, languages.dockerfile)}
                  padding={10}
                />
              </FormField>

              <FormField
                htmlFor="finalimagename"
                name="finalimagename"
                label="Application Image Name*"
                required
              >
                <TextInput
                  required
                  id="finalimagename"
                  name="finalimagename"
                  placeholder="Please Enter Application Image Name"
                  onChange={handleChange}
                />
              </FormField>

              <FormField
                htmlFor="finalimagetag"
                name="finalimagetag"
                label="Application Image Tag"
                required
              >
                <TextInput
                  required
                  id="finalimagetag"
                  name="finalimagetag"
                  placeholder="Please Enter Application Image Tag"
                  onChange={handleChange}
                />
              </FormField>

              <FormField
                htmlFor="singularityimagename"
                name="singularityimagename"
                label="Application Singularity Image Name"
                required
              >
                <TextInput
                  required
                  id="singularityimagename"
                  name="singularityimagename"
                  placeholder="Please Enter Sigularity Image Name"
                  onChange={handleChange}
                />
              </FormField>
            </Box>
          </Box>
          <Box>
            <Button label="Submit" primary type="submit" />
            <Button label="Reset" type="reset" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};
