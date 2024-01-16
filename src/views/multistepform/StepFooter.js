import { Box, Button, Footer, ResponsiveContext } from "grommet"
import { useContext } from "react"
import { WizardContext } from "./WizardContext"
import { LinkNext, LinkPrevious } from "grommet-icons"

export const StepFooter = ({previousId,nextId, ...rest})=>{
    const size = useContext(ResponsiveContext)
    const {activeIndex, setActiveIndex, activeStep, id, steps}= useContext(WizardContext)

    const checkPreviousStep=()=>{
        setActiveIndex(activeIndex-1)
    }

    return (
        <Box
          margin={
            !['xsmall', 'small'].includes(size)
              ? { horizontal: 'medium' }
              : undefined
          }
          flex={false}
          {...rest}
        >
          <Footer
            border={{ side: 'top', color: 'border' }}
            justify="end"
            pad={
              !['xsmall', 'small'].includes(size)
                ? { vertical: 'medium' }
                : { vertical: 'small', horizontal: 'medium' }
            }
            alignSelf="center"
          >
    
    {activeStep > 1 && (
                <Button
                  id={previousId}
                  label={
                    !['xsmall', 'small'].includes(size)
                      ? (steps[activeIndex - 1] && steps[activeIndex - 1].title) ||
                        `Step ${activeStep - 1} title`
                      : undefined
                  }
                  icon={<LinkPrevious />}
                  onClick={() => checkPreviousStep()}
                />
              )}
    
            <Button
              id={nextId}
              icon={<LinkNext />}
              primary
              reverse
              label={activeIndex === steps.length - 1 ? 'Finish' : 'Next'}
              form={`${id}-form`}
              type='submit'
              // type={(activeIndex== 0|| activeIndex==steps.length) ?`submit`:'button'}
              // onClick={(activeIndex!==0|| activeIndex==steps.length) ?() => checkNextStep():undefined}
            //   disabled={!validFlag && activeIndex!==0}
            />
          </Footer>
        </Box>
      );

}



