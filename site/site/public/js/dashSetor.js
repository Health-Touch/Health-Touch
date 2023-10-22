function validarSetor() {
  var idComputador = sessionStorage.ID_COMPUTADOR
  var setor = sessionStorage.NOME_SETOR
  var sala = sessionStorage.ID_SALA

  var computador = document.getElementById('idComputador')
  var nomeSetor = document.getElementById('nomeSetor')
  var idSala = document.getElementById('idSala')

  computador.innerHTML = idComputador
  nomeSetor.innerHTML = setor
  idSala.innerHTML = sala
  // setInterval(100,window.location = '../dashSetor.html')
}

function trocar() {
  window.location = '/setores.html'
}

function detalhada() {
  window.location = '/AnaliseDetalhada.html'
}

function exibirMenuPerfil() {
  var menu = document.getElementById('menuPerfil')
  if (menu.style.display === 'block') {
    menu.style.display = 'none'
  } else {
    menu.style.display = 'block'
  }
}

//Começo Analise atual componente
function obterdados(idDispositivo) {
  fetch(`/dashboard/tempo-real/${idDispositivo}`)
    .then(resposta => {
      if (resposta.status == 200) {
        resposta.json().then(resposta => {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`)

          // alertar(resposta, idDispositivo)
        })
      } else {
        console.error(
          `Nenhum dado encontrado para o id ${idDispositivo} ou erro na API`
        )
      }
    })
    .catch(function (error) {
      console.error(
        `Erro na obtenção dos dados do Dispositivo p/ gráfico: ${error.message}`
      )
    })
}

function atualizacaoPeriodica() {
  JSON.parse(sessionStorage.MAQUINAS).forEach(item => {
    obterdados(item.idDispositivo)
  })
  setTimeout(atualizacaoPeriodica, 5000)
}

let proximaAtualizacao
window.onload = exibirDadosDoUsuario()

function exibirDadosDoUsuario() {
  var maquinas = JSON.parse(sessionStorage.MAQUINAS)
  maquinas.forEach(item => {
    obterDadosGrafico(item.idDispositivo)
  })

  // var avisos = JSON.parse(sessionStorage.AVISOS);
  // avisos.forEach(item => {
  //     document.getElementById("boxAvisos").innerHTML += `
  //     <div class="infoAviso">
  //                 <span class="tituloAviso">${item.descricao}</span>
  //                 <span class="dataAviso">${item.dtHr}</span>
  //                 <img src="assets/img/aviso.png" alt="" class="iconAviso">
  //             </div>
  //     `
  // });
}

//GRÁFICOS / DADOS MÁQUINA (ITEM)
// document.getElementById("graficos").innerHTML += `
//     <div id="grafico${item.id}" class="display-none">
//         <h3 class="tituloGraficos">
//             <span id="tituloAquario${item.id}">${item.descricao}</span>
//         </h3>
//         <div class="graph">
//             <canvas id="myChartCanvas${item.id}"></canvas>
//         </div>
//         <div class="label-captura">
//             <p id="avisoCaptura${item.id}" style="color: white"></p>
//         </div>
//     </div>
// `

//     Para ajustar o "select", ajuste o comando sql em src/models

function obterDadosGrafico(idDispositivo) {
  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao)
  }

  fetch(`/dashboard/ultimas/${idDispositivo}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`)
          resposta.reverse()

          plotarGrafico(resposta, idDispositivo)
        })
      } else {
        console.error('Nenhum dado encontrado ou erro na API')
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`)
    })
}

function plotarGrafico(resposta, idDispositivo) {
  console.log('iniciando plotagem do gráfico...')

  // Criando estrutura para plotar gráfico - labels
  //cria as var pegando o id/classe do elemento
  var z = JSON.stringify(resposta)
  var maquinas = JSON.parse(z)
  maquinas.forEach(item => {
    if (item.fkComponente === 1) {
      var usoCpu = document.getElementById('percentCpu')
      var txtUsoCpu = item.porcentagem
      usoCpu.innerHTML = txtUsoCpu

      var graphCpu = document.getElementById('usoCpu')
      graphCpu.style.background = `linear-gradient(90deg, rgba(114,240,172,1) ${txtUsoCpu}, rgba(221,221,221,1) 0%)`
    } else if (item.fkComponente === 2) {
      var usoRam = document.getElementById('percentRam')
      var txtUsoRam = item.porcentagem
      usoRam.innerHTML = txtUsoRam

      var graphRam = document.getElementById('usoRam')
      var ram = `linear-gradient(90deg, rgba(225,229,34,1) ${txtUsoRam}, rgba(221,221,221,1) 0%)`

      graphRam.style.background = ram
    } else if (item.fkComponente === 3) {
      var usoDisco = document.getElementById('percentDisco')
      var txtUsoDisco = item.porcentagem
      usoDisco.innerHTML = txtUsoDisco

      var graphDisco = document.getElementById('usoDisco')
      var disco = `linear-gradient(90deg, rgba(253,51,51,1) ${txtUsoDisco}, rgba(221,221,221,1) 0%)`
      graphDisco.style.background = disco
    }
  })

  console.log('----------------------------------------------')
  console.log(
    'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
  )
  console.log(resposta)

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  //atribui os valores com inner html aq
  //da pra fazer por aqui acho

  // for (i = 0; i < resposta.length; i++) {
  //     var registro = resposta[i];
  //     labels.push(registro.momento_grafico);
  //     dados.datasets[0].data.push(registro.umidade);
  //     dados.datasets[1].data.push(registro.temperatura);
  // }

  // console.log('----------------------------------------------')
  // console.log('O gráfico será plotado com os respectivos valores:')
  // console.log('Labels:')
  // console.log(labels)
  // console.log('Dados:')
  // console.log(dados.datasets)
  // console.log('----------------------------------------------')

  setTimeout(() => atualizarGrafico(idDispositivo), 2000)
}

function atualizarGrafico(idDispositivo) {
  fetch(`/dashboard/tempo-real/${idDispositivo}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          obterdados(idDispositivo)
          // alertar(novoRegistro, idDispositivo);
          console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`)
          console.log(`Dados atuais do gráfico:`)

          // let avisoCaptura = document.getElementById(`avisoCaptura${idDispositivo}`)
          // avisoCaptura.innerHTML = ""

          //aq a gente muda os novos valores dos dados
          //depois pega esses valores e da update
          var z = JSON.stringify(novoRegistro)
          var maquinas = JSON.parse(z)
          maquinas.forEach(item => {
            if (item.fkComponente === 1) {
              var usoCpu = document.getElementById('percentCpu')
              var txtUsoCpu = item.porcentagem
              usoCpu.innerHTML = txtUsoCpu

              var graphCpu = document.getElementById('usoCpu')
              graphCpu.style.background = `linear-gradient(90deg, rgba(114,240,172,1) ${txtUsoCpu}, rgba(221,221,221,1) 0%)`
            } else if (item.fkComponente === 2) {
              var usoRam = document.getElementById('percentRam')
              var txtUsoRam = item.porcentagem
              usoRam.innerHTML = txtUsoRam

              var graphRam = document.getElementById('usoRam')
              var ram = `linear-gradient(90deg, rgba(225,229,34,1) ${txtUsoRam}, rgba(221,221,221,1) 0%)`

              graphRam.style.background = ram
            } else if (item.fkComponente === 3) {
              var usoDisco = document.getElementById('percentDisco')
              var txtUsoDisco = item.porcentagem
              usoDisco.innerHTML = txtUsoDisco

              var graphDisco = document.getElementById('usoDisco')
              var disco = `linear-gradient(90deg, rgba(253,51,51,1) ${txtUsoDisco}, rgba(221,221,221,1) 0%)`
              graphDisco.style.background = disco
            }
          })

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(
            () => atualizarGrafico(idDispositivo),
            2000
          )
        })
      } else {
        console.error('Nenhum dado encontrado ou erro na API')
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(
          () => atualizarGrafico(idDispositivo),
          2000
        )
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`)
    })
}
//Fim Analise atual componente

