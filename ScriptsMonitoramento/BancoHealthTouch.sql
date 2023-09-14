create database HealthTouch;
use HealthTouch;
# drop database HealthTouch;

create table cargos(
id int primary key auto_increment,
nome varchar(45),
nivelAcesso int
);

insert into cargos values
(null, 'Gerente', 1),
(null, 'Senior', 2),
(null, 'Pleno', 3),
(null, 'Junior', 4),
(null, 'Estagiário', 5)
;

create table cadastros(
id int primary key auto_increment,
email varchar(45),
senha varchar(45),
fkcargo int,
foreign key (fkcargo) references cargos(id)
);

create table empresas(
id int primary key auto_increment,
nome varchar(50),
CNPJ char(14),
telefone char(11),
fkRepresentante int
);

create table funcionarios(
id int primary key auto_increment,
fkEmpresa int,
Nome varchar(45),
CPF char(11),
telefone char(11),
fkCadastro int,
foreign key (fkEmpresa) references empresas(id),
foreign key (fkCadastro) references cadastros(id)
);

alter table empresas add constraint fkRepresentante foreign key (fkRepresentante) references funcionarios(id) ;

insert into empresas value
(null, 'SP Health Tech', '12345678900000', '11909000845', null);

create table dispositivos(
id int primary key auto_increment,
fkEmpresa int,
foreign key (fkEmpresa) references empresas(id),
identificador varchar(45),
tipo varchar(45),
SistemaOperacional varchar(45)
)auto_increment = 10;

insert into dispositivos value
(null, 1, '1188.7654.3201.9272.345', 'Servidor', 'Windows');

create table clicks(
id int primary key auto_increment,
fkDispositivo int,
foreign key (fkDispositivo) references dispositivos(id),
x int,
y int,
dtHora datetime default current_timestamp
);

create table USBs(
id int primary key auto_increment,
fkDispositivo int,
foreign key (fkDispositivo) references dispositivos(id),
porta varchar(45),
descricao varchar(200),
dtHora datetime default current_timestamp
);

create table tipoComponentes(
id int primary key auto_increment,
nome varchar(45),
descricao varchar(200),
unidadeMedida varchar(45)
);

insert into tipoComponentes values
(null, 'Memória Ram', 'DDHR4', '% utilizada'),
(null, 'Processador i5', '11th Gen Intel(R) Core(TM) i5-11400H @ 2.70GH', '% usado'),
(null, 'SSD', 'SSD', '% usado');

create table componentes(
id int primary key auto_increment,
fkDispositivo int,
foreign key (fkDispositivo) references dispositivos(id),
fkTipo int,
foreign key (fkTipo) references tipoComponentes(id),
descricao varchar(200),
dtInstalacao date
);

insert into componentes values
(null, 10, 1, '8GB', '2009-03-08'),
(null, 10, 2, '3.17GHz', '2009-07-02'),
(null, 10, 3, '512GB', '2009-11-20')
;

create table Monitoramento(
id int primary key auto_increment,
fkOrigem int,
dado float,
dtHora datetime default current_timestamp,
foreign key (fkOrigem) references componentes(id)
)auto_increment = 100000;

select * from Monitoramento;
select * from USBs;

describe tipoComponentes;

# select concat(USBs.descricao, ' na porta ', USBs.porta, ' do dispostivo cujo identificador é ', d.identificador, ' agora, ', USBs.dtHora) as texto from USBs join dispositivos as d on fkDispositivo = d.id;
select concat(USBs.descricao, ' no dispostivo cujo identificador é ', d.identificador, ' agora, ', USBs.dtHora) as texto from USBs join dispositivos as d on fkDispositivo = d.id;

select concat(tc.nome, tc.descrição, c.descrição, ' do dispositivo ', d.identificador, ' está ', m.dado, tc.unidadeMedida) as alerta from monitoramento as m 
	join componentes as c on fkOrigem = c.id 
		join tipoComponentes as tc on fktipo = tc.id 
			join dispositivos as d on c.fkDispositivo = d.id
            order by m.dtHora;