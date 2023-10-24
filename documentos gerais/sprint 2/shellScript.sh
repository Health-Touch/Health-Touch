#!/bin/bash

sudo apt update && sudo apt upgrade -y #atualiza os pacotes do sistema

java -version #verifica versao atual do java
if [ $? = 0 ]; #se retorno for igual a 0
        then #entao,
                echo “Java instalado” #print no terminal
        else #se nao,
                echo “Java não instalado” #print no terminal
                echo “Gostaria de instalar o Java? [s/n]” #print no terminal
                read get #variável que guarda resposta do usuário
        if [ \“$get\” == \“s\” ]; #se retorno for igual a s
                then #entao
                sudo apt install openjdk-17-jre -y #executa instalacao do java
        fi #fecha o 2º if
fi #fecha o 1º if

python3 --version #verifica versão atual do python
if [ $? = 0 ]; #Se o retorno for igual a 0
        then #então,
                echo "Python instalado" #print no terminal
        else #se não,
                echo "Python não instalado" #print no terminal
                echo "Gostaria de instalar o Python? [s/n]" #print no terminal
                read get #variavel que guarda a resposta do usuário
        if [ \“$get\” == \“s\” ]; #se o retorno for igual a s
                then #então
                sudo apt install python3 -y #executa instalação do python
        fi #fecha o 2º if
fi #fecha o 1º if

nmon -V #verifica versao atual do nmon
if [ $? = 0 ]; #se retorno for igual a 0
        then #entao,
                echo “NMON instalado” #print no terminal
        else #se nao,
                echo “NMON não instalado” #print no terminal
                echo “Gostaria de instalar o NMON? [s/n]” #print no terminal
                read get #variável que guarda resposta do usuário
        if [ \“$get\” == \“s\” ]; #se retorno for igual a s
                then #entao
                sudo apt install nmon -y #executa instalacao do nmon
        fi #fecha o 2º if
fi #fecha o 1º if

git --version #verifica a versão atual do git
if [ $? = 0 ] #se o retorno for igual a 0
        then #então
                echo "Git instalado" #print no terminal
        else #se não
                echo "Git não instalado" #print no terminal
                echo "Gostaria de instalar o git? [s/n]" #print no terminal
                read get #variavel que guarda a resposta do usuário
        if [ \“$get\” == \“s\” ]; #se o retorno for igual a s
                then #então
                        sudo apt install git -y #executa instalação do git
        fi #fecha o 2º if
fi #fecha o 1º if

grep "Health-Touch" * #verifica o nome do projeto no diretório
        if [ $? = 0 ]; #se o retorno for igual a 0
                then #então
                        echo "Projeto Health Touch instalado" #print no terminal
                else #se não
                        echo "Projeto Health Touch não instalado" #print no terminal
                        echo "Gostaria de instalar o projeto Health Touch? [s/n]" #print no terminal
                        read get #variavel que guarda a resposta do usuário
                if [ \“$get\” == \“s\” ]; #se o retorno for igual a s
                        then #então
                                git clone https://github.com/Health-Touch/Health-Touch.git #executa instalação do projeto de pi
                fi #fecha o 2º if
        fi #fecha o 1º if

grep "NMONVisualizer" * #verifica o nome do nmon no diretório
        if [ $? = 0 ]; #se o retorno for igual a 0
                then #então
                        echo "NMON Visualizer instalado" #print no terminal
                else #se não
                        echo "NMON Visualizer não instalado" #print no terminal
                        echo "Gostaria de instalar o NMON Visualizer? [s/n]" #print no terminal
                        read get #variavel que guarda a resposta do usuário
                if [ \“$get\” == \“s\” ]; #se o retorno for igual a s
                        then #então
                                git clone https://github.com/MarcioIoT/NmonVisualizer.git #executa instalação do NMON Visualizer
                fi #fecha o 2º if
        fi #fecha o 1º if

sudo apt install python3-pip -y #executa a instalação do pip3
pip3 install mysql #instala os pacotes necessários para o python
pip3 install mysql-connector-python #instala os pacotes necessários para o python
pip3 install mysql.connector #instala os pacotes necessários para o python
pip3 install psutil #instala os pacotes necessários para o python
python3 "Health-Touch/documentos gerais/sprint 2/pythonV2.py" #executa a api de python para captura dos dados
nmon -f -s 5 -c 10 #executa o nmon para guardar os dados capturados 10 vezes com intervalo de 5 segundos em um arquivo
java -jar NMONVisualizer.jar #executa o NMON Visualizer