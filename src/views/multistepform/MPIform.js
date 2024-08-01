
import React from "react";
// import Form from "@rjsf/core";
import { withTheme } from "@rjsf/core";
import Form from "@rjsf/antd";
import { Theme as AntDTheme } from "@rjsf/antd";
import validator from '@rjsf/validator-ajv8';
import './MPIform.css';


const apiResponse = {
    use_case_id: "5",
    stages: [
        {
            name: "Stage 1",
            rjsf_schema: {
                form_schema: {
                    title: "Base MPI Setup",
                    description:
                        "Stage 1 contains preparing a base image for your MPI Application",
                    type: "object",
                    required: [
                        "mpich_version",
                        "mpi_configure_options",
                        "mpi_make_options",
                        "user",
                        "work_dir",
                        "base_image_name",
                        "base_image_tag",
                    ],
                    properties: {
                        mpich_version: {
                            type: "string",
                            title: "MPICH Version",
                            default: "4.1.2",
                            enum: ["4.1.2"],
                        },
                        mpi_configure_options: {
                            type: "string",
                            title: "mpi_configure_options",
                            default: "--disable-fortran",
                        },
                        mpi_make_options: {
                            type: "string",
                            title: "mpi_make_options",
                            default: "--j4",
                        },
                        user: {
                            type: "string",
                            title: "User",
                            default: "user",
                        },
                        work_dir: {
                            type: "string",
                            title: "Working directory",
                            default: "/project",
                        },
                        base_image_name: {
                            type: "string",
                            title: "MPI Base Image Name",
                            default: "mpich",
                        },
                        base_image_tag: {
                            type: "string",
                            title: "MPI Base Image Tag",
                            default: "1",
                        },
                    },
                },
            },
            //   ui_schema: {
            //     mpich_version: {
            //       "ui:classNames": "custom-mpich_version",
            //     },
            //     mpi_configure_options: {
            //       "ui:classNames": "custom-mpi_configure_options",
            //     },
            //     mpi_make_options: {
            //       "ui:classNames": "custom-mpi_make_options",
            //     },
            //     user: {
            //       "ui:classNames": "custom-user",
            //     },
            //     work_dir: {
            //       "ui:classNames": "custom-work_dir",
            //     },
            //     base_image_name: {
            //       "ui:classNames": "custom-base_image_name",
            //     },
            //     base_image_tag: {
            //       "ui:classNames": "custom-base_image_tag",
            //     },
            //   },
        },
        {
            name: "Stage 2",
            rjsf_schema: {
                form_schema: {
                    description:
                        "This stage contains preparing application image for your MPI Application",
                    type: "object",
                    required: [
                        "app_image_name",
                        "app_image_tag",
                        "dockeruser",
                        "dockerpassword",
                    ],
                    properties: {
                        app_image_name: {
                            type: "string",
                            title: "Application Image Name",
                            default: "ain",
                        },
                        app_image_tag: {
                            type: "string",
                            title: "Application Image Tag",
                            default: "ait",
                        },
                        app_docker_commands: {
                            type: "array",
                            title: "Docker Application Commands",
                            default: "",
                        },
                        dockeruser: {
                            type: "string",
                            title: "Docker Username",
                            default: "",
                        },
                        dockerpassword: {
                            type: "string",
                            title: "Docker Password",
                            default: "",
                        },
                        app_sin_image_name: {
                            type: "string",
                            title: "Application Singularity Image Name",
                            default: "asin",
                        },
                    },
                },
            },
            ui_schema: {},
        },
    ],
};

const schema = apiResponse.stages[0].rjsf_schema.form_schema;
console.log(schema);

const uiSchema = {
    "ui:classNames": "form-row",
    mpich_version: {
      "ui:classNames": "form-field half-width",
    },
    mpi_configure_options: {
      "ui:classNames": "form-field half-width",
    },
    mpi_make_options: {
      "ui:classNames": "form-field half-width",
    },
    user: {
      "ui:classNames": "form-field half-width",
    },
    work_dir:{
        "ui:classNames": "form-field half-width",
    },
    base_image_name:{
        "ui:classNames": "form-field half-width",
    },
    base_image_tag:{
        "ui:classNames": "form-field half-width",
    }
    // Add similar definitions for other fields
  };


const AntDForm = withTheme(AntDTheme);

const onSubmit = (({ formData }) => {
    console.log("Data submitted: ", formData)
})

const MPIform = () => {
    return (
        <div className="form-layout">
            <AntDForm
                schema={schema} onSubmit={onSubmit} validator={validator}
            />
        </div>
    );
};

export default MPIform;
