import java.util.*
fun main() {

    val Usuario1 = Console() //Criando o Usuario para realizar o login
    val sn = Scanner(System.`in`) //Função do scanner para pegar os valores digitados pelo usuário no console
    println("Digite o usuário: ")
    val usuarioTeste = sn.next() //Usuário digita o usuário para o login
    println("Digite a senha: ")
    val senhaTeste = sn.next() //Usuário digita a senha para o login

    if(usuarioTeste == Usuario1.usuario && senhaTeste == Usuario1.senha){
        //Validação se os valores informados são correspondentes com os valores guardados na class para realizar o login
        println(Usuario1.logado())
    } else{
        println(Usuario1.erroLogin())
    }
}