pipeline {

    agent any

    environment {

        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"

        IMAGE_NAME = "mad0008271/hotel-menu-backend"

        CONTAINER_NAME = "hotel-menu-container"

        RESOURCE_GROUP = "hotel-menu-group-us"

        CONTAINER_APP = "hotel-menu-container-app"

        CONTAINER_ENV = "hotel-menu-env"
    }

    stages {

        stage('Clone GitHub Repo') {

            steps {

                git branch: 'main',
                url: 'https://github.com/MADHU871/hotel-menu-app.git'
            }
        }

        stage('Check Docker Version') {

            steps {

                sh '''
                which docker
                docker --version
                docker buildx version
                '''
            }
        }

        stage('Docker Login') {

            steps {

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    '''
                }
            }
        }

        stage('Create Docker Buildx Builder') {

            steps {

                sh '''
                docker buildx create --use --name multi-builder || true
                docker buildx inspect --bootstrap
                '''
            }
        }

        stage('Build and Push AMD64 Docker Image') {

            steps {

                sh '''
                docker buildx build \
                --platform linux/amd64 \
                -t $IMAGE_NAME \
                ./backend \
                --push
                '''
            }
        }

        stage('Docker Pull') {

            steps {

                sh '''
                docker pull $IMAGE_NAME
                '''
            }
        }

        stage('Stop Old Docker Container') {

            steps {

                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                '''
            }
        }

        stage('Run Docker Container') {

            steps {

                sh '''
                docker run -d \
                --name $CONTAINER_NAME \
                --restart always \
                -p 5002:5000 \
                $IMAGE_NAME
                '''
            }
        }

        stage('Docker Logs') {

            steps {

                sh '''
                docker logs $CONTAINER_NAME
                '''
            }
        }

        stage('Azure Login Check') {

            steps {

                sh '''
                az account show
                '''
            }
        }

        stage('Azure Container App Deploy') {

            steps {

                sh '''
                az containerapp update \
                --name $CONTAINER_APP \
                --resource-group $RESOURCE_GROUP \
                --image $IMAGE_NAME
                '''
            }
        }

        stage('Get Azure URL') {

            steps {

                sh '''
                az containerapp show \
                --name $CONTAINER_APP \
                --resource-group $RESOURCE_GROUP \
                --query properties.configuration.ingress.fqdn
                '''
            }
        }

    }

    post {

        success {

            echo 'SUCCESS: Hotel Menu DevOps Pipeline Completed'
        }

        failure {

            echo 'FAILED: Pipeline Error Occurred'
        }

        always {

            sh '''
            docker ps
            '''
        }
    }
}