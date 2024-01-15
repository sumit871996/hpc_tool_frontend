import { useState } from "react";
import ConsoleView from "../../components/OutputWindow/ConsoleView";

export const DockerFileView = (e) => {
  const dockercommands="ps"
  const elementsArray = dockercommands.split("\n");
  const inputdata = {
    finalimagename: "AIN",
    finalimagetag: "AIT",
    imagename: "intelmpi",
    imagetag: "2021.2.0",
    intel_icc_version: "2021.1.2",
    intel_mkl_version: "2021.2.0",
    intel_mpi_devel_version: "2021.2.0",
    intel_tbb_version: "2021.2.0",
    singularityimagename: "AIN",
    sourcecode: null,
  };
  const finaldockerfile=[
    `FROM ${inputdata.imagename}:${inputdata.imagetag}`,
    ...elementsArray,
  ];

  const dockerfilename = "DockerfileIntelMPI";
  const finaldockerfilename = `DockerFile${inputdata.finalimagename}`;

  const [intelDockerFile, setIntelDockerFile] = useState([
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

  const dockerpushbuildcommand = `docker image build -t ${inputdata.imagename}:${inputdata.imagetag} --build-arg MPI_VERSION=${inputdata.intel_mpi_devel_version} --build-arg ICC_VERSION="${inputdata.intel_icc_version}" --build-arg MKL_VERSION=${inputdata.intel_mkl_version} --build-arg TBB_VERSION=${inputdata.intel_tbb_version}`;
  const buildcommand = `docker image build -t ${inputdata.imagename}:${inputdata.imagetag} --build-arg MPI_VERSION=${inputdata.intel_mpi_devel_version} --build-arg ICC_VERSION="${inputdata.intel_icc_version}" --build-arg MKL_VERSION=${inputdata.intel_mkl_version} --build-arg TBB_VERSION=${inputdata.intel_tbb_version} . -f ${dockerfilename}`;
  const buildappcommand = `docker image build -t ${inputdata.finalimagename}:${inputdata.finalimagetag} . -f ${finaldockerfilename}`;
  const singularitycommands = [
    `singularity build ${inputdata.singularityimagename}.sif docker-daemon://${inputdata.finalimagename}:${inputdata.finalimagetag}`,
    `singularity shell ${inputdata.singularityimagename}.sif`,
  ];
  return (
    <Box
      margin={{ left: "5%", right: "5%", top: "5%" }}
      pad={{ bottom: "small" }}
    >
      <Text weight="bold">Note: </Text>
      <Text margin={{ bottom: "20px" }}>
        Clone <a>https://github.hpe.com/sumit-bharat-mandlik/intelfiles.git</a>{" "}
        in your directory where dockerfile exists to test the image
      </Text>
      <ConsoleView
        dockerfile={intelDockerFile}
        dockerfilename={dockerfilename}
        finaldockerfile={finaldockerfile}
        finaldockerfilename={finaldockerfilename}
        buildcommand={buildcommand}
        buildappcommand={buildappcommand}
        singularitycommands={singularitycommands}
        imagename={inputdata.imagename}
        imagetag={inputdata.imagetag}
        dockerpushbuildcommand={dockerpushbuildcommand}
      ></ConsoleView>
    </Box>
  );
};
