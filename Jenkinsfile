pipeline {

    agent any

    stages {

        stage('Clone GitHub Repo') {
            steps {
                git 'https://github.com/MADHU871/hotel-menu-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t mad0008271/hotel-menu-backend ./backend'
            }
        }

        stage('Docker Push') {
            steps {
                sh 'docker push mad0008271/hotel-menu-backend'
            }
        }

    }
}