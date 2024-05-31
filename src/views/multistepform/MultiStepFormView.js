import { useEffect, useMemo, useState } from "react";
import { StepContent } from "./StepContent";
import { WizardContext } from "./WizardContext";
import { Box, Layer, Notification, Spinner, Text } from "grommet";
import { StepFooter } from "./StepFooter";
import HomeView from "../HomeView";
import FinaldockerfileIntelMPI from "../../components/OutputWindow/FinaldockerfileIntelMPI";
import { ImageForm } from "../../components/ImageForm";
import { ContainerizationFormView } from "./ContainerizationFormView";
import { DockerFileView } from "./DockerFileView";
import { defaultFormValues } from "./defaultValues";
import { PushToHubForm } from "./PushToHubForm";
import ReviewView from "./ReviewView";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const steps = [
  {
    description: `Please fill the details to create YAML file`,
    input: <ContainerizationFormView />,
    title: "Containerization Form",
  },
  {
    description: `Check the details for docker file`,
    input: <DockerFileView />,
    title: "Docker File View",
  },
  {
    description: `Please provide crediential for docker hub`,
    input: <PushToHubForm />,
    title: "Upload to Docker",
  },

  // {
  //   description: "Review the details of build details",
  //   input: <ReviewView/>,
  //   title: "Review Details"
  // }

];

