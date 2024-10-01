import dockerLogo from "../../assets/docker_logo.svg";
import {
  Avatar,
  Box,
  FileInput,
  FormField,
  Header,
  Heading,
  Image,
  Layer,
  Notification,
  Spinner,
  Text,
  TextInput,
} from "grommet";
import { useContext, useState } from "react";
import { WizardContext } from "./WizardContext";
import axios from "axios";

export const PushToHubForm = () => {
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const {
    formValues,
    setFormValues,
    setDockerCommands,
    dockerCommands,
    dockerIntelMPIFile,
    dockerMPICHFile,
    dockerOpenMPIFile,
    buildCommand,
    dockerfilename,
    baseimagename,
    baseimagetag,
    basebuildcommand,
    basedockerfilename,
    dockerUser,
    setDockerUser,
    dockerPass,
    setDockerPass,
    buildId,
    setBuildId,
    finalDockerfile,
    setDockerfile,
    dockerBuildAppCommand,
    setDockerBuildAppCommand,
    dockerFormData,setDockerFormData,

  } = useContext(WizardContext);
  const [filename, setFilename] = useState("");
  const [dockerData, setDockerData] = useState({
    docker_username: "",
    docker_password: "",
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDockerFormData((prevValues) => ({
      ...prevValues,
      zipFile: file,
    }));
    setFilename(file.name);
  };


  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDockerFormData({ ...dockerFormData, [name]: value });
  };

  return (
    // <Box
    //   style={{ justifyContent: "center", alignItems: "center" }}
    //   gap="medium"
    //   height={"100%"}
    // >
    //   <Box gap="small" fill align="center">
    //     <FormField
    //       htmlFor="docker_username"
    //       name="docker_username"
    //       label="Docker Username"
    //       required
    //     >
    //       <TextInput
    //         id="docker_username"
    //         name="docker_username"
    //         placeholder="Docker Username"
    //         value={dockerFormData.docker_username}
    //         onChange={handleChange}
    //       />
    //     </FormField>
    //     <FormField
    //       htmlFor="docker_password"
    //       name="docker_password"
    //       label="Docker Password"
    //       required
    //     >
    //       <TextInput
    //         id="docker_password"
    //         name="docker_password"
    //         placeholder="Docker Password"
    //         value={dockerFormData.docker_password}
    //         onChange={handleChange}
    //         type="password"
    //       />
    //     </FormField>
    //     <FormField
    //       // error="required"
    //       type="file"
    //       accept=".zip"
    //       onChange={handleFileChange}
    //       required
    //       htmlFor="zipFile"
    //       name="zipFile"
    //       label="Application Source Code"
    //       defaultValue=""
    //     ></FormField>

    //     {/* <Box

    //       width={"xxsmall"}
    //       height={"xxsmall"}
    //       background={"red"}
    //       style={{ borderRadius: "50%" }}
    //       onClick={uploadToDocker}
    //     >
    //       <Image src={dockerLogo} style={{ borderRadius: "50%" }} />

    //     </Box> */}
    //   </Box>
      
    // </Box>
    <Box></Box>
  );
};
