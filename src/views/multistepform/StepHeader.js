import { useContext } from "react"
import { WizardContext } from "./WizardContext"
import { Box, Heading, Paragraph, Text } from "grommet";

export const StepHeader =({summaryId, titleId, descriptionId})=>{
    const {activeIndex,activeStep, id , steps} = useContext(WizardContext);
    return (
        <Box id={id} gap="small" flex={false}>
        <Text id={summaryId} size='small'>
          Step {activeStep} of {steps.length}
        </Text>
        <Heading margin="none" id={titleId} size='small'>
          {steps[activeIndex].title || `Step ${activeStep} title`}
        </Heading>
        {typeof steps[activeIndex].description === 'string' ? (
          <Paragraph size="small" margin="none" id={descriptionId}>
            {steps[activeIndex].description}
          </Paragraph>
        ) : (
          steps[activeIndex].description
        )}
      </Box>
    );

}