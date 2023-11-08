import { Box } from "grommet";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ConsoleView from "./ConsoleView";

const FinaldockerfileIntelMPI = (props) => {
    const location = useLocation();
    const inputdata = location.state.data.value;

    const dockerfilename = "DockerfileIntelMPI"
    const [dockerfile, setDockerfile] = useState([
        'FROM centos:8.4.2105 AS base',
        '    ',
        'RUN sed -i \'s/mirrorlist/#mirrorlist/g\' /etc/yum.repos.d/CentOS-Linux-* && \\',
        '    sed -i \'s|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g\' /etc/yum.repos.d/CentOS-Linux-*',
        'RUN yum install -y ca-certificates',
        'COPY ./oneAPI.repo.sh /oneAPI.repo.sh',
        'RUN /oneAPI.repo.sh',
        'RUN yum install -y which glibc-langpack-en \\',
        '    procps findutils gcc-c++ gcc \\',
        '    file automake autoconf cmake  python3 python3-devel wget',
        'RUN wget --no-check-certificate https://yum.repos.intel.com/intel-gpg-keys/GPG-PUB-KEY-INTEL-SW-PRODUCTS.PUB',
        'RUN rpm --import ./GPG-PUB-KEY-INTEL-SW-PRODUCTS.PUB',
        'RUN yum search -y intel-hpckit | tee /intel-hpckit-list.txt',
        'ARG MPI_VERSION',
        'RUN yum install -y intel-oneapi-mpi-devel-${MPI_VERSION}',
        'ARG ICC_VERSION',
        'RUN yum install -y intel-oneapi-compiler-dpcpp-cpp-and-cpp-classic-${ICC_VERSION}',
        'ARG MKL_VERSION',
        'RUN yum install -y intel-oneapi-mkl-devel-${MKL_VERSION}',
        'ARG TBB_VERSION',
        'RUN yum install -y intel-oneapi-tbb-devel-${TBB_VERSION}',
        'RUN echo \'349f4cbc768814a54add6a135fde7efde117eb108763c888879b9b3c45d4395e819f044d4705776a57f49790b4c90117ebaa86f9bf5802dc5f9f48e9f92a6a07  -\' \\',
        '    > osu-micro-benchmarks-5.8.tgz.sha512sum && \\',
        '    curl --insecure -sSL \'https://mvapich.cse.ohio-state.edu/download/mvapich/osu-micro-benchmarks-5.8.tgz\' | \\',
        '    tee osu-micro-benchmarks-5.8.tgz | \\',
        '    sha512sum -c osu-micro-benchmarks-5.8.tgz.sha512sum && \\',
        '    tar -C /tmp -zxf osu-micro-benchmarks-5.8.tgz && \\',
        '    rm -rf osu-micro-benchmarks-5.8.tgz*',
        'COPY ./build_env_cpu.sh /build_env_cpu.sh',
        'RUN sed -i \\',
        '    -e "s/MPI_VERSION/${MPI_VERSION}/" \\',
        '    -e "s/ICC_VERSION/${ICC_VERSION}/" \\',
        '    -e "s/MKL_VERSION/${MKL_VERSION}/" \\',
        '    -e "s/TBB_VERSION/${TBB_VERSION}/" \\',
        '    /build_env_cpu.sh',
        'RUN cd /tmp/osu-micro-benchmarks-5.8 && \\',
        '    /build_env_cpu.sh ./configure --prefix=/opt/osu',
        'RUN cd /tmp/osu-micro-benchmarks-5.8 && \\',
        '    /build_env_cpu.sh make -j',
        'RUN cd /tmp/osu-micro-benchmarks-5.8 && \\',
        '    /build_env_cpu.sh make install',
        'RUN rm -rf /tmp/*',
        'RUN cd /usr/bin && \\',
        '    ln -s /opt/osu/libexec/osu-micro-benchmarks/mpi/*/* .',
        '    ',
        'FROM centos:8.4.2105 as final',
        '    ',
        'COPY --from=base /opt/intel/oneapi/mpi/$MPI_VERSION /opt/intel/oneapi/mpi/$MPI_VERSION',
        'COPY --from=base /opt/osu /opt/osu',
        'RUN sed -i \'s/mirrorlist/#mirrorlist/g\' /etc/yum.repos.d/CentOS-Linux-* && \\',
        '    sed -i \'s|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g\' /etc/yum.repos.d/CentOS-Linux-*',
        'RUN yum install -y file strace bc numactl numactl-libs librdmacm libibverbs pciutils-libs pciutils ucx-ib ucx-rdmacm ucx libpsm2 procps findutils which glibc-langpack-en',
        'RUN ln -s /usr/lib64/libnuma.so.1 /usr/lib64/libnuma.so',
        'RUN cd /usr/bin && \\',
        '    ln -s /opt/osu/libexec/osu-micro-benchmarks/mpi/*/* .'

    ])

    const buildcommand = `docker image build -t ${inputdata.imagename}:${inputdata.imagetag} --build-arg MPI_VERSION=${inputdata.intel_mpi_devel_version} --build-arg ICC_VERSION="${inputdata.intel_icc_version}" --build-arg MKL_VERSION=${inputdata.intel_mkl_version} --build-arg TBB_VERSION=${inputdata.intel_tbb_version} . -f ${dockerfilename}`;
    const singularitycommands = [
        `singularity build ${inputdata.singularityimagename}.sif docker-daemon://${inputdata.imagename}:${inputdata.imagetag} `,
        `singularity shell ${inputdata.singularityimagename}.sif`
    ]
    return (
        <Box margin={{ left: '5%', right: '5%', top: '5%' }}>
            <ConsoleView singularitycommands={singularitycommands} dockerfilename={dockerfilename} buildcommand={buildcommand} dockerfile={dockerfile}></ConsoleView>
        </Box>
    )
}

export default FinaldockerfileIntelMPI;








