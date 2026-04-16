let tasks = [];
let filter = "todas";

//quando preciona Enter, chama o botão

document.getElementById("escreverTarefa")
  .addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      adicionarTarefa();
    }
  }
);

//criar tarefas

function adicionarTarefa() {
  const input = document.getElementById("escreverTarefa");
  const prazoInput = document.getElementById("prazoTarefa");
  const comentarioInput = document.getElementById("comentarioTarefa");

  const texto = input.value.trim();
  const prazo = prazoInput.value;
  const comentario = comentarioInput.value.trim();

  //se o campo estiver vazio, não faz nada
  if (!texto) return;
  if (!prazo) {
    alert("O prazo é obrigatório!");
    return;
  }

  const novaTarefa = {
    id: Date.now(),   
    text: texto,
    prazo: prazo,
    comentario: comentario,
    status: "pendente" 
  };

  tasks.push(novaTarefa);

  input.value = "";
  prazoInput.value = "";
  comentarioInput.value = "";

  render();
}

//excluir tarefas

function deletarTarefa(id) {
  tasks = tasks.filter(function(tarefa) {
    return tarefa.id !== id; //mantém as tarefas, menos a com id selecionado
  });
 
  render();
}

//mudar status

function mudarStatus(id, novoStatus) {
  const tarefa = tasks.find(function(t) {
    return t.id === id;
  });
 
  if (tarefa) {
    tarefa.status = novoStatus;
    render();
  }
}

//escolher filtro 

function setFilter(botaoClicado) {
  filter = botaoClicado.dataset.f;
 
  const botoes = document.querySelectorAll(".filter-btn");
  botoes.forEach(function(btn) {
    btn.classList.remove("active");
  });
 
  botaoClicado.classList.add("active");
 
  render();
}

//mostrar lista de tarefas

function render() {
  let tarefasVisiveis;
 
  if (filter === "todas") {
    tarefasVisiveis = tasks;
  } else {
    tarefasVisiveis = tasks.filter(function(t) {
    return t.status === filter;
    });
  }

  //lista sem tarefas
  const lista = document.getElementById("listaTarefas");

    if (tarefasVisiveis.length === 0) {
      lista.innerHTML = '<div class="empty">Nenhuma tarefa aqui ainda.</div>';
    return; 
  }

  lista.innerHTML = tarefasVisiveis.map(function(t) {
    const classeDone = t.status === "concluida" ? "done" : "";
 
  return `
    <div class="item-tarefa">
 
      <span class="texto-tarefa ${classeDone}">
        <strong>${esc(t.text)}</strong><br>
        <small>Prazo: ${t.prazo}</small><br>
        ${t.comentario ? `<small>Comentário: ${esc(t.comentario)}</small>` : ""}
      </span>
 
      <select
        class="status ${t.status}"
        onchange="mudarStatus(${t.id}, this.value)">
        <option value="pendente"  ${t.status === "pendente"  ? "selected" : ""}>Pendente</option>
        <option value="andamento" ${t.status === "andamento" ? "selected" : ""}>Em andamento</option>
        <option value="concluida" ${t.status === "concluida" ? "selected" : ""}>Concluída</option>
      </select>
 
    <button class="del-btn" onclick="deletarTarefa(${t.id})">✕</button>
 
    </div>
  `;
 
  }).join("");
}

function esc(texto) {
  return texto
    .replace(/&/g, "&amp;")   // & → &amp;
    .replace(/</g, "&lt;")    // < → &lt;
    .replace(/>/g, "&gt;");   // > → &gt;
}


