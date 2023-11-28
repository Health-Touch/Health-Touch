import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate

class Repositorio {

    private lateinit var jdbcTemplate:JdbcTemplate

    fun criarTabelas(){
        jdbcTemplate.execute("""
create table if not exists Colaborador (
idColaborador int auto_increment,
nome varchar(45),
email varchar(45),
senha varchar(45),
CPF char(14),
fkEmpresa int, 
constraint fk_empresa_colabrador foreign key(fkEmpresa) references Empresa(idEmpresa),
fkStatus int, 
constraint fk_status_colaborador foreign key(fkStatus) references statusColaborador(idStatusColaborador),
fkNivelAcesso int, 
constraint fk_nivel_acesso_colaborador foreign key(fkNivelAcesso) references NivelAcesso(idNivelAcesso),
constraint pk_composta_colaborador primary key (idColaborador, fkEmpresa, fkStatus, fkNivelAcesso)
);
  """)

        jdbcTemplate.execute("""
create table if not exists Maquina (
idMaquina int auto_increment,
SO varchar(45),
IP char(9),
fkEmpresa int, 
constraint fk_empresa_maquina foreign key(fkEmpresa) references Empresa(idEmpresa),
fkLocal int, 
constraint fk_local_sala_maquina  foreign key(fkLocal) references LocalSala(idLocalSala),
fkPlanoEmpresa int, 
constraint fk_plano_empresa_maquina  foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkStatusMaquina int, 
constraint fk_status_maquina  foreign key(fkStatusMaquina) references statusMaquina(idStatusMaquina),
fkTipoMaquina int, 
constraint fk_tipo_maquina  foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
constraint pk_composta_maquina primary key (idMaquina, fkEmpresa, fkPlanoEmpresa, fkStatusMaquina, fkTipoMaquina)
);
  """)


        jdbcTemplate.execute("""
create table if not exists MonitoramentoYasmin (
idMonitoramento int auto_increment,
porcentagem varchar (45),
dataHora datetime,
ramDisponivel varchar(20),
ramUsada varchar(20),
frequencia varchar(20), -- freqCpu
temperatura varchar(20),
fkComponente int, 
constraint fk_componente_monitoramento foreign key(fkComponente) references Componente(idComponente),
fkMaquina int, 
constraint fk_maquina_monitoramento  foreign key(fkMaquina) references Maquina(idMaquina),
fkPlanoEmpresa int, 
constraint fk_plano_empresa_monitoramento  foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoMaquina int, 
constraint fk_tipo_maquina_monitoramento  foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
fkEmpresaMaquina int, 
constraint fk_empresa_monitoramento  foreign key(fkEmpresaMaquina) references Maquina(idMaquina),
constraint pk_composta_monitoramnto primary key (idMonitoramento,fkComponente,fkMaquina,  fkPlanoEmpresa, fkTipoMaquina, fkEmpresaMaquina)
);
  """)

        jdbcTemplate.execute("""
create table if not exists ProcessoYasmin (
idProcesso int auto_increment,
nome varchar(45),
PID int,
usoCPU varchar(45),
usoRAM varchar(45),
fkMaquina int, 
constraint fk_maquina_processo foreign key(fkMaquina) references Maquina(idMaquina),
fkEmpresa int, 
constraint fk_empresa_processo foreign key(fkEmpresa) references Empresa(idEmpresa),
fkTipoMaquina int, 
constraint fk_tipo_maquina_processo foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
fkStatusMaquina int, 
constraint fk_status_maquina_processo foreign key(fkStatusMaquina) references statusMaquina(idStatusMaquina),
constraint pk_composta_processo primary key (idProcesso, fkMaquina,  fkEmpresa, fkTipoMaquina, fkStatusMaquina)
);
  """)
    }

    fun iniciar(){
        jdbcTemplate = Conexao.jdbcTemplate!!
    }

    //Verifica se existe o usuário no banco
    fun verificarLogin(email:String, senha:String):Int?{
        return jdbcTemplate.queryForObject("""
            select count(idColaborador) from Colaborador where email = '$email' and senha = '$senha'
        """, Int::class.java)
    }

    //Pega os dados do usuário logado
    fun dadosColaborador(email: String, senha: String):Colaborador?{
        return jdbcTemplate.queryForObject("""
            SELECT c.nome, c.fkEmpresa, c.fkNivelAcesso, e.fkPlano FROM Colaborador AS c JOIN Empresa AS e ON c.fkEmpresa = e.idEmpresa WHERE email = '$email' AND senha = '$senha'
        """,BeanPropertyRowMapper(Colaborador::class.java))
    }

    //Exibe a lista de máquinas cadastradas da empresa do usuário
    fun exibirMaquinas(fkEmpresa:Int?):List<Maquina>{
        return jdbcTemplate.query("""
            SELECT * FROM Maquina WHERE fkEmpresa = $fkEmpresa
        """, BeanPropertyRowMapper(Maquina::class.java))
    }

    //Validação do ID da máquina a ser monitorada pelo usuário
    fun validarMaquina(idMaquina:Int, fkEmpresa: Int?):Int?{
        return jdbcTemplate.queryForObject("""
            SELECT COUNT(*) FROM Maquina WHERE idMaquina = $idMaquina AND fkEmpresa = $fkEmpresa
        """, Int::class.java)
    }

    //Pega os dados da máquina a ser monitorada
    fun pegarDadosMaquina(idMaquina: Int):Maquina?{
        return jdbcTemplate.queryForObject("""
            SELECT * FROM Maquina where idMaquina = $idMaquina
        """, BeanPropertyRowMapper(Maquina::class.java))
    }

    //Cadastra o monitoramento de CPU
    fun cadastrarMonitoramentoCpu(monitoramento: Monitoramento, maquina: Maquina){
        jdbcTemplate.execute("""
            insert into MonitoramentoYasmin (porcentagem, dataHora, frequencia, fkComponente, fkMaquina, fkPlanoEmpresa, fkTipoMaquina, fkEmpresaMaquina) values
            (${monitoramento.porcentagemCpu}, '${monitoramento.dataHora}', '${monitoramento.frequencia}', 1, ${maquina.idMaquina}, ${maquina.fkPlanoEmpresa}, ${maquina.fkTipoMaquina}, ${maquina.fkEmpresa})
        """.trimIndent())
    }

    //Cadastra o monitoramento de RAM
    fun cadastrarMonitoramentoRam(monitoramento: Monitoramento, maquina: Maquina){
        jdbcTemplate.execute("""
            insert into MonitoramentoYasmin (porcentagem, dataHora, ramDisponivel, ramUsada, fkComponente, fkMaquina, fkPlanoEmpresa, fkTipoMaquina, fkEmpresaMaquina) values
            (${monitoramento.porcentagemRam}, '${monitoramento.dataHora}', '${monitoramento.ramDisponivel}', '${monitoramento.ramUsada}', 2, ${maquina.idMaquina}, ${maquina.fkPlanoEmpresa}, ${maquina.fkTipoMaquina}, ${maquina.fkEmpresa})
        """.trimIndent())
    }

    //Cadastra os processos em uso
    fun cadastrarProcesso(processo: Processo, maquina: Maquina){
        jdbcTemplate.execute("""
           insert into ProcessoYasmin (nome, PID, usoCPU, usoRAM, fkMaquina, fkEmpresa, fkTipoMaquina, fkStatusMaquina) values
            ('${processo.nome}', '${processo.pid}', '${processo.usoCpu}', '${processo.usoRam}', ${maquina.idMaquina}, ${maquina.fkEmpresa}, ${maquina.fkTipoMaquina}, ${maquina.fkStatusMaquina})
        """)
    }
}