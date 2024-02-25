import { useContext } from "react"
import { WizardContext } from "./WizardContext"
import { Box, Heading, Paragraph, Text } from "grommet";

export const StepHeader =({summaryId, titleId, descriptionId})=>{
    const {activeIndex,activeStep, id , steps} = useContext(WizardContext);
    return (
        <Box id={id} gap="small" flex={false} style={{alignItems:"center"}}>
        <Text id={summaryId} size='small' weight={"bold"}>
          Step {activeStep} of {steps.length}
        </Text>
        <Heading margin="none" id={titleId} size='small'>
          {steps[activeIndex].title || `Step ${activeStep} title`}
        </Heading>
       <Paragraph>{steps[activeIndex].description}</Paragraph>
      </Box>
    );

}