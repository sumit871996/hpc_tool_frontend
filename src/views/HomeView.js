import { Menu, Text, Box } from "grommet"
import { useState } from "react"
import { OpenMPIForm } from "../components/MPIForms/OpenMPIForm";
import { MPICHForm } from "../components/MPIForms/MPICHForm";
import { IntelMPIForm } from "../components/MPIForms/IntelMPIForm";
const HomeView = (props) => {

    const [selectedMPI, setSelectedMPI] = useState("OpenMPI");

    const items = [
        {
            label: "OpenMPI", onClick: () => { setSelectedMPI(items[0].label) }
        },
        { label: "MPICH", onClick: () => { setSelectedMPI(items[1].label) } },
        { label: "IntelMPI", onClick: () => { setSelectedMPI(items[2].label) } }]
    return (
        <Box>
            <Box alignSelf="center" width="medium" align="center">
                <Text>Choose the MPI </Text>
                <Menu label="MPI Options" items={items} width="medium" />
            </Box>
            <Box alignSelf="center" margin={{ top: "50px" }}>
                {(selectedMPI === "OpenMPI") ? <OpenMPIForm /> :
                    ((selectedMPI === "MPICH") ? <MPICHForm /> : <IntelMPIForm />)}</Box>
        </Box>)
}

export default HomeView