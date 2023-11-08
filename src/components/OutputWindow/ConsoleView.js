import { Box, Button, Text } from "grommet";
import "./ConsoleView.css"
import { Copy, Download } from "grommet-icons";

const ConsoleView = (props) => {

    const copyToClipboard = () => {
        const modifiedData = props.dockerfile.toString().replaceAll(',', '\n');
        navigator.clipboard.writeText(modifiedData);
    };
    const copyToClipboardCommand = () => {
        const modifiedData = props.buildcommand;
        navigator.clipboard.writeText(modifiedData);
    };
    const copyToClipboardRunCommand = () => {
        const modifiedData = props.singularitycommands.toString().replaceAll(',', '\n');
        navigator.clipboard.writeText(modifiedData);
    };

    const downloadLogs = () => {
        const modifiedData = props.dockerfile.toString().replaceAll(',', '\n');
        JSON.stringify(modifiedData);
        const txtFile = new Blob([modifiedData], { type: 'text/file' });
        const url = URL.createObjectURL(txtFile);
        const link = document.createElement('a');
        link.download = props.dockerfilename;
        link.href = url;
        link.click();
        link.remove();
    };
    return (
        <Box>
            <Box direction='column' >
                <Box
                    direction='row'
                    style={{
                        maxHeight: '40px',
                        minHeight: '40px',
                        backgroundColor: 'grey',
                        minWidth: '550px',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid white',

                    }}
                >
                    <h5
                        style={{
                            color: 'white',
                            fontSize: '16px',
                            margin: '10px 15px 4px',
                            fontWeight: 'bold',
                        }}
                    >
                        Final Dockerfile
                    </h5>
                    <Box direction='row' >
                        <Button
                            icon={<Download color='white' />}
                            onClick={downloadLogs}
                            tip={'Download'}
                        />
                        <Button
                            icon={<Copy color='white' />}
                            onClick={copyToClipboard}
                            tip={'Copy'}
                        />
                    </Box>
                </Box>
                <Box
                    width='100%'

                    border='all'
                    style={{
                        maxHeight: '400px',
                        overflow: 'auto',
                        minHeight: '400px',
                        backgroundColor: 'black',

                        minWidth: '550px',
                    }}
                    id='dockerfile'
                >
                    {props.dockerfile.map((layer, index) => (
                        <Text
                            key={index}
                            style={{
                                color: 'white',
                                fontSize: '14px',
                                margin: '3px 15px 2px',
                            }}
                        >
                            {layer}
                        </Text>
                    ))}

                </Box>
            </Box>
            <Box margin={{ top: '450px' }} >Build commands:</Box>
            <Box direction='column' margin={{ top: '20px' }}  >
                <Box
                    direction='row'
                    style={{
                        maxHeight: '40px',
                        minHeight: '40px',
                        backgroundColor: 'grey',
                        minWidth: '550px',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid white',
                    }}
                >
                    <Box

                        style={{
                            color: 'white',
                            fontSize: '16px',
                            margin: '10px 15px 4px',
                            fontWeight: 'bold',
                        }}
                    >
                        Docker image build command
                    </Box>
                    <Box direction='row'>
                        <Button
                            icon={<Copy color='white' />}
                            onClick={copyToClipboardCommand}
                            tip={'Copy'}
                        />
                    </Box>
                </Box>
                <Box
                    width='100%'
                    border='all'

                    style={{
                        maxHeight: '400px',
                        overflow: 'auto',
                        minHeight: '40px',
                        backgroundColor: 'black',
                        minWidth: '550px',
                    }}
                    id='dockerfile'
                >

                    <Text
                        id='buildcommand'
                        style={{
                            color: 'white',
                            fontSize: '14px',
                            margin: '3px 15px 2px',
                        }}
                    >
                        {props.buildcommand}
                    </Text>


                </Box>

            </Box>


            <Box direction='column' margin={{ top: '20px' }}  >
                <Box
                    direction='row'
                    style={{
                        maxHeight: '40px',
                        minHeight: '40px',
                        backgroundColor: 'grey',
                        minWidth: '550px',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid white',
                    }}
                >
                    <Box

                        style={{
                            color: 'white',
                            fontSize: '16px',
                            margin: '10px 15px 4px',
                            fontWeight: 'bold',
                        }}
                    >
                        Singularity container build commands
                    </Box>
                    <Box direction='row'>
                        <Button
                            icon={<Copy color='white' />}
                            onClick={copyToClipboardRunCommand}
                            tip={'Copy'}
                        />
                    </Box>
                </Box>
                <Box
                    width='100%'
                    border='all'

                    style={{
                        maxHeight: '400px',
                        overflow: 'auto',
                        minHeight: '80px',
                        backgroundColor: 'black',
                        minWidth: '550px',
                    }}
                    id='dockerfile'
                >

                    <Text
                        id='singularitycommands'
                        style={{
                            color: 'white',
                            fontSize: '14px',
                            margin: '3px 15px 2px',
                        }}
                    >
                        {props.singularitycommands.map((elem, index) => {
                            return (<Box key={index}>
                                {elem}
                            </Box>)
                        })}

                    </Text>


                </Box>

            </Box>
        </Box >
    )
}

export default ConsoleView;