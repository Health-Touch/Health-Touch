class Console {
    //Utilizaremos o console para realizar uma simulação de login do usuário
    // Temos a class para guardar o usuario e a senha já com valores.

    var usuario:String = "usuario@usuario"
    var senha:String = "senha1234"

    fun logado():String{
        return "Usuário logado!"
    }
    fun erroLogin(): String{
        return "Erro no usuário e/ou senha"
    }
}