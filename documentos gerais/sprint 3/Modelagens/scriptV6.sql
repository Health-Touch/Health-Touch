create database HealthTouch;
use HealthTouch;

create table Plano (
idPlano Int primary key auto_increment,
tipoPlano varchar(45),
descricao varchar(45)
);

insert into Plano values
(null, 'Ultra', 'máquinas ilimitadas'),
(null, 'Plus', '1 a 15 máquinas'),
(null, 'Prime', '1 a 10 máquinas');

select * from Plano;

-- Empresa --

create table Empresa (
idEmpresa int auto_increment,
NomeFantasia varchar(45),
CNPJ char(14),
inicioContrato date,
telFixo char(10),
fkPlano int, 
constraint fk_plano_empresa foreign key(fkPlano) references Plano(idPlano),
constraint pkComposta primary key (idEmpresa, fkPlano)
);

insert into Empresa values 
(null, 'Sus Santo André', '12345678912345', '2023-10-10', 1191234567, 3);

select * from Empresa;

-- Endereço --

create table Endereco (
idEndereco int auto_increment,
rua varchar(45),
num int,
estado varchar(45),
CEP char(8),
cidade varchar(45),
fkEmpresa int, 
constraint fk_empresa_endereco foreign key(fkEmpresa) references Empresa(idEmpresa),
constraint pk_composta_endereco primary key (idEndereco, fkEmpresa) 
);

insert into Endereco values
(null, "Rua Flores", 284, "São Paulo", 08121722, "São Paulo", 1);

select * from Endereco;

-- Nível de Acesso --

create table NivelAcesso (
idNivelAcesso int primary key auto_increment,
nivelAcesso char(2)
);

insert into NivelAcesso values
(null, 'RL'),
(null, 'GT'),
(null, 'ET');

select * from NivelAcesso;

-- Status Colaborador --

create table statusColaborador (
idStatusColaborador int primary key auto_increment,
statusColaborador varchar(45)
);

insert into statusColaborador values
(null, 'Ativo'),
(null, 'Desativo');

select * from statusColaborador;

-- Colaborador --

create table Colaborador (
idColaborador int auto_increment,
nome varchar(45),
email varchar(45),
senha varchar(45),
CPF char(11), 
fkEmpresa int, 
constraint fk_empresa_colaborador foreign key(fkEmpresa) references Empresa(idEmpresa),
fkStatus int, 
constraint fk_status_colaborador foreign key(fkStatus) references statusColaborador(idStatusColaborador),
fkNivelAcesso int, 
constraint fk_nivel_acesso_colaborador foreign key(fkNivelAcesso) references NivelAcesso(idNivelAcesso),
constraint pk_composta_colaborador primary key (idColaborador, fkEmpresa, fkStatus, fkNivelAcesso)
);

insert into Colaborador values (null, 'Fernanda Caramico', 'caramico@gmail.com', '123123', 37637602885, 1, 1, 1);
insert into Colaborador values (null, 'tinkers', 'tinkers@gmail.com', '123123', 37637602884, 1, 1, 2);

select * from Colaborador;

-- Telefone --

create table Telefone (
idTelefone int auto_increment,
TelCel char(11),
TelFixo char(10),
fkColaborador int,
constraint fk_colaborador_telefone foreign key(fkColaborador) references Colaborador (idColaborador),
constraint pk_composta_telefone primary key (idTelefone, fkColaborador)
);

insert into Telefone values
(null, 11912345678, 1109876543, 1);

select * from Telefone;

-- Setor --

create table setor (
idSetor int primary key auto_increment,
nome varchar(45));

insert into setor values
(null, 'Pediatria');

select * from setor;

-- Local Sala --

create table LocalSala (
idLocalSala int auto_increment,
sala int,
andar int,
fkSetor int,
constraint fk_setor_local_sala foreign key(fkSetor) references setor(idSetor),
constraint pk_composta_local_sala primary key (idLocalSala, fkSetor)
);

insert into LocalSala values
(null, 2, 3, 1),
(null, 3, 2, 1);

select * from LocalSala;

-- Tipo de Máquina --

create table TipoMaquina (
idTipoMaquina int primary key auto_increment,
tipo varchar(45)
);

insert into TipoMaquina values 
(null, 'Computador'),
(null, 'Toten');

select * from tipoMaquina;

-- Status da Máquina --

create table statusMaquina (
idStatusMaquina int primary key auto_increment,
statusMaquina varchar(45)
);

insert into statusMaquina values
(null, 'Ativo'),
(null, 'Desativo');

select * from statusMaquina;

-- Máquina --

