import { Box, Button, Header, Heading, Select, Text } from "grommet";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-docker";
import "prismjs/themes/prism.css";
import {
  useContext,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import "antd/dist/reset.css";
import { WizardContext } from "./WizardContext";
import axios from "../../utils/axios";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/antd";

export const ContainerizationFormView = () => {
  const {
    activeIndex,
    setActiveIndex,
    MPIValue,
    selectedOption,
    stages,
    setStages,
    currentStep,
    setCurrentStep,
    formRef, formData, setFormData,
  } = useContext(WizardContext);

  const [errors, setErrors] = useState("");

  useEffect(() => {
    const useCaseDetailsURL = `/form/getusecases/${selectedOption.id}`;
    axios
      .get(useCaseDetailsURL)
      .then((response) => {
        console.log("useCaseDetails", response.data);
        setStages(response?.data?.stages);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [MPIValue]);


  const getCurrentSchema = () => {
    return stages[currentStep]?.rjsf_schema?.form_schema;
  };

  const handleOnChange = ({ formData: newFormData }) => {
    setFormData((prev) => ({ ...prev, ...newFormData }));
  };



  const handleError = (error) => {
    setErrors(error);
  };

  const getUISchema = ()=>{
    return stages[currentStep]?.ui_schema;  
  }

  return (
    <Box fill gap="medium">
      {MPIValue && stages.length > 0 ? (
        <Box margin={{ left: "32%", right: "32%" }}>
          <h2>{stages[currentStep]?.name}</h2>
          <Form
            ref={formRef}
            schema={getCurrentSchema()}
            formData={formData}
            onChange={handleOnChange}
            onError={handleError}
            validator={validator}
            uiSchema={getUISchema()}
            children={true}
          />
        </Box>
      ) : (
        <Box style={{ alignItems: "center" }}>
          <Text>
            Please Select The MPI Type To View Containerization Form{" "}
          </Text>
        </Box>
      )}
    </Box>
  );
};
