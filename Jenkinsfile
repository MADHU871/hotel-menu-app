pipeline {

    agent any

    stages {

        stage('Clone GitHub Repo') {
            steps {
                git branch: 'main',
                url: 'https://github.com/MADHU871/hotel-menu-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t mad0008271/hotel-menu-backend ./backend'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Docker Push') {
            steps {
                sh 'docker push mad0008271/hotel-menu-backend'
            }
        }

    }
}