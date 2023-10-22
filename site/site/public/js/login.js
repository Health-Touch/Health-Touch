//Função que ativa todas as outras.
function main() {
  entrar()
  buscarSetor()
  buscarStatusUsb()
  buscarUsoCpuMensal()
  buscarUsoRamMensal()
  buscarUsoDiscoMensal()
  buscarInsightCpu()
  buscarInsightRam()
  buscarInsightDisco()
  buscarAnaliseGeral()
  buscarAvisos()
}

function entrar() {
  // aguardar();

  console.log('Na func entrar')

  var emailVar = input_email.value
  var senhaVar = input_senha.value

  if (emailVar == '' || senhaVar == '') {
    Swal.fire({
      title: 'Login inválido!',
      text: 'Por favor preencha todos os campos!',
      icon: 'error',
      confirmButtonText: 'OK'
    })
    console.log('(Mensagem de erro para todos os campos em branco)')

    return false
  }

  console.log('FORM LOGIN: ', emailVar)
  console.log('FORM SENHA: ', senhaVar)

  fetch('/usuarios/autenticar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar
    })
  })
    .then(function (resposta) {
      console.log('ESTOU NO THEN DO entrar()!')

      if (resposta.ok) {
        let timerInterval
        Swal.fire({
          title: 'Login realizado com sucesso!',
          html: 'Redirecionando para Dashboard em <b></b>...',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then(result => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })

        console.log(resposta)

        resposta.json().then(json => {
          console.log(json)
          console.log(JSON.stringify(json))

          sessionStorage.EMAIL_COLABORADOR = json.email
          sessionStorage.NOME_COLABORADOR = json.nome
          sessionStorage.ID_COLABORADOR = json.idColaborador
          sessionStorage.SENHA_COLABORADOR = json.senha
          sessionStorage.NIVELACESSO_COLABORADOR = json.nivelAcesso
          sessionStorage.ID_EMPRESA_COLABORADOR = json.idEmpresa
          sessionStorage.NOME_FANTASIA_COLABORADOR = json.NomeFantasia

          setTimeout(function () {
            window.location = '/setores.html'
          }, 2000) // apenas para exibir o loading
        })
      } else {
        Swal.fire({
          title: 'Login inválido!',
          text: 'Algum campo está incorreto!',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        console.log('Houve um erro ao tentar realizar o login!')

        resposta.text().then(texto => {
          console.error(texto)
          // finalizarAguardar(texto);
        })
      }
    })
    .catch(function (erro) {
      console.log(erro)
    })

  return false
}

function esqueceuSenha() {
  swal.fire('Entre em contato conosco para redefinir sua senha')
}

function criarConta() {
  swal.fire('Entre em contato conosco para se cadastrar')
}

function home() {
  window.location = 'index.html'
}

// Começo da dash setor
function buscarSetor() {
  console.log('Entrei na função validar setor')
  fetch('/dashboard/autenticar', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resposta) {
      console.log('ESTOU NO THEN DO entrar()!')

      if (resposta.ok) {
        console.log(resposta)

        resposta.json().then(json => {
          console.log(json)
          console.log(JSON.stringify(json))

          sessionStorage.ID_COMPUTADOR = json.fkDispositivo
          sessionStorage.NOME_SETOR = json.setor
          sessionStorage.ID_SALA = json.sala
        })
      } else {
        console.log('Houve um erro!')

        resposta.text().then(texto => {
          console.error(texto)
          // finalizarAguardar(texto);
        })
      }
    })
    .catch(function (erro) {
      console.log(erro)
    })

  return false
}

function buscarStatusUsb() {
  console.log('Entrei na função usb')
  fetch('/dashboard/statusUsb', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resposta) {
      console.log('ESTOU NO THEN DO entrar()!')

      if (resposta.ok) {
        console.log(resposta)

        resposta.json().then(json => {
          console.log(json)
          console.log(JSON.stringify(json))

          sessionStorage.STATUS_USB = json.status
        })
      } else {
        console.log('Houve um erro!')

        resposta.text().then(texto => {
          console.error(texto)
          // finalizarAguardar(texto);
        })
      }
    })
    .catch(function (erro) {
      console.log(erro)
    })

  return false
}

function buscarUsoCpuMensal() {
  console.log('Entrei na função a')
  fetch('/dashboard/cpuMensal', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resposta) {
      console.log('ESTOU NO THEN DO entrar()!')

      if (resposta.ok) {
        console.log(resposta)

        resposta.json().then(json => {
          console.log(json)
          console.log(JSON.stringify(json))

          sessionStorage.CPU_MENSAL = json.usoCpuMensal
        })
      } else {
        console.log('Houve um erro!')

        resposta.text().then(texto => {
          console.error(texto)
          // finalizarAguardar(texto);
        })
      }
    })
    .catch(function (erro) {
      console.log(erro)
    })

  return false
}

