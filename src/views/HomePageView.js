import {
  Box,
  Text,
  Paragraph,
  Card,
  CardBody,
  Button,
  Heading,
  CardFooter,
  Accordion,
  AccordionPanel,
  Anchor,
  Grid,
} from "grommet";
import {
  Link,
  Desktop,
  Deploy,
  Dashboard,
  Connect,
  FormNext,
  Phone,
  ContactInfo,
  System,
  CircleInformation,
  Task,
} from "grommet-icons";
import backgroundImg from "../assets/dashBackgroundImage.svg";
import { backgrounds } from "grommet-theme-hpe";
import "../css/style.css";
import { useEffect, useState } from "react";
function HomePageView() {
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [showSolutionOverview, setshowSolutionOverview] = useState(false);
  const [showKeyFeatures, setShowKeyFeatures] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [showService, setShowService] = useState(false);
  const [buttonStyle, setButtonStyle] = useState();

  useEffect(() => {
    setButtonStyle(showIntroduction ? "buttonStyle" : "buttonActive");
  }, [showIntroduction]);

  const divStyle = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

    width: "100%",
    justifyContent: "center",
  };

  const cardDetails = [
    {
      logo: <Phone size="50px" color="brand" />,
      title: "Contact our team",
      description: "Check with our team for more details",
      footerlable: "Contact us",
      path: "/contact",
    },
    {
      logo: <Task size="50px" color="rgb(23, 235, 160)" />,
      title: "Dashboard",
      description: "Dashboard for view builds list",
      footerlable: "Dashboard",
      path: "/builds",
    },
    {
      logo: <System size="50px" color="rgb(247, 64, 255)" />,
      title: "Start building in the console",
      description:
        "Windows 10, Catalina 10.15, Mojave 10.14, or High Sierra 10.13",
      footerlable: "Start Containerization",
      path: "/multistage",
    },
  ];

  const faq = [
    {
      question:
        "What is Singularity, and how does it differ from other containerization tools in the context of HPC?",
      answer: "Answer",
    },
    {
      question: "What MPI libraries are supported?",
      answer: "Answer",
    },
    {
      question:
        "Can Singularity containers be used with different HPC job schedulers? ",
      answer: "Answer",
    },
  ];

  const intro = {
    title: "Introduction",
    description:
      "HPC space has seen a tremendous expansion in recent years, mainly due to the exponentially growing requirements of computing in the applications. The HPC Application Containerization Solution leverages containerization technologies such as Docker and Singularity to encapsulate HPC applications and their dependencies. This approach ensures portability and compatibility across diverse HPC clusters. Key benefits of this service include enhanced portability, simplified management, and improved scalability of HPC workloads. It also offers version control for application images. MPI or the Message Passing Interface, the primary library used to achieve parallelization in HPC applications, requires to be configured correctly to leverage the full potential of the hardware. Containerization of HPC applications allows enterprises to ensure the right configuration across different HPC environments, aids easy migration, and enables teams to scale HPC workloads with greater ease.",
  };

  const solution = {
    title: "Solution Overview",
    description:
      "HPC containerization is crucial in the way it handles and deals with performance improvement using parallel computing and communication using various libraries like MPI. Since the runtime of any application that runs on an HPC environment is very hardware-specific, unlike general CPU applications. RPS simplifies and automates the process of writing the Dockerfile by choosing any MPI version you need of any MPI flavor and providing the build commands for the same to run the Dockerfile.",
  };

  const keyFeature = {
    title: "Key Features",
    description_A:
      "HPC Containerization Solution has multiple layers to its architecture. Fundamentally, the solution replaces application instances with containers which run the same application instances. To achieve this in the context of an HPC cluster, one needs to inculcate several pieces of the infrastructure, mainly touching the following items:",
    description_B: [
      "The Workload Manager (SLURM, Torque, etc)",
      "Container Platform Daemon (SINGULARITY, Docker, Podman, etc)",
      "Host MPI Libraries (Mpich, Intel MPI, OpenMPI, etc)",
      "Network Interconnect (INFINIBAND, etc)",
    ],
    description_C:
      "When executing a containerized workload on an HPC cluster, it is important for the workload manager to be able to support running the containers. In this example, to enable a SLURM JOB with containers, one must ensure the container platform daemon to be present on all the nodes and the specified container image to be available for execution. The container must also be able to link the host native MPI libraries dynamically when the application is executed, to not impact the performance of the HPC workload. Lastly, it is important for different HPC nodes to use a compatible MPI library (not necessarily the same libraries) for efficient communication.",
  };

  const benefits = {
    title: "Benefits",
    description_A:
      "MPI applications are generally utilized in the context of HPC because they are computing intensive. Applications that deal with chemical simulations, forecasting weather, and processing large amounts of data are among the few to list.",
    description_B: [
      "Reduction in migration time due to all-inclusive container images and no dependency configurations.",
      "Enabling support for multiple MPI libraries across different environments with a single container image",
      "Improved monitoring flow and visibility by linking container logs directly with monitoring tools.",
      "Faster scale-up and scale-down of HPC workloads.",
    ],
  };

  const service = {
    title: "Service Approach",
    description_A:
      "By following a set of stages, we ensure a systematic and thorough approach to HPC containerization, resulting in a well-documented and optimized deployment of MPI-based applications on the specified infrastructure. Stages include:",
    description_B: [
      {
        title: "1. Infrastructure Assessment:",
        description:
          "Conduct a comprehensive analysis of the existing infrastructure, including cluster versions, hardware specifications, software configurations, and operating systems.",
      },
      {
        title: "2. Operation System Validation:",
        description:
          "Verify the compatibility of the infrastructure to ensure seamless execution of specified applications, accounting for version dependencies and system requirements.",
      },
      {
        title: "3. Application Profiling:",
        description:
          "Perform an in-depth analysis of the MPI-based application, identifying versions of MPI, necessary libraries, and dependencies, ensuring a thorough understanding of the application environment.",
      },
      {
        title: "4. Pre-Containerization Bechmarking:",
        description:
          "Execute MPI benchmarks on the application for various workloads, meticulously documenting benchmarking results to establish performance baselines.",
      },
      {
        title: "5. Containerization Implementation:",
        description:
          "Undertake the containerization process, encapsulating the application with the specified libraries. Conduct local cluster tests to validate successful containerization.",
      },
      {
        title: "6. Cluster-Specific Deployment:",
        description:
          "Deploy the containerized application in the actual cluster environment, addressing any cluster-specific nuances. Iteratively refine the containerized application for optimal performance.F",
      },
    ],
  };

  const handleIntroductionClick = (e) => {
    e.preventDefault();
    if (!showIntroduction) {
      console.log(" Converted to False ");
      setShowIntroduction(true);
      setshowSolutionOverview(false);
      setShowBenefits(false);
      setShowKeyFeatures(false);
      setShowService(false);
    }
  };

  const handleSolutionOverviewClick = (e) => {
    e.preventDefault();
    if (!showSolutionOverview) {
      setshowSolutionOverview(true);
      setShowIntroduction(false);
      setShowBenefits(false);
      setShowKeyFeatures(false);
      setShowService(false);
    }
  };

  const handleKeyFeaturesClick = (e) => {
    e.preventDefault();
    if (!showKeyFeatures) {
      setShowKeyFeatures(true);
      setshowSolutionOverview(false);
      setShowIntroduction(false);
      setShowBenefits(false);
      setShowService(false);
    }
  };

  const handleBenefitsClick = (e) => {
    e.preventDefault();
    if (!showBenefits) {
      setShowBenefits(true);
      setShowKeyFeatures(false);
      setshowSolutionOverview(false);
      setShowIntroduction(false);
      setShowService(false);
    }
  };

  const handleServiceApproachClick = (e) => {
    e.preventDefault();
    if (!showService) {
      setShowService(true);
      setShowKeyFeatures(false);
      setshowSolutionOverview(false);
      setShowIntroduction(false);
      setShowBenefits(false);
    }
  };

  return (
    <Box fill>
      {/* 1st Section*/}
      <Box
        align="center"
        background="brand"
        style={divStyle}
        pad={{ top: "3%", bottom: "3%", left: "20%", right: "20%" }}
      >
        {/* <Box align="center"> */}
        <Card background={"rgb(48, 102, 82, 0.9) "}>
          <CardBody align="center" gap="medium">
            <Heading weight={"bold"} size="42px" textAlign="center">
              HPE HPC Application Containerization Service
            </Heading>
            <Text textAlign="center">
              An HPC Application Containerization Solution streamlines the
              packaging of high-performance computing (HPC) applications into
              containers for efficient deployment and management in complex
              computing environments.
            </Text>
            {/* <Box direction="row" gap="medium">
              <Button primary label="Contact" />
              <Button primary label="Explore" />
            </Box> */}
          </CardBody>
        </Card>
        {/* </Box> */}
      </Box>
      {/* 2nd section */}
      <Box
        style={{
          alignItems: "center",
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingTop: "2%",
          paddingBottom: "2%",
        }}
        gap="medium"
        background={"rgb(255, 255, 255)"}
      >
        {/* 2nd section A*/}
        <Box fill>
          <Text size="36px"  margin={{ left: "medium" }}>
            About HPC Containerization
          </Text>
        </Box>
        {/*  2nd section B*/}
        <Box fill direction="row-responsive">
          <Box
            width="25%"
            style={{
              paddingRight: "2%",
              paddingBottom: "2%",
              borderRight: "1px solid rgb(224, 224, 224)",
            }}
          >
            <Button
              label="Introduction"
              style={{ borderRadius: "0%", textAlign: "start" }}
              className={showIntroduction ? "buttonStyle" : "buttonActive"}
              onClick={handleIntroductionClick}
              pad="small"
            />
            <Button
              label="Solution Overview"
              style={{ borderRadius: "0%", textAlign: "start" }}
              className={showSolutionOverview ? "buttonStyle" : "buttonActive"}
              onClick={handleSolutionOverviewClick}
              pad="small"
            />
            <Button
              label="Key Features"
              style={{ borderRadius: "0%", textAlign: "start" }}
              className={showKeyFeatures ? "buttonStyle" : "buttonActive"}
              onClick={handleKeyFeaturesClick}
              pad="small"
            />
            <Button
              label="Benefits"
              style={{ borderRadius: "0%", textAlign: "start" }}
              className={showBenefits ? "buttonStyle" : "buttonActive"}
              onClick={handleBenefitsClick}
              pad="small"
            />
            <Button
              label="Service Approach"
              style={{ borderRadius: "0%", textAlign: "start" }}
              className={showService ? "buttonStyle" : "buttonActive"}
              onClick={handleServiceApproachClick}
              pad="small"
            />
          </Box>
          <Box gap="small" fill pad={{ left: "3%" }}>
            <Box style={{ display: "inline-block" }}>
              <Text
                size="large"
                weight="bold"
                style={{ borderBottom: "3px solid rgb(1, 169, 130)" }}
              >
                {showIntroduction && intro.title}
                {showSolutionOverview && solution.title}
                {showKeyFeatures && keyFeature.title}
                {showBenefits && benefits.title}
                {showService && service.title}
              </Text>
            </Box>

            {showIntroduction && <Box>{intro.description}</Box>}
            {showSolutionOverview && <Box>{solution.description}</Box>}
            {showKeyFeatures && (
              <Box gap="small">
                {keyFeature.description_A}
                {keyFeature.description_B.map((item) => (
                  <li>{item}</li>
                ))}
                {keyFeature.description_C}
              </Box>
            )}
            {showBenefits && (
              <Box gap="small">
                {benefits.description_A}
                {benefits.description_B.map((item) => (
                  <li>{item}</li>
                ))}
              </Box>
            )}
            {showService && (
              <Box gap="small">
                {service.description_A}

                <Grid
                  rows={["auto", "auto"]}
                  columns={["auto", "auto", "auto"]}
                  gap={"small"}
                >
                  {service.description_B.map((item) => (
                    <Card>
                      <CardBody>
                        <Text weight={"bold"}>{item.title}</Text>
                        <Paragraph>{item.description}</Paragraph>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {/*  3rd section */}
      <Box
        style={{
          alignItems: "center",
          paddingTop: "2%",
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingBottom: "2%",
        }}
        fill
        gap="medium"
      >
        <Box fill style={{ width: "100%" }}>
          <Text size="36px"  margin={{ left: "medium" }}>
            Step to Containerization
          </Text>
        </Box>
        <Box
          direction="row"
          gap="large"
          style={{ justifyContent: "center" }}
          fill
        >
          {cardDetails.map((card,index) => (
            <Card key={index} width={"30%"}>
              <CardBody gap="small">
                <Box>{card.logo}</Box>
                <Box>
                  <Text size="22px" weight={"bold"}>
                    {card.title}
                  </Text>
                  <Paragraph>
                    <b>{card.description}</b>
                  </Paragraph>
                </Box>
              </CardBody>
              <CardFooter
                style={{
                  borderTop: "1px solid rgb(224, 224, 224)",
                  justifyContent: "flex-start",
                }}
                gap="small"
              >
                <CircleInformation size="22px" />{" "}
                <Anchor href={card.path}>{card.footerlable}</Anchor>
              </CardFooter>
            </Card>
          ))}
        </Box>
      </Box>
      {/* 4th Section */}
      <Box
        style={{
          alignItems: "center",
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingTop: "3%",
          paddingBottom: "5%",
        }}
        gap="medium"
        background={"rgb(255, 255, 255)"}
      >
        <Box fill pad={"small"}>
          <Text size="36px" margin={{ left: "medium" }}>
            Frequently Asked Questions
          </Text>
        </Box>
        <Box fill pad={{ left: "5%" }}>
          <Accordion>
            {faq.map((qna,index) => (
              <AccordionPanel key={index} label={qna.question}>
                <Box pad="medium" background="light-2">
                  <Text>{qna.answer}</Text>
                </Box>
              </AccordionPanel>
            ))}
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
}
export default HomePageView;
