import React, { useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-docker';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import { Box } from 'grommet';

const ConsoleViewV2 = ({ consoleOutput }) => {
    const [code, setCode] = React.useState(
        `FROM ubuntu:18.04\nRUN ls -ls
        RUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -laRUN ls -la`
    );

    return (
        <div>
            <Box>
                <Editor
                    value={code}
                    // onValueChange={code => setCode(code)}
                    highlight={code => highlight(code, languages.dockerfile)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                />
            </Box>

        </div>
    );


}

export default ConsoleViewV2


