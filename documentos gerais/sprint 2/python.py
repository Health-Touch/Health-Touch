from mysql.connector import connect
import psutil
import time
import datetime
import platform
import smtplib
import email.message

def mysql_connection(host, user, passwd, database=None):
    connection = connect(
        host = host,
        user = root,
        passwd = sptech,
        database = database
    )
    return connection

def enviar_email():
    dia = datetime.datetime.now().strftime('%d/%m/%Y %H:%M:%S')
    corpo_email = """
    <div style=";background-color: #020F1F; display: flex; flex-direction: column;">
   <img src="https://i.imgur.com/TN46gxa.png" height="auto" width="70%"
   style="align-self: center;"/> <div style="display: flex;
   flex-direction: column; border: #00FFFC 2px solid; padding: 10px;
   padding-bottom: 30px; width: 70%; align-self: center; margin-button: 20px">
    <h1 style="color: #FF993B; width: 70%; align-self:
    center;">Novo dispositivo de disco conectado</h1> <div
    style="color: white; width: 70%; align-self: center; text-align:
    justify;">
        Prezado Egmar notamos que agora """ + dia + """ um dispositivo de disco
        foi conectado ao dispositivo nomedodispositivo, note que dispositivos de disco
        podem roubar dados ou instalar arquivos oque pode ser problemativo
        ao seu sistema.

    </div>
</div>
<div><br></div>
</div>
    """

    msg = email.message.Message()
    msg['Subject'] = "Dispositivo de disco conectado"
    msg['From'] = 'seusemail'
    msg['To'] = 'alertas-aaaakvas7hw2jmszc33cafsrw4@healthtouchworkspace.slack.com'
    password = 'senhadoseuemail'
    msg.add_header('Content-Type', 'text/html')
    msg.set_payload(corpo_email )

    s = smtplib.SMTP('smtp.gmail.com: 587')
    s.starttls()
    # Login Credentials for sending the mail
    s.login(msg['From'], password)
    s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))

def enviar_email2():
    dia = datetime.datetime.now().strftime('%d/%m/%Y %H:%M:%S')
    corpo_email2 = """
    <div style=";background-color: #020F1F; display: flex; flex-direction: column;">
   <img src="https://i.imgur.com/TN46gxa.png" height="auto" width="70%"
   style="align-self: center;"/> <div style="display: flex;
   flex-direction: column; border: #00FFFC 2px solid; padding: 10px;
   padding-bottom: 30px; width: 70%; align-self: center; margin-button: 20px">
    <h1 style="color: #FF993B; width: 70%; align-self:
    center;">O dispositivo de disco conectado foi desconectado</h1> <div
    style="color: white; width: 70%; align-self: center; text-align:
    justify;">
        Prezado Egmar notamos que agora """ + dia + """ o dispositivo de disco conectado a nomedodispositivo foi desconectado,
        Por favor, se esse dispositivo nao for seu trabalho ou nao foi ordenado por você ou por alguem de confianca confira seus dados.

    </div>
</div>
<div><br></div>
</div>
    """

    msg = email.message.Message()
    msg['Subject'] = "Dispositivo de disco desconectado"
    msg['From'] = 'seuemail'
    msg['To'] = 'alertas-aaaakvas7hw2jmszc33cafsrw4@healthtouchworkspace.slack.com'
    password = 'suasenhadoemail'
    msg.add_header('Content-Type', 'text/html')
    msg.set_payload(corpo_email2 )

    s = smtplib.SMTP('smtp.gmail.com: 587')
    s.starttls()
    # Login Credentials for sending the mail
    s.login(msg['From'], password)
    s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))

resposta = (input('Gostaria de visualizar os dados da máquina? ("S" ou "N"): '))
if(resposta == "S" or resposta == "s"):
    maquina = (input('Qual é o id do seu hardware?'))

    past = False
    atual = False
    usbInfo = ""
    usbPrint = False
   
    while(True):
       
        cpu1 = psutil.cpu_percent()

       # cpu2 = round(cpu1*1.1,1)
       
       # cpu3 = round(cpu2 * 1.05,1)

        mem_used1 = psutil.virtual_memory()[2]

       # mem_used2 = round(mem_used1*1.15,1)

       # mem_used3 = round(mem_used2 - (mem_used2 * 0.05),1)

        disk1 = psutil.disk_usage('C:\\')[3]

       # disk2 = round(disk1 - (disk1*0.05),1)

       # disk3 = round(disk2 / 3,1)

        meu_so = platform.system()

        boot_time = datetime.datetime.fromtimestamp(psutil.boot_time()).strftime("%Y-%m-%d %H:%M:%S")


        print("-----------------------"
              "\n\n-- Sistema Operacional:",meu_so,"\n1º - CPU(%):",cpu1, "\n1º - RAM(%):", mem_used1, "\n1º - DISCO(%):", disk1,
              "\n1º - TEMPO_LIGADO:", boot_time) #,
             # "\n\n",
             # "2º - CPU(%):",cpu2, "\n2º - RAM(%):", mem_used2, "\n2º - DISCO(%):", disk2,
             # "\n2º - TEMPO_LIGADO:", boot_time,
             # "\n\n",
             # "3º - CPU(%):",cpu3, "\n3º - RAM(%):", mem_used3, "\n3º - DISCO(%):", disk3, "\n3º - TEMPO_LIGADO:", boot_time)

 # -----------------------------------------------------------------------------------------------------------------------------------
 
        info = psutil.disk_partitions()
        dia = datetime.datetime.now()
            # dataHora = 'Um dispositivo de dado foi conectado as' + dia.strftime('%d/%m/%Y %H:%M:%S')

        if len(info) > 1:
            atual = True
        else:
            atual = False

        if(atual == True and past == False):
            dia = datetime.datetime.now()
            past = atual
            print('Um dispositivo de dado foi conectado as '+ dia.strftime('%d/%m/%Y %H:%M:%S'))
            usbInfo = 'Um dispositivo de dado foi conectado'
            usbPrint = True

            enviar_email()

        if(past == True and atual == False):
            dia = datetime.datetime.now()
            past = atual
            print('O dispositivo foi desconectado as ' + dia.strftime('%d/%m/%Y %H:%M:%S'))
            usbInfo = 'O dispositivo foi desconectado'
            usbPrint = True
            enviar_email2()
   
       
        connection = mysql_connection('localhost', 'root', 'sptech', 'HealthTouch')

        cpu = str(cpu1)
        mem = str(mem_used1)
        disk = str(disk1)
        maquina = str(maquina)
       
        query = '''
            INSERT INTO Monitoramento(fkOrigem, dado) VALUES
                (
        '''
       
        dados = '1' + ',' + disk + " )"
        dados2 = '2' + ',' + cpu + " )"
        dados3 = '3' + ',' + mem + " )"

        cursor = connection.cursor()
       
        cursor.execute(query+dados)
        connection.commit()
        cursor.execute(query+dados2)
        connection.commit()
        cursor.execute(query+dados3)
        connection.commit()

        if(usbPrint == True):

            query4 = '''
                INSERT INTO USBs(fkDispositivo, descricao) VALUES
                    (
            '''
       
            dados4 = maquina + ", '" + usbInfo + " ')"
           
            cursor.execute(query4+dados4)
            connection.commit()
            usbPrint = False

        time.sleep(5)
           
elif(resposta == "N" or resposta == "n"):
    print("Ok, Obrigado!\n")


connection.close()


