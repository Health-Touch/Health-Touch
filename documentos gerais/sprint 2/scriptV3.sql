create database if not exists HealthTouch;
drop database HealthTouch;
use HealthTouch;

create table Plano (
idPlano Int primary key auto_increment,
tipoPlano varchar(45),
descricao varchar(45)
);

insert into Plano values
(null, 'prime', '1 a 10 máquinas');

insert into Plano values
(null, 'plus', '1 a 15 máquinas');

insert into Plano values
(null, 'ultra', 'máquinas ilimitadas');

select * from plano;

create table Empresa (
idEmpresa int primary key auto_increment,
NomeFantasia varchar(45),
CNPJ char(14),
inicioContrato date,
telFixo char(10),
fkPlano int, constraint foreign key(fkPlano) references Plano(idPlano)
);

insert into Empresa values 
(null, 'sus santo andré', '12345678912345', '2023-10-10', 1191234567, 3);

select * from Empresa;

create table NivelAcesso (
idNivelAcesso int primary key auto_increment,
nivelAcesso char(2)
);

insert into NivelAcesso values
(null, 'RL');

insert into NivelAcesso values
(null, 'GT');

insert into NivelAcesso values
(null, 'ET');

select * from NivelAcesso;

create table statusColaborador (
idStatusColaborador int primary key auto_increment,
statusColaborador varchar(45)
);

insert into statusColaborador values
(null, 'Ativo');

insert into statusColaborador values
(null, 'Desativo');

select * from statusColaborador;

create table Colaborador (
idColaborador int primary key auto_increment,
nome varchar(45),
email varchar(45),
senha varchar(45),
CPF char(14),
fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
fkStatus int, constraint foreign key(fkStatus) references statusColaborador(idStatusColaborador),
fkNivelAcesso int, constraint foreign key(fkNivelAcesso) references NivelAcesso(idNivelAcesso) 
);

insert into Colaborador values (null, 'Fernanda Caramico', 'caramico@gmail.com', '123123', 37637602885, 1, 1, 1);

select * from Colaborador;

create table Telefone (
idTelefone int primary key auto_increment,
TelCel char(11),
TelFixo char(10),
fkColaborador int, constraint foreign key(fkColaborador) references Colaborador (idColaborador)
);

insert into Telefone values
(null, 11912345678, 1109876543, 1);

select * from Telefone;

create table Endereco (
idEndereco int primary key auto_increment,
rua varchar(45),
num int,
estado varchar(45),
CEP char(8),
cidade varchar(45),
fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa)
);

insert into Endereco values
(null, "rua flores", 284, "são paulo", 08121722, "são paulo", 1);

select * from Endereco;

create table setor (
idSetor int primary key auto_increment,
nome varchar(45));

insert into setor values
(null, 'Pediatria');

select * from setor;

create table LocalSala (
idLocalSala int primary key auto_increment,
sala int,
andar int,
fkSetor int, constraint foreign key(fkSetor) references setor(idSetor)
);

insert into LocalSala values
(null, 2, 3, 1);

select * from LocalSala;

create table TipoMaquina (
idTipoMaquina int primary key auto_increment,
tipo varchar(45)
);

insert into TipoMaquina values 
(null, 'Computador');

insert into TipoMaquina values 
(null, 'Toten');

select * from tipoMaquina;

create table statusMaquina (
idStatusMaquina int primary key auto_increment,
statusMaquina varchar(45)
);

insert into statusMaquina values
(null, 'Ativo');

insert into statusMaquina values
(null, 'Desativo');

select * from statusMaquina;

create table Maquina (
idMaquina int primary key auto_increment,
SO varchar(45),
IP char(9),
fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
fkLocal int, constraint foreign key(fkLocal) references LocalSala(idLocalSala),
fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkStatusMaquina int, constraint foreign key(fkStatusMaquina) references statusMaquina(idStatusMaquina),
fkTipoMaquina int, constraint foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina)
);

insert into Maquina values 
(null, "windows", 123456789, 1, 1, 1, 1, 1);

select * from Maquina;

create table USB (
idUSB int primary key auto_increment,
nomeUSB varchar(45),
dtHoraInserção datetime,
fkMaquina int, constraint foreign key(fkMaquina) references Maquina(idMaquina),
fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoMaquina int, constraint foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina)
);

insert into USB values
(null, "usbTeste", "2023-10-16 12:24:22.333", 1, 1, 3, 1);

select * from USB;

create table analiseToten (
idAnaliseToten int primary key auto_increment,
nomeBotao varchar(30),
dataHora date,
fkMaquina int, constraint foreign key(fkMaquina) references Maquina(idMaquina),
fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoMaquina int, constraint foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina)
);

select * from AnaliseToten;

create table Componente (
idComponente int primary key auto_increment,
nome varchar(50),
capacidade varchar(50),
fkMaquina int, constraint foreign key(fkMaquina) references Maquina(idMaquina),
fkEmpresaMaquina int, constraint foreign key(fkEmpresaMaquina) references Maquina(idMaquina),
fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoMaquina int, constraint foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina)
);

insert into Componente values
(null, "cpu", "9 nucleos", 1, 1, 1, 1);

insert into Componente values
(null, "disco", "500gb", 1, 1, 1, 1);

insert into Componente values
(null, "ram", "16gb", 1, 1, 1, 1);

select * from Componente;

create table Monitoramento (
idMonitoramento int primary key auto_increment,
porcentagem varchar (45),
dataHora datetime,
fkComponente int, constraint foreign key(fkComponente) references Componente(idComponente),
fkMaquina int, constraint foreign key(fkMaquina) references Maquina(idMaquina),
fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoMaquina int, constraint foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
fkEmpresaMaquina int, constraint foreign key(fkEmpresaMaquina) references Maquina(idMaquina)
);

select * from Monitoramento;

create table ProcessosLooca (
idProcessosLooca int primary key auto_increment,
nome varchar(45),
PID int,
usoCPU varchar(45),
fkMaquina int, constraint foreign key(fkMaquina) references Maquina(idMaquina),
fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
fkTipoMaquina int, constraint foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
fkStatusMaquina int, constraint foreign key(fkStatusMaquina) references StatusMaquina(idStatusMaquina)
);

select * from ProcessosLooca;

create table NivelAvisos (
idNivelAvisos int primary key auto_increment,
nivelAvisos varchar(45),
dataHora date);

select * from NivelAvisos;

create table avisos (
idAvisos int primary key auto_increment,
dataHora date,
fkMonitoramento int, constraint foreign key(fkMonitoramento) references Monitoramento(idMonitoramento),
fkComponente int, constraint foreign key(fkComponente) references Componente(idComponente),
fkMaquina int, constraint foreign key(fkMaquina) references Maquina(idMaquina),
fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoMaquina int, constraint foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina),
fkNivelAviso int, constraint foreign key(fkNivelAviso) references Avisos(idAvisos));

select * from avisos;