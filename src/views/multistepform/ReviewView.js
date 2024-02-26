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

const ReviewView = () => {
  const [buildStatus, setBuildStatus] = useState("-");
  const [showSpinner, setShowSpinner] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [toastTitle, setToastTitle] = useState("Review Status");
  const [toastStatus, setToastStatus] = useState("critical");
  const [toastMessage, setToastMessage] = useState(
    "Failed To Load Status Of Build"
  );

  const {
    dockerUser,
    setDockerUser,
    dockerPass,
    setDockerPass,
    buildId,
    setBuildId,
  } = useContext(WizardContext);
  useEffect(() => {
    statusCall();
  }, []);

  const statusCall = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8081/home/getStatus/${buildId}`)
      .then((response) => {
        console.log(response);
        const status = response.data;
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
      pad={{ left: "large", right: "large" }}
      style={{ alignItems: "center" }}
    >
      <Table style={{ width: "50%", justifyContent: "center" }}>
        <TableBody>
          <TableRow style={{ alignItems: "center" }}>
            <TableCell>
              <strong>Build Id :</strong>
            </TableCell>
            <TableCell>{buildId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Docker User :</strong>
            </TableCell>
            <TableCell>{dockerUser}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Docker Password :</strong>
            </TableCell>
            <TableCell>{dockerPass}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Build Status :</strong>
            </TableCell>
            <TableCell>
              <Box gap="small" direction="row">
                {buildStatus.toLowerCase() === "success".toLowerCase() && (
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
        </TableBody>
      </Table>

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
