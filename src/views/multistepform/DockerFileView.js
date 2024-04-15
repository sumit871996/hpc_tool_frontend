import React, { useContext, useEffect, useState } from "react";
import ConsoleView from "../../components/OutputWindow/ConsoleView";
import { Anchor, Box, Button, Text } from "grommet";
import { Copy, Download } from "grommet-icons";
import { WizardContext } from "./WizardContext";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "../../css//ConsoleView.css";
export const DockerFileView = (e) => {
  const {
    formValues,
    dockerCommands,
    dockerIntelMPIFile,
    dockerMPICHFile,
    dockerOpenMPIFile,
    buildCommand,
    setBuildCommand,
    dockerfilename,
    setDockerFileName,
    finalDockerfile,
    setDockerfile,
    basedockerfilename,
    setBasedockerfilename,
    dockerBuildAppCommand,
    setDockerBuildAppCommand,
  } = useContext(WizardContext);
  const docker_commands = dockerCommands;
  const elementsArray = docker_commands.split("\n");

  useEffect(() => {
    dataForDockerfile(formValues);
  }, []);

  const finaldockerfile = [
    `FROM ${formValues.imagename}:${formValues.imagetag}`,
    `RUN sudo apt-get update && sudo apt-get install unzip`,
    "#### ADD DEFAULT USER ####",
    "ARG USER",
    "ENV USER ${USER}",
    "RUN useradd -m ${USER} && chown -R ${USER}:${USER} /home/${USER} || true",
    "#### CREATE WORKING DIRECTORY FOR USER ####",
    "ARG WORKDIR",
    "ENV WORKDIR ${WORKDIR}",
    "RUN mkdir -p ${WORKDIR} && chown -R ${USER}:${USER} ${WORKDIR}",
    "ENV OPAL_PREFIX=/usr/local",
    "WORKDIR ${WORKDIR}",
    "USER ${USER}",
    "COPY ./application.zip .",
    "ARG c_file",
    "RUN unzip -u application.zip && c_file=$(find . -type f -name *.c -print -quit) && mpicc ${c_file} -o application.exe",
    `CMD ["sh", "-c", "./application.exe 1>&2 & tail -f /dev/null"]`,
    ...elementsArray,
  ];
  setDockerFileName(finaldockerfile);

  // const [dockerfilename, setDockerFileName] = useState();
  const [finalDockerfilename, setFinalDockerfilename] = useState();
  const [dockerPushBuildCommand, setDockerPushBuildCommand] = useState();

  // const [buildCommand, setBuildCommand] = useState();
  const [singularityCommands, setSingularityCommands] = useState([]);
  const [intelCode, setIntelCode] = React.useState(
    dockerIntelMPIFile.join("\n")
  );
  const [MPICode, setMPICode] = React.useState(dockerMPICHFile.join("\n"));
  const [OpenCode, setOpenCode] = React.useState(dockerOpenMPIFile.join("\n"));

  const dataForDockerfile = (data) => {
    let docfilename;
    let fdockerfilename;
    if (formValues.mpi_type == "IntelMPI") {
      docfilename = "DockerfileIntelMPI";
      setBasedockerfilename(docfilename);
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
      setBasedockerfilename(docfilename);
      fdockerfilename = `DockerFile${formValues.finalimagename}`;
      setDockerPushBuildCommand(
        `docker image build -t ${formValues.imagename}:${formValues.imagetag} --build-arg MPI_VERSION=${formValues.mpi_ch_version} --build-arg MPI_CONFIGURE_OPTIONS="${formValues.mpi_configure_options}" --build-arg USER=${formValues.user} --build-arg WORKDIR=${formValues.workdir}`
      );
      setBuildCommand(
        `docker image build -t ${formValues.imagename}:${formValues.imagetag} --build-arg MPI_VERSION=${formValues.mpi_ch_version} --build-arg MPI_CONFIGURE_OPTIONS="${formValues.mpi_configure_options}" --build-arg USER=${formValues.user} --build-arg WORKDIR=${formValues.workdir} . -f ${docfilename}`
      );
      setDockerBuildAppCommand(
        `docker image build -t ${formValues.finalimagename}:${formValues.finalimagetag} --build-arg USER=${formValues.user} --build-arg WORKDIR=${formValues.workdir} . -f ${fdockerfilename}`
      );
      setSingularityCommands([
        `singularity build ${formValues.singularityimagename}.sif docker-daemon://${formValues.finalimagename}:${formValues.finalimagetag}`,
        `singularity shell ${formValues.singularityimagename}.sif`,
      ]);
      setDockerFileName("DockerfileMPICH");
    } else if (data.mpi_type === "OpenMPI") {
      docfilename = "DockerfileOpenMPI";
      setBasedockerfilename(docfilename);
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
      setDockerFileName("DockerfileOpenMPI");
    }
  };

  const [finalfile, setFinalFile] = useState(
    finaldockerfile.toString().replaceAll(",", "\n")
  );

  const copyToClipboard = () => {
    let modifiedData = "";
    if (formValues.mpi_type == "IntelMPI") {
      modifiedData = dockerIntelMPIFile.join("\n").toString();
    } else if (formValues.mpi_type == "MPICH") {
      modifiedData = dockerMPICHFile.join("\n").toString();
    } else if ("OpenMPI") {
      modifiedData = dockerOpenMPIFile.join("\n").toString();
    }
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
    let modifiedData = "";
    if (formValues.mpi_type == "IntelMPI") {
      modifiedData = dockerIntelMPIFile.toString().replaceAll(",", "\n");
    } else if (formValues.mpi_type == "MPICH") {
      modifiedData = dockerMPICHFile.toString().replaceAll(",", "\n");
    } else if (formValues.mpi_type == "OpenMPI") {
      modifiedData = dockerOpenMPIFile.toString().replaceAll(",", "\n");
    }

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
              {formValues.mpi_type == "IntelMPI" && (
                <Editor
                  value={intelCode}
                  // onValueChange={code => setCode(code)}
                  highlight={(code) => highlight(code, languages.dockerfile)}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                  }}
                />
              )}
              {formValues.mpi_type == "MPICH" && (
                <Editor
                  value={MPICode}
                  // onValueChange={code => setCode(code)}
                  highlight={(code) => highlight(code, languages.dockerfile)}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                  }}
                />
              )}
              {formValues.mpi_type == "OpenMPI" && (
                <Editor
                  value={OpenCode}
                  // onValueChange={code => setCode(code)}
                  highlight={(code) => highlight(code, languages.dockerfile)}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                  }}
                />
              )}
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
              id="buildappcommand"
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
      </Box>
    </Box>
  );
};
