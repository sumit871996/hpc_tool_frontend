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

const intel_mkl_versions = [
    '2021.1.1',
    '2021.2.0',
    '2021.3.0',
    '2021.4.0',
    '2022.0.1',
    '2022.0.2',
    '2022.1.0',
    '2022.2.0',
    '2022.2.1',
    '2023.0.0',
    '2023.1.0',
    '2023.2.0'
];

const intel_icc_versions = [
    '2021.1.1',
    '2021.1.2',
    '2021.2.0',
    '2021.3.0',
    '2021.4.0',
    '2022.0.1',
    '2022.0.2',
    '2022.1.0',
    '2022.2.0',
    '2022.2.1',
    '2023.0.0',
    '2023.1.0',
    '2023.2.0',
    '2023.2.1',
];

const intel_tbb_versions = [
    '2021.1.1',
    '2021.2.0',
    '2021.3.0',
    '2021.4.0',
    '2021.5.0',
    '2021.5.1',
    '2021.6.0',
    '2021.7.0',
    '2021.7.1',
    '2021.8.0',
    '2021.9.0',
    '2021.10.0',
];

const intel_mpi_devel_versions = ["2021.1.1", "2021.2.0", "2021.3.0", "2021.3.1", "2021.4.0",
    "2021.5.0", "2021.5.1", "2021.6.0", "2021.7.0", "2021.7.1", "2021.8.0", "2021.9.0"]

export const IntelMPIForm = () => {

    const navigate = useNavigate();

    const navigatefunction = (data) => {
        console.log(data);
        navigate('/dockerfileIntelMPI/show', { state: { data: data } })
    }
    const [formValues, setFormValues] = React.useState({
        intel_mpi_devel_version: "2021.4.0",
        intel_mkl_version: "2021.4.0",
        intel_icc_version: '2021.4.0',
        intel_tbb_version: '2021.4.0',
        singularityimagename: 'intelmpi',
        imagename: 'intelmpi',
        imagetag: '2021.4.0'
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
                    Intel MPI Specifications
                </Heading>
            </Header>
            <Box
                // Padding used to prevent focus from being cutoff
                pad={{ horizontal: 'xxsmall' }}
            >
                <Form onSubmit={({ value }) => navigatefunction({ value })} value={formValues} onChange={onFormChange}>
                    <Box direction='row' justify='between'>
                        <Box><FormField
                            htmlFor="intel_mpi_devel_version"
                            name="intel_mpi_devel_version"
                            label="MPI devel version"
                        >
                            <Select
                                id="intel_mpi_devel_version"
                                name="intel_mpi_devel_version"
                                options={intel_mpi_devel_versions}
                            />
                        </FormField>
                            <FormField
                                htmlFor="intel_mkl_version"
                                name="intel_mkl_version"
                                label="Intel MKL version"
                            >
                                <Select
                                    id="intel_mkl_version"
                                    name="intel_mkl_version"
                                    options={intel_mkl_versions}
                                    defaultValue={intel_mkl_versions[0]}
                                />
                            </FormField>

                            <FormField
                                htmlFor="intel_icc_version"
                                name="intel_icc_version"
                                label="Intel ICC version"
                            >
                                <Select
                                    id="intel_icc_version"
                                    name="intel_icc_version"
                                    options={intel_icc_versions}
                                    defaultValue={intel_icc_versions[0]}
                                />
                            </FormField>

                            <FormField
                                htmlFor="intel_tbb_version"
                                name="intel_tbb_version"
                                label="Intel TBB version"
                            >
                                <Select
                                    id="intel_tbb_version"
                                    name="intel_tbb_version"
                                    options={intel_tbb_versions}
                                    defaultValue={intel_tbb_versions[0]}
                                />
                            </FormField>
                        </Box>
                        <Box>
                            <FormField
                                htmlFor="imagename"
                                name="imagename"
                                label="Image Name"
                                defaultValue='intelmpi'>

                            </FormField>
                            <FormField
                                htmlFor="imagetag"
                                name="imagetag"
                                label="Image Tag"
                                defaultValue='2021.4.0'>
                            </FormField>
                            <FormField
                                htmlFor="singularityimagename"
                                name="singularityimagename"
                                label="Singularity Image Name"
                                defaultValue='intelmpi'
                            >
                            </FormField>
                        </Box>
                    </Box>

                    <Box direction="row-responsive" gap="medium" pad={{ top: 'medium' }}>
                        <Button label="Submit" type='submit' primary />
                        <Button label="Cancel" type='reset' />
                    </Box>
                </Form>
            </Box >
        </Box >
    );
};
