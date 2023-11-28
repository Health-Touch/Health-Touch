#!/bin/bash

BLUE='0;35'
NC='\033[0m'
VERSAO=11
sudo apt update && sudo apt upgrade -y #atualiza os pacotes do sistema

echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7) Olá Cliente, me chamo Gaia e  serei sua assistente para instalação do nosso projeto!;"
echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Vamos Verificar se você possui o Java instalado...;"
sleep 2
java -version #verifica versao atual do java
if [ $? = 0 ]; #se retorno for igual a 0
        then #entao,
                echo "$(tput setaf 10)[Gaia]:$(tput setaf 7) : Você já tem o java instalado!"
        else #se nao,
               echo "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Opa! Você não tem nenhuma versão do Java instalado, mas sem problemas, irei resolver isso agora!"
                echo "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Confirme para mim se realmente deseja instalar o Java [s/n]?"
                read get #variável que guarda resposta do usuário
        if [ \“$get\” == \“s\” ]; #se retorno for igual a s
                then #entao
                echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Instalando o Java...;"
                sudo apt install openjdk-17-jre -y #executa instalacao do java
                echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Java instalado com sucesso;"
        fi #fecha o 2º if
fi #fecha o 1º if
sleep 2

echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Verificando se o python está instalado...;"

python3 --version #verifica versão atual do python
if [ $? = 0 ]; #Se o retorno for igual a 0
        then #então,
                echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Python já está instalado ;"
        else #se não,
                echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Python não está instalado ;"
                echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Gostaria de instalar o Python? [s/n] ;"
                read get #variavel que guarda a resposta do usuário
        if [ \“$get\” == \“s\” ]; #se o retorno for igual a s
                then #então
                echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Instalando o Python....;"
                sudo apt install python3 -y #executa instalação do python
                echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Python instalado com sucesso;"
        fi #fecha o 2º if
fi #fecha o 1º if
sleep 2
echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Verificando se o Git está instalado...;"
git --version #verifica a versão atual do git
if [ $? = 0 ] #se o retorno for igual a 0
        then #então
               echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)   Git já instalado;"
        else #se não
                echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)   Git não está instalado;"
                 echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)   Gostaria de instalar o Git? [s/n];"
                read get #variavel que guarda a resposta do usuário
        if [ \“$get\” == \“s\” ]; #se o retorno for igual a s
                then #então
                     echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Instalado o Git...;"
                        sudo apt install git -y #executa instalação do git
                    echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Git instalado com sucesso;"
        fi #fecha o 2º if
fi #fecha o 1º if
sleep 2
echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Verificando se o projeto Health-Touch está instalado;"
grep "Health-Touch" ~/script/ #verifica o nome do projeto no diretório
if [ $? = 0 ]; #se o retorno for igual a 0
                then #então
                       echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  O projeto Health-Touch já instalado;"
                else #se não
                        echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7) O projeto Health-Touch não está instalado;"
                       echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Gostaria de instalar o projeto Health-Touch? [s/n];"
                        read get #variavel que guarda a resposta do usuário
                if [ \“$get\” == \“s\” ]; #se o retorno for igual a s
                        then #então
                           echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Instalado projeto...;"
                                git clone https://github.com/Health-Touch/Api-s.git #executa instalação do projeto de pi
                          echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Projeto Instalado com sucesso;"
                fi #fecha o 2º if
        fi #fecha o 1º if
sleep 2

echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Vamos verificar se o Docker está instalado;"
docker --version #verifica a versão atual do git
if [ $? = 0 ] #se o retorno for igual a 0
        then #então
               echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)   Docker já instalado;"
        else #se não
                echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)   Docker não está instalado;"
                 echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)   Gostaria de instalar o Docker? [s/n];"
  read get #variavel que guarda a resposta do usuário
        if [ \“$get\” == \“s\” ]; #se o retorno for igual a s
                then #então
                     echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Instalado o Docker...;"
                               sudo apt install docker.io
                    echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Docker instalado com sucesso;"
        fi #fecha o 2º if
fi #fecha o 1º if
sleep 2
echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7) Agora vamos configurar o Docker;"
      sudo systemctl start docker
      sudo systemctl enable docker
echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7) Criando o Container;"
      sudo docker pull mysql:5.7
      sudo docker images
      sudo docker run -d -p 3306:3306 --name ContainerBD -e "MYSQL_DATABASE=banco1" -e "MYSQL_ROOT_PASSWORD=urubu100" mysql:5.7
echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7) Confirmando se o Container foi criado com sucesso;"
      sudo docker ps -a


echo  "$(tput setaf 10)[Gaia]:$(tput setaf 7)  Executando as Api's de captura;"



#sudo apt install python3-pip -y #executa a instalação do pip3
#pip3 install mysql #instala os pacotes necessários para o python
#pip3 install mysql-connector-python #instala os pacotes necessários para o python
#pip3 install mysql.connector #instala os pacotes necessários para o python
#pip3 install psutil #instala os pacotes necessários para o python
#python3 "Health-Touch/Api-s/pythonV3.py" #executa a api de python para captura dos dados
#ApiKotlin "Health-Touch/Api-s/ApiKotlin-1.0-SNAPSHOT.jar" #executa a api de Kotlin para captura dos dadosoi

