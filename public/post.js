function enviarDados() {
    // Função auxiliar: busca o ID com 'post...' (admin) ou sem prefixo (cadastro)
    function pegarValor(idAdmin, idCadastro) {
        var elemento = document.getElementById(idAdmin) || document.getElementById(idCadastro);
        return elemento ? elemento.value : "";
    }

    var nome = pegarValor('postNome', 'nome');
    var sobrenome = pegarValor('postSobrenome', 'sobrenome');
    var username = pegarValor('postUsername', 'username');
    var rg = pegarValor('postRg', 'rg');
    var cpf = pegarValor('postCpf', 'cpf');
    var email = pegarValor('postEmail', 'email');
    var senha = pegarValor('postSenha', 'senha');
    var rua = pegarValor('postRua', 'rua');
    var casa = pegarValor('postCasa', 'casa');
    var bairro = pegarValor('postBairro', 'bairro');
    var cep = pegarValor('postCep', 'cep');
    var cidade = pegarValor('postCidade', 'cidade');
    var estado = pegarValor('postEstado', 'estado');
    var telefone = pegarValor('postTelefone', 'telefone');

    // Validação simples para evitar envio vazio
    if (!nome || !email || !senha) {
        alert("Por favor, preencha pelo menos Nome, E-mail e Senha.");
        return;
    }

    fetch('/pessoas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            sobrenome: sobrenome,
            username: username,
            rg: rg,
            cpf: cpf,
            email: email,
            senha: senha,
            rua: rua,
            casa: casa,
            bairro: bairro,
            cep: cep,
            cidade: cidade,
            estado: estado,
            telefone: telefone
        })
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar: " + resposta.statusText);
        }
        return resposta.json();
    })
    .then(dados => {
        alert("Usuário cadastrado com sucesso!");
        
        // Se existir a tabela na tela (página de admin), recarrega para atualizar a lista
        if (document.getElementById('tabela-corpo')) {
            location.reload();
        } else {
            // Na página de cadastro, apenas limpa os campos do formulário
            document.querySelector('form').reset();
        }
    })
    .catch(erro => {
        console.error("Erro no POST:", erro);
        alert("Erro ao cadastrar: " + erro.message);
    });
}