import  dockerLogo from "../../assets/docker_logo.svg"
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
  const [notificationTitle,setNotificationTitle]=useState("");
  const [notificationMessage,setNotificationMessage]=useState("");
  const [notificationStatus,setNotificationStatus]=useState("");
  const [showNotification,setShowNotification]=useState(false);
  const [showSpinner,setShowSpinner]=useState(false)
  const { formValues, setFormValues, setDockerCommands, dockerCommands,dockerIntelMPIFile,dockerMPICHFile,dockerOpenMPIFile,buildCommand,dockerfilename,baseimagename,baseimagetag,basebuildcommand,basedockerfilename,dockerUser, setDockerUser,dockerPass,setDockerPass,buildId, setBuildId,finalDockerfile,setDockerfile,dockerBuildAppCommand, setDockerBuildAppCommand} =
    useContext(WizardContext); 
  const [filename, setFilename] = useState("");
  const [dockerData, setDockerData] = useState({
    docker_username: "",
    docker_password: "",
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDockerData((prevValues) => ({
      ...prevValues,
      zipFile: file,
    }));
    setFilename(file.name);
  };

  const uploadToDocker = (e) => {
    e.preventDefault();
    setShowSpinner(true)
    console.log("Upload Image")
    let data;
    setDockerUser(dockerData.docker_username)
    setDockerPass(dockerData.docker_password)
    if (formValues.mpi_type == "IntelMPI") {
      data = {
        imagename: formValues.finalimagename,
        imagetag: formValues.finalimagetag,
        dockeruser: dockerData.docker_username,
        dockerpassword: dockerData.docker_password,
        dockerfile: dockerfilename,
        buildcommand:dockerBuildAppCommand,
        dockerfilename:`DockerFile${formValues.finalimagename}`,

        baseimagename:formValues.imagename,
        baseimagetag:formValues.imagetag,
        basedockerfile:dockerIntelMPIFile,
        basebuildcommand:buildCommand,
        basedockerfilename:basedockerfilename
      };
    }
    else if (formValues.mpi_type == "MPICH") {
      data = {
        imagename: formValues.finalimagename,
        imagetag: formValues.finalimagetag,
        dockeruser: dockerData.docker_username,
        dockerpassword: dockerData.docker_password,
        dockerfile: dockerfilename,
        buildcommand:dockerBuildAppCommand,
        dockerfilename:`DockerFile${formValues.finalimagename}`,

        baseimagename:formValues.imagename,
        baseimagetag:formValues.imagetag,
        basedockerfile:dockerMPICHFile,
        basebuildcommand:buildCommand,
        basedockerfilename:basedockerfilename
      };
    }
    else if (formValues.mpi_type == "OpenMPI") {
      data = {
        imagename: formValues.finalimagename,
        imagetag: formValues.finalimagetag,
        dockeruser: dockerData.docker_username,
        dockerpassword: dockerData.docker_password,
        dockerfile: dockerfilename,
        buildcommand:dockerBuildAppCommand,
        dockerfilename:`DockerFile${formValues.finalimagename}`,

        baseimagename:formValues.imagename,
        baseimagetag:formValues.imagetag,
        basedockerfile:dockerOpenMPIFile,
        basebuildcommand:buildCommand,
        basedockerfilename:basedockerfilename
      };
    }

     const formData=new FormData();
     formData.append("inputData",JSON.stringify(data));
     formData.append("file",dockerData.zipFile);

   
    axios
      .post("http://localhost:8081/home/buildandpush",formData)
      .then((res) => {
        console.log(res.data)
        setBuildId(res.data.buildId);
        setNotificationStatus("normal");
        setNotificationTitle("Upload To Docker");
        setNotificationMessage("Image is uploaded to docker successfully")
        setShowSpinner(false)
        setShowNotification(true)
      })
      .catch((error) => {
        console.log(error);
        setNotificationStatus("critical");
        setNotificationTitle("Upload To Docker");
        setNotificationMessage("Failed to upload image to docker")
        setShowSpinner(false)
        setShowNotification(true)
      });
  };

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setDockerData({...dockerData,[name]:value});
  }

  return (
    <Box style={{justifyContent:"center",alignItems:"center"}} gap="medium" height={"100%"}>
      <Box gap="small" fill align="center" >
        <FormField
          htmlFor="docker_username"
          name="docker_username"
          label="Docker Username"
          required
        >
          <TextInput
            id="docker_username"
            name="docker_username"
            placeholder="Docker Username"
            onChange={handleChange}
          />
        </FormField>
        <FormField
          htmlFor="docker_password"
          name="docker_password"
          label="Docker Password"
          required
        >
          <TextInput
            id="docker_password"
            name="docker_password"
            placeholder="Docker Password"
            onChange={handleChange}
          />
        </FormField>
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
        {/* <Avatar background="orange" onClick={uploadToDocker} width={"50px"} > */}
        <Box width={"xxsmall"} height={"xxsmall"} background={"red"} style={{borderRadius:"50%"}} onClick={uploadToDocker}>
          <Image src={dockerLogo} style={{borderRadius:"50%"}}/>
          </Box>
        {/* </Avatar> */}
      </Box>
      {showNotification &&
      <Notification
            toast
            title={notificationTitle}
            message={notificationMessage}
            status={notificationStatus}
            time={5000}
            onClose={()=>{setShowNotification(false)}}
            />}
    {showSpinner === true && (
        <Layer>
          <Box
            align="center"
            justify="center"
            direction="row"
            alignSelf="center"
            pad="medium"
          >
            <Spinner />
            <Text margin='10px'>Pushing TO Docker...</Text>
          </Box>
        </Layer>
      )}
    </Box>
  );
};