export const MultiStepFormView = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [dockerCommands, setDockerCommands] = useState("");
  const [buildCommand, setBuildCommand] = useState();
  const [dockerfilename, setDockerFileName] = useState();
  const navigate = useNavigate();
  const [dockerIntelMPIFile, setDockerIntelMPIFile] = useState([
    "FROM centos:8.4.2105 AS base",
    "    ",
    "RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-Linux-* && \\",
    "    sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-Linux-*",
    "RUN yum install -y ca-certificates",
    "COPY intelfiles/oneAPI.repo.sh /oneAPI.repo.sh",
    "RUN /oneAPI.repo.sh",
    "RUN yum install -y which glibc-langpack-en \\",
    "    procps findutils gcc-c++ gcc \\",
    "    file automake autoconf cmake  python3 python3-devel wget",
    "RUN wget --no-check-certificate https://yum.repos.intel.com/intel-gpg-keys/GPG-PUB-KEY-INTEL-SW-PRODUCTS.PUB",
    "RUN rpm --import ./GPG-PUB-KEY-INTEL-SW-PRODUCTS.PUB",
    "RUN yum search -y intel-hpckit | tee /intel-hpckit-list.txt",
    "ARG MPI_VERSION",
    "RUN yum install -y intel-oneapi-mpi-devel-${MPI_VERSION}",
    "ARG ICC_VERSION",
    "RUN yum install -y intel-oneapi-compiler-dpcpp-cpp-and-cpp-classic-${ICC_VERSION}",
    "ARG MKL_VERSION",
    "RUN yum install -y intel-oneapi-mkl-devel-${MKL_VERSION}",
    "ARG TBB_VERSION",
    "RUN yum install -y intel-oneapi-tbb-devel-${TBB_VERSION}",
    "RUN echo '349f4cbc768814a54add6a135fde7efde117eb108763c888879b9b3c45d4395e819f044d4705776a57f49790b4c90117ebaa86f9bf5802dc5f9f48e9f92a6a07  -' \\",
    "    > osu-micro-benchmarks-5.8.tgz.sha512sum && \\",
    "    curl --insecure -sSL 'https://mvapich.cse.ohio-state.edu/download/mvapich/osu-micro-benchmarks-5.8.tgz' | \\",
    "    tee osu-micro-benchmarks-5.8.tgz | \\",
    "    sha512sum -c osu-micro-benchmarks-5.8.tgz.sha512sum && \\",
    "    tar -C /tmp -zxf osu-micro-benchmarks-5.8.tgz && \\",
    "    rm -rf osu-micro-benchmarks-5.8.tgz*",
    "COPY intelfiles/build_env_cpu.sh /build_env_cpu.sh",
    "RUN sed -i \\",
    '    -e "s/MPI_VERSION/${MPI_VERSION}/" \\',
    '    -e "s/ICC_VERSION/${ICC_VERSION}/" \\',
    '    -e "s/MKL_VERSION/${MKL_VERSION}/" \\',
    '    -e "s/TBB_VERSION/${TBB_VERSION}/" \\',
    "    /build_env_cpu.sh",
    "RUN cd /tmp/osu-micro-benchmarks-5.8 && \\",
    "    /build_env_cpu.sh ./configure --prefix=/opt/osu",
    "RUN cd /tmp/osu-micro-benchmarks-5.8 && \\",
    "    /build_env_cpu.sh make -j",
    "RUN cd /tmp/osu-micro-benchmarks-5.8 && \\",
    "    /build_env_cpu.sh make install",
    "RUN rm -rf /tmp/*",
    "RUN cd /usr/bin && \\",
    "    ln -s /opt/osu/libexec/osu-micro-benchmarks/mpi/*/* .",
    "    ",
    "FROM centos:8.4.2105 as final",
    "    ",
    "COPY --from=base /opt/intel/oneapi/mpi/$MPI_VERSION /opt/intel/oneapi/mpi/$MPI_VERSION",
    "COPY --from=base /opt/osu /opt/osu",
    "RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-Linux-* && \\",
    "    sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-Linux-*",
    "RUN yum install -y file strace bc numactl numactl-libs librdmacm libibverbs pciutils-libs pciutils ucx-ib ucx-rdmacm ucx libpsm2 procps findutils which glibc-langpack-en",
    "RUN ln -s /usr/lib64/libnuma.so.1 /usr/lib64/libnuma.so",
    "RUN cd /usr/bin && \\",
    "    ln -s /opt/osu/libexec/osu-micro-benchmarks/mpi/*/* .",
  ]);
  const [dockerMPICHFile, setDockerMPICHFile] = useState([
    "FROM ubuntu:20.04",
    "   ",
    "# Install packages",
    'ARG REQUIRE="sudo build-essential"',
    "RUN apt-get update && \\",
    "    DEBIAN_FRONTEND=noninteractive apt-get install -y ${REQUIRE} && \\",
    "    apt-get clean",
    "   ",
    "# Install essential packages and certificates",
    "RUN apt-get update && \\",
    "    DEBIAN_FRONTEND=noninteractive apt-get install -y ca-certificates openssl && \\",
    "    update-ca-certificates && \\",
    "    apt-get clean",
    "   ",
    "# INSTALL MPICH",
    "ARG MPI_VERSION",
    "ARG MPI_CONFIGURE_OPTIONS",
    "ARG MPI_MAKE_OPTIONS",
    "   ",
    "# Download, build, and install MPICH",
    "RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y wget && \\",
    "    mkdir /tmp/mpich-src && \\",
    "    cd /tmp/mpich-src && \\",
    "    wget http://www.mpich.org/static/downloads/${MPI_VERSION}/mpich-${MPI_VERSION}.tar.gz --no-check-certificate && \\",
    "    tar xfz mpich-${MPI_VERSION}.tar.gz && \\",
    "    cd mpich-${MPI_VERSION} && \\",
    "    ./configure ${MPI_CONFIGURE_OPTIONS} && \\",
    "    make && \\",
    "    make install && \\",
    "    rm -rf /tmp/mpich-src && \\",
    "    apt-get remove --purge -y wget && apt-get autoremove -y && apt-get clean",
    "   ",
    "# TEST MPICH INSTALLATION",
    "COPY mpich-test/* /tmp/mpich-test/",
    "RUN cd /tmp/mpich-test && \\",
    "    sh test.sh && \\",
    "    rm -rf /tmp/mpich-test",
    "   ",
    "# CLEAN UP",
    "RUN rm -rf /tmp/*",
    "   ",
    "# ADD DEFAULT USER",
    "ARG USER",
    "ENV USER ${USER}",
    "RUN useradd -m ${USER} && \\",
    '    echo "${USER}   ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers',
    "ENV USER_HOME /home/${USER}",
    "RUN chown -R ${USER}:${USER} ${USER_HOME}",
    "   ",
    "# CREATE WORKING DIRECTORY FOR USER",
    "ARG WORKDIR",
    "ENV WORKDIR ${WORKDIR}",
    "RUN mkdir ${WORKDIR} && \\",
    "chown -R ${USER}:${USER} ${WORKDIR}",
    "WORKDIR ${WORKDIR}",
    "USER ${USER}",
    "   ",
    'CMD ["/bin/bash"]',
  ]);
  const [dockerOpenMPIFile, setDockerOpenMPIFile] = useState([
    "FROM alpine",
    "   ",
    "# Install packages",
    "RUN apk update \\",
    "    && apk add --no-cache build-base libatomic gfortran git valgrind perl linux-headers openssh",
    "   ",
    "#### INSTALL OPENMPI ####",
    "# Source is available at https://www.open-mpi.org/software/ompi/",
    "   ",
    "# Build Options:",
    "ARG MPI_VERSION",
    "ARG MPI_MAJOR_VERSION",
    "ARG MPI_CONFIGURE_OPTIONS",
    "ARG MPI_MAKE_OPTIONS",
    "    ",
    "# Download, build, and install OPENMPI",
    "RUN mkdir /tmp/openmpi-src",
    "WORKDIR /tmp/openmpi-src",
    "RUN wget https://download.open-mpi.org/release/open-mpi/${MPI_MAJOR_VERSION}/openmpi-${MPI_VERSION}.tar.gz \\",
    "    && tar xfz openmpi-${MPI_VERSION}.tar.gz",
    "RUN cd openmpi-${MPI_VERSION} && ./configure ${MPI_CONFIGURE_OPTIONS}",
    "RUN cd openmpi-${MPI_VERSION} && make all ${MPI_MAKE_OPTIONS}",
    "RUN cd openmpi-${MPI_VERSION} && make install",
    "RUN rm -rf /tmp/openmpi-src",
    "    ",
    "#### TEST OPENMPI INSTALLATION ####",
    "RUN mkdir /tmp/mpi-test",
    "WORKDIR /tmp/mpi-test",
    "COPY mpi-test .",
    "RUN sh test.sh",
    "RUN rm -rf /tmp/mpi-test",
    "    ",
    "#### CLEAN UP ####",
    "WORKDIR /",
    "RUN rm -rf /tmp/*",
    "    ",
    "#### ADD DEFAULT USER ####",
    "ARG USER",
    "ENV USER ${USER}",
    "RUN adduser -D ${USER}",
    "ENV USER_HOME /home/${USER}",
    "RUN chown -R ${USER}:${USER} ${USER_HOME}",
    "    ",
    "#### CREATE WORKING DIRECTORY FOR USER ####",
    "ARG WORKDIR",
    "ENV WORKDIR ${WORKDIR}",
    "RUN mkdir ${WORKDIR}",
    "RUN chown -R ${USER}:${USER} ${WORKDIR}",
    'ENV OPAL_PREFIX="/usr/local"',
    "WORKDIR ${WORKDIR}",
    "USER ${USER}",
  ]);

  const [baseimagename, setBaseimagename] = useState("");
  const [baseimagetag, setBaseimagetag] = useState("");
  const [finalDockerfile, setDockerfile] = useState("");
  const [basebuildcommand, setBasebuildcommand] = useState("");
  const [basedockerfilename, setBasedockerfilename] = useState("");

  const [errorMPIVersion, setErrorMPIVersion] = useState(false);
  const [errorICCVersion, setErrorICCVersion] = useState(false);
  const [errorTBBVersion, setErrorTBBVersion] = useState(false);

  const [errorUser, setErrorUser] = useState(false);
  const [errorWorkDir, setErrorWorkDir] = useState(false);

  const [errorImageName, setErrorImageName] = useState(false);
  const [errorImageTag, setErrorImageTag] = useState(false);
  const [errorAIN, setErrorAIN] = useState(false);
  const [errorAIT, setErrorAIT] = useState(false);
  const [errorASIN, setErrorASIN] = useState(false);

  const [dockerUser, setDockerUser] = useState("");
  const [dockerPass, setDockerPass] = useState("");

  const [dockerFormData, setDockerFormData] = useState({
    docker_username: "",
    docker_password: "",
  });

  const [dockerBuildAppCommand, setDockerBuildAppCommand] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setActiveStep(activeIndex + 1);
  }, [activeIndex]);

  const id = "containerization-form";

  const contextValue = useMemo(
    () => ({
      activeIndex,
      id,
      setActiveIndex,
      activeStep,
      setActiveStep,
      steps,
      formValues,
      setFormValues,
      dockerCommands,
      setDockerCommands,
      dockerIntelMPIFile,
      setDockerIntelMPIFile,
      dockerMPICHFile,
      setDockerMPICHFile,
      dockerOpenMPIFile,
      setDockerOpenMPIFile,
      dockerfilename,
      setDockerFileName,
      buildCommand,
      setBuildCommand,
      baseimagename,
      setBaseimagename,
      baseimagetag,
      setBaseimagetag,
      finalDockerfile,
      setDockerfile,
      basebuildcommand,
      setBasebuildcommand,
      basedockerfilename,
      setBasedockerfilename,
      errorMPIVersion,
      setErrorMPIVersion,
      errorICCVersion,
      setErrorICCVersion,
      errorTBBVersion,
      setErrorTBBVersion,

      errorUser,
      setErrorUser,
      errorWorkDir,
      setErrorWorkDir,

      errorImageName,
      setErrorImageName,
      errorImageTag,
      setErrorImageTag,
      errorAIN,
      setErrorAIN,
      errorAIT,
      setErrorAIT,
      errorASIN,
      setErrorASIN,
      dockerUser,
      setDockerUser,
      dockerPass,
      setDockerPass,
      dockerBuildAppCommand,
      setDockerBuildAppCommand,
      dockerFormData,
      setDockerFormData,
    }),
    [activeIndex, activeStep, formValues, dockerFormData]
  );

  const handleRequest = (e) => {
    e.preventDefault();

    console.log("Step's submit procedure is done");
    uploadToDocker();
    
  };
  const uploadToDocker = (e) => {
    setShowSpinner(true);
    console.log("Spinner Started");
    console.log("Upload Image");
    let data;
    if (formValues.mpi_type == "IntelMPI") {
      data = {
        imagename: formValues.finalimagename,
        imagetag: formValues.finalimagetag,
        dockeruser: dockerFormData.docker_username,
        dockerpassword: dockerFormData.docker_password,
        dockerfile: dockerfilename,
        buildcommand: dockerBuildAppCommand,
        dockerfilename: `DockerFile${formValues.finalimagename}`,

        baseimagename: formValues.imagename,
        baseimagetag: formValues.imagetag,
        basedockerfile: dockerIntelMPIFile,
        basebuildcommand: buildCommand,
        basedockerfilename: basedockerfilename,
      };
    } else if (formValues.mpi_type == "MPICH") {
      data = {
        imagename: formValues.finalimagename,
        imagetag: formValues.finalimagetag,
        dockeruser: dockerFormData.docker_username,
        dockerpassword: dockerFormData.docker_password,
        dockerfile: (() => {
          const finaldockerfile = dockerfilename;
          finaldockerfile[0] = dockerfilename[0].replace(
            `FROM ${formValues.imagename}`,
            `FROM ${dockerFormData.docker_username}/${formValues.imagename}`
          );
          return finaldockerfile;
        })(),
        buildcommand: dockerBuildAppCommand.replace(
          `-t ${formValues.finalimagename}`,
          `-t ${dockerFormData.docker_username}/${formValues.finalimagename}`
        ),
        dockerfilename: `DockerFile${formValues.finalimagename}`,

        baseimagename: formValues.imagename,
        baseimagetag: formValues.imagetag,
        basedockerfile: dockerMPICHFile,
        basebuildcommand: buildCommand.replace(
          `-t ${formValues.imagename}`,
          `-t ${dockerFormData.docker_username}/${formValues.imagename}`
        ),
        basedockerfilename: basedockerfilename,
      };
    } else if (formValues.mpi_type == "OpenMPI") {
      data = {
        imagename: formValues.finalimagename,
        imagetag: formValues.finalimagetag,
        dockeruser: dockerFormData.docker_username,
        dockerpassword: dockerFormData.docker_password,
        dockerfile: dockerfilename,
        buildcommand: dockerBuildAppCommand,
        dockerfilename: `DockerFile${formValues.finalimagename}`,

        baseimagename: formValues.imagename,
        baseimagetag: formValues.imagetag,
        basedockerfile: dockerOpenMPIFile,
        basebuildcommand: buildCommand,
        basedockerfilename: basedockerfilename,
      };
    }

    const formData = new FormData();
    formData.append("inputData", JSON.stringify(data));
    formData.append("file", dockerFormData.zipFile);

    axios
      .post(
        `http://localhost:8081/home/buildandpush/${localStorage.getItem(
          "user_id"
        )}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        const buildId=res.data.buildId
        setNotificationStatus("normal");
        setNotificationTitle("Upload To Docker");
        setNotificationMessage("Build Id Created Successfully");
        setShowSpinner(false);
        console.log("Spinner Ended");
        setShowNotification(true);
        navigate("/review", {state:{buildId}})
      })
      .catch((error) => {
        console.log(error);
        setNotificationStatus("critical");
        setNotificationTitle("Upload To Docker");
        setNotificationMessage("Failed to upload image to docker");
        setShowSpinner(false);
        console.log("Spinner Ended");
        setShowNotification(true);
      });
  };
  return (
    <WizardContext.Provider value={contextValue}>
      <Box fill>
        <StepContent onSubmit={(e) => handleRequest(e)} />
        <StepFooter />
        {showSpinner && (
          <Layer>
            <Box
              align="center"
              justify="center"
              direction="row"
              alignSelf="center"
              pad="medium"
            >
              <Spinner />
              <Text margin="10px">Pushing To Docker...</Text>
            </Box>
          </Layer>
        )}
        {showNotification && (
          <Notification
            toast
            title={notificationTitle}
            message={notificationMessage}
            status={notificationStatus}
            time={5000}
            onClose={() => {
              setShowNotification(false);
            }}
          />
        )}
      </Box>
    </WizardContext.Provider>
  );
};

