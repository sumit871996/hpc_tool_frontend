import { Box, Text } from "grommet";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ConsoleView from "./ConsoleView";

const FinaldockerfileMPICH = (props) => {
  const location = useLocation();
  const inputdata = location.state.data.value;
  const elementsArray = location.state.data.dockercommands.split("\n");
  const finaldockerfile = [
    `FROM ${inputdata.imagename}:${inputdata.imagetag}`,
    ...elementsArray,
  ];

  const dockerfilename = "DockerfileMPICH";
  const finaldockerfilename = `DockerFile${inputdata.finalimagename}`;

  const [dockerfile, setDockerfile] = useState([
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

  const buildcommand = `docker image build -t ${inputdata.imagename}:${inputdata.imagetag} --build-arg MPI_VERSION=${inputdata.mpich_Version} --build-arg MPI_CONFIGURE_OPTIONS="${inputdata.mpi_configure_options}" --build-arg USER=${inputdata.user} --build-arg WORKDIR=${inputdata.workdir} . -f ${dockerfilename}`;
  const buildappcommand = `docker image build -t ${inputdata.finalimagename}:${inputdata.finalimagetag} . -f ${finaldockerfilename}`;
  const singularitycommands = [
    `singularity build ${inputdata.singularityimagename}.sif docker-daemon://${inputdata.finalimagename}:${inputdata.finalimagetag} `,
    `singularity shell ${inputdata.singularityimagename}.sif`,
  ];
  return (
    <Box margin={{ left: "5%", right: "5%", top: "5%" }}>
      <Text weight="bold">Note: </Text>
      <Text margin={{ bottom: "20px" }}>
        Clone <a>https://github.hpe.com/sumit-bharat-mandlik/mpich-test.git</a>{" "}
        in your directory where dockerfile exists
      </Text>
      <ConsoleView
        buildcommand={buildcommand}
        dockerfile={dockerfile}
        dockerfilename={dockerfilename}
        finaldockerfile={finaldockerfile}
        finaldockerfilename={finaldockerfilename}
        buildappcommand={buildappcommand}
        singularitycommands={singularitycommands}
      ></ConsoleView>
    </Box>
  );
};

export default FinaldockerfileMPICH;
