import { Menu, Text, Box, Select } from "grommet";
import { useState } from "react";
import { OpenMPIForm } from "../components/MPIForms/OpenMPIForm";
import { MPICHForm } from "../components/MPIForms/MPICHForm";
import { IntelMPIForm } from "../components/MPIForms/IntelMPIForm";
const HomeView = (props) => {
  const [selectedMPI, setSelectedMPI] = useState("OpenMPI");

  const items = ["OpenMPI", "MPICH", "IntelMPI"];
  return (
    <Box fill="horizontal">
      <Box width="300px">
        <Text>Choose the MPI </Text>
        <Select
          id="select-example"
          name="select-example"
          placeholder="Select item"
          options={items}
          value={selectedMPI}
          onChange={({ option }) => setSelectedMPI(option)}
        />
      </Box>
      <Box alignSelf="center" margin={{ top: "50px" }}>
        {selectedMPI === "OpenMPI" ? (
          <OpenMPIForm />
        ) : selectedMPI === "MPICH" ? (
          <MPICHForm />
        ) : (
          <IntelMPIForm />
        )}
      </Box>
    </Box>
  );
};

export default HomeView;
