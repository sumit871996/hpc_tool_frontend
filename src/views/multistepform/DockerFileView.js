import React, { useContext, useEffect, useState } from "react";
import ConsoleView from "../../components/OutputWindow/ConsoleView";
import { Anchor, Box,Button, Text } from "grommet";
import { Copy, Download } from "grommet-icons";
import { WizardContext } from "./WizardContext";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";

export const DockerFileView = (e) => {
  const {formValues, setFormValues,setDockerCommands,dockerCommands}= useContext(WizardContext)
  const docker_commands = dockerCommands;
  const elementsArray = docker_commands.split("\n");
  

  useEffect(() => {
    dataForDockerfile(formValues);
  }, []);

  const finaldockerfile = [
    `FROM ${formValues.imagename}:${formValues.imagetag}`,
    ...elementsArray,
  ];

  const [dockerfilename, setDockerFileName] = useState();
  const [finalDockerfilename, setFinalDockerfilename] = useState();
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
    "    wget http://www.mpich.org/static/downloads/${MPI_VERSION}/mpich-${MPI_VERSION}.tar.gz && \\",
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
  const [dockerPushBuildCommand, setDockerPushBuildCommand] = useState();
  const [dockerBuildAppCommand, setDockerBuildAppCommand] = useState();
  const [buildCommand, setBuildCommand] = useState();
  const [singularityCommands, setSingularityCommands] = useState([]);
  const [code, setCode] = React.useState(dockerIntelMPIFile.join("\n"));
  const dataForDockerfile = (data) => {
    let docfilename;
    let fdockerfilename;
    if (formValues.mpi_type == "IntelMPI") {
      console.log(`Inside Intel`);
      
      docfilename = "DockerfileIntelMPI";
      fdockerfilename = `DockerFile${formValues.finalimagename}`;
      setDockerPushBuildCommand(
        `docker image build -t ${formValues.imagename}:${formValues.imagetag} --build-arg MPI_VERSION=${formValues.intel_mpi_devel_version} --build-arg ICC_VERSION="${formValues.intel_icc_version}" --build-arg MKL_VERSION=${formValues.intel_mkl_version} --build-arg TBB_VERSION=${formValues.intel_tbb_version}`
      );
      setBuildCommand(
        `docker image build -t ${formValues.imagename}:${formValues.imagetag} --build-arg MPI_VERSION=${formValues.intel_mpi_devel_version} --build-arg ICC_VERSION="${formValues.intel_icc_version}" --build-arg MKL_VERSION=${formValues.intel_mkl_version} --build-arg TBB_VERSION=${formValues.intel_tbb_version} . -f ${docfilename}`
      );
      setDockerBuildAppCommand(
        `docker image build -t ${formValues.finalimagename}:${formValues.finalimagetag} . -f ${fdockerfilename}`
      );
      setDockerFileName("DockerfileIntelMPI");
      setFinalDockerfilename(`DockerFile${formValues.finalimagename}`);
      setSingularityCommands([
        `singularity build ${formValues.singularityimagename}.sif docker-daemon://${formValues.finalimagename}:${formValues.finalimagetag}`,
        `singularity shell ${formValues.singularityimagename}.sif`,
      ]);
    } else if (data.mpi_type === "MPICH") {
      docfilename = "DockerfileMPICH";
      fdockerfilename = `DockerFile${formValues.finalimagename}`;
      setDockerPushBuildCommand(
        `docker image build -t ${formValues.imagename}:${formValues.imagetag} --build-arg MPI_VERSION=${formValues.mpich_Version} --build-arg MPI_CONFIGURE_OPTIONS="${formValues.mpi_configure_options}" --build-arg USER=${formValues.user} --build-arg WORKDIR=${formValues.workdir}`
      );
      setBuildCommand(
        `docker image build -t ${formValues.imagename}:${formValues.imagetag} --build-arg MPI_VERSION=${formValues.mpich_Version} --build-arg MPI_CONFIGURE_OPTIONS="${formValues.mpi_configure_options}" --build-arg USER=${formValues.user} --build-arg WORKDIR=${formValues.workdir} . -f ${docfilename}`
      );
      setDockerBuildAppCommand(
        `docker image build -t ${formValues.finalimagename}:${formValues.finalimagetag} . -f ${fdockerfilename}`
      );
      setSingularityCommands([
        `singularity build ${formValues.singularityimagename}.sif docker-daemon://${formValues.finalimagename}:${formValues.finalimagetag}`,
        `singularity shell ${formValues.singularityimagename}.sif`,
      ]);
    } else if (data.mpi_type === "OpenMPI") {
     
      docfilename = "DockerfileOpenMPI";
      fdockerfilename = `DockerFile${formValues.finalimagename}`;
      setDockerPushBuildCommand(
        `docker image build -t ${formValues.imagename}:${formValues.imagetag} --build-arg MPI_MAJOR_VERSION=${formValues.openMPI_Major_Version}  --build-arg MPI_VERSION=${formValues.openMPI_Version} --build-arg MPI_CONFIGURE_OPTIONS="${formValues.mpi_configure_options}" --build-arg MPI_MAKE_OPTIONS=${formValues.mpi_make_options} --build-arg USER=${formValues.user} --build-arg WORKDIR=${formValues.workdir}`
      );
      setBuildCommand(
        `docker image build -t ${formValues.imagename}:${formValues.imagetag} --build-arg MPI_MAJOR_VERSION=${formValues.openMPI_Major_Version}  --build-arg MPI_VERSION=${formValues.openMPI_Version} --build-arg MPI_CONFIGURE_OPTIONS="${formValues.mpi_configure_options}" --build-arg MPI_MAKE_OPTIONS=${formValues.mpi_make_options} --build-arg USER=${formValues.user} --build-arg WORKDIR=${formValues.workdir} . -f ${docfilename}`
      );
      setDockerBuildAppCommand(
        `docker image build -t ${formValues.finalimagename}:${formValues.finalimagetag} . -f ${fdockerfilename}`
      );
      setSingularityCommands([
        `singularity build ${formValues.singularityimagename}.sif docker-daemon://${formValues.finalimagename}:${formValues.finalimagetag}`,
        `singularity shell ${formValues.singularityimagename}.sif`,
      ]);
    }
  };

  const [finalfile, setFinalFile] = useState(
    finaldockerfile.toString().replaceAll(",", "\n")
  );

  const copyToClipboard = () => {
    const modifiedData = dockerIntelMPIFile.join("\n").toString();
    navigator.clipboard.writeText(modifiedData);
  };

  const copyToClipboardCommand = () => {
    const modifiedData = buildCommand;
    navigator.clipboard.writeText(modifiedData);
  };

  const copyToClipboardRunCommand = () => {
    const modifiedData = singularityCommands.join("\n").toString();
    navigator.clipboard.writeText(modifiedData);
  };

  const downloadLogs = () => {
    const modifiedData = dockerIntelMPIFile.toString().replaceAll(",", "\n");
    JSON.stringify(modifiedData);
    const txtFile = new Blob([modifiedData], { type: "text/file" });
    const url = URL.createObjectURL(txtFile);
    const link = document.createElement("a");
    link.download = dockerfilename;
    link.href = url;
    link.click();
    link.remove();
  };

  const downloadDocker = () => {
    const modifiedData = finaldockerfile.toString().replaceAll(",", "\n");
    JSON.stringify(modifiedData);
    const txtFile = new Blob([modifiedData], { type: "text/file" });
    const url = URL.createObjectURL(txtFile);
    const link = document.createElement("a");
    link.download = finalDockerfilename;
    link.href = url;
    link.click();
    link.remove();
  };

  const copyToClipboardDocker = () => {
    const modifiedData = finaldockerfile.join("\n").toString();
    navigator.clipboard.writeText(modifiedData);
  };

  return (
    <Box
      margin={{ left: "5%", right: "5%", top: "5%" }}
      pad={{ bottom: "small" }}
    >
      <Text weight="bold">Note: </Text>
      <Text margin={{ bottom: "20px" }}>
        Clone{" "}
        <Anchor>
          https://github.hpe.com/sumit-bharat-mandlik/intelfiles.git
        </Anchor>{" "}
        in your directory where dockerfile exists to test the image
      </Text>
    {/* Console View Data Style */}
    <Box>
      <Box>
        <Box
          direction="row"
          style={{
            maxHeight: "40px",
            minHeight: "40px",
            backgroundColor: "grey",
            minWidth: "550px",
            justifyContent: "space-between",
            borderBottom: "1px solid white",
          }}
        >
          <h5
            style={{
              color: "white",
              fontSize: "16px",
              margin: "10px 15px 4px",
              fontWeight: "bold",
            }}
          >
            Base Image Dockerfile
          </h5>
          <Box direction="row">
            <Button
              icon={<Download color="white" />}
              onClick={downloadLogs}
              tip={"Download"}
            />
            <Button
              icon={<Copy color="white" />}
              onClick={copyToClipboard}
              tip={"Copy"}
            />
          </Box>
        </Box>
        <Box
          width="100%"
          border="all"
          style={{
            maxHeight: "350px",
            overflow: "auto",
            backgroundColor: "black",
            minWidth: "550px",
            zIndex: "1",
          }}
          id="dockerfile"
        >
          <Text
            style={{
              color: "white",
              fontSize: "14px",
              margin: "3px 15px 2px",
            }}
          >
            <Editor
              value={code}
              // onValueChange={code => setCode(code)}
              highlight={(code) => highlight(code, languages.dockerfile)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
              }}
            />
          </Text>
        </Box>
      </Box>

      <Box direction="column" margin={{ top: "20px" }}>
        <Box
          direction="row"
          style={{
            backgroundColor: "grey",
            minWidth: "550px",
            height: "40px",
            justifyContent: "space-between",
            borderBottom: "1px solid white",
            zIndex: "1",
          }}
        >
          <Box
            style={{
              color: "white",
              fontSize: "16px",
              margin: "10px 15px 4px",
              fontWeight: "bold",
            }}
          >
            {"1) Build Base Image"}
          </Box>
          <Box direction="row">
            <Button
              icon={<Copy color="white" />}
              onClick={copyToClipboardCommand}
              tip={"Copy"}
            />
          </Box>
        </Box>
        <Box
          width="100%"
          border="all"
          style={{
            overflow: "auto",
            maxHeight: "60px",
            backgroundColor: "black",
            minWidth: "550px",
          }}
          id="dockerfile"
        >
          <Text
            id="buildcommand"
            style={{
              color: "white",
              fontSize: "14px",
              margin: "3px 15px 2px",
            }}
          >
            {buildCommand}
          </Text>
        </Box>
      </Box>

      <Box margin={{ top: "20px" }}>
        <Box
          direction="row"
          style={{
            maxHeight: "40px",
            minHeight: "40px",
            backgroundColor: "grey",
            minWidth: "550px",
            justifyContent: "space-between",
            borderBottom: "1px solid white",
          }}
        >
          <h5
            style={{
              color: "white",
              fontSize: "16px",
              margin: "10px 15px 4px",
              fontWeight: "bold",
            }}
          >
            {"2) Create Application Dockerfile"}
          </h5>
          <Box direction="row">
            <Button
              icon={<Download color="white" />}
              onClick={downloadDocker}
              tip={"Download"}
            />
            <Button
              icon={<Copy color="white" />}
              onClick={copyToClipboardDocker}
              tip={"Copy"}
            />
          </Box>
        </Box>
        <Box
          width="100%"
          border="all"
          style={{
            maxHeight: "350px",
            overflow: "auto",
            backgroundColor: "black",
            minWidth: "550px",
            zIndex: "1",
          }}
          id="dockerfile"
        >
          <Text
            style={{
              color: "white",
              fontSize: "14px",
              margin: "3px 15px 2px",
            }}
          >
            <Editor
              value={finalfile}
              // onValueChange={code => setCode(code)}
              highlight={(code) => highlight(code, languages.dockerfile)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
              }}
            />
          </Text>
        </Box>
      </Box>

      <Box direction="column" margin={{ top: "20px" }}>
        <Box
          direction="row"
          style={{
            backgroundColor: "grey",
            minWidth: "550px",
            height: "40px",
            justifyContent: "space-between",
            borderBottom: "1px solid white",
            zIndex: "1",
          }}
        >
          <Box
            style={{
              color: "white",
              fontSize: "16px",
              margin: "10px 15px 4px",
              fontWeight: "bold",
            }}
          >
            {"3) Build Application Docker Image"}
          </Box>
          <Box direction="row">
            <Button
              icon={<Copy color="white" />}
              onClick={copyToClipboardCommand}
              tip={"Copy"}
            />
          </Box>
        </Box>

        <Box
          width="100%"
          border="all"
          style={{
            overflow: "auto",
            maxHeight: "60px",
            backgroundColor: "black",
            minWidth: "550px",
          }}
          id="dockerfile"
        >
          <Text
            id="buildcommand"
            style={{
              color: "white",
              fontSize: "14px",
              margin: "3px 15px 2px",
            }}
          >
            {dockerBuildAppCommand}
          </Text>
        </Box>
      </Box>

      <Box direction="column" margin={{ top: "20px" }}>
        <Box
          direction="row"
          style={{
            height: "40px",
            // maxHeight: "40px",
            // minHeight: "40px",
            backgroundColor: "grey",
            minWidth: "550px",
            justifyContent: "space-between",
            borderBottom: "1px solid white",
          }}
        >
          <Box
            style={{
              color: "white",
              fontSize: "16px",
              margin: "10px 15px 4px",
              fontWeight: "bold",
            }}
          >
            {"4) Singularity container build & run commands (Optional)"}
          </Box>
          <Box direction="row">
            <Button
              icon={<Copy color="white" />}
              onClick={copyToClipboardRunCommand}
              tip={"Copy"}
            />
          </Box>
        </Box>
        <Box
          width="100%"
          border="all"
          style={{
            maxHeight: "250px",
            overflow: "auto",
            minHeight: "6px",
            backgroundColor: "black",
            minWidth: "550px",
          }}
          id="dockerfile"
        >
          <Text
            id="singularitycommands"
            style={{
              color: "white",
              fontSize: "14px",
              margin: "3px 15px 2px",
            }}
          >
            {singularityCommands.map((elem, index) => {
              return <Box key={index}>{elem}</Box>;
            })}
          </Text>
        </Box>
      </Box>
      {/* <Box margin={{ top: "30px" }} align="center">
        <Button
          primary
          label="Create Image and Push to Dockerhub"
          onClick={navigateToForm}
        />
      </Box> */}
    </Box>

      {/* {formValues.mpi_type === "IntelMPI" && (
        <ConsoleView
          dockerfile={dockerIntelMPIFile}
          dockerfilename={dockerfilename}
          finaldockerfile={finaldockerfile}
          finaldockerfilename={finalDockerfilename}
          buildcommand={buildCommand}
          buildappcommand={dockerBuildAppCommand}
          singularitycommands={singularityCommands}
          imagename={formValues.imagename}
          imagetag={formValues.imagetag}
          dockerpushbuildcommand={dockerPushBuildCommand}
        ></ConsoleView>
      )}

      {formValues.mpi_type === "MPICH" && (
        <ConsoleView
          dockerfile={dockerMPICHFile}
          dockerfilename={dockerfilename}
          finaldockerfile={finaldockerfile}
          finaldockerfilename={finalDockerfilename}
          buildcommand={buildCommand}
          buildappcommand={dockerBuildAppCommand}
          singularitycommands={singularityCommands}
          imagename={formValues.imagename}
          imagetag={formValues.imagetag}
          dockerpushbuildcommand={dockerPushBuildCommand}
        ></ConsoleView>
      )}

      {formValues.mpi_type === "OpenMPI" && (
        <ConsoleView
          dockerfile={dockerOpenMPIFile}
          dockerfilename={dockerfilename}
          finaldockerfile={finaldockerfile}
          finaldockerfilename={finalDockerfilename}
          buildcommand={buildCommand}
          buildappcommand={dockerBuildAppCommand}
          singularitycommands={singularityCommands}
          imagename={formValues.imagename}
          imagetag={formValues.imagetag}
          dockerpushbuildcommand={dockerPushBuildCommand}
        ></ConsoleView>
      )} */}

    </Box>
  );
};
