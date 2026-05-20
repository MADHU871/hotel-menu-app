pipeline {

    agent any

    environment {
        IMAGE_NAME = "mad0008271/hotel-menu-backend"
        CONTAINER_NAME = "hotel-menu-container"
    }

    stages {

        stage('Clone GitHub Repo') {
            steps {

                git branch: 'main',
                url: 'https://github.com/MADHU871/hotel-menu-app.git'

            }
        }

        stage('Docker Version') {
            steps {
                sh 'docker --version'
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

        stage('Build Docker Image') {

            steps {

                sh '''
                docker build -t $IMAGE_NAME ./backend
                '''
            }
        }

        stage('Docker Push') {

            steps {

                sh '''
                docker push $IMAGE_NAME
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

        stage('Docker Stop Old Container') {

            steps {

                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                '''
            }
        }

        stage('Docker Run Container') {

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

        stage('Azure Login') {

            steps {

                sh '''
                az login
                '''
            }
        }

        stage('Azure Deploy') {

            steps {

                sh '''
                az webapp config container set \
                --name hotel-menu-app-2026 \
                --resource-group hotel-menu-group \
                --docker-custom-image-name $IMAGE_NAME
                '''
            }
        }

    }

    post {

        success {

            echo 'Pipeline Successfully Completed'
        }

        failure {

            echo 'Pipeline Failed'
        }
    }
}