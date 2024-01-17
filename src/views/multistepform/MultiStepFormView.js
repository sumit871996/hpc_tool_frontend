import { useEffect, useMemo, useState } from "react"
import { StepContent } from "./StepContent";
import { WizardContext } from "./WizardContext";
import { Box } from "grommet";
import { StepFooter } from "./StepFooter";
import HomeView from "../HomeView";
import FinaldockerfileIntelMPI from "../../components/OutputWindow/FinaldockerfileIntelMPI";
import { ImageForm } from "../../components/ImageForm";
import { ContainerizationFormView } from "./ContainerizationFormView";
import { DockerFileView } from "./DockerFileView";

export const steps = [
    {
      description: `Please fill the details to create YAML file`,
      input:<ContainerizationFormView/>,
      title: "Containerization Form",
    },
    {
      description: `In this we check the connection and fetch information about database`,
      input: <DockerFileView/>,
      title: "Validate Connection",
    },
    {
      description: `Please select database. which you wanted to load`,
      input: <ImageForm/>,
      title: "Database Details",
    },
  ];

export const MultiStepFormView =()=>{
    const [activeIndex, setActiveIndex] =useState(0);
    const [activeStep, setActiveStep] =useState(1);
    const [formInfo,setFormInfo] =useState();
    useEffect(()=>{
        setActiveStep(activeIndex+1);
    },[activeIndex])

    

    const id = "containerization-form"

    const contextValue =useMemo(
        () =>({
            activeIndex,
            id,
            setActiveIndex,
            activeStep,
            setActiveStep,
            steps,
            formInfo,
            setFormInfo,
        })
    )

    const handleRequest =()=>{
    console.log("Step's submit procedure is done")
    }

    return(
        <WizardContext.Provider value={contextValue}>
            <Box fill>
                <StepContent onSubmit={(e) => handleRequest(e)}/>
                <StepFooter/>
            </Box>
        </WizardContext.Provider>
    )
}