import { useContext, useEffect, useState } from "react";
import ConsoleView from "../../components/OutputWindow/ConsoleView";
import { Anchor, Box, Text } from "grommet";
import { WizardContext } from "./WizardContext";

export const DockerFileView = (e) => {
  const dockercommands = "ps";
  const {formValues, setFormValues}= useContext(WizardContext)
  const elementsArray = dockercommands.split("\n");
//   const inputdata = {
//     finalimagename: "AIN",
//     finalimagetag: "AIT",
//     imagename: "mpich",
//     imagetag: "4.1.0",
//     mpi_ch_version: "4.1.2",
//     mpi_configure_options: "--disable-fortran",
//     mpi_make_options: "-j4",
//     mpi_type: "MPICH",
//     singularityimagename: "ASIN",
//     user: "mpi",
//     workdir: "/project",
//   };

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
      {formValues.mpi_type === "IntelMPI" && (
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
      )}
    </Box>
  );
};
