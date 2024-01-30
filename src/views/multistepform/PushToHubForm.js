import { Box, FormField, Header, Heading, TextInput } from "grommet"
import { useContext } from "react"
import { WizardContext } from "./WizardContext"

export const PushToHubForm=()=>{
    const {formValues, setFormValues,setDockerCommands,dockerCommands}= useContext(WizardContext)
    return(
        <Box alignSelf="center" gap="medium" pad={"small"}>
            <Header>
                <Heading>
                Add a new push to the Hub
                </Heading>
            </Header>
            <Box  gap="small" fill>
            <FormField
            htmlFor="docker_username"
            name="docker_username"
            label="Docker Username"
            >
                <TextInput
                 id="docker_username"
                 name="docker_username"
                 placeholder="Docker Username" />
                
            </FormField>
            <FormField
            htmlFor="docker_password"
            name="docker_password"
            label="Docker Password"
            >
                <TextInput 
                id="docker_username"
                name="docker_username"
                placeholder="Docker Password"
                />
            </FormField>
            </Box>
        </Box>
    )
}