import { Accordion, AccordionPanel, Box, Heading, Page, PageContent, Text } from "grommet"

const AboutView = (props) => {
    const pad = 'small';
    return (
        <Page kind="narrow">
            <PageContent>
                <Heading>About</Heading>
                <Accordion width="large">
                    <AccordionPanel label="Our company">
                        <Box pad={pad}>We are HPE.</Box>
                    </AccordionPanel>
                    <AccordionPanel label="Our history">
                        <Box pad={pad}>
                            At Hewlett Packard Enterprise, we advance the way you live and work by
                            engineering experiences that unlock your full potential.
                        </Box>
                    </AccordionPanel>
                    <AccordionPanel label="Our purpose">
                        <Box pad={pad}>
                            We advance the way you live and work by engineering experiences that
                            unlock your full potential.
                        </Box>
                    </AccordionPanel>
                    <AccordionPanel label="What's new">
                        <Box pad={pad}>We make Bold Moves.</Box>
                    </AccordionPanel>
                </Accordion>
            </PageContent>
        </Page>
    )
}


export default AboutView