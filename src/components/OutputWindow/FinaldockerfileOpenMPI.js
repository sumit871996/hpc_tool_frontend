import { Box } from "grommet";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ConsoleView from "./ConsoleView";

const FinaldockerfileMPICH = (props) => {
    const location = useLocation();
    const inputdata = location.state.data.value;

    const dockerfilename = "DockerfileOpenMPI"
    const [dockerfile, setDockerfile] = useState([
        'FROM alpine',
        '   ',
        '# Install packages',
        'RUN apk update \\',
        '    && apk add --no-cache build-base libatomic gfortran git valgrind perl linux-headers openssh',
        '   ',
        '#### INSTALL OPENMPI ####',
        '# Source is available at https://www.open-mpi.org/software/ompi/',
        '   ',
        '# Build Options:',
        'ARG MPI_VERSION',
        'ARG MPI_MAJOR_VERSION',
        'ARG MPI_CONFIGURE_OPTIONS',
        'ARG MPI_MAKE_OPTIONS',
        '    ',
        '# Download, build, and install OPENMPI',
        'RUN mkdir /tmp/openmpi-src',
        'WORKDIR /tmp/openmpi-src',
        'RUN wget https://download.open-mpi.org/release/open-mpi/${MPI_MAJOR_VERSION}/openmpi-${MPI_VERSION}.tar.gz \\',
        '    && tar xfz openmpi-${MPI_VERSION}.tar.gz',
        'RUN cd openmpi-${MPI_VERSION} && ./configure ${MPI_CONFIGURE_OPTIONS}',
        'RUN cd openmpi-${MPI_VERSION} && make all ${MPI_MAKE_OPTIONS}',
        'RUN cd openmpi-${MPI_VERSION} && make install',
        'RUN rm -rf /tmp/openmpi-src',
        '    ',
        '#### TEST OPENMPI INSTALLATION ####',
        'RUN mkdir /tmp/mpi-test',
        'WORKDIR /tmp/mpi-test',
        'COPY mpi-test .',
        'RUN sh test.sh',
        'RUN rm -rf /tmp/mpi-test',
        '    ',
        '#### CLEAN UP ####',
        'WORKDIR /',
        'RUN rm -rf /tmp/*',
        '    ',
        '#### ADD DEFAULT USER ####',
        'ARG USER',
        'ENV USER ${USER}',
        'RUN adduser -D ${USER}',
        'ENV USER_HOME /home/${USER}',
        'RUN chown -R ${USER}:${USER} ${USER_HOME}',
        '    ',
        '#### CREATE WORKING DIRECTORY FOR USER ####',
        'ARG WORKDIR',
        'ENV WORKDIR ${WORKDIR}',
        'RUN mkdir ${WORKDIR}',
        'RUN chown -R ${USER}:${USER} ${WORKDIR}',
        'ENV OPAL_PREFIX="/usr/local"',
        'WORKDIR ${WORKDIR}',
        'USER ${USER}'
    ])
    const singularitycommands = [
        `singularity build ${inputdata.singularityimagename}.sif docker-daemon://${inputdata.imagename}:${inputdata.imagetag} `,
        `singularity shell ${inputdata.singularityimagename}.sif`
    ]
    const buildcommand = `docker image build -t ${inputdata.imagename}:${inputdata.imagetag} --build-arg MPI_MAJOR_VERSION=${inputdata.openMPI_Major_Version}  --build-arg MPI_VERSION=${inputdata.openMPI_Version} --build-arg MPI_CONFIGURE_OPTIONS="${inputdata.mpi_configure_options}" --build-arg MPI_MAKE_OPTIONS=${inputdata.mpi_make_options} --build-arg USER=${inputdata.user} --build-arg WORKDIR=${inputdata.workdir} . -f ${dockerfilename}`;
    return (
        <Box margin={{ left: '5%', right: '5%', top: '5%' }}>
            <ConsoleView singularitycommands={singularitycommands} dockerfilename={dockerfilename} buildcommand={buildcommand} dockerfile={dockerfile}></ConsoleView>
        </Box>
    )
}

export default FinaldockerfileMPICH;








