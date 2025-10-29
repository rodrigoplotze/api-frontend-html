const API_URL = "https://api-test-express-supabase.onrender.com/produtos/";

const lista = document.getElementById("lista-produtos");

async function carregarProdutos() {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();

    lista.innerHTML = "";
    dados.forEach((p) => {
        const li = document.createElement("tr");
        li.innerHTML = `<td style='width:60%'>${p.nome}</td> <td style='width:30%'>R$ ${p.preco.toFixed(2)}</td><td style='width:10%'> 
        <button onclick="removerProduto(1)" class="btn-excluir-moderno">
        Excluir </button></td>`;
        lista.appendChild(li);
    });

}
carregarProdutos();

const btnAdicionar = document.getElementById('btn-adicionar');
btnAdicionar.addEventListener('click', adicionarProduto);

async function adicionarProduto() {
    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, preco }),
    });

    carregarProdutos();
}

// 


async function removerProduto(id) {
    await fetch(API_URL + id, { method: "DELETE" });
    carregarProdutos();
}
