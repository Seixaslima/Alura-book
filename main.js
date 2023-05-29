async function buscaEndereco(cep) {
  try {
    var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCepConvertido = await consultaCep.json();
    if (consultaCepConvertido.erro) {
      throw 'CEP não existe!!';
    }
    console.log(consultaCepConvertido);
  } catch (error) {
    console.log(error);
  }
}

let ceps = ['01001000', '01001001'];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
console.log(conjuntoCeps);
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));
