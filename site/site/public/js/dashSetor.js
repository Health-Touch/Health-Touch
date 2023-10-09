function validarSessao() {
  var email = sessionStorage.EMAIL_USUARIO
  var nome = sessionStorage.NOME_USUARIO
  var cargo = sessionStorage.CARGO_USUARIO
  var nomeEmpresa = sessionStorage.NOME_EMPRESA

  var tituloPerfil = document.getElementById('tituloPerfil')
  var cargoPerfil = document.getElementById('cargoPerfil')
  var empresa = document.getElementById('empresa')

  if (email != null && nome != null) {
    // window.alert(`Seja bem-vindo, ${nome}!`);
    tituloPerfil.innerHTML = nome
    cargoPerfil.innerHTML = cargo
    empresa.innerHTML = nomeEmpresa

    // finalizarAguardar();
  } else {
    window.location = '../login.html'
  }
}

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

function validarStatusUsb() {
  var statusUsb = sessionStorage.STATUS_USB
  var texto = document.getElementById('statusUsb')

  if (statusUsb == 1) {
    texto.innerHTML = 'Ativo'
  } else {
    texto.innerHTML = 'Inativo'
  }
}

function cpuMensal() {
  var cpuMensal = sessionStorage.CPU_MENSAL
  var texto = document.getElementById('usoCpuMensal')
  texto.innerHTML = cpuMensal
}

function ramMensal() {
  var ramMensal = sessionStorage.RAM_MENSAL
  var texto = document.getElementById('usoRamMensal')
  texto.innerHTML = ramMensal
}

function discoMensal() {
  var discoMensal = sessionStorage.DISCO_MENSAL
  var texto = document.getElementById('usoDiscoMensal')
  texto.innerHTML = discoMensal
}

function insightCpu() {
  var insightCpu = sessionStorage.INSIGHT_CPU
  var texto = document.getElementById('insightCpu')
  texto.innerHTML = insightCpu

  var setaCpu = document.getElementById('setaCpu')
  if (insightCpu >= 0) {
    setaCpu.src = 'assets/img/green-arrow.png'
    setaCpu.classList.remove('red')
  } else {
    setaCpu.src = 'assets/img/red-arrow.png'
    setaCpu.classList.add('red')
  }
}

function insightRam() {
  var insightRam = sessionStorage.INSIGHT_RAM
  var texto = document.getElementById('insightRam')
  texto.innerHTML = insightRam

  var setaRam = document.getElementById('setaRam')
  if (insightRam >= 0) {
    setaRam.src = 'assets/img/green-arrow.png'
    setaRam.classList.remove('red')
  } else {
    setaRam.src = 'assets/img/red-arrow.png'
    setaRam.classList.add('red')
  }
}

function insightDisco() {
  var insightDisco = sessionStorage.INSIGHT_DISCO
  var texto = document.getElementById('insightDisco')
  texto.innerHTML = insightDisco

  var setaDisco = document.getElementById('setaDisco')
  if (insightDisco >= 0) {
    setaDisco.src = 'assets/img/green-arrow.png'
    setaDisco.classList.remove('red')
  } else {
    setaDisco.src = 'assets/img/red-arrow.png'
    setaDisco.classList.add('red')
  }
}

function analiseGeral() {
  var usoCpu = document.getElementById('percentCpu')
  var txtUsoCpu = sessionStorage.USO_CPU
  usoCpu.innerHTML = txtUsoCpu

  var usoRam = document.getElementById('percentRam')
  var txtUsoRam = sessionStorage.USO_RAM
  usoRam.innerHTML = txtUsoRam

  var usoDisco = document.getElementById('percentDisco')
  var txtUsoDisco = sessionStorage.USO_DISCO
  usoDisco.innerHTML = txtUsoDisco

  var graphCpu = document.getElementById('usoCpu')
  graphCpu.style.background = `linear-gradient(90deg, rgba(114,240,172,1) ${txtUsoCpu}, rgba(221,221,221,1) 50%)`

  var graphRam = document.getElementById('usoRam')
  var graphDisco = document.getElementById('usoDisco')

  var ram = `linear-gradient(90deg, rgba(225,229,34,1) ${txtUsoRam}, rgba(221,221,221,1) 50%)`

  graphRam.style.background = ram

  var disco = `linear-gradient(90deg, rgba(253,51,51,1) ${txtUsoDisco}, rgba(221,221,221,1) 50%)`

  graphDisco.style.background = disco
}

function exibirAlertas() {
  JSON.parse(sessionStorage.AVISOS).forEach(item => {
    document.getElementById('boxAvisos').innerHTML += `
        <div class="infoAviso">
                        <span class="tituloAviso">${item.descricao}</span>
                        <span class="dataAviso">${item.dtHr}</span>
                        <img src="assets/img/aviso.png" alt="" class="iconAviso">
                    </div>
        `
  })
}
