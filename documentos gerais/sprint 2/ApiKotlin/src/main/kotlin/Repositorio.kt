import com.github.britooo.looca.api.core.Looca

import org.springframework.jdbc.core.JdbcTemplate

import java.time.LocalDateTime

import javax.swing.JOptionPane


class Repositorio {

    lateinit var jdbcTemplate: JdbcTemplate

    fun iniciar() {
        jdbcTemplate = Conexao.jdbcTemplate!!
    }

//    fun cadastrar(campos:Usb){
//        jdbcTemplate.update("""
//            insert into USB(nomeUSB, dtHoraInserção, fkMaquina, fkEmpresa, fkPlanoEmpresa, fkTipoMaquina) values
//           ('${campos.nomeUsb}', '${campos.dtHoraInsercao}', ${campos.fkMaquina},  ${campos.fkEmpresa},  ${campos.fkPlanoEmpresa},  ${campos.fkTipoMaquina})
//        """.trimIndent())
//    }
//
//    fun cadastrarProcessos(camposProcessos:Processos){
//        jdbcTemplate.update("""
//            insert into processo ( PID, nome, UsoMemoria, UsoCPU, dtHoraInsercao, fkMaquina, fkEmpresa, fkTipoMaquina, fkStatus) values
//           ( ${camposProcessos.PID},'${camposProcessos.nomeProcesso}', ${camposProcessos.UsoMemoria},  ${camposProcessos.UsoCPU},  '${camposProcessos.dtHoraInsercao}', ${camposProcessos.fkMaquina},${camposProcessos.fkEmpresa}, ${camposProcessos.fkTipoMaquina}, ${camposProcessos.fkStatus})
//        """.trimIndent())
//    }




        var looca: Looca = Looca()
        var grupoUsb = looca.dispositivosUsbGrupo



    fun cadastrar(campos:Usb): Int{

         var total = grupoUsb.totalDispositvosUsb

                var i = 0
                var inserts = 0

                while (i<total){


                    val nomeUSB = grupoUsb.dispositivosUsb[i].nome
                     campos.nomeUsb = nomeUSB
                    campos.dtHoraInsercao = LocalDateTime.now()
                    campos.fkMaquina = 1
                    campos.fkTipoMaquina = 1
                    campos.fkEmpresa = 1
                    campos.fkPlanoEmpresa = 1


                    val dtHoraInsercao = campos.dtHoraInsercao
                    val fkMaquina = campos.fkMaquina
                    val fkTipoMaquina = campos.fkTipoMaquina
                    val  fkEmpresa =  campos.fkEmpresa
                    val fkPlanoEmpresa =campos.fkPlanoEmpresa

                    inserts +=  jdbcTemplate.update(
                        "insert into USB(nomeUSB, dtHoraInserção, fkMaquina, fkEmpresa, fkPlanoEmpresa, fkTipoMaquina) values ('$nomeUSB','${dtHoraInsercao}',${fkMaquina},${fkTipoMaquina},${fkEmpresa},${fkPlanoEmpresa})"


                    )
                    i++
              }
    return inserts
    }












    fun ListarUSB(){

        val looca = Looca()
        val usb = looca.dispositivosUsbGrupo.dispositivosUsb



        usb.forEachIndexed { u, ubs ->

            JOptionPane.showMessageDialog(null, """  
          -- Lista de USB Conectados --

           Usb ${u+1} -  ${usb[u].nome}
       """.trimIndent())
        }
    }


    // Buscar id
    fun validarColaborador() {

        val email = JOptionPane.showInputDialog("Insira seu email")
        val senha  = JOptionPane.showInputDialog("Insira sua senha")


//
                val colaborador = jdbcTemplate.queryForObject(""" 
                  select count(idColaborador) from Colaborador where email = '${email}' and senha = '${senha}'; 
                """, Int::class.java);

                if(colaborador != 0){
                    JOptionPane.showMessageDialog(null, """
                        Bem vindoo você pode entrar !!!
                    """.trimIndent())

                    while (true){

                        val opcao = JOptionPane.showInputDialog("""
                        Escolha uma das opções abaixo 
                        
                        1 - Capturar USB
                        2 - Listar USB
                        3 - Sair
                      
       
                    """.trimIndent()).toInt()


                        when(opcao){
                            1 -> {
                                cadastrar(campos = Usb())
                                JOptionPane.showMessageDialog(null,"""
                                  Você está capturando USB! 
                              """.trimIndent()
                                )

                            }
                            2 -> ListarUSB()
                            3 -> break
                        }
                    }
                } else {
            JOptionPane.showMessageDialog(null, "Você não existe no sistema!")
                }


    }


}