import { Box, Button, Text } from "grommet";
import "./ConsoleView.css";
import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-docker";
import "prismjs/themes/prism.css";
import { Copy, Download } from "grommet-icons";

const ConsoleView = (props) => {
  const [code, setCode] = React.useState(
    props.dockerfile.toString().replaceAll(",", "\n")
  );

  const [finalfile, setFinalFile] = useState(
    props.finaldockerfile.toString().replaceAll(",", "\n")
  );

  const copyToClipboard = () => {
    const modifiedData = props.dockerfile.join("\n").toString();
    navigator.clipboard.writeText(modifiedData);
  };
  const copyToClipboardCommand = () => {
    const modifiedData = props.buildcommand;
    navigator.clipboard.writeText(modifiedData);
  };
  const copyToClipboardRunCommand = () => {
    const modifiedData = props.singularitycommands.join("\n").toString();
    navigator.clipboard.writeText(modifiedData);
  };

  const downloadLogs = () => {
    const modifiedData = props.dockerfile.toString().replaceAll(",", "\n");
    JSON.stringify(modifiedData);
    const txtFile = new Blob([modifiedData], { type: "text/file" });
    const url = URL.createObjectURL(txtFile);
    const link = document.createElement("a");
    link.download = props.dockerfilename;
    link.href = url;
    link.click();
    link.remove();
  };

  const downloadDocker = () => {
    const modifiedData = props.finaldockerfile.toString().replaceAll(",", "\n");
    JSON.stringify(modifiedData);
    const txtFile = new Blob([modifiedData], { type: "text/file" });
    const url = URL.createObjectURL(txtFile);
    const link = document.createElement("a");
    link.download = props.finaldockerfilename;
    link.href = url;
    link.click();
    link.remove();
  };

  const copyToClipboardDocker = () => {
    const modifiedData = props.finaldockerfile.join("\n").toString();
    navigator.clipboard.writeText(modifiedData);
  };
  return (
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

      <Box>
        <Text>Build commands:</Text>
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
            Build Base Image
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
            {props.buildcommand}
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
            Application Dockerfile
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
            Build Application Docker Image
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
            {props.buildappcommand}
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
            Singularity container build commands
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
            {props.singularitycommands.map((elem, index) => {
              return <Box key={index}>{elem}</Box>;
            })}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ConsoleView;
