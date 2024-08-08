import { Box, Form, ResponsiveContext } from "grommet";
import React,{forwardRef, useContext } from "react";
import { WizardContext } from "./WizardContext";
import { StepHeader } from "./StepHeader";
import "../../css/horizontal-timeline.css";

export const StepContent =  ({onSubmit})  => {
  const size = useContext(ResponsiveContext);

  const { activeIndex, setActiveIndex, id, steps, formValues, setFormValues ,
    errorMPIVersion,setErrorMPIVersion,
    errorICCVersion, setErrorICCVersion,
    errorTBBVersion,setErrorTBBVersion,

    errorUser,setErrorUser,
    errorWorkDir,setErrorWorkDir,

    errorImageName,setErrorImageName,
    errorImageTag, setErrorImageTag,
    errorAIN,setErrorAIN,
    errorAIT,setErrorAIT,
    errorASIN, setErrorASIN,containerizationRef } =
    useContext(WizardContext);

  const handleSubmit = (event) => {
    if (activeIndex < steps.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (onSubmit) {
      onSubmit(event);
    }
  };
 // Clone the active step component and attach the ref
 const ActiveStepComponent = steps[activeIndex].input;
 const ActiveStepWithRef = React.cloneElement(ActiveStepComponent, { ref: containerizationRef });

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
                <p>Use case Form</p>
              </li>
              <li>
                <div
                  className={activeIndex >= 1 ? "checkActive" : "checkCircle"}
                ></div>
                <p>Containerization Form</p>
              </li>
              <li>
                <div
                  className={activeIndex >= 2 ? "checkActive" : "checkCircle"}
                ></div>
                <p>Docker File View</p>
              </li>
              <li>
                <div
                  className={activeIndex >= 3 ? "checkActive" : "checkCircle"}
                ></div>
                <p>Upload Docker Image</p>
              </li>
              {/* <li>
                <div
                  className={activeIndex >= 3 ? "checkActive" : "checkCircle"}
                ></div>
                <p>Review</p>
              </li> */}
            </ul>
            
          </div>
        </Box>
      </Box>
      <Box>
        <StepHeader />
        <Box pad={"medium"}>
          <Form id={`${id}-form`} onSubmit={handleSubmit} messages={{
                        required: "This is a required field.",
                      }}>
            {ActiveStepWithRef}
          </Form>
        </Box>
      </Box>
    </Box>
  );
};
