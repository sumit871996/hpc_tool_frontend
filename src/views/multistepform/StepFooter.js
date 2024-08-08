import { Box, Button, Footer, Image, ResponsiveContext, Text } from "grommet";
import { useContext } from "react";
import { WizardContext } from "./WizardContext";
import { LinkNext, LinkPrevious } from "grommet-icons";
import dockerLogo from "../../assets/docker_logo.svg";
export const StepFooter = ({ previousId, nextId, ...rest }) => {
  const size = useContext(ResponsiveContext);
  const {
    activeIndex,
    setActiveIndex,
    activeStep,
    id,
    steps,
    currentStep,
    stages,
    handleNext,
    handleSubmit,
  } = useContext(WizardContext);

  const checkPreviousStep = () => {
    setActiveIndex(activeIndex - 1);
  };

  return (
    <Box
      margin={
        !["xsmall", "small"].includes(size)
          ? { horizontal: "medium" }
          : undefined
      }
      flex={false}
      {...rest}
    >
      <Footer
        border={{ side: "top", color: "border" }}
        justify="end"
        pad={
          !["xsmall", "small"].includes(size)
            ? { vertical: "medium" }
            : { vertical: "small", horizontal: "medium" }
        }
        alignSelf="center"
      >
        {activeStep > 1 && (
          <Button
            id={previousId}
            label={
              !["xsmall", "small"].includes(size)
                ? (steps[activeIndex - 1] && steps[activeIndex - 1].title) ||
                  `Step ${activeStep - 1} title`
                : undefined
            }
            icon={<LinkPrevious />}
            onClick={() => checkPreviousStep()}
          />
        )}

        {activeIndex < steps.length - 1 ? (
          activeStep === 2 ? (
            <Button
              id={nextId}
              icon={<LinkNext />}
              primary
              reverse
              label="Next123"
              form={`${id}-form`}
              // onClick={(e)=>handleNext(e)}
              onClick={currentStep === stages.length-1 ? (e)=>handleSubmit(e) :(e)=>handleNext(e)}
            />
          ) : (
            <Button
              id={nextId}
              icon={<LinkNext />}
              primary
              reverse
              label={activeIndex === steps.length - 1 ? "Finish" : "Next"}
              form={`${id}-form`}
              type="submit"
            />
          )
        ) : (
          <Button type="submit">
            <Button
              form={`${id}-form`}
              type="submit"
              style={{
                background: "rgb(1, 155, 120)",
                borderRadius: "2em",
                padding: "6px 18px",
                cursor: "pointer",
                border: "none",
              }}
            >
              <Box
                direction="row"
                style={{ justifyContent: "center", alignItems: "center" }}
                gap="small"
              >
                <Text size="small" color={"rgb(255, 255, 255)"} weight={"bold"}>
                  Push To Docker
                </Text>
                <Image
                  width={"25px"}
                  src={dockerLogo}
                  style={{ borderRadius: "50%" }}
                />
              </Box>
            </Button>
          </Button>
        )}

      </Footer>
    </Box>
  );
};
