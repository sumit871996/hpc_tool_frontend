import { Text, Box, Select } from "grommet";
import { useState } from "react";
import { OpenMPIForm } from "../components/MPIForms/OpenMPIForm";
import { MPICHForm } from "../components/MPIForms/MPICHForm";
import { IntelMPIForm } from "../components/MPIForms/IntelMPIForm";
const HomeView = (props) => {
  const [selectedMPI, setSelectedMPI] = useState("OpenMPI");

  const items = ["OpenMPI", "MPICH", "IntelMPI"];
  return (
    <Box fill="horizontal">
      <Box alignSelf="center" margin={{ top: "50px" }}>
        <Box width="300px" margin={{ bottom: "30px" }}>
          <Text>MPI Selection </Text>
          <Select
            id="select-example"
            name="select-example"
            placeholder="Select item"
            options={items}
            value={selectedMPI}
            onChange={({ option }) => setSelectedMPI(option)}
          />
        </Box>
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
