var consultaCep = fetch('https://viacep.com.br/ws/01001000/json/')
  .then(resultado => resultado.json())
  .then(e => {
    if (e.erro) {
      throw 'cep não existe';
    } else console.log(e);
  })
  .catch(error => console.log(error))
  .finally(() => console.log('Processamento concluido'));

console.log(consultaCep);
