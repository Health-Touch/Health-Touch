create database HealthTouch;
use HealthTouch;
drop database HealthTouch;

create table Empresa(
idEmpresa int primary key auto_increment,
NomeFantasia varchar(45),
CNPJ char(18),
StatusEmpresa varchar(45),
inicioContrato date,
telFixo char(10)
-- constraint fkEmp foreign key (fkEmpresa) references empresa(idEmpresa)
);
-- ALTER TABLE funcionario MODIFY COLUMN telCel CHAR(11),	MODIFY COLUMN telFixo CHAR(10);

create table NivelAcesso(
idNivelAcesso int primary key auto_increment,
nivelAcesso char(2)
);


create table Colaborador(
idColaborador int primary key auto_increment,
nome varchar(45),
email varchar(45),
senha varchar(45),
CPF char(14)
);

create table Telefone(
idTelefone int primary key auto_increment,
TelCel char(11),
TelFixo char(10)
);



create table Plano(
idPlano Int primary key auto_increment,
tipoPlano varchar(20),
parametro Int
);


create table Endereco(
idEndereco int primary key auto_increment,
num int,
rua varchar(30),
bairro varchar(30),
estado varchar(30),
pais varchar(25),
CEP char(8)
);


create table Dispositivo(
idDispositivo int primary key auto_increment,
SC varchar(45),
IP char(9),
modelo varchar(45)
);



create table TipoDispositivo(
idTipoDispositivo int primary key auto_increment,
tipo varchar(45)
);

create table Local(
idLocal int primary key auto_increment,
setor varchar(45),
sala int,
andar int
);



create table USB(
idUSB int primary key auto_increment,
nomeUSB varchar(45),
qntUSB int,
dtHoraInserção datetime
);


create table Clicks(
idClicks int primary key auto_increment,
nomeBotao varchar(30),
qntClicks int
);



create table Componente(
idComponente int primary key auto_increment,
nome varchar(50)
);



create table Monitoramento(
idMonitoramento int primary key auto_increment,
porcentagem varchar (45),
dataHora datetime
);

-- adicionando as foreign key;
-- tabela colaborador
alter table Colaborador add column fkEmpresa int, add constraint foreign key(fkEmpresa) references Empresa(idEmpresa);
alter table Colaborador add column fkNivelAcesso int, add constraint foreign key(FkNivelAcesso) references NivelAcesso(idNivelAcesso);
-- tabela Telefone
alter table Telefone add column fkColaborador int, add constraint foreign key (fkColaborador) references Colaborador(idColaborador);
-- tabela Endereco
alter table Endereco add column fkEmpresa int, add constraint foreign key(fkEmpresa) references Empresa(idEmpresa);
-- tabela Dispositivo
alter table Dispositivo add column fkEmpresa int, add constraint foreign key(fkEmpresa) references Empresa(idEmpresa);
alter table Dispositivo add column fkPlanoEmpresa int, add constraint foreign key(fkPlanoEmpresa)  references Plano(idPlano);
alter table Dispositivo add column fkTipoDispositivo int, add constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo);
-- tabela Local
alter table Local add column fkDispositivo int, add constraint foreign key(fkDispositivo) references Dispositivo(idDispositivo);
alter table Local add column fkEmpresa int, add constraint foreign key(fkEmpresa) references Empresa(idEmpresa);


alter table Local add column fkPlanoEmpresa int, add constraint foreign key(fkPlanoEmpresa) references Plano(idPlano);
alter table Local add column fkTipoDispositivo int, add constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo);
-- tabela USB
alter table USB add column fkDispositivo int, add constraint foreign key(fkDispositivo) references Dispositivo(idDispositivo);
alter table USB add column fkEmpresa int, add constraint foreign key(fkEmpresa) references Empresa(idEmpresa);
alter table USB add column fkPlanoEmpresa int, add constraint foreign key (fkPlanoEmpresa) references Plano(idPlano);
alter table USB add column fkTipoDispositivo int, add constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo);
-- tabela Clicks
alter table Clicks add column fkDispositivo int, add constraint foreign key(fkDispositivo) references Dispositivo(idDispositivo);
alter table Clicks add column fkEmpresa int, add constraint foreign key(fkEmpresa) references Empresa(idEmpresa);
alter table Clicks add column fkPlanoEmpresa int, add constraint foreign key(fkPlanoEmpresa) references Plano(idPlano);
alter table Clicks add column fkTipoDispositivo int, add constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo);
-- tabela Componente
alter table Componente add column fkDispositvo int, add constraint foreign key (fkDispositivo) references Dispositivo(idDispositivo);
alter table Componente add column fkEmpresaDispositivo int, add constraint foreign key(fkEmpresaDispositivo) references Empresa(idEmpresa);
alter table Componente add column fkPlanoEmpresa int, add constraint foreign key(fkPlanoEmpresa) references Plano(idPlano);
alter table Componente add column fkTipoDispositivo int, add constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo);
-- tabela Monitoramento
alter table Monitoramento add column fkComponente int, add constraint foreign key(fkComponente) references Componente(idComponente);
alter table Monitoramento add column fkDispositivo int, add constraint foreign key (fkDispositivo)references Dispositivo(idDispositivo);
alter table Monitoramento add column fkPlanoEmpresa int, add constraint foreign key(fkPlanoEmpresa) references Plano(idPlano);
alter table Monitoramento add column fkTipoDispositivo int, add constraint foreign key(fkTipoDispositivo) references TipoDispositivo(idTipoDispositivo);
alter table Monitoramento add column fkEmpresaDispositivo int, add constraint foreign key(fkEmpresaDispositivo) references Empresa(idEmpresa);
-- fim dos foreign key

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