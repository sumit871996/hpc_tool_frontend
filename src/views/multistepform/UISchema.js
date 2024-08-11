

export const getFormUISchema = (MPIValue) => {
    console.log("in switch case", MPIValue);

    switch (MPIValue) {
        case "REACT":
            return [
                { node_version: 12 },
                { app_image_name: 12, app_image_tag: 12 },
                { app_docker_commands: 12 },
                { dockeruser: 12, dockerpassword: 12 },
                { app_sin_image_name: 12 },
                { gitUrl: 18, source_code: 18 }
            ];
        case "C":
        case "CPP":
            return [
                { gcc_version: 12 },
                { app_image_name: 12, app_image_tag: 12 },
                { app_docker_commands: 12 },
                { dockeruser: 12, dockerpassword: 12 },
                { app_sin_image_name: 12 },
                { gitUrl: 18, source_code: 18 }

            ];

        case "INTELMPI":
            return [
                { mpi_developement_version: 12, intel_icc_version: 12 },
                { intel_tbb_version: 12, base_image_name: 12 },
                { base_image_tag: 12 },
                { app_image_name: 12, app_image_tag: 12 },
                { app_docker_commands: 12 },
                { dockeruser: 12, dockerpassword: 12 },
                { app_sin_image_name: 12 },
                { gitUrl: 18, source_code: 18 }

            ];
        case "MPICH":
            return [
                { mpich_version: 12, mpi_configure_options: 12 },
                { mpi_make_options: 12, user: 12 },
                { work_dir: 12 },
                { base_image_name: 12, base_image_tag: 12 },

                { app_image_name: 12, app_image_tag: 12 },
                { app_docker_commands: 12 },
                { dockeruser: 12, dockerpassword: 12 },
                { app_sin_image_name: 12 },
                { gitUrl: 18, source_code: 18 }

            ];
            case "OPENMPI":
            return [
                { openmpi_version: 12, openmpi_major_version: 12 },
                { mpi_configure_options: 12, mpi_make_options: 12 },
                { user:12,work_dir: 12 },
                { base_image_name: 12, base_image_tag: 12 },

                { app_image_name: 12, app_image_tag: 12 },
                { app_docker_commands: 12 },
                { dockeruser: 12, dockerpassword: 12 },
                { app_sin_image_name: 12 },
                { gitUrl: 18, source_code: 18 }

            ];
        default:
            return [];
    }
}

