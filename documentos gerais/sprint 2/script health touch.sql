#criar o db dps apagar a linha do create dtbse e deixar só a linha do use dt e as linhas das tabelas 
# para deixar mais limpos o código deixar os select e desc no final do código de todos os create table e inserts
# apertar no botão "raio amarelo para executar todo o script do banco de dados sem precisar usar o ctrl enter
create database if not exists HealthTouch;
use HealthTouch;

create table Plano (
idPlano Int primary key auto_increment,
tipoPlano varchar(20),
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
(null, 'teste', '12345678912345', '2023-10-10', 1191234567, 3);

select * from Empresa;
select max(idEmpresa) from Empresa;

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
statusColaborador varchar(45));

insert into statusColaborador values
(null, 'ativo');

insert into statusColaborador values
(null, 'desativo');

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

select * from Colaborador;
desc Colaborador;

insert into Colaborador values (null, 'rafa', 'rafa@gmail.com', 'rafa123', 37637602885, 1, 1, 1) ;

create table Telefone (
idTelefone int primary key auto_increment,
TelCel char(11),
TelFixo char(10),
fkColaborador int, constraint foreign key(fkColaborador) references Colaborador (idColaborador)
);

select * from Telefone;

create table Endereco (
idEndereco int primary key auto_increment,
rua varchar(30),
num int,
estado varchar(30),
CEP char(8),
cidade varchar(45),
fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa)
);

select * from Endereco;

create table setor (
idSetor int primary key auto_increment,
nome varchar(45));

insert into setor values
(null, 'pediatria');

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
(null, 'computador');

insert into TipoMaquina values 
(null, 'toten');

select * from tipoMaquina;

create table statusMaquina (
idStatusMaquina int primary key auto_increment,
statusMaquina varchar(45));

insert into statusMaquina values
(null, 'ativo');

insert into statusMaquina values
(null, 'desativo');

select * from statusMaquina;

create table Maquina (
idMaquina int primary key auto_increment,
SO varchar(45),
IP char(9),
andar varchar(30),
fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
fkLocal int, constraint foreign key(fkLocal) references LocalSala(idLocalSala),
fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkStatusMaquina int, constraint foreign key(fkStatusMaquina) references statusMaquina(idStatusMaquina),
fkTipoMaquina int, constraint foreign key(fkTipoMaquina) references TipoMaquina(idTipoMaquina)
);

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