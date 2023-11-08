// FilterExample.js
import React, { useState } from 'react';
import {
    Box,
    Button,
    CheckBoxGroup,
    Form,
    FormField,
    Header,
    Heading,
    Select,
    TextInput,
} from 'grommet';
import { useNavigate } from 'react-router-dom';



const mpich_version = ["4.1.2"]


export const MPICHForm = () => {
    const navigate = useNavigate();
    const navigatefunction = (data) => {
        console.log(data);
        navigate('/dockerfileMPICH/show', { state: { data: data } })
    }

    const [formValues, setFormValues] = React.useState({
        mpich_Version: "4.1.2",
        mpi_configure_options: '',
        mpi_make_options: '-j4',
        user: 'mpi',
        workdir: '/project',
        imagename: 'mpich',
        imagetag: '4.1.2',
        singularityimagename: 'mpich'
    });

    const applyFilters = () => {
        // Mock function to demonstrate implementation
    };

    const onFormChange = value => {
        setFormValues(value);
        applyFilters();
    };

    return (
        <Box gap="medium" width="large">

            <Header
                direction="column"
                align="start"
                gap="xxsmall"
                pad={{ horizontal: 'xxsmall' }}
            >
                <Heading level={2} margin="none">
                    MPICH Specifications
                </Heading>
            </Header>
            <Box
                // Padding used to prevent focus from being cutoff
                pad={{ horizontal: 'xxsmall' }}
            >
                <Form onSubmit={({ value }) => navigatefunction({ value })} value={formValues} onChange={onFormChange} method="post">
                    <Box direction='row' justify='between'>
                        <Box>
                            <FormField
                                htmlFor="mpich_Version"
                                name="mpich_Version"
                                label="MPICH Version"
                            >
                                <Select
                                    id="mpich_Version"
                                    name="mpich_Version"
                                    options={mpich_version}
                                    defaultValue="4.1.2"
                                />
                            </FormField>
                            <FormField
                                htmlFor="mpi_configure_options"
                                name="mpi_configure_options"
                                label="MPI configure options">
                            </FormField>
                            <FormField
                                htmlFor="mpi_make_options"
                                name="mpi_make_options"
                                label="MPI make options">
                            </FormField>
                        </Box>
                        <Box>
                            <FormField
                                htmlFor="user"
                                name="user"
                                label="User">
                            </FormField>
                            <FormField
                                htmlFor="workdir"
                                name="workdir"
                                label="Working Directory">
                            </FormField>
                        </Box>
                        <Box>
                            <FormField
                                htmlFor="imagename"
                                name="imagename"
                                label="Image Name"
                            >
                            </FormField>
                            <FormField
                                htmlFor="imagetag"
                                name="imagetag"
                                label="Image Tag"
                            >
                            </FormField>
                            <FormField
                                htmlFor="singularityimagename"
                                name="singularityimagename"
                                label="Singularity Image Name"
                            >
                            </FormField>
                        </Box>
                    </Box>
                    <Box direction="row-responsive" gap="medium" pad={{ top: 'medium' }}>
                        <Button label="Submit" primary type='submit' />
                        <Button label="Cancel" type='reset' />
                    </Box>
                </Form>
            </Box>
        </Box>
    );
};
