import psutil
import time
import platform
import datetime
from mysql.connector import connect

def mysql_connection(host, user, passwd, database=None):
    connection = connect(
        host = host,
        user = user,
        passwd = passwd,
        database = database
    )
    return connection

connection = mysql_connection('localhost', 'root', 'sptech','HealthTouch')
while True:
        uso_cpu = round(psutil.cpu_percent(interval=1), 2)
        uso_disco = round(psutil.disk_usage('/').percent, 2)
        uso_memoria = round(psutil.virtual_memory().percent, 2)
        data = datetime.datetime.now()

        query = '''
        insert into Monitoramento(porcentagem, dataHora, fkComponente, fkMaquina, fkPlanoEmpresa, fkTipoMaquina, fkEmpresaMaquina)
        VALUES (%s, %s, %s, %s, %s, %s, %s), (%s, %s, %s, %s, %s, %s, %s), (%s, %s, %s, %s, %s, %s, %s);
        '''
        insert = [uso_cpu, data, 1, 1, 1, 1, 1, uso_disco, data, 2, 1, 1, 1, 1, uso_memoria, data, 3, 1, 1, 1, 1]
        cursor = connection.cursor()
        cursor.execute(query, insert)
        connection.commit()

        print(f"Uso da CPU: {uso_cpu}%")
        print(f"Uso do disco: {uso_disco}%")
        print(f"Uso da memória: {uso_memoria}%")
        print("=" * 40)
        print("")
        
        time.sleep(30)
   


    



