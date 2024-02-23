pipeline {
    agent any

    parameters {
        string(name: 'imagetag', description: 'Docker image tag', defaultValue: '')
        string(name: 'BASE_PATH', description: 'Select the file path',defaultValue: 'C:\\ProgramData\\zipfiles\\')
        string(name: 'DOCKER_BUILD_COMMAND', description: 'Docker build command', defaultValue: 'docker build -t')
        string(name: 'dockeruser', description: 'Docker Hub username')
        password(name: 'dockerpassword', description: 'Docker Hub password')
        string(name: 'imagename', description: 'Name of the docker image you want to push')
        text(name:'dockerfile', description:'Dockerfile', defaultValue: "")
        string(name:'DOCKERFILE_NAME', description:'Dockerfile name', defaultValue:'Dockerfile')
        string(name:'ZIP_FILE_NAME', description:'Zip file name', defaultValue:'application.zip')
        
        string(name: 'baseimagetag', description: 'Docker image tag', defaultValue: '')
        string(name: 'BASE_DOCKER_BUILD_COMMAND', description: 'Docker build command', defaultValue: 'docker build -t')
        string(name: 'baseimagename', description: 'Name of the docker image you want to push')
        text(name:'basedockerfile', description:'Dockerfile', defaultValue: "")
        string(name:'BASE_DOCKERFILE_NAME', description:'Dockerfile name', defaultValue:'Dockerfile')
    }
    
    environment {
        WORK_DIR = pwd()  // Use current working directory as the local build directory
        BUILD_ID = UUID.randomUUID().toString()
    }

    stages {
        stage('Copy files from server location to workdirectory (Workspace)') {
            steps {
                script {
                    echo "BUILD_ID=${BUILD_ID}"
                    
                    def isWindows = isUnix() ? false : true

                    catchError(buildResult: 'FAILURE') {
                        if (isWindows) {
                            bat "if not exist ${WORK_DIR}\\mpi-test mkdir ${WORK_DIR}\\mpi-test"
                            bat "xcopy ${params.BASE_PATH}\\mpi-test ${WORK_DIR}\\mpi-test /E /I /Y"
                           
                            bat "copy ${params.BASE_PATH}\\${params.DOCKERFILE_NAME} ${WORK_DIR}\\${params.DOCKERFILE_NAME}"
                            bat "copy ${params.BASE_PATH}\\${params.BASE_DOCKERFILE_NAME} ${WORK_DIR}\\${params.BASE_DOCKERFILE_NAME}"
                            bat "copy ${params.BASE_PATH}\\${params.ZIP_FILE_NAME} ${WORK_DIR}\\application.zip"
                            
                        } else {
                            sh "cp ${params.BASE_PATH}/mpi-test/* ${WORK_DIR}/mpi-test/*"
                            sh "cp ${params.BASE_PATH}/${params.ZIP_FILE_NAME} ${WORK_DIR}/application.zip"
                            sh "cp ${params.BASE_PATH}/${params.DOCKERFILE_NAME} ${WORK_DIR}/${params.DOCKERFILE_NAME}"
                            sh "cp ${params.BASE_PATH}/${params.BASE_DOCKERFILE_NAME} ${WORK_DIR}/${params.BASE_DOCKERFILE_NAME}"
                        }
                    }
                }
            }
        }
        
                

stage('Build Base Docker Image') {
            steps {
                script {
                    def isWindows = isUnix() ? false : true

                    catchError(buildResult: 'FAILURE') {
                        if (isWindows) {
                            bat "${params.BASE_DOCKER_BUILD_COMMAND}"
                        } else {
                            sh "${params.BASE_DOCKER_BUILD_COMMAND}"
                        }
                    }
                }
            }
        }
        
        stage('Push Base to Docker Hub') {
            steps {
                script {
                    def isWindows = isUnix() ? false : true

                    catchError(buildResult: 'FAILURE') {
                        if (isWindows) {
                            bat "docker login -u ${params.dockeruser} -p ${params.dockerpassword}"
                            bat "docker push ${params.dockeruser}/${params.baseimagename}:${params.baseimagetag}"
                        } else {
                            sh "docker login -u ${params.dockeruser} -p ${params.dockerpassword}"
                            sh "docker push ${params.dockeruser}/${params.baseimagename}:${params.baseimagetag}"
                        }

                       
                    }
                }
            }
        }
        
        
        stage('Build Docker Image') {
            steps {
                script {
                    def isWindows = isUnix() ? false : true

                    catchError(buildResult: 'FAILURE') {
                        if (isWindows) {
                            bat "${params.DOCKER_BUILD_COMMAND}"
                        } else {
                            sh "${params.DOCKER_BUILD_COMMAND}"
                        }
                    }
                }
            }
        }
        

        stage('Push to Docker Hub') {
            steps {
                script {
                    def isWindows = isUnix() ? false : true

                    catchError(buildResult: 'FAILURE') {
                        if (isWindows) {
                            bat "docker login -u ${params.dockeruser} -p ${params.dockerpassword}"
                            bat "docker push ${params.dockeruser}/${params.imagename}:${params.imagetag}"
                        } else {
                            sh "docker login -u ${params.dockeruser} -p ${params.dockerpassword}"
                            sh "docker push ${params.dockeruser}/${params.imagename}:${params.imagetag}"
                        }

                       
                    }
                }
            }
        }

    }
}