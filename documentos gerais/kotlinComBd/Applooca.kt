
import com.github.britooo.looca.api.core.Looca
import java.time.LocalDate

fun main() {
    Conexao.criarTabelas()
    var campos = Usb()
    val repositorio = Repositorio()
      repositorio.iniciar()

    val looca = Looca()
    val usb = looca.dispositivosUsbGrupo.dispositivosUsb[0].nome

    campos.nomeUsb = usb
    campos.dtHoraInsercao = LocalDate.now()
    campos.fkEmpresa = 1
    campos.fkMaquina = 1
    campos.fkPlanoEmpresa = 1
    campos.fkTipoMaquina = 1
    repositorio.cadastrar(campos)

    println("USB")
    println(usb)
}