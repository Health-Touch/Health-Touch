import com.github.britooo.looca.api.core.Looca
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import javax.swing.JOptionPane
import kotlin.math.pow

fun main() {
    //Inicia o repositório e cria as tabelas necessárias
    val repositorio = Repositorio()
    repositorio.iniciar()
    repositorio.criarTabelas()

    //Chama a função fazer login
    fazerLogin()
}

fun fazerLogin(){
    //Pega os dados de login do usuário
    val email:String = JOptionPane.showInputDialog("Digite o email")
    val senha:String = JOptionPane.showInputDialog("Digite a senha")

    val repositorio = Repositorio()
    repositorio.iniciar()
    //Faz uma validação no banco pra ver se o login existe
    val verifica = repositorio.verificarLogin(email, senha)

    if (verifica == 1){
        exibirMensagem("***** Login realizado com sucesso! *****")
        aposLogin(email, senha)
    } else {
        exibirMensagem("***** Login inválido! *****")
    }
}

fun aposLogin(email:String,senha:String){
    val repositorio = Repositorio()
    repositorio.iniciar()

    //Atribui os dados do colaborador puxados do banco
    val colaborador = repositorio.dadosColaborador(email,senha)
    val nomeColaborador = colaborador?.nome
    val fkEmpresa = colaborador?.fkEmpresa

    //Validação do Nível de Acesso
    val cargoColaborador = when (colaborador?.fkNivelAcesso){
        1 -> "Representante Legal"
        2 -> "Gerente de TI"
        3 -> "Equipe de TI"
        else -> "N/A"
    }

    //Mensagem para o usuário e chama a função pra escolher a máquina que será monitorada
    exibirMensagem("Olá, $cargoColaborador ${nomeColaborador}!")
    escolherMaquina(fkEmpresa)
}

fun escolherMaquina(fkEmpresa:Int?){
    val repositorio = Repositorio()
    repositorio.iniciar()

    //Exibe uma lista das máquinas cadastradas no banco do usuário
    exibirMensagem("Exibindo lista de máquinas cadastradas!")
    val listaMaquinas = repositorio.exibirMaquinas(fkEmpresa)
    listaMaquinas.forEach{
        exibirMensagem("""
                ID: ${it.idMaquina}
                SO: ${it.so}
                IP: ${it.ip}
                
            """.trimIndent())
    }

    //Pega o ID da máquina a ser monitorada
    val idMaquina = JOptionPane.showInputDialog("Digite o ID da máquina que deseja monitorar")

    //Validação no banco pra ver se o ID existe
    val validacaoMaquina = repositorio.validarMaquina(idMaquina.toInt(), fkEmpresa)

    //Se existe inicia o monitoramento
    if (validacaoMaquina == 1){
        exibirMensagem("***** Iniciando Monitoramento *****")
        val maquina = Maquina()
        val dadoMaquina = repositorio.pegarDadosMaquina(idMaquina.toInt())

        //Guarda os dados puxados do banco da máquina selecionada
        maquina.idMaquina = dadoMaquina?.idMaquina!!
        maquina.fkPlanoEmpresa = dadoMaquina.fkPlanoEmpresa
        maquina.fkTipoMaquina = dadoMaquina.fkTipoMaquina
        maquina.fkEmpresa = dadoMaquina.fkEmpresa
        maquina.fkStatusMaquina = dadoMaquina.fkStatusMaquina

        //Função do monitoramento
        cadastrarMonitoramento(idMaquina.toInt())
    } else{
        exibirMensagem("***** Máquina não encontrada! *****")
    }
}

fun cadastrarMonitoramento(idMaquina:Int){
    while (true){
        println("\r\nIniciando Monitoramento: ${LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"))}\r\n")
        //Cria a variável looca da api looca
        val looca = Looca()
        val repositorio = Repositorio()
        repositorio.iniciar()
        val monitoramento = Monitoramento()

        val maquina = Maquina()
        val dadoMaquina = repositorio.pegarDadosMaquina(idMaquina)

        //Guarda os dados puxados do banco da máquina selecionada
        maquina.idMaquina = dadoMaquina?.idMaquina!!
        maquina.fkPlanoEmpresa = dadoMaquina.fkPlanoEmpresa
        maquina.fkTipoMaquina = dadoMaquina.fkTipoMaquina
        maquina.fkEmpresa = dadoMaquina.fkEmpresa
        maquina.fkStatusMaquina = dadoMaquina.fkStatusMaquina

        //Uso do processador em %
        val processador = looca.processador
        monitoramento.porcentagemCpu = "%.1f".format(processador.uso).replace(",",".")
        println("Uso da CPU: ${"%.1f".format(processador.uso).replace(",",".")}%\r\n")

        //Pega os dados de memória que estão em bytes e converte pra %
        val ram = looca.memoria
        val ramEmUso = ram.emUso.toDouble()
        val ramTotal = ram.total.toDouble()
        val percRam = (ramEmUso/ramTotal) * 100
        monitoramento.porcentagemRam = "%.1f".format(percRam).replace(",",".")
        println("Uso da RAM: ${"%.1f".format(percRam).replace(",",".")}%\r\n")

        //Pega a memória livre e converte pra MB
        val ramFree = looca.memoria.disponivel
        monitoramento.ramDisponivel = "${"%.2f".format((ramFree.toDouble() / 1024.0.pow(3.0)) * 1024).replace(",",".")}MB"
        println("Total de RAM Disponível: ${"%.2f".format((ramFree.toDouble() / 1024.0.pow(3.0)) * 1024).replace(",",".")}MB\r\n")

        //Pega a memória em uso e converte pra MB
        val ramUsed = looca.memoria.emUso
        monitoramento.ramUsada = "${"%.2f".format((ramUsed.toDouble() / 1024.0.pow(3.0)) * 1024).replace(",",".")}MB"
        println("Total de RAM Usada: ${"%.2f".format((ramUsed.toDouble() / 1024.0.pow(3.0)) * 1024).replace(",",".")}MB\r\n")

        //Pega a frequência do processador em MHz
        val frequencia = looca.processador.frequencia
        monitoramento.frequencia = "${frequencia.toDouble() / 1000000}MHz"
        println("Frequência da CPU: ${frequencia.toDouble() / 1000000}MHz\r\n")

        println("******************************************************************")

        //Cadastra no banco os dados de CPU e RAM coletados acima
        repositorio.cadastrarMonitoramentoCpu(monitoramento, maquina)
        repositorio.cadastrarMonitoramentoRam(monitoramento, maquina)

        //Lista os processos em execução e cadastra cada um no banco
        val processos = looca.grupoDeProcessos
        val listaProcessos = processos.processos
        val processo = Processo()
        for (p in listaProcessos) {
            processo.pid = p.pid
            processo.nome = p.nome
            processo.usoCpu = "${"%.2f".format(p.usoCpu).replace(",", ".")}%"
            processo.usoRam = "${"%.2f".format(p.usoMemoria).replace(",", ".")}%"
            repositorio.cadastrarProcesso(processo, maquina)
        }
        Thread.sleep(5000) //Cadastra o monitoramento a cada 5 segundos
    }
}

//Função pra exibir mensagens com GUI
fun exibirMensagem(mensagem:String){
    JOptionPane.showMessageDialog(null, mensagem)
}