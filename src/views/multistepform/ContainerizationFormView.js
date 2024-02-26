import {
  Box,
  Button,
  Form,
  FormField,
  Header,
  Heading,
  Select,
  Text,
  TextInput,
} from "grommet";
import { Code } from "grommet-icons";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-docker";
import "prismjs/themes/prism.css";
import { useContext, useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { useNavigate } from "react-router-dom";
import { OpenMPIForm } from "../../components/MPIForms/OpenMPIForm";
import { defaultFormValues } from "./defaultValues";
import { WizardContext } from "./WizardContext";


export const ContainerizationFormView = () => {
  const {formValues, setFormValues,dockerCommands,setDockerCommands, 
    errorMPIVersion,setErrorMPIVersion,
    errorICCVersion, setErrorICCVersion,
    errorTBBVersion,setErrorTBBVersion,

    errorUser,setErrorUser,
    errorWorkDir,setErrorWorkDir,

    errorImageName,setErrorImageName,
    errorImageTag, setErrorImageTag,
    errorAIN,setErrorAIN,
    errorAIT,setErrorAIT,
    errorASIN, setErrorASIN} = useContext(WizardContext);
  const navigate = useNavigate();

  useEffect(()=>{

  },[errorAIN])
  // const [formValues,setFormValues]=useState(defaultFormValues);
  const [finalfile, setFinalFile] = useState("");
  const [selectedMajorVersion, setSelectedMajorVersion] = useState("")
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

  const handleFormValueChange=(e)=>{
    const {name,value} = e.target;
    setFormValues({...formValues, [name]:value});
  }

  const handleOpenVersionChange=(e)=>{
    const {name,value}=e.target;
    setFormValues({...formValues,[name]:value})

    setSelectedMajorVersion(e.target.value)
  }

  useEffect(()=>{
    setDockerCommands(finalfile)
  },[finalfile])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues.mpi_type);
    // console.log(intelMPIFormData)
    let data = {};
    if (formValues.mpi_type === "IntelMPI") {
      data = {
        mpi_type: formValues.mpi_type,
        intel_mpi_devel_version: formValues.intel_mpi_devel_version,
        intel_mkl_version: formValues.intel_mkl_version,
        intel_icc_version: formValues.intel_icc_version,
        intel_tbb_version: formValues.intel_tbb_version,
        singularityimagename: formValues.finalimagename,
        imagename: formValues.imagename,
        imagetag: formValues.imagetag,
        finalimagename: formValues.finalimagename,
        finalimagetag: formValues.finalimagetag,
        sourcecode: null,
      };
      // setFormValues(...data);
    } else if (formValues.mpi_type === "MPICH") {
      data = {
        mpi_type: formValues.mpi_type,
        mpi_ch_version: formValues.mpi_ch_Version,
        mpi_configure_options: formValues.mpi_configure_options,
        mpi_make_options: formValues.mpi_make_options,
        user: formValues.user,
        workdir: formValues.workdir,
        imagename: formValues.imagename,
        imagetag: formValues.imagetag,
        singularityimagename: formValues.singularityimagename,
        finalimagename: formValues.finalimagename,
        finalimagetag: formValues.finalimagetag,
      };
      // setFormValues(...data);
    } else if (formValues.mpi_type === "OpenMPI") {
      data = {
        mpi_type: formValues.mpi_type,
        openMPI_Major_Version: formValues.openMPI_Major_Version,
        openMPI_Version: formValues.openMPI_Version,
        mpi_configure_options: formValues.mpi_configure_options,
        mpi_make_options: formValues.mpi_make_options,
        user: formValues.user,
        workdir: formValues.workdir,
        imagename: formValues.imagename,
        imagetag: formValues.imagetag,
        singularityimagename: formValues.singularityimagename,
        finalimagename: formValues.finalimagename,
        finalimagetag: formValues.finalimagetag,
      };
      // setFormValues(...data);
    }
    console.log(data);
    console.log(typeof(finalfile));
    if (formValues.mpi_type === "IntelMPI") {
      navigate("/dockerfileIntelMPI/show", {
        state: { data: { ...data, dockercommands: finalfile } },
      });
    } else if (formValues.mpi_type === "MPICH") {
      navigate("/dockerfileMPICH/show", {
        state: { data: { ...data, dockercommands: finalfile } },
      });
    }else if (formValues.mpi_type === "OpenMPI") {
        navigate("/dockerfileOpenMPI/show", {
          state: { data: { ...data, dockercommands: finalfile } },
        });
      }
  };

  return (
    <Box fill gap="medium">
      <Box align="center" gap="medium">
        <Header>
          <Heading weight={"bold"} level={3}>MPI Selection</Heading></Header>
        <Select
          required
          id="mpi_type"
          name="mpi_type"
          options={MPI_Options}
          placeholder="Select MPI Type "
          onChange={handleFormValueChange}
        />
      </Box>
      {formValues.mpi_type !=="" ? 
      <Box pad={"small"} fill align="center">
          <Box gap="medium">
            <Box direction="row" gap="medium">
              {formValues.mpi_type === "IntelMPI" && (
                <Box gap="medium">
                  <FormField
                    htmlFor="intel_mpi_devel_version"
                    name="intel_mpi_devel_version"
                    label="MPI developement version"
                    required={formValues.mpi_type === "IntelMPI"}
                  >
                    <Select
                      id="intel_mpi_devel_version"
                      name="intel_mpi_devel_version"
                      options={intel_mpi_devel_versions}
                      placeholder="Select Version"
                      onChange={handleFormValueChange}
                    />
                  </FormField>

                  <FormField
                    htmlFor="intel_mkl_version"
                    name="intel_mkl_version"
                    label="Intel MKL version"
                    required={formValues.mpi_type === "IntelMPI"}
                  >
                    <Select
                      id="intel_mkl_version"
                      name="intel_mkl_version"
                      options={intel_mkl_version}
                      placeholder="Select Version"
                      onChange={handleFormValueChange}
                    />
                  </FormField>

                  <FormField
                    htmlFor="intel_icc_version"
                    name="intel_icc_version"
                    label="Intel ICC Version"
                    required={formValues.mpi_type === "IntelMPI"}
                  >
                    <Select
                      id="intel_icc_version"
                      name="intel_icc_version"
                      options={intel_icc_versions}
                      placeholder="Select Version"
                      onChange={handleFormValueChange}
                    />
                  </FormField>

                  <FormField
                    htmlFor="intel_tbb_version"
                    name="intel_tbb_version"
                    label="Intel TBB Version"
                    required={formValues.mpi_type === "IntelMPI"}
                  >
                    <Select
                      id="intel_tbb_version"
                      name="intel_tbb_version"
                      options={intel_tbb_versions}
                      placeholder="Select Version"
                      onChange={handleFormValueChange}
                    />
                  </FormField>
                </Box>
              )}

              {/* For Open MPI */}
              {formValues.mpi_type === "OpenMPI" && (
                <Box>
                  <Box gap="medium">
                    <FormField
                      // required
                      htmlFor="openMPI_Major_Version"
                      name="openMPI_Major_Version"
                      label="OpenMPI Major Version"
                      required={formValues.mpi_type === "OpenMPI"}
                     
                    >
                      <Select
                        id="openMPI_Major_Version"
                        name="openMPI_Major_Version"
                        options={open_mpi_major_versions}
                        placeholder="Select Version"
                        onChange={handleOpenVersionChange}
                      />
                    </FormField>

                    {selectedMajorVersion!==""&&
                    <FormField
                      // required
                      htmlFor="openMPI_Version"
                      name="openMPI_Version"
                      label="OpenMPI Version"
                      required={formValues.mpi_type === "OpenMPI"}
                    >
                      <Select
                        id="openMPI_Version"
                        name="openMPI_Version"
                        options={open_mpi_version[selectedMajorVersion]}
                        placeholder="Select OpenMPI Version"
                        onChange={handleFormValueChange}
                      />
                    </FormField>}
                    <FormField
                      htmlFor="mpi_configure_options"
                      name="mpi_configure_options"
                      label="MPI configure options"
                    >
                      <TextInput
                        id="mpi_configure_options"
                        name="mpi_configure_options"
                        placeholder="Enter MPI configure options"
                        onChange={handleFormValueChange}
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
                        onChange={handleFormValueChange}
                      />
                    </FormField>
                  </Box>
                  <Box></Box>
                </Box>
              )}

              {/* For MPICH */}
              {formValues.mpi_type === "MPICH" && (
                <Box>
                  <Box gap="medium">
                    <FormField
                      htmlFor="mpi_ch_version"
                      name="mpi_ch_version"
                      label="MPICH Version"
                      required={formValues.mpi_type === "MPICH"}
                    >
                      <Select
                        id="mpi_ch_version"
                        name="mpi_ch_version"
                        options={mpi_ch_version}
                        placeholder="Select MPICH Version"
                        onChange={handleFormValueChange}
                      />
                    </FormField>

                    <FormField
                      // required
                      htmlFor="mpi_configure_options"
                      name="mpi_configure_options"
                      label="MPI configure options"
                      required={formValues.mpi_type === "MPICH"}
                    >
                      <TextInput
                        //   required
                        id="mpi_configure_options"
                        name="mpi_configure_options"
                        placeholder="Enter Configuration Option"
                        onChange={handleFormValueChange}
                      />
                    </FormField>

                    <FormField
                      htmlFor="mpi_make_options"
                      name="mpi_make_options"
                      label="MPI make options"
                      required={formValues.mpi_type === "MPICH"}
                    >
                      <TextInput
                        id="mpi_make_options"
                        name="mpi_make_options"
                        placeholder="Enter MPI make options"
                        onChange={handleFormValueChange}
                      />
                    </FormField>
                  </Box>
                </Box>
              )}

              {/* For IntelMPI */}
              {formValues.mpi_type !== "IntelMPI" && (
                <Box gap="medium">
                  <FormField 
                  htmlFor="user" name="user" label="User" required={formValues.mpi_type !== "intelMPI"} >
                    <TextInput
                      id="user"
                      name="user"
                      placeholder="Enter a user name"
                      
                      onChange={handleFormValueChange}
                    />
                  </FormField>
                  <FormField
                    htmlFor="workdir"
                    name="workdir"
                    label="Working Directory"
                    required={formValues.mpi_type !== "intelMPI"}
                  >
                    <TextInput
                      id="workdir"
                      name="workdir"
                      placeholder=" Please Enter "
                      onChange={handleFormValueChange}
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
                    onChange={handleFormValueChange}
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
                    onChange={handleFormValueChange}
                  />
                </FormField>
              </Box>
            </Box>

            <Box gap="medium">
              <FormField
                htmlFor="dockerCommands"
                name="dockerCommands"
                label="Write docker commands for running the applications"
              >
                <Editor
                  id="dockerCommands"
                  name="dockerCommands"
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
                label="Application Image Name"
                required
              >
                <TextInput
                  id="finalimagename"
                  name="finalimagename"
                  placeholder="Please Enter Application Image Name"
                  onChange={handleFormValueChange}
                />
              </FormField>

              <FormField
                htmlFor="finalimagetag"
                name="finalimagetag"
                label="Application Image Tag"
                required
              >
                <TextInput
                  id="finalimagetag"
                  name="finalimagetag"
                  placeholder="Please Enter Application Image Tag"
                  onChange={handleFormValueChange}
                />
              </FormField>

              <FormField
                htmlFor="singularityimagename"
                name="singularityimagename"
                label="Application Singularity Image Name"
                required
              >
                <TextInput
                  id="singularityimagename"
                  name="singularityimagename"
                  placeholder="Please Enter Sigularity Image Name"
                  onChange={handleFormValueChange}
                />
              </FormField>
            </Box>
          </Box>
          <Box>
           
          </Box>
        {/* </Form> */}
      </Box>:<Box style={{alignItems:"center"}} >
        <Text>Please Select The MPI Type To View Containerization Form </Text></Box>}
    </Box>
  );
};
