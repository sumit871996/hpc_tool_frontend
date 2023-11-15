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

  const dockerfilename = "DockerfileOpenMPI";
  const finaldockerfilename = `DockerFile${inputdata.finalimagename}`;

  const [dockerfile, setDockerfile] = useState([
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
  const buildcommand = `docker image build -t ${inputdata.imagename}:${inputdata.imagetag} --build-arg MPI_MAJOR_VERSION=${inputdata.openMPI_Major_Version}  --build-arg MPI_VERSION=${inputdata.openMPI_Version} --build-arg MPI_CONFIGURE_OPTIONS="${inputdata.mpi_configure_options}" --build-arg MPI_MAKE_OPTIONS=${inputdata.mpi_make_options} --build-arg USER=${inputdata.user} --build-arg WORKDIR=${inputdata.workdir} . -f ${dockerfilename}`;
  const buildappcommand = `docker image build -t ${inputdata.finalimagename}:${inputdata.finalimagetag} . -f ${finaldockerfilename}`;
  const singularitycommands = [
    `singularity build ${inputdata.singularityimagename}.sif docker-daemon://${inputdata.finalimagename}:${inputdata.finalimagetag} `,
    `singularity shell ${inputdata.singularityimagename}.sif`,
  ];
  return (
    <Box margin={{ left: "5%", right: "5%", top: "5%" }}>
      <Text weight="bold">Note: </Text>
      <Text margin={{ bottom: "20px" }}>
        Clone <a>git@github.hpe.com:sumit-bharat-mandlik/mpi-test.git</a> in
        your directory where dockerfile exists to test the image
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
