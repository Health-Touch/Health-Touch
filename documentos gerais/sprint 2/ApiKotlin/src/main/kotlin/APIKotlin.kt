import com.github.britooo.looca.api.core.Looca
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.*
import javax.swing.JOptionPane

fun main() {


    val repositorio = Repositorio()

//    repositorio.validarColaborador()
    Conexao.criarTabelas()
    val campos = Usb()
    val camposProcessos = Processos()
    repositorio.iniciar()
    val looca = Looca()




    val validar = repositorio.validarColaborador()


// Chamar função USB





    // Listar Processos



//        val grupoProcesssos = looca.grupoDeProcessos
//
//        println("""
//        Total de processos: ${grupoProcesssos.totalProcessos}
//        Total de threads: ${grupoProcesssos.totalThreads}
//    """.trimIndent())
//
//        grupoProcesssos.processos.forEachIndexed { p, processo ->
//            camposProcessos.nomeProcesso = processo.nome
//            camposProcessos.PID = processo.pid
//            camposProcessos.UsoCPU= processo.usoCpu
//            camposProcessos.UsoMemoria = processo.usoMemoria
//            camposProcessos.dtHoraInsercao = LocalDateTime.now()
//            camposProcessos.fkEmpresa = 1
//            camposProcessos.fkMaquina = 1
//            camposProcessos.fkStatus = 1
//            camposProcessos.fkTipoMaquina = 1
//
//            println("""
//            Processo ${p+1}
//            Nome: ${processo.nome}
//            PID: ${processo.pid}
//            Uso de memória (GB): ${processo.usoMemoria}
//            Uso de CPU (%): ${processo.usoCpu}
//
//        """.trimIndent())
//
//
//            repositorio.cadastrarProcessos(camposProcessos)
//        }
//
//        val pesquisa = JOptionPane.showInputDialog("Qual processo quer achar?")
//        val processosEncontrados = grupoProcesssos.processos.filter{
//            it.nome.contains(pesquisa)}
//
//        if (processosEncontrados.isEmpty()) {
//            println("Nenhum processo '$pesquisa' encontrado")
//        } else {
//            println("${processosEncontrados.size} processos '$pesquisa' encontrados:")
//            println()
//
//            processosEncontrados.forEach {
//                println("Processo:\r\r$it")
//            }
//        }
//
//




    }














