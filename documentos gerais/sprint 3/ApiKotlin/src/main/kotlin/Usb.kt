import java.time.LocalDate
import java.time.LocalDateTime

class Usb {
    var nomeUsb: String = ""
    var dtHoraInsercao = LocalDateTime.now()
    var fkMaquina: Int = 0
    var fkEmpresa: Int = 0
    var fkPlanoEmpresa: Int = 0
    var fkTipoMaquina: Int = 0
}