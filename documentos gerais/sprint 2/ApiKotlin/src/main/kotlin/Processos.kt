import java.time.LocalDateTime

class Processos {

    var nomeProcesso : String = ""
    var PID : Int = 0
    var UsoMemoria : Double = 0.0
    var UsoCPU: Double = 0.0
    var dtHoraInsercao = LocalDateTime.now()
    var fkMaquina: Int = 0
    var fkEmpresa: Int = 0
    var fkStatus: Int = 0
    var fkTipoMaquina: Int = 0

}