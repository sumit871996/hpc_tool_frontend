import { Box, Button, Header, Heading, Select, Text } from "grommet";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-docker";
import "prismjs/themes/prism.css";
import { useContext, useEffect, useRef, useState } from "react";
import "antd/dist/reset.css";
import { WizardContext } from "./WizardContext";
import axios from "../../utils/axios";

export const UsecaseForm = () => {
  const [useCaseArray, setUseCaseArray] = useState([]);
  const [useCasesList, setUseCasesList] = useState([]);

  const {setSelectedOption, setMPIValue
  } = useContext(WizardContext);

  const handleFormValueChange = (e) => {
    const selectedOption = e.value;
    setSelectedOption(e.value);
    setMPIValue(selectedOption.value);
  };

  const useCasesURL = "/form/getusecases";
  useEffect(() => {
    axios
      .get(useCasesURL)
      .then((response) => {
        setUseCasesList(response.data);
        const useCaseArray = Object.entries(response.data).map(
          ([id, value]) => {
            return { value, id: Number(id) };
          }
        );
        setUseCaseArray(useCaseArray);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <Box fill gap="medium">
      <Box align="center" gap="medium">
        <Header>
          <Heading weight={"bold"} level={3}>
            Select Use case
          </Heading>
        </Header>
        <Select
          required
          id="mpi_type"
          name="mpi_type"
          options={useCaseArray}
          placeholder="Select use case"
          onChange={handleFormValueChange}
        />
      </Box>
    </Box>
  );
};
