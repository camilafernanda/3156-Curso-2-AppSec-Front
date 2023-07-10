function adicionarPaciente(event) {
    // Previnindo comportamento padrão da página
    event.preventDefault();

    const elementoSecao = document.querySelector("#msg_resultado");
    const elementoSaudacao = document.querySelector("#nome_boas_vindas");
    elementoSecao.innerHTML = '';
    elementoSaudacao.innerHTML = '';

    // Obtenha os valores dos campos do formulário
    const cpf = document.getElementById('cpf').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cep = document.getElementById('CEP').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const complemento = document.getElementById('complemento').value;
    const estado = document.getElementById('estado').value;
    const senha = document.getElementById('senha').value;
    const telefone = document.getElementById('telefone').value;
    const possuiPlanoSaude = document.getElementById('possuiPlanoSaude').value === 'true';
    const planosSaude = document.getElementById('planosSaude').value.split(',');;
    const historico = document.getElementById('historico').value;
    const imagemUrl = document.getElementById('imagem').value;

    // Crie um objeto com os dados a serem enviados
    const data = {
        cpf,
        nome,
        email,
        endereco: {
            cep,
            rua,
            numero,
            complemento,
            estado
        },
        senha,
        telefone,
        possuiPlanoSaude,
        planosSaude,
        imagemUrl,
        historico
    };

    // Realize o POST para a URL
    fetch('http://localhost:3000/paciente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            console.log('Sucesso:', result);
            console.log(result.endereco);

            let elementoResultado = document.createElement("div");
            elementoResultado.innerHTML = `
                <h2>Paciente cadastrado com sucesso!</h2>
                <p><b>CPF:</b> ${result.cpf}</p>
                <p><b>Nome:</b> ${result.nome}</p>
                <p><b>Email:</b> ${result.email}</p>
                <p><b>Telefone:</b> ${result.telefone}</p>
                <p><b>Endereço:</b> ${result.endereco.rua}, ${result.endereco.numero}, ${result.endereco.complemento}, ${result.endereco.estado}</p>
                <p><b>Planos de Saúde:</b> ${result.planosSaude.join(', ')}</p>
                <p><b>Histórico:</b> ${result.historico}</p>
                <p><b>Imagem de perfil:</b></p>
                <img src="${result.imagemUrl}" width="200">
                <p>Deseja receber newsletters?<p>
                <input type="checkbox" value="${result.nome}" checked>
            `;
            const elementoSecao = document.querySelector("#msg_resultado");
            elementoSecao.appendChild(elementoResultado);

        })
        .catch(error => {
            console.error('Erro:', error);
            let elementoResultado = document.createElement("h1");
            elementoResultado.innerText = 'Ocorreu um erro ao cadastrar o paciente.';
            elementoSecao.appendChild(elementoResultado);
        });

    elementoSaudacao.append(" " + nome);

}

function redirecionar() {
    // Redirecionar para outra página
    window.location.href = "consulta.html";
}
  
function voltar() {
    // Voltar para a página anterior
    window.history.back();
}
  