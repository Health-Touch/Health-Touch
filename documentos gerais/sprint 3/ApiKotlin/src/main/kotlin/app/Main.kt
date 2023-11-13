

package app

import Repositorio
import Usb
import com.github.britooo.looca.api.core.Looca
import javax.swing.JOptionPane
import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.jdbc.core.JdbcTemplate
import java.time.LocalDateTime

open class Main {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {

            val repositorio = Repositorio()
            Conexao.criarTabelas()

            val campos = Usb()
            repositorio.iniciar()
            val looca = Looca()
            val validar = repositorio.validarColaborador()

        }
    }

}