//Começo Avisos
function obteravisos(idDispositivo) {
  fetch(`/dashboard/avisos/tempo-real/${idDispositivo}`)
    .then(resposta => {
      if (resposta.status == 200) {
        resposta.json().then(resposta => {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`)

          // alertar(resposta, idDispositivo)
        })
      } else {
        console.error(
          `Nenhum dado encontrado para o id ${idDispositivo} ou erro na API`
        )
      }
    })
    .catch(function (error) {
      console.error(
        `Erro na obtenção dos dados do Aviso p/ gráfico: ${error.message}`
      )
    })
}

function atualizacaoPeriodicaAviso() {
  JSON.parse(sessionStorage.AVISOS).forEach(item => {
    obteravisos(item.idAviso)
  })
  setTimeout(atualizacaoPeriodicaAviso, 5000)
}

idDispositivo = sessionStorage.ID_COMPUTADOR
// window.onload = obterAvisosGrafico(idDispositivo)
window.onload = exibirAvisosDoUsuario()

function exibirAvisosDoUsuario() {
  var maquinas = JSON.parse(sessionStorage.MAQUINAS)
  maquinas.forEach(item => {
    obterAvisosGrafico(item.idDispositivo)
  })
}

function obterAvisosGrafico(idDispositivo) {
  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao)
  }

  fetch(`/dashboard/ultimos/${idDispositivo}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`)
          console.log('ESTOU NO THEN DO aviso()!')
          // resposta.reverse()

          json => {
            console.log(json)
            console.log(JSON.stringify(json))
            console.log(JSON.stringify(json.aviso))

            console.log(json.aviso)

            sessionStorage.AVISOS = JSON.stringify(json.aviso)
          }

          plotarAviso(resposta, idDispositivo)
        })
      } else {
        console.error('Nenhum dado encontrado ou erro na API')
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`)
    })
}

function plotarAviso(resposta, idDispositivo) {
  console.log('iniciando plotagem do aviso...')

  // Criando estrutura para plotar gráfico - labels
  //cria as var pegando o id/classe do elemento
  var z = JSON.stringify(resposta)
  var avisos = JSON.parse(z)
  avisos.forEach(item => {
    var i = item.descricao.indexOf('90')
    var i2 = item.descricao.indexOf('80')
    var i3 = item.descricao.indexOf('100')

    var z = item.descricao.indexOf('70')
    var z2 = item.descricao.indexOf('60')
    var z3 = item.descricao.indexOf('ATIVO')
    console.log(`TESTANDO !!!!! ${item.descricao}`)

    if (i != -1 || i2 != -1 || i3 != -1) {
      document.getElementById('boxAvisos').innerHTML += `
  <div class="infoAviso">
                  <span class="tituloAviso">${item.descricao}</span>
                  <span class="dataAviso">${item.dtHr}</span>
                  <img src="assets/img/aviso-red.png" alt="" class="iconAviso">
              </div>
  `
    } else if (z != -1 || z2 != -1 || z3 != -1) {
      document.getElementById('boxAvisos').innerHTML += `
      <div class="infoAviso">
                      <span class="tituloAviso">${item.descricao}</span>
                      <span class="dataAviso">${item.dtHr}</span>
                      <img src="assets/img/aviso-orange.png" alt="" class="iconAviso">
                  </div>
      `
    } else {
      document.getElementById('boxAvisos').innerHTML += `
      <div class="infoAviso">
                      <span class="tituloAviso">${item.descricao}</span>
                      <span class="dataAviso">${item.dtHr}</span>
                      <img src="assets/img/aviso.png" alt="" class="iconAviso">
                  </div>
      `
    }
  })
  console.log('----------------------------------------------')
  console.log(
    'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
  )
  console.log(resposta)

  setTimeout(() => atualizarAviso(idDispositivo), 2000)
}

function atualizarAviso(idDispositivo) {
  fetch(`/dashboard/avisos/tempo-real/${idDispositivo}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          obteravisos(idDispositivo)
          // alertar(novoRegistro, idAviso);
          console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`)
          console.log(`Dados atuais do gráfico:`)

          var z = JSON.stringify(novoRegistro)
          var avisos = JSON.parse(z)
          //teste
          avisos.forEach(item => {
            document.getElementById('boxAvisos').innerHTML = ''
            console.log(`TESTANDO !!!!! ${item.descricao}`)
          })

          avisos.forEach(item => {
            var i = item.descricao.indexOf('90')
            var i2 = item.descricao.indexOf('80')
            var i3 = item.descricao.indexOf('100')

            var z = item.descricao.indexOf('70')
            var z2 = item.descricao.indexOf('60')
            console.log(`TESTANDO !!!!! ${item.descricao}`)

            if (i != -1 || i2 != -1 || i3 != -1) {
              document.getElementById('boxAvisos').innerHTML += `
          <div class="infoAviso">
                          <span class="tituloAviso">${item.descricao}</span>
                          <span class="dataAviso">${item.dtHr}</span>
                          <img src="assets/img/aviso-red.png" alt="" class="iconAviso">
                      </div>
          `
            } else if (z != -1 || z2 != -1) {
              document.getElementById('boxAvisos').innerHTML += `
              <div class="infoAviso">
                              <span class="tituloAviso">${item.descricao}</span>
                              <span class="dataAviso">${item.dtHr}</span>
                              <img src="assets/img/aviso-orange.png" alt="" class="iconAviso">
                          </div>
              `
            } else {
              document.getElementById('boxAvisos').innerHTML += `
              <div class="infoAviso">
                              <span class="tituloAviso">${item.descricao}</span>
                              <span class="dataAviso">${item.dtHr}</span>
                              <img src="assets/img/aviso.png" alt="" class="iconAviso">
                          </div>
              `
            }
          })

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(
            () => atualizarAviso(idDispositivo),
            2000
          )
        })
      } else {
        console.error('Nenhum dado encontrado ou erro na API')
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(
          () => atualizarAviso(idDispositivo),
          2000
        )
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`)
    })
}
//Fim aviso

//Começo usb
function obterusb(idDispositivo) {
  fetch(`/dashboard/usb/tempo-real/${idDispositivo}`)
    .then(resposta => {
      if (resposta.status == 200) {
        resposta.json().then(resposta => {
          console.log(`Dados de usb recebidos: ${JSON.stringify(resposta)}`)

          // alertar(resposta, idDispositivo)
        })
      } else {
        console.error(
          `Nenhum dado de usb encontrado para o id ${idDispositivo} ou erro na API`
        )
      }
    })
    .catch(function (error) {
      console.error(
        `Erro na obtenção dos dados de usb do Dispositivo p/ gráfico: ${error.message}`
      )
    })
}

function atualizacaoPeriodicaUsb() {
  JSON.parse(sessionStorage.MAQUINAS).forEach(item => {
    obterusb(item.idDispositivo)
  })
  setTimeout(atualizacaoPeriodicaUsb, 5000)
}

window.onload = exibirUsbDoUsuario()

function exibirUsbDoUsuario() {
  var maquinas = JSON.parse(sessionStorage.MAQUINAS)
  maquinas.forEach(item => {
    obterUsbGrafico(item.idDispositivo)
  })
}

function obterUsbGrafico(idDispositivo) {
  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao)
  }

  fetch(`/dashboard/usb/${idDispositivo}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Usb recebidos: ${JSON.stringify(resposta)}`)
          // resposta.reverse()

          plotarUsb(resposta, idDispositivo)
        })
      } else {
        console.error('Nenhum dado encontrado ou erro na API')
      }
    })
    .catch(function (error) {
      console.error(
        `Erro na obtenção dos dados de usb p/ gráfico: ${error.message}`
      )
    })
}

function plotarUsb(resposta, idDispositivo) {
  console.log('iniciando plotagem do usb...')

  // Criando estrutura para plotar gráfico - labels
  //cria as var pegando o id/classe do elemento
  var z = JSON.stringify(resposta)
  var listaUsb = JSON.parse(z)
  listaUsb.forEach(item => {
    var statusUsb = item.status
    var texto = document.getElementById('statusUsb')

    if (statusUsb == 1) {
      texto.innerHTML = 'Ativo'
    } else {
      texto.innerHTML = 'Inativo'
    }
  })

  console.log('----------------------------------------------')
  console.log(
    'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
  )
  console.log(resposta)

  setTimeout(() => atualizarUsb(idDispositivo), 2000)
}

function atualizarUsb(idDispositivo) {
  fetch(`/dashboard/usb/tempo-real/${idDispositivo}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          obterusb(idDispositivo)
          // alertar(novoRegistro, idDispositivo);
          console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`)
          console.log(`Dados atuais do gráfico:`)

          //aq a gente muda os novos valores dos dados
          //depois pega esses valores e da update
          var z = JSON.stringify(novoRegistro)
          var listaUsb = JSON.parse(z)
          listaUsb.forEach(item => {
            var statusUsb = item.status
            var texto = document.getElementById('statusUsb')

            if (statusUsb == 1) {
              texto.innerHTML = 'Ativo'
            } else {
              texto.innerHTML = 'Inativo'
            }
          })

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(
            () => atualizarUsb(idDispositivo),
            2000
          )
        })
      } else {
        console.error('Nenhum dado encontrado ou erro na API')
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(() => atualizarUsb(idDispositivo), 2000)
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`)
    })
}
//Fim usb

