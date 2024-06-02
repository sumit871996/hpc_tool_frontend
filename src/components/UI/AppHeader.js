import {
  ResponsiveContext,
  Header,
  Nav,
  Button,
  Menu,
  Text,
  Box,
  Avatar,
} from "grommet";
import { useContext } from "react";
import { Hpe } from "grommet-icons";
import { useNavigate } from "react-router-dom";

const items = [
  { label: "Home", path: "/home" },
];

const endItems = [
  { label: "Contact Us", path: "/contact_us" },
  { label: "Profile", path: "/profile" },
];

const AppHeader = () => {
  const size = useContext(ResponsiveContext);
  const navigate = useNavigate();

  const navToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  if(
  window.location.pathname !== "/"){
  return (
    <Header pad={"small"} background="black">
      <Box direction="row" gap="small" align="center">
        <Box
          direction="row"
          gap="small"
          style={{ cursor: "pointer", alignItems: "center", boxShadow: "none" }}
          onClick={() => {
            navigate("/home");
          }}
        >
          <Hpe size="xlarge" color="plain" />
          <Text color="text-strong" size="large" weight="bold">
            HPC-Containerization
          </Text>
        </Box>
      </Box>
      <Box>
        {!["xsmall", "small"].includes(size) ? (
          <Nav direction="row">
            {items.map((item) => (
              <Button
                style={
                  item.label == ""
                    ? {
                        backgroundColor: "rgb(230, 225, 225)",
                        borderRadius: "5px",
                      }
                    : { backgroundColor: "", borderRadius: "5px" }
                }
                label={item.label}
                key={item.label}
                onClick={() => {
                  navigate(`${item.path}`);
                }}
              />
            ))}
          </Nav>
        ) : (
          <Menu label="Menu" items={items} />
        )}
      </Box>

      <Box direction="row" gap="small">
        {!["xsmall", "small"].includes(size) ? (
          <Nav direction="row">
            <Button
              label="Contact Us"
              onClick={() => {
                navigate("/contact_us");
              }}
              style={{ borderRadius: "5px" }}
            />
            <Avatar
              background="rgb(255, 188, 68)"
              style={{ cursor: "pointer" }}
            >
              <Text color="black">JS</Text>
            </Avatar>
          </Nav>
        ) : (
          <Menu label="Menu" items={endItems} />
        )}
      </Box>
    </Header>
  );} else{
    return
  }
};

export default AppHeader;
