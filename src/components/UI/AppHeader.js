import {
  ResponsiveContext,
  Header,
  Nav,
  Button,
  Menu,
  Text,
  Box,
} from "grommet";
import { useContext } from "react";
import { Hpe } from "grommet-icons";
import { useNavigate } from "react-router-dom";

const items = [
  { label: "Home", path: "/" },
  // { label: 'About', path: '/about' },
  // { label: 'Signup', path: '/signup' },
  // { label: 'Products', path: '/products' },
  { label: "Team", path: "/contact" },
];

const AppHeader = () => {
  const size = useContext(ResponsiveContext);
  const navigate = useNavigate();

  return (
    <Header margin={{ top: "12" }}>
      <Box direction="row" gap="small">
        <Hpe size="medium" color="plain" />
        <Box>
          <Text color="text-strong" size="large" weight="bold">
            HPE
          </Text>
        </Box>
      </Box>
      {!["xsmall", "small"].includes(size) ? (
        <Nav direction="row" gap="small">
          {items.map((item) => (
            <Button
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
    </Header>
  );
};

export default AppHeader;
