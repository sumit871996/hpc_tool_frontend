import {
  Accordion,
  AccordionPanel,
  Box,
  Heading,
  Page,
  PageContent,
  Text,
} from "grommet";

const ContactView = (props) => {
  const pad = "small";
  return (
    <Page kind="narrow">
      <PageContent>
        <Heading>Team</Heading>
        <Accordion width="large">
          <AccordionPanel label="Members">
            <Box>
              <Box pad={pad} justify="between" direction="row">
                <Text>Yuvaraja A. </Text>
                <Text>yuvaraja.a@hpe.com</Text>
              </Box>
              <Box pad={pad} justify="between" direction="row">
                <Text>Kattupunathil Nishith </Text>
                <Text>nishith.kp@hpe.com</Text>
              </Box>
              <Box pad={pad} justify="between" direction="row">
                <Text>Priyank Rupareliya </Text>
                <Text>priyank.rupareliya@hpe.com</Text>
              </Box>
              <Box pad={pad} justify="between" direction="row">
                <Text>Sumit Mandlik </Text>
                <Text>sumit-bharat.mandlik@hpe.com</Text>
              </Box>
              <Box pad={pad} justify="between" direction="row">
                <Text>Ashishkumar Chourasia </Text>
                <Text>ashishkumar-mangaldas.chourasia@hpe.com</Text>
              </Box>
            </Box>
          </AccordionPanel>
          {/* <AccordionPanel label="Our history">
            <Box pad={pad}>
              At Hewlett Packard Enterprise, we advance the way you live and
              work by engineering experiences that unlock your full potential.
            </Box>
          </AccordionPanel>
          <AccordionPanel label="Our purpose">
            <Box pad={pad}>
              We advance the way you live and work by engineering experiences
              that unlock your full potential.
            </Box>
          </AccordionPanel>
          <AccordionPanel label="What's new">
            <Box pad={pad}>We make Bold Moves.</Box>
          </AccordionPanel> */}
        </Accordion>
      </PageContent>
    </Page>
  );
};

export default ContactView;
