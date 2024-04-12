import {
  Box,
  Button,
  Card,
  Form,
  FormField,
  Heading,
  Image,
  Text,
  TextInput,
} from "grommet";
import backgroundImg from "../assets/dashBackgroundImage.svg";
import hpeLogo from "../assets/HpeLogo.png";
import loginBackground from "../assets/loginscreen.jpg"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SigninPageView from "./SigninPageView";
export function LoginView() {
  const navigate = useNavigate();

  const LoginFormCardStyle = {
    width: "385px",
    height: "445px",
    padding: "25px",
  };

  const backgroundStyle = {
    backgroundImage: `url(${loginBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
  };

  return (
    <Box style={backgroundStyle} direction="row">
      <Box
        align="center"
        justify="center"
        height={"100vh"}
        width={"50%"}
      >
        <Box align="center" >
          <Box align="start">
            <img src={hpeLogo} alt="Hpelogo" />
            <Heading
              font="MetricHPEXS"
              style={{ color: "white" }}
              margin={{ top: "5%", bottom: "none" }}
            >
              <b>Hewlett Packard</b>
              <br />
              Enterprise
            </Heading>
            <Heading
              font="MetricHPEXS"
              style={{ color: "white" }}
              margin={{ bottom: "small" }}
            >
            <b>HPC Containerization Tool</b>
            </Heading>
            <Text font="MetricHPEXS" style={{ color: "white" }}>
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        height={"100vh"}
        width={"50%"}
        align="center"
        justify="center"
      >
        <Card style={LoginFormCardStyle}>
          <SigninPageView />
        </Card>
        
      </Box>
    </Box>
  );
}