//Começo media componente
function obtermedia(idDispositivo) {
  fetch(`/dashboard/media/tempo-real/${idDispositivo}`)
    .then(resposta => {
      if (resposta.status == 200) {
        resposta.json().then(resposta => {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`)

          // alertar(resposta, idDispositivo)
        })
      } else {
        console.error(
          `Nenhum dado encontrado para o id ${idDispositivo} ou erro na API`
        )
      }
    })
    .catch(function (error) {
      console.error(
        `Erro na obtenção dos dados do Dispositivo p/ gráfico: ${error.message}`
      )
    })
}

function atualizacaoPeriodicaMedia() {
  JSON.parse(sessionStorage.MAQUINAS).forEach(item => {
    obtermedia(item.idDispositivo)
  })
  setTimeout(atualizacaoPeriodicaMedia, 5000)
}

window.onload = exibirMediaDoUsuario()

function exibirMediaDoUsuario() {
  var maquinas = JSON.parse(sessionStorage.MAQUINAS)
  maquinas.forEach(item => {
    obterMediaGrafico(item.idDispositivo)
  })
}

function obterMediaGrafico(idDispositivo) {
  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao)
  }

  fetch(`/dashboard/media/${idDispositivo}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`)
          // resposta.reverse()

          plotarMedia(resposta, idDispositivo)
        })
      } else {
        console.error('Nenhum dado encontrado ou erro na API')
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`)
    })
}

function plotarMedia(resposta, idDispositivo) {
  console.log('iniciando plotagem do gráfico...')

  // Criando estrutura para plotar gráfico - labels
  //cria as var pegando o id/classe do elemento
  var z = JSON.stringify(resposta)
  var maquinas = JSON.parse(z)
  maquinas.forEach(item => {
    var cpuMensal = item.usoCpuMensal
    var texto = document.getElementById('usoCpuMensal')
    texto.innerHTML = cpuMensal

    var ramMensal = item.usoRamMensal
    var texto = document.getElementById('usoRamMensal')
    texto.innerHTML = ramMensal

    var discoMensal = item.usoDiscoMensal
    var texto = document.getElementById('usoDiscoMensal')
    texto.innerHTML = discoMensal
  })

  console.log('----------------------------------------------')
  console.log(
    'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
  )
  console.log(resposta)

  setTimeout(() => atualizarMedia(idDispositivo), 2000)
}

function atualizarMedia(idDispositivo) {
  fetch(`/dashboard/media/tempo-real/${idDispositivo}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          obtermedia(idDispositivo)
          // alertar(novoRegistro, idDispositivo);
          console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`)
          console.log(`Dados atuais do gráfico:`)

          //aq a gente muda os novos valores dos dados
          //depois pega esses valores e da update
          var z = JSON.stringify(novoRegistro)
          var maquinas = JSON.parse(z)
          maquinas.forEach(item => {
            var cpuMensal = item.usoCpuMensal
            var texto = document.getElementById('usoCpuMensal')
            texto.innerHTML = cpuMensal

            var ramMensal = item.usoRamMensal
            var texto = document.getElementById('usoRamMensal')
            texto.innerHTML = ramMensal

            var discoMensal = item.usoDiscoMensal
            var texto = document.getElementById('usoDiscoMensal')
            texto.innerHTML = discoMensal
          })

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(
            () => atualizarMedia(idDispositivo),
            2000
          )
        })
      } else {
        console.error('Nenhum dado encontrado ou erro na API')
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(
          () => atualizarMedia(idDispositivo),
          2000
        )
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`)
    })
}
//Fim media componente

//Começo insight componente
function obterinsight(idDispositivo) {
  fetch(`/dashboard/insight/tempo-real/${idDispositivo}`)
    .then(resposta => {
      if (resposta.status == 200) {
        resposta.json().then(resposta => {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`)

          // alertar(resposta, idDispositivo)
        })
      } else {
        console.error(
          `Nenhum dado encontrado para o id ${idDispositivo} ou erro na API`
        )
      }
    })
    .catch(function (error) {
      console.error(
        `Erro na obtenção dos dados do Dispositivo p/ gráfico: ${error.message}`
      )
    })
}

function atualizacaoPeriodicaInsight() {
  JSON.parse(sessionStorage.MAQUINAS).forEach(item => {
    obterinsight(item.idDispositivo)
  })
  setTimeout(atualizacaoPeriodicaInsight, 5000)
}

window.onload = exibirInsightDoUsuario()

function exibirInsightDoUsuario() {
  var maquinas = JSON.parse(sessionStorage.MAQUINAS)
  maquinas.forEach(item => {
    obterInsightGrafico(item.idDispositivo)
  })
}

function obterInsightGrafico(idDispositivo) {
  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao)
  }

  fetch(`/dashboard/insight/${idDispositivo}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`)
          // resposta.reverse()

          plotarInsight(resposta, idDispositivo)
        })
      } else {
        console.error('Nenhum dado encontrado ou erro na API')
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`)
    })
}

function plotarInsight(resposta, idDispositivo) {
  console.log('iniciando plotagem do gráfico...')

  // Criando estrutura para plotar gráfico - labels
  //cria as var pegando o id/classe do elemento
  var z = JSON.stringify(resposta)
  var maquinas = JSON.parse(z)
  maquinas.forEach(item => {
    var insightCpu = item.insightCpuMensal
    var txtCpu = document.getElementById('insightCpu')
    txtCpu.innerHTML = insightCpu

    var setaCpu = document.getElementById('setaCpu')
    if (insightCpu >= 0) {
      setaCpu.src = 'assets/img/green-arrow.png'
      txtCpu.classList.remove('red')
      txtCpu.classList.add('green')
    } else {
      setaCpu.src = 'assets/img/red-arrow.png'
      txtCpu.classList.remove('green')
      txtCpu.classList.add('red')
    }

    var insightRam = item.insightRamMensal
    var txtRam = document.getElementById('insightRam')
    txtRam.innerHTML = insightRam

    var setaRam = document.getElementById('setaRam')
    if (insightRam >= 0) {
      setaRam.src = 'assets/img/green-arrow.png'
      txtRam.classList.remove('red')
      txtRam.classList.add('green')
    } else {
      setaRam.src = 'assets/img/red-arrow.png'
      txtRam.classList.remove('green')
      txtRam.classList.add('red')
    }

    var insightDisco = item.insightDiscoMensal
    var txtDisco = document.getElementById('insightDisco')
    txtDisco.innerHTML = insightDisco

    var setaDisco = document.getElementById('setaDisco')
    if (insightDisco >= 0) {
      setaDisco.src = 'assets/img/green-arrow.png'
      txtDisco.classList.remove('red')
      txtDisco.classList.add('green')
    } else {
      setaDisco.src = 'assets/img/red-arrow.png'
      txtDisco.classList.remove('green')
      txtDisco.classList.add('red')
    }
  })

  console.log('----------------------------------------------')
  console.log(
    'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
  )
  console.log(resposta)

  setTimeout(() => atualizarInsight(idDispositivo), 2000)
}

function atualizarInsight(idDispositivo) {
  fetch(`/dashboard/insight/tempo-real/${idDispositivo}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          obterinsight(idDispositivo)
          // alertar(novoRegistro, idDispositivo);
          console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`)
          console.log(`Dados atuais do gráfico:`)

          //aq a gente muda os novos valores dos dados
          //depois pega esses valores e da update
          var z = JSON.stringify(novoRegistro)
          var maquinas = JSON.parse(z)
          maquinas.forEach(item => {
            var insightCpu = item.insightCpuMensal
            var txtCpu = document.getElementById('insightCpu')
            txtCpu.innerHTML = insightCpu

            var setaCpu = document.getElementById('setaCpu')
            if (insightCpu >= 0) {
              setaCpu.src = 'assets/img/green-arrow.png'
              txtCpu.classList.remove('red')
              txtCpu.classList.add('green')
            } else {
              setaCpu.src = 'assets/img/red-arrow.png'
              txtCpu.classList.remove('green')
              txtCpu.classList.add('red')
            }

            var insightRam = item.insightRamMensal
            var txtRam = document.getElementById('insightRam')
            txtRam.innerHTML = insightRam

            var setaRam = document.getElementById('setaRam')
            if (insightRam >= 0) {
              setaRam.src = 'assets/img/green-arrow.png'
              txtRam.classList.remove('red')
              txtRam.classList.add('green')
            } else {
              setaRam.src = 'assets/img/red-arrow.png'
              txtRam.classList.remove('green')
              txtRam.classList.add('red')
            }

            var insightDisco = item.insightDiscoMensal
            var txtDisco = document.getElementById('insightDisco')
            txtDisco.innerHTML = insightDisco

            var setaDisco = document.getElementById('setaDisco')
            if (insightDisco >= 0) {
              setaDisco.src = 'assets/img/green-arrow.png'
              txtDisco.classList.remove('red')
              txtDisco.classList.add('green')
            } else {
              setaDisco.src = 'assets/img/red-arrow.png'
              txtDisco.classList.remove('green')
              txtDisco.classList.add('red')
            }
          })

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(
            () => atualizarInsight(idDispositivo),
            2000
          )
        })
      } else {
        console.error('Nenhum dado encontrado ou erro na API')
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(
          () => atualizarInsight(idDispositivo),
          2000
        )
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`)
    })
}
//Fim insight componente

function limparConsole() {
  console.clear()

  setInterval(limparConsole, 3000)
}
