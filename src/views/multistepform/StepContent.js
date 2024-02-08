import { Box, Form, ResponsiveContext } from "grommet";
import { useContext } from "react";
import { WizardContext } from "./WizardContext";
import { StepHeader } from "./StepHeader";
import "../../css/horizontal-timeline.css";

export const StepContent = ({ onSubmit }) => {
  const size = useContext(ResponsiveContext);

  const { activeIndex, setActiveIndex, id, steps, formValues, setFormValues } =
    useContext(WizardContext);

  const handleSubmit = (event) => {
    console.log("Check Validation")
    if (activeIndex < steps.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (onSubmit) {
      onSubmit(event);
    }
  };

  return (
    <Box gap="medium">
      <Box
        width="100%"
        style={{ alignItems: "center" }}
        pad={{ left: "small", right: "small" }}
      >
        <Box width={"80%"} margin={{top:"2%"}}>
          <div className="timeline">
            <span className="line-default" />
            <ul className="timelinecheck">
              <li>
                <div
                  className={activeIndex >= 0 ? "checkActive" : "checkCircle"}
                ></div>
                <p>Containerization Form</p>
              </li>
              <li>
                <div
                  className={activeIndex >= 1 ? "checkActive" : "checkCircle"}
                ></div>
                <p>Docker File View</p>
              </li>
              <li>
                <div
                  className={activeIndex >= 2 ? "checkActive" : "checkCircle"}
                ></div>
                <p>Upload Docker Image</p>
              </li>
            </ul>
          </div>
        </Box>
      </Box>
      <Box>
        <StepHeader />
        <Box pad={"medium"}>
          <Form id={`${id}-form`} onSubmit={handleSubmit}>
            {steps[activeIndex].input}
          </Form>
        </Box>
      </Box>
    </Box>
  );
};
