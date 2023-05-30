var paragrafoDeErro = document.createElement('p');

async function buscaEndereco(cep) {
  var mensagemErro = document.getElementById('erro');
  mensagemErro.innerHTML = '';
  try {
    var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCepConvertido = await consultaCep.json();
    if (consultaCepConvertido.erro) {
      throw 'CEP não existe!!';
    }
    console.log(consultaCepConvertido);

    var logradouro = document.getElementById('endereco');
    var bairro = document.getElementById('bairro');
    var cidade = document.getElementById('cidade');
    var estado = document.getElementById('estado');

    logradouro.value = consultaCepConvertido.logradouro;
    bairro.value = consultaCepConvertido.bairro;
    cidade.value = consultaCepConvertido.localidade;
    estado.value = consultaCepConvertido.uf;
  } catch (error) {
    paragrafoDeErro.innerHTML = 'CEP invalido, favor digitar o CEP correto!';
    mensagemErro.appendChild(paragrafoDeErro);
    console.log(error);
  }
}

document
  .getElementById('cep')
  .addEventListener('focusout', e => buscaEndereco(e.target.value));
