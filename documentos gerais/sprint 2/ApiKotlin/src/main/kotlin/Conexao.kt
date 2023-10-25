import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate

object Conexao {
    var jdbcTemplate: JdbcTemplate? = null
        get() {
            if (field == null) {
                val dataSource = BasicDataSource()
                dataSource.driverClassName = "com.mysql.cj.jdbc.Driver"
                dataSource.url = "jdbc:mysql://localhost:3306/HealthTouch"
                dataSource.username = "root"
                dataSource.password = "181004Mp."
                val novoJdbcTemplate = JdbcTemplate(dataSource)
                field = novoJdbcTemplate
            }
            return field
        }

    fun criarTabelas() {
        jdbcTemplate!!.execute(
            """
                 CREATE TABLE IF NOT EXISTS USB (
            idUSB INT AUTO_INCREMENT PRIMARY KEY,
            nomeUSB varchar(45),
            dtHoraInserção datetime,
            fkMaquina int, constraint foreign key(fkMaquina) references Maquina(idMaquina),
            fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
            fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
            fkTipoMaquina int, constraint foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina)
        )
            """
        )

        jdbcTemplate!!.execute(
            """
                 CREATE TABLE IF NOT EXISTS processo (
            idProcesso INT AUTO_INCREMENT PRIMARY KEY,
            PID int,
            nome varchar (45),
            UsoMemoria double ,
            UsoCPU double ,
            dtHoraInsercao  datetime,
            fkMaquina int, 
            constraint fkMaquinaProcessos foreign key(fkMaquina) references Maquina(idMaquina),
            fkEmpresa int,
            constraint  fkEmpresaProcessos foreign key(fkEmpresa) references Empresa(idEmpresa),
            fkTipoMaquina int,
            constraint  fkTipoMaquinaProcessos foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
            fkStatus int,
             constraint fkStatusProcessos foreign key(fkStatus) references statusMaquina(idStatusMaquina)
        )
            """
        )

        jdbcTemplate!!.execute(
            """
                 CREATE TABLE IF NOT EXISTS Colaborador (
           idColaborador int primary key auto_increment,
           nome varchar(45),
           email varchar(45),
           senha varchar(45),
           CPF char(14),
           fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
           fkStatus int, constraint foreign key(fkStatus) references statusColaborador(idStatusColaborador),
           fkNivelAcesso int, constraint foreign key(fkNivelAcesso) references NivelAcesso(idNivelAcesso) 
        )
            """
        )



    }
}