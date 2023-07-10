function consultaPaciente(event) {
    // Previnindo comportamento padrão da página
    event.preventDefault();

    const elementoSecao = document.querySelector("#lista_resultado");
    elementoSecao.innerHTML = '';

    let nomeBusca = document.querySelector("#nome_busca").value;

    fetch(`http://localhost:3000/paciente/consulta-por-paciente?userInput=${nomeBusca}`)
        .then(response => response.json())
        .then(data => {
            // Processando os dados recebidos
            console.log(data);
            let id = data[0].id;
            let nome = data[0].nome;
            let email = data[0].email;
            // let planosSaude = data[0].planosSaude;
            let telefone = data[0].telefone;
            let historico = data[0].historico;
            let imagemUrl = data[0].imagemUrl;
            
            let elementoResultado = document.createElement("div");
            elementoResultado.innerHTML = `
                <h2>Paciente encontrado com sucesso!</h2>
                <p><b>Nome:</b> ${nome}</p>
                <p><b>ID:</b> ${id}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Telefone:</b> ${telefone}</p>
                <p><b>Histórico:</b> ${historico}</p>
                <p><b>Imagem de perfil:</b></p>
                <img src="${imagemUrl}" width="200">
            `;
            elementoSecao.appendChild(elementoResultado);

        })
        .catch(error => {
            // Tratando erros
            console.error('Ocorreu um erro:', error);
        });
}

function redirecionar() {
    // Redirecionar para outra página
    window.location.href = "cadastro.html";
}

function voltar() {
    // Voltar para a página anterior
    window.history.back();
}
