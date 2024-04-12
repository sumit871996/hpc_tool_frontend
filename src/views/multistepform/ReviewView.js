import {
  Box,
  Button,
  FormField,
  Heading,
  Layer,
  List,
  Notification,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
  TextInput,
} from "grommet";
import {
    RotateRight,
  StatusCritical,
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknown,
} from "grommet-icons";
import { useContext, useEffect, useState } from "react";
import { WizardContext } from "./WizardContext";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ReviewView = () => {
  const location = useLocation()
  const [buildStatus, setBuildStatus] = useState("-");
  const [buildLogs, setBuildLogs] = useState("-");
  const [showSpinner, setShowSpinner] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [dockerPass,setDockerPass]=useState();
  const [dockerUser,setDockerUser]=useState();
  const [toastTitle, setToastTitle] = useState("Review Status");
  const [toastStatus, setToastStatus] = useState("critical");
  const [toastMessage, setToastMessage] = useState(
    "Failed To Load Status Of Build"
  );
  const {buildId}= location.state;

  useEffect(() => {
    statusCall();
  }, []);

  const statusCall = (e) => {
    axios
      .get(`http://localhost:8081/home/getStatus/${buildId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        const status = response.data.status;
        const logs= response.data.logs;
        setBuildLogs(logs);
        setBuildStatus(status);
        setShowSpinner(false);
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowNotification(true);
        console.log(error);
      });
  };

  const onClose = (e) => {
    e.preventDefault();
    setShowNotification(false);
  };

  return (
    <Box
      pad="large"
      style={{ alignItems: "center",justifyContent:"center"}}
      fill
     
    >
      <Heading>Review Page</Heading>
      <Box fill pad={"large"}>
      <Table style={{  justifyContent: "center" }}>
        <TableBody >
          <TableRow style={{padding:"10px" }} >
            <TableCell style={{minWidth:"100px"}}>
              <strong>Build Id :</strong>
            </TableCell>
            <TableCell>{buildId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Build Status :</strong>
            </TableCell>
            <TableCell>
           
              <Box gap="small" direction="row">
                {buildStatus === "success".toLowerCase() && (
                  <Box
                    direction="row"
                    gap="1%"
                    style={{ alignItems: "center" }}
                  >
                    <StatusGoodSmall color="green" /> <Text>Success</Text>
                  </Box>
                )}
                {buildStatus.toLowerCase() === "failure".toLowerCase() && (
                  <Box
                    direction="row"
                    gap="1%"
                    style={{ alignItems: "center" }}
                  >
                    <StatusCriticalSmall color="red" /> <Text>Failed</Text>
                  </Box>
                )}
                {buildStatus.toLowerCase() === "inprogress".toLowerCase() && (
                  <Box
                    direction="row"
                    gap="1%"
                    style={{ alignItems: "center" }}
                  >
                    <StatusGoodSmall color="orange" /> <Text>In Progress</Text>
                  </Box>
                )}
                {buildStatus.toLowerCase() === "unstable".toLowerCase() && (
                  <Box
                    direction="row"
                    gap="1%"
                    style={{ alignItems: "center" }}
                  >
                    <StatusUnknown color="grey" /> <Text>Unstable</Text>
                  </Box>
                )}
                <RotateRight onClick={statusCall}/>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow style={{ alignItems: "center" }}>
            <TableCell>
              <strong>Build Log:</strong>
            </TableCell>
            <TableCell><Box style={{maxHeight:"200px"}}><div style={{overflowY:"scroll"}}>{buildLogs}</div></Box></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </Box>
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
            <Text margin="10px">Loading</Text>
          </Box>
        </Layer>
      )}
      {showNotification && (
        <Notification
          toast
          status={toastStatus}
          message={toastMessage}
          title={toastTitle}
          onClose={onClose}
        />
      )}
    </Box>
  );
};
export default ReviewView;
