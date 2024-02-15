import { Box, FormField, Heading, List, Table, TableBody, TableCell, TableRow, Text } from "grommet";
import { StatusCritical, StatusCriticalSmall, StatusGoodSmall } from "grommet-icons";
import { useContext, useEffect, useState } from "react";
import { WizardContext } from "./WizardContext";


const ReviewView=()=>{
    const [buildStatus,setBuildStatus]=useState("")
    const {dockerUser, setDockerUser,dockerPass,setDockerPass,buildId, setBuildId} =
    useContext(WizardContext); 
    useEffect(()=>{
        console.log("Axios call for Status")
        setBuildStatus("Success")
    },[]);

    return(
        <Box  pad={{left:"large",right:"large"}} style={{alignItems:"center"}}>
           {/* <Heading>Review Page</Heading>  */}
           <Table style={{width:"50%",justifyContent:"center"}} >
            <TableBody >
                <TableRow style={{alignItems:"center"}}>
                    <TableCell ><strong>Build Id :</strong></TableCell>
                    <TableCell>{buildId}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>Docker User :</strong></TableCell>
                    <TableCell>{dockerUser}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>Docker Password :</strong></TableCell>
                    <TableCell>{dockerPass}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>Build Status :</strong></TableCell>
                    <TableCell>
                       
                            {buildStatus.toLowerCase()==="success".toLowerCase()?
                            <Box direction="row" gap="1%" style={{alignItems:"center"}} >
                                <StatusGoodSmall color="green"/> <Text>Success</Text>
                            </Box>:
                            <Box direction="row" gap="1%" style={{alignItems:"center"}} >
                            <StatusCriticalSmall color="red"/> <Text>Failed</Text>
                        </Box>
                            }
                        
                    </TableCell>
                </TableRow>
            </TableBody>
           </Table>
           
        </Box>
    );
}
export default ReviewView