import { Box, Button, Header, Heading, Select, Text } from "grommet";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-docker";
import "prismjs/themes/prism.css";
import { useContext, useEffect, useRef, useState } from "react";
import 'antd/dist/reset.css';
import { WizardContext } from "./WizardContext";
import axios from "axios";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/antd";

export const ContainerizationFormView = () => {
  const {
    setDockerCommands,
    errorAIN,
    activeIndex,
    setActiveIndex,
    currentStep, setCurrentStep,
    stages, setStages
  } = useContext(WizardContext);

  useEffect(() => {}, [errorAIN]);

  const [finalfile, setFinalFile] = useState("");

  const [useCasesList, setUseCasesList] = useState({});
  const [useCaseArray, setUseCaseArray] = useState([]);
  // const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [MPIValue, setMPIValue] = useState("");
  const [errors, setErrors] = useState("");
  const formRef = useRef(null);

  const handleFormValueChange = (e) => {
    const selectedOption = e.value;
    console.log("Selected option", selectedOption);
    setMPIValue(selectedOption.value);

    const useCaseDetailsURL = `http://localhost:8081/form/getusecases/${selectedOption.id}`;

    axios
      .get(useCaseDetailsURL)
      .then((response) => {
        console.log("useCaseDetails", response.data);
        setStages(response?.data?.stages);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    setDockerCommands(finalfile);
  }, [finalfile]);

  const useCasesURL = "http://localhost:8081/form/getusecases";
  useEffect(() => {
    axios
      .get(useCasesURL)
      .then((response) => {
        console.log("response", response.data);
        setUseCasesList(response.data);
        const useCaseArray = Object.entries(response.data).map(
          ([id, value]) => {
            return { value, id: Number(id) };
          }
        );
        setUseCaseArray(useCaseArray);
        console.log(useCaseArray);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const getCurrentSchema = () => {
    return stages[currentStep]?.rjsf_schema?.form_schema;
  };

  const handleOnChange = ({ formData: newFormData }) => {
    setFormData((prev) => ({ ...prev, ...newFormData }));
  };

  const handleSubmit = (e, formData) => {
    e.preventDefault();

    if (formRef.current.validateForm()) {
      console.log("Form submitted:", formData);
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep - 1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (formRef.current.validateForm()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleError = (error) => {
    setErrors(error);
  };

  return (
    <Box fill gap="medium">
      <Box align="center" gap="medium">
        <Header>
          <Heading weight={"bold"} level={3}>
            MPI Selection
          </Heading>
        </Header>
        <Select
          required
          id="mpi_type"
          name="mpi_type"
          options={useCaseArray}
          placeholder="Select MPI Type "
          onChange={handleFormValueChange}
        />
      </Box>
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
            // liveValidate
            children={
              <Box direction="row" gap="large">
                <Button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  secondary
                  label="Back"
                />
                {currentStep === stages.length - 1 ? (
                  <Button
                    onClick={(e) => handleSubmit(e, formData)}
                    label="Submit"
                    secondary
                  />
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={currentStep === stages.length - 1}
                    label="Next"
                    secondary
                  />
                )}
              </Box>
            }
          />
        </Box>
      ) : (
        <Box style={{ alignItems: "center" }}>
          <Text>Please Select The MPI Type To View Containerization Form </Text>
        </Box>
      )}
    </Box>
  );
};