function buscarUsoRamMensal() {
  console.log('Entrei na função b')
  fetch('/dashboard/ramMensal', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resposta) {
      console.log('ESTOU NO THEN DO entrar()!')

      if (resposta.ok) {
        console.log(resposta)

        resposta.json().then(json => {
          console.log(json)
          console.log(JSON.stringify(json))

          sessionStorage.RAM_MENSAL = json.usoRamMensal
        })
      } else {
        console.log('Houve um erro!')

        resposta.text().then(texto => {
          console.error(texto)
          // finalizarAguardar(texto);
        })
      }
    })
    .catch(function (erro) {
      console.log(erro)
    })

  return false
}

function buscarUsoDiscoMensal() {
  console.log('Entrei na função c')
  fetch('/dashboard/discoMensal', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resposta) {
      console.log('ESTOU NO THEN DO entrar()!')

      if (resposta.ok) {
        console.log(resposta)

        resposta.json().then(json => {
          console.log(json)
          console.log(JSON.stringify(json))

          sessionStorage.DISCO_MENSAL = json.usoDiscoMensal
        })
      } else {
        console.log('Houve um erro!')

        resposta.text().then(texto => {
          console.error(texto)
          // finalizarAguardar(texto);
        })
      }
    })
    .catch(function (erro) {
      console.log(erro)
    })

  return false
}

function buscarInsightCpu() {
  console.log('Entrei na função c')
  fetch('/dashboard/insightCpu', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resposta) {
      console.log('ESTOU NO THEN DO entrar()!')

      if (resposta.ok) {
        console.log(resposta)

        resposta.json().then(json => {
          console.log(json)
          console.log(JSON.stringify(json))

          sessionStorage.INSIGHT_CPU = json.insightCpu
        })
      } else {
        console.log('Houve um erro!')

        resposta.text().then(texto => {
          console.error(texto)
          // finalizarAguardar(texto);
        })
      }
    })
    .catch(function (erro) {
      console.log(erro)
    })

  return false
}

function buscarInsightRam() {
  console.log('Entrei na função c')
  fetch('/dashboard/insightRam', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resposta) {
      console.log('ESTOU NO THEN DO entrar()!')

      if (resposta.ok) {
        console.log(resposta)

        resposta.json().then(json => {
          console.log(json)
          console.log(JSON.stringify(json))

          sessionStorage.INSIGHT_RAM = json.insightRam
        })
      } else {
        console.log('Houve um erro!')

        resposta.text().then(texto => {
          console.error(texto)
          // finalizarAguardar(texto);
        })
      }
    })
    .catch(function (erro) {
      console.log(erro)
    })

  return false
}

function buscarInsightDisco() {
  console.log('Entrei na função c')
  fetch('/dashboard/insightDisco', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resposta) {
      console.log('ESTOU NO THEN DO entrar()!')

      if (resposta.ok) {
        console.log(resposta)

        resposta.json().then(json => {
          console.log(json)
          console.log(JSON.stringify(json))

          sessionStorage.INSIGHT_DISCO = json.insightDisco
        })
      } else {
        console.log('Houve um erro!')

        resposta.text().then(texto => {
          console.error(texto)
          // finalizarAguardar(texto);
        })
      }
    })
    .catch(function (erro) {
      console.log(erro)
    })

  return false
}

function buscarAnaliseGeral() {
  console.log('Entrei na função analise')
  fetch('/dashboard/analiseGeral', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resposta) {
      console.log('ESTOU NO THEN DO entrar()!')

      if (resposta.ok) {
        console.log(resposta)

        resposta.json().then(json => {
          console.log(json)
          console.log(JSON.stringify(json))

          sessionStorage.USO_CPU = json.usoCpu
          sessionStorage.USO_RAM = json.usoRam
          sessionStorage.USO_DISCO = json.usoDisco
        })
      } else {
        console.log('Houve um erro!')

        resposta.text().then(texto => {
          console.error(texto)
          // finalizarAguardar(texto);
        })
      }
    })
    .catch(function (erro) {
      console.log(erro)
    })

  return false
}

function buscarAvisos() {
  console.log('Entrei na função aviso')
  fetch('/dashboard/avisos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resposta) {
      console.log('ESTOU NO THEN DO aviso()!')
      console.log('AAAAAAAAAAAAAAAAA EU VOU CORINGAR' + resposta)
      console.log('AAAAAAAAAAAAAAAAA EU VOU CORINGAR 2' + resposta.ok)

      if (resposta.ok) {
        console.log(resposta)

        resposta.json().then(json => {
          console.log(json)
          console.log(JSON.stringify(json))
          console.log(JSON.stringify(json.aviso))

          console.log(json.aviso)

          sessionStorage.AVISOS = JSON.stringify(json.aviso)
        })
      } else {
        console.log('Houve um erro no aviso!')

        resposta.text().then(texto => {
          console.error(texto)
          // finalizarAguardar(texto);
        })
      }
    })
    .catch(function (erro) {
      console.log(erro)
    })

  return false
}
//Fim da dash setor

function visualizarTermos() {
  // cardErro.style.display = 'block'
  console.log(
    `Ao assinar esses termos eu garanto que não causarei problemas, não hackearei o site e serei responsavel jogando genshin impact.`
  )
  setTimeout(sumirMensagem, 10000)
}

//Função dos botões
function btnLogin() {
  window.location.href = 'login.html'
}

function home() {
  window.location = '/index.html'
}
