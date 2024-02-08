import {ReactComponent as dockerLogo} from "../../assets/docker_logo.svg"
import {
  Avatar,
  Box,
  FileInput,
  FormField,
  Header,
  Heading,
  Notification,
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
  const { formValues, setFormValues, setDockerCommands, dockerCommands,dockerIntelMPIFile,dockerMPICHFile,dockerOpenMPIFile,buildcommand,dockerfilename,baseimagename,baseimagetag,basedockerfile,basebuildcommand,basedockerfilename  } =
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
    console.log("Upload Image")
    let data;
    if (formValues.mpi_type == "IntelMPI") {
      data = {
        imagename: formValues.imagename,
        imagetag: formValues.imagetag,
        dockeruser: dockerData.docker_username,
        dockerpassword: dockerData.docker_password,
        dockefile: dockerIntelMPIFile,
        buildcommand:buildcommand,
        dockerfilename:dockerfilename,

        baseimagename:baseimagename,
        baseimagetag:baseimagetag,
        basedockerfile:basedockerfile,
        basebuildcommand:basebuildcommand,
        basedockerfilename:basedockerfilename
      };
    }
    else if (formValues.mpi_type == "MPICH") {
      data = {
        imagename: formValues.imagename,
        imagetag: formValues.imagetag,
        dockeruser: dockerData.docker_username,
        dockerpassword: dockerData.docker_password,
        dockefile: dockerMPICHFile,
        buildcommand:buildcommand,
        dockerfilename:dockerfilename,

        baseimagename:baseimagename,
        baseimagetag:baseimagetag,
        basedockerfile:basedockerfile,
        basebuildcommand:basebuildcommand,
        basedockerfilename:basedockerfilename
      };
    }
    else if (formValues.mpi_type == "OpenMPI") {
      data = {
        imagename: formValues.imagename,
        imagetag: formValues.imagetag,
        dockeruser: dockerData.docker_username,
        dockerpassword: dockerData.docker_password,
        dockefile: dockerOpenMPIFile,
        buildcommand:buildcommand,
        dockerfilename:dockerfilename,

        baseimagename:baseimagename,
        baseimagetag:baseimagetag,
        basedockerfile:basedockerfile,
        basebuildcommand:basebuildcommand,
        basedockerfilename:basedockerfilename
      };
    }

    const pdata={
      dockerhubpassword:dockerData.docker_password,
      dockerhubusername:dockerData.docker_username,
      // zipFile:dockerData.zipFile
    }

    const finaldata={
      ...data,
      ...pdata
    }

     const formData=new FormData();
     formData.append("inputData",JSON.stringify(data));
     formData.append("file",dockerData.zipFile);

    // const Sfinal= JSON.stringify(finaldata);
    // console.log(Sfinal)
    // const ndata={
    //   inputData:Sfinal,
    //   file:dockerData.zipFile
    // }
    console.log(data)
    console.log(pdata)
    axios
      .post("http://localhost:8081/home/buildandpush",formData)
      .then((res) => {
        console.log(res.data)
        setNotificationStatus("normal");
        setNotificationTitle("Upload To Docker");
        setNotificationMessage("Image is uploaded to docker successfully")
        setShowNotification(true)
      })
      .catch((error) => {
        console.log(error);
        setNotificationStatus("critical");
        setNotificationTitle("Upload To Docker");
        setNotificationMessage("Failed to upload image to docker")
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
        <Avatar background="orange" onClick={uploadToDocker} width={"50px"} >
          <img src={dockerLogo} width={"20px"} height={"20px"}/>
        </Avatar>
      </Box>{showNotification &&
      <Notification
            toast
            title={notificationTitle}
            message={notificationMessage}
            status={notificationStatus}
            time={5000}
            onClose={()=>{setShowNotification(false)}}
            />}
    </Box>
  );
};
