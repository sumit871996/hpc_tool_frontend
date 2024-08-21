

export const getFormUISchema = (MPIValue) => {
    console.log("in switch case", MPIValue);

    const uiWidget = {
        "app_docker_commands": {
            "ui:widget": "textarea"
        },
        "dockerpassword": {
            "ui:widget": "password"
        }
    }

    switch (MPIValue) {
        case "REACT":
            return {
                uiSchema: [
                    { node_version: 12 },
                    { app_image_name: 12, app_image_tag: 12 },
                    { app_docker_commands: 18 },
                    { dockeruser: 12, dockerpassword: 12 },
                    { app_sin_image_name: 12 },
                    { gitUrl: 18, source_code: 18 }],
                uiWidget: uiWidget
            }
        case "C":
        case "CPP":
            return {
                uiSchema: [
                    { gcc_version: 12 },
                    { app_image_name: 12, app_image_tag: 12 },
                    { app_docker_commands: 18 },
                    { dockeruser: 12, dockerpassword: 12 },
                    { app_sin_image_name: 12 },
                    { gitUrl: 18, source_code: 18 }],
                uiWidget: uiWidget
            }

        case "INTELMPI":
            return {
                uiSchema: [
                    { mpi_developement_version: 12, intel_icc_version: 12 },
                    { intel_tbb_version: 12, base_image_name: 12 },
                    { base_image_tag: 12 },
                    { app_image_name: 12, app_image_tag: 12 },
                    { app_docker_commands: 18 },
                    { dockeruser: 12, dockerpassword: 12 },
                    { app_sin_image_name: 12 },
                    { gitUrl: 18, source_code: 18 }
                ],
                uiWidget: uiWidget
            };
        case "MPICH":
            return {
                uiSchema: [
                    { mpich_version: 12, mpi_configure_options: 12 },
                    { mpi_make_options: 12, user: 12 },
                    { work_dir: 12 },
                    { base_image_name: 12, base_image_tag: 12 },

                    { app_image_name: 12, app_image_tag: 12 },
                    { app_docker_commands: 18 },
                    { dockeruser: 12, dockerpassword: 12 },
                    { app_sin_image_name: 12 },
                    { gitUrl: 18, source_code: 18 },
                ],
                uiWidget: uiWidget
            }

        case "OPENMPI":
            return {
                uiSchema: [
                    { openmpi_version: 12, openmpi_major_version: 12 },
                    { mpi_configure_options: 12, mpi_make_options: 12 },
                    { user: 12, work_dir: 12 },
                    { base_image_name: 12, base_image_tag: 12 },

                    { app_image_name: 12, app_image_tag: 12 },
                    { app_docker_commands: 18 },
                    { dockeruser: 12, dockerpassword: 12 },
                    { app_sin_image_name: 12 },
                    { gitUrl: 18, source_code: 18 }

                ],
                uiWidget: uiWidget
            }
        default:
            return {};
    }
}

