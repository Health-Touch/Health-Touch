import org.springframework.jdbc.core.JdbcTemplate

class Repositorio {
    lateinit var jdbcTemplate: JdbcTemplate

    fun iniciar() {
        jdbcTemplate = Conexao.jdbcTemplate!!
    }

    fun cadastrar(campos :Usb){
        jdbcTemplate.update("""
            insert into USB(nomeUSB, dtHoraInsercao, fkMaquina, fkEmpresa, fkPlanoEmpresa, fkTipoMaquina) values
           ('${campos.nomeUsb}', '${campos.dtHoraInsercao}', ${campos.fkMaquina},  ${campos.fkEmpresa},  ${campos.fkPlanoEmpresa},  ${campos.fkTipoMaquina})
        """.trimIndent())
   }
}