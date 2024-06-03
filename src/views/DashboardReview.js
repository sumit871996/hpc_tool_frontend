import axios from "axios";
import { Box, DataTable, Heading, Text } from "grommet";
import { CircleInformation, FormView, StatusCriticalSmall, StatusGoodSmall, StatusUnknown } from "grommet-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardReview = () => {
  const navigate= useNavigate();
  const [data,setData]=useState([]);
  const userId=localStorage.getItem("user_id");
  useEffect(()=>{
    axios.get(`http://localhost:8081/home/getBuilds/${userId}`,{headers: {
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    }},).then((res)=>{
      setData(res.data)
    }).catch((err)=>(
      console.log(err)
    ))
  },[])

  const reviewBuild=(e,buildId)=> {
    e.preventDefault();
    navigate("/review" , {state:{buildId}})
  }

  const formatedDate=(unformattedDate)=>{
    const date = new Date(unformattedDate);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()} ${date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
    return formattedDate;
  }

  const COLUMNS = [
    {
      property: "build_id",
      header: "Build Id",
      render: (datum) => (
        <Text weight="bold" color={"555555"}>
          {datum.buildId}
        </Text>
      ),
      primary:true
    },
    {
      property: "status",
      header: "Status",
      render: (datum) => (
        
          <>
          {datum.finalBuildStatus.toLowerCase() === "success".toLowerCase() && (
            <Box
              direction="row"
              gap="1%"
              style={{ alignItems: "center" }}
            >
              <StatusGoodSmall color="green" /> <Text>Success</Text>
            </Box>
          )}
          {datum.finalBuildStatus.toLowerCase() === "failure".toLowerCase() && (
            <Box
              direction="row"
              gap="1%"
              style={{ alignItems: "center" }}
            >
              <StatusCriticalSmall color="red" /> <Text>Failed</Text>
            </Box>
          )}
          {datum.finalBuildStatus.toLowerCase() === "inprogress".toLowerCase() && (
            <Box
              direction="row"
              gap="1%"
              style={{ alignItems: "center" }}
            >
              <StatusGoodSmall color="orange" /> <Text>In Progress</Text>
            </Box>
          )}
          {datum.finalBuildStatus.toLowerCase() === "unstable".toLowerCase() && (
            <Box
              direction="row"
              gap="1%"
              style={{ alignItems: "center" }}
            >
              <StatusUnknown color="grey" /> <Text>Unstable</Text>
            </Box>
          )}
          </>
      ),
    },
    {
      property: "build_on",
      header: "Build On",
      render: (datum) => (
        <Text color={"555555"}>
          {formatedDate(datum.timestamp)}
        </Text>
      ),
    },
    {
      property: "user",
      header: "User",
      render: (datum) => (
        <Text color={"555555"}>
          {datum["docekerUser"]}
        </Text>
      ),
    },
    {
      property: "info",
      header: "Info",
      render: (datum) => (
        <Box style={{cursor:"pointer"}} direction="row" onClick={(e)=>reviewBuild(e,datum.buildId)} align="center">
          <FormView  size="large"/>
          <Text>View</Text>
        </Box>
      ),
    },
  ];

  return <Box gap="small" fill pad={"medium"} style={{minHeight:"80vh"}}>
    <Heading>
      Build Dashboard
    </Heading>
    <Box>
    <DataTable columns={COLUMNS} data={data}/>
    </Box>
  </Box>;
};
export default DashboardReview;