create table Maquina (
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

insert into Maquina values (null, "Windows", 123456789, 1, 1, 1, 1, 1);
insert into Maquina values (null, "Linux", 123456789, 1, 1, 2, 1, 2);
insert into Maquina values (null, "Linux", 123456789, 1, 1, 2, 1, 1);

select * from Maquina;

-- USB --

create table USB (
idUSB int auto_increment,
nomeUSB varchar(45),
dtHoraInserção datetime,
fkMaquina int, 
constraint fk_maquina_usb  foreign key(fkMaquina) references Maquina(idMaquina),
fkEmpresa int, 
constraint fk_empresa_usb foreign key(fkEmpresa) references Empresa(idEmpresa),
fkPlanoEmpresa int, 
constraint fk_plano_empresa_usb foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoMaquina int, 
constraint fk_tipo_maquina_usb foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
constraint pk_composta_usb primary key (idUSB,fkMaquina, fkEmpresa,fkPlanoEmpresa,fkTipoMaquina)
);

insert into USB values
(null, "usbTeste", "2023-10-16 12:24:22.333", 1, 1, 3, 1);

select * from USB;

-- Análise de Toten --

create table analiseToten (
idAnaliseToten int auto_increment,
nomeBotao varchar(30),
dataHora date,
fkMaquina int, 
constraint fk_maquina_analise_toten foreign key(fkMaquina) references Maquina(idMaquina),
fkEmpresa int, 
constraint fk_empresa_analise_toten foreign key(fkEmpresa) references Empresa(idEmpresa),
fkPlanoEmpresa int, 
constraint fk_plano_empresa_analise_toten foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoMaquina int, 
constraint fk_tipo_maquina_analise_toten foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
constraint pk_composta_analise_toten primary key (idAnaliseToten,fkMaquina, fkEmpresa,fkPlanoEmpresa,fkTipoMaquina)
);

INSERT INTO analiseToten (nomeBotao, dataHora, fkMaquina, fkEmpresa, fkPlanoEmpresa, fkTipoMaquina)
VALUES
('Dentista', '2023-11-28', 1, 1, 1, 1),
('Dentista', '2023-11-28', 1, 1, 1, 1),
('Dentista', '2023-11-28', 1, 1, 1, 1),
('Dentista', '2023-11-28', 1, 1, 1, 1);

select * from AnaliseToten;

-- Componetes --

create table Componente (
idComponente int auto_increment,
nome varchar(50),
capacidade varchar(50),
fkMaquina int, 
constraint fk_maquina_componente foreign key(fkMaquina) references Maquina(idMaquina),
fkEmpresaMaquina int, 
constraint fk_empresa_maquina_componente foreign key(fkEmpresaMaquina) references Maquina(idMaquina),
fkPlanoEmpresa int, 
constraint fk_plano_empresa_componente foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoMaquina int, 
constraint fk_tipo_maquina_componente foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
constraint pk_composta_componete primary key (idComponente,fkMaquina, fkEmpresaMaquina,fkPlanoEmpresa,fkTipoMaquina)
);

insert into Componente values
(null, "CPU", "9 Núcleos", 1, 1, 1, 1);

insert into Componente values
(null, "DISCO", "500GB", 1, 1, 1, 1);

insert into Componente values
(null, "RAM", "16GB", 1, 1, 1, 1);

select * from Componente;

-- Monitoramento -- 

create table Monitoramento (
idMonitoramento int auto_increment,
porcentagem varchar (45),
dataHora datetime,
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

insert into Monitoramento values
(null, 55.44, '2020-09-14 20:18:17', 3, 1,1,1,1),
(null, 40.44, '2020-09-14 22:18:17', 3, 1,1,1,1),
(null, 30.44, '2020-09-14 23:18:17', 3, 1,1,1,1),
(null, 70.44, '2020-09-14 23:18:17', 3, 1,1,1,1),
(null, 60.44, '2020-09-14 23:18:17', 3, 1,1,1,1);

insert into Monitoramento values
(null, 65.44, '2020-09-14 20:18:17', 3, 1,1,1,1);

select porcentagem, fkComponente from monitoramento
    where fkMaquina = 1 and fkComponente = 1 and fkComponente = 2
    order by idMonitoramento desc limit 2;

select * from Monitoramento;

create table MonitoramentoYasmin (
idMonitoramento int auto_increment,
porcentagem varchar (45),
dataHora datetime,
ramDisponivel varchar(20),
ramUsada varchar(20),
frequencia varchar(20), 
fkComponente int, 
constraint fk_componente_monitoramento2 foreign key(fkComponente) references Componente(idComponente),
fkMaquina int, 
constraint fk_maquina_monitoramento2  foreign key(fkMaquina) references Maquina(idMaquina),
fkPlanoEmpresa int, 
constraint fk_plano_empresa_monitoramento2  foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoMaquina int, 
constraint fk_tipo_maquina_monitoramento2  foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
fkEmpresaMaquina int, 
constraint fk_empresa_monitoramento2  foreign key(fkEmpresaMaquina) references Maquina(idMaquina),
constraint pk_composta_monitoramnto primary key (idMonitoramento,fkComponente,fkMaquina,  fkPlanoEmpresa, fkTipoMaquina, fkEmpresaMaquina)
);

INSERT INTO MonitoramentoYasmin (porcentagem, dataHora, ramDisponivel, ramUsada, frequencia, fkComponente, fkMaquina, fkPlanoEmpresa, fkTipoMaquina, fkEmpresaMaquina)
VALUES
('30%', '2023-11-28 10:15:00', '8192MB', '4096MB', '2.4 GHz', 1, 1, 1, 1, 1);

select * from MonitoramentoYasmin;

-- Processo --

CREATE TABLE IF NOT EXISTS processo (
idProcesso int  auto_increment,
nome varchar(45),
PID int,
uso_cpu decimal(20,10),
uso_ram decimal(20,10), 
total_processos int,
total_threads int, 
dtHoraInsercao  datetime,
fkMaquina int, 
constraint fk_maquina_processo foreign key(fkMaquina) references Maquina(idMaquina),
fkEmpresa int, 
constraint fk_empresa_processo foreign key(fkEmpresa) references Empresa(idEmpresa),
fkTipoMaquina int, 
constraint fk_tipo_maquina_processo foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
fkStatusMaquina int, 
constraint fk_status_maquina_processo foreign key(fkStatusMaquina) references StatusMaquina(idStatusMaquina),
constraint pk_composta_processo primary key (idProcesso, fkMaquina,  fkEmpresa, fkTipoMaquina, fkStatusMaquina));

INSERT INTO processo 
(nome, PID, uso_cpu, uso_ram, total_processos, total_threads, dtHoraInsercao, fkMaquina, fkEmpresa, fkTipoMaquina, fkStatusMaquina)
VALUES
('google', 1234, 10.5, 2048.75, 50, 8, '2023-11-28 09:45:00', 1, 1, 1, 1);

select * from processo;

create table ProcessoYasmin (
idProcesso int auto_increment,
nome varchar(45),
PID int,
usoCPU varchar(45),
usoRAM varchar(45),
fkMaquina int, 
constraint fk_maquina_processo2 foreign key(fkMaquina) references Maquina(idMaquina),
fkEmpresa int, 
constraint fk_empresa_process2 foreign key(fkEmpresa) references Empresa(idEmpresa),
fkTipoMaquina int, 
constraint fk_tipo_maquina_processo2 foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
fkStatusMaquina int, 
constraint fk_status_maquina_processo2 foreign key(fkStatusMaquina) references statusMaquina(idStatusMaquina),
constraint pk_composta_processo primary key (idProcesso, fkMaquina,  fkEmpresa, fkTipoMaquina, fkStatusMaquina)
);

INSERT INTO ProcessoYasmin (nome, PID, usoCPU, usoRAM, fkMaquina, fkEmpresa, fkTipoMaquina, fkStatusMaquina)
VALUES
('NomeDoProcessoYasmin', 5678, '20%', '4096MB', 1, 1, 1, 1);

select * from ProcessoYasmin;

-- Aviso --

create table aviso(
idAviso int  auto_increment,
dataHora datetime,
nivelAviso varchar (45),
cor varchar (45),
fkMonitoramento int,
 constraint foreign key(fkMonitoramento) references Monitoramento(idMonitoramento),
fkComponente int,
constraint fk_componete_aviso foreign key(fkComponente) references Componente(idComponente),
fkMaquina int,
constraint fk_maquina_aviso foreign key(fkMaquina) references Maquina(idMaquina),
fkEmpresa int,
constraint fk_empresa_aviso foreign key(fkEmpresa) references Empresa(idEmpresa),
fkPlanoEmpresa int,
constraint fk_plano_empresa_aviso foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoMaquina int,
constraint fk_tipo_maquina_aviso foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
primary key (idAviso,fkMonitoramento,fkComponente, fkMaquina,fkEmpresa, fkPlanoEmpresa, fkTipoMaquina)
);

select * from aviso;

-- Parâmetro --

create table parametro (
idParametro int auto_increment ,
critico double,
alerta double, 
fkComponente int,
constraint fk_componete_parametro foreign key(fkComponente) references Componente(idComponente),
constraint pk_composta_parametro primary key (idParametro,fkComponente)
);

insert into parametro (idParametro,critico,alerta,fkComponente) values
(null, 30.0, 15.00 , 1),
(null, 50.0, 40.00 , 2),
(null, 70.0, 65.00 , 3);

select * from parametro;

-- Criando Trigger --

DELIMITER //
CREATE TRIGGER trigger_alerta AFTER INSERT ON Monitoramento FOR EACH ROW
BEGIN
    DECLARE v_id_parametro INT;
    DECLARE v_alerta DOUBLE;
    DECLARE v_critico DOUBLE;
    DECLARE v_porcentagem DOUBLE;

    SELECT NEW.porcentagem
    INTO v_porcentagem;
    
    SELECT p.idParametro, p.alerta, p.critico
    INTO v_id_parametro, v_alerta, v_critico
    FROM parametro as p
    WHERE p.idParametro = NEW.fkComponente;

    IF v_porcentagem >= v_critico THEN
      INSERT INTO aviso (dataHora,nivelAviso,cor, fkMonitoramento,fkComponente, fkMaquina,fkEmpresa, fkPlanoEmpresa, fkTipoMaquina)
        VALUES (NOW(), "Crítico", "Vermelho", NEW.idMonitoramento, NEW.fkComponente, NEW.fkMaquina, NEW.fkEmpresaMaquina, NEW.fkPlanoEmpresa, NEW.fkTipoMaquina);
    ELSEIF  v_porcentagem >= v_alerta THEN
     INSERT INTO aviso (dataHora,nivelAviso,cor,fkMonitoramento,fkComponente, fkMaquina,fkEmpresa, fkPlanoEmpresa, fkTipoMaquina)
        VALUES (NOW(), "Alerta", "Amarelo", NEW.idMonitoramento, NEW.fkComponente, NEW.fkMaquina, NEW.fkEmpresaMaquina, NEW.fkPlanoEmpresa, NEW.fkTipoMaquina);
    
    END IF;
END;
//
DELIMITER ;

create table rede (
idRede int primary key auto_increment, 
IP varchar(45) unique
);

insert into rede values 
(null, '132.209.290.00');

select * from rede;

create table monitoramentoRede (
idMonitoramentoRede int auto_increment,
upload double, 
download double,
ping double,
dataHora datetime,
fkRede int, constraint fkRede foreign key (fkRede) references rede (idRede),
fkMaquina int, constraint fkMaquina foreign key (fkMaquina) references Maquina(idMaquina),
fkEmpresa int, constraint fkEmpresa foreign key (fkEmpresa) references Empresa (idEmpresa),
fkPlanoEmpresa int, constraint fkPlanoEmpresa foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoMaquina int, constraint fkTipoMaquina foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
fkLocal int, constraint fkLocal foreign key (fkLocal) references localSala (idLocalSala),
primary key (idMonitoramentoRede, fkRede, fkMaquina, fkEmpresa, fkPlanoEmpresa, fkTipoMaquina, fkLocal)
);

INSERT INTO monitoramentoRede 
(upload, download, ping, dataHora, fkRede, fkMaquina, fkEmpresa, fkPlanoEmpresa, fkTipoMaquina, fkLocal) VALUES
(25.5, 10.3, 3.2, '2023-11-28 08:30:00', 1, 1, 1, 1, 1, 1),
(26.5, 11.3, 4.2, '2023-11-28 08:31:00', 1, 1, 1, 1, 1, 1),
(27.5, 19.3, 5.2, '2023-11-28 08:32:00', 1, 1, 1, 1, 1, 1),
(28.5, 16.3, 6.2, '2023-11-28 08:33:00', 1, 1, 1, 1, 1, 1),
(25.5, 14.3, 4.2, '2023-11-28 08:34:00', 1, 1, 1, 1, 1, 1),
(24.5, 13.3, 5.2, '2023-11-28 08:35:00', 1, 1, 1, 1, 1, 1),
(23.5, 12.3, 6.2, '2023-11-28 08:36:00', 1, 1, 1, 1, 1, 1);

select * from monitoramentoRede;

create table Janela (
idJanela int auto_increment ,
pidJanela int,
tituloJanela varchar(150),
dtjanela datetime,
statusJanela boolean,
fkMaquina int, 
constraint fk_maquina_janela foreign key(fkMaquina) references Maquina(idMaquina),
fkEmpresa int, 
constraint fk_empresa_janela foreign key(fkEmpresa) references Empresa(idEmpresa),
fkPlanoEmpresa int, 
constraint fk_plano_empresa_janela foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoMaquina int, 
constraint fk_tipo_maquina_janela foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
constraint pk_composta_janela primary key (idJanela,fkMaquina, fkEmpresa,fkPlanoEmpresa,fkTipoMaquina)
);

insert into Janela values
(null, 3232323, "fajosfnasjnfjaf", "2023-12-20 00:55:20", 0, 1,1,1,1),
(null, 1212414, "asfasfasfas", "2023-12-20 00:55:20", 1, 1,1,1,1),
(null, 4574454, "ansdoasnda", "2023-12-20 00:55:20", 0, 1,1,1,1),
(null, 4574454, "gdfwefwefwe", "2023-12-20 00:55:20",1, 1,1,1,1);

select * from Janela;