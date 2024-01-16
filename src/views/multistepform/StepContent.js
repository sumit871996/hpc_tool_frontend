import { Box, Form, ResponsiveContext } from "grommet"
import { useContext } from "react";
import { WizardContext } from './WizardContext';
import { StepHeader } from "./StepHeader";

export const StepContent =({ onSubmit })=>{
    const size = useContext(ResponsiveContext);

    const {
        activeIndex,
        setActiveIndex,
        id,
        steps
    } =useContext(WizardContext);

    const handleSubmit = event => {
        if(activeIndex < steps.length -1){
            setActiveIndex(activeIndex + 1);
        } else if (onSubmit) {
            onSubmit(event)
        }
    };

    return(
        <Box>
            <StepHeader />
            <Box>
                <Form id={`${id}-form`}
                onSubmit={handleSubmit}
                >
                {steps[activeIndex].input}
                </Form>
            </Box>
        </Box>
    )
};
