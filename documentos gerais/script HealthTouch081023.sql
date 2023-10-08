create database HealthTouch;
use HealthTouch;
drop database HealthTouch;

create table Plano(
idPlano Int primary key auto_increment,
tipoPlano varchar(20),
parametro Int
);

create table Empresa(
idEmpresa int primary key auto_increment,
NomeFantasia varchar(45),
CNPJ char(18),
StatusEmpresa varchar(45),
inicioContrato date,
telFixo char(10),
fkPlano int, constraint foreign key(fkPlano) references Plano(idPlano)
);

create table NivelAcesso(
idNivelAcesso int primary key auto_increment,
nivelAcesso char(2)
);


create table Colaborador(
idColaborador int primary key auto_increment,
nome varchar(45),
email varchar(45),
senha varchar(45),
CPF char(14),
fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
fkNivelAcesso int, constraint foreign key(fkNivelAcesso) references NivelAcesso(idNivelAcesso) 
);

create table Telefone(
idTelefone int primary key auto_increment,
TelCel char(11),
TelFixo char(10),
fkColaborador int, constraint foreign key(fkColaborador) references Colaborador (idColaborador)
);

create table Endereco(
idEndereco int primary key auto_increment,
num int,
rua varchar(30),
bairro varchar(30),
estado varchar(30),
pais varchar(25),
CEP char(8),
fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa)
);
create table TipoDispositivo(
idTipoDispositivo int primary key auto_increment,
tipo varchar(45)
);


create table Dispositivo(
idDispositivo int primary key auto_increment,
SO varchar(45),
IP char(9),
modelo varchar(45),
setor varchar(30),
andar varchar(30),
fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoDispositivo int, constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo)
);


create table Local(
idLocal int primary key auto_increment,
setor varchar(45),
sala int,
andar int,
fkDispositivo int, constraint foreign key(fkDispositivo) references Dispositivo(idDispositivo),
fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoDispositivo int, constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo)
);

create table USB(
idUSB int primary key auto_increment,
nomeUSB varchar(45),
qntUSB int,
dtHoraInserção datetime,
fkDispositivo int, constraint foreign key(fkDispositivo) references Dispositivo(idDispositivo),
fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoDispositivo int, constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo)
);

create table Clicks(
idClicks int primary key auto_increment,
nomeBotao varchar(30),
qntClicks int,
fkDispositivo int, constraint foreign key(fkDispositivo) references Dispositivo(idDispositivo),
fkEmpresa int, constraint foreign key(fkEmpresa) references Empresa(idEmpresa),
fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoDispositivo int, constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo)
);


create table Componente(
idComponente int primary key auto_increment,
nome varchar(50),
fkDispositivo int, constraint foreign key(fkDispositivo) references Dispositivo(idDispositivo),
fkEmpresaDispositivo int, constraint foreign key(fkEmpresaDispositivo) references Dispositivo(idDispositivo),
fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoDispositivo int, constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo)
);

create table Monitoramento(
idMonitoramento int primary key auto_increment,
porcentagem varchar (45),
dataHora datetime,
fkComponente int, constraint foreign key(fkComponente) references Componente(idComponente),
fkDispositivo int, constraint foreign key(fkDispositivo) references Dispositivo(idDispositivo),
fkPlanoEmpresa int, constraint foreign key(fkPlanoEmpresa) references Plano(idPlano),
fkTipoDispositivo int, constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo),
fkEmpresaDispositivo int, constraint foreign key(fkEmpresaDispositivo) references Dispositivo(idDispositivo)
);

-- dando os inserts em algumas tabelas;
select * from Empresa;
Insert into Empresa values
(null,'NomeEmpresa','XX.XXX.XXX/0001-XX','Status','2023-10-02','abcd-mcdu');

insert into NivelAcesso values
(null,'AB'),
(null,'CD'),
(null,'XY');

insert into Endereco values
(null,1,'haddock Lobo','Paulista','São Paulo','Brasil',03058-010,1);

insert into Colaborador values
(null,'Kanye West','Kanye.West@sptech.school','Senha1234','XXX.XXX.XXX-XX',1,1);
 desc Telefone;
insert into Telefone values
(null,'(XX)XXXXX-XXXX','abcd-mcdu',1);

insert into Local values
(null,'enfermaria',1,1,1,1,1,1);

insert into Dispositivo values
(null,'Windows',123456789,'Dell',1,1,1);

insert into Plano values
(null,'PlanoA',1);

insert into TipoDispositivo values
(null,'TipoA');