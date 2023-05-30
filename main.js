const idsEnderecoFormulario = [
  'cep',
  'endereco',
  'numero',
  'complemento',
  'bairro',
  'cidade',
  'estado'
];

var camposEnderecoFormulario = {};

idsEnderecoFormulario.forEach(e => {
  camposEnderecoFormulario[e] = document.getElementById(e);
});

const paragrafoDeErro = document.createElement('p');
paragrafoDeErro.classList.add('erro__texto');
paragrafoDeErro.innerHTML += 'CEP invalido, favor digitar o CEP correto!';
const mensagemErro = document.getElementById('erro');

camposEnderecoFormulario['cep'].addEventListener('focusout', e => {
  const cep = e.target.value;
  resetaEndereco();
  esperaPorCep();
  if (cep != '') {
    if (cep.length == 8) {
      buscaEndereco(e.target.value);
    } else {
      mensagemErro.appendChild(paragrafoDeErro);
    }
  }
});

esperaPorCep();

async function buscaEndereco(cep) {
  esperaPorCep();
  try {
    var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCepConvertido = await consultaCep.json();
    if (consultaCepConvertido.erro) {
      throw 'CEP não existe!!';
    }

    completaEndereco(consultaCepConvertido);
  } catch (error) {
    mensagemErro.appendChild(paragrafoDeErro);
  }
}

function esperaPorCep() {
  mensagemErro.innerHTML = '';
  resetaEndereco();
  idsEnderecoFormulario.forEach(e => {
    if (e === 'estado') {
      camposEnderecoFormulario[e].setAttribute('disabled', '');
    } else {
      camposEnderecoFormulario[e].setAttribute('readonly', '');
    }
  });
  camposEnderecoFormulario['cep'].removeAttribute('readonly');
}

function resetaEndereco() {
  idsEnderecoFormulario.forEach(e => {
    if (e != 'cep') {
      camposEnderecoFormulario[e].value = '';
    }
  });
}

function completaEndereco(endereco) {
  camposEnderecoFormulario['endereco'].value = endereco.logradouro;
  if (endereco.logradouro === '') {
    camposEnderecoFormulario['endereco'].removeAttribute('readonly');
  }
  camposEnderecoFormulario['bairro'].value = endereco.bairro;
  if (endereco.bairro === '') {
    camposEnderecoFormulario['bairro'].removeAttribute('readonly');
  }
  camposEnderecoFormulario['cidade'].value = endereco.localidade;
  camposEnderecoFormulario['estado'].value = endereco.uf;
  camposEnderecoFormulario['numero'].removeAttribute('readonly');
  camposEnderecoFormulario['complemento'].removeAttribute('readonly');
}
