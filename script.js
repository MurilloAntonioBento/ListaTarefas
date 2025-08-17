let qntdTarefas = document.getElementById("qntd-tarefas");
let qntdConcluidas = document.getElementById("qntd-concluidas");
let listElement = document.querySelector(".tarefas ul")
let inputElement = document.querySelector("#form input")
let buttonElement = document.querySelector("#form button")
let tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || [];



function mostrarTarefas() {
  listElement.innerHTML = "";

  const semTarefasClass = document.querySelector(".sem-tarefas");
  const tarefasClass = document.querySelector(".tarefas");
  
  if (tarefas.length === 0) {
    semTarefasClass.style.display = 'block';
    tarefasClass.style.display = 'none';
    qntdTarefas.textContent = 0;
    qntdConcluidas.textContent = 0;
  } else {
    semTarefasClass.style.display = 'none';
    tarefasClass.style.display = 'flex'
  }

  tarefas.forEach((tarefa) => {
    
    let liElement = document.createElement("li");
    listElement.appendChild(liElement);

    let checkboxElement = document.createElement("input")
    checkboxElement.type = "checkbox";
    checkboxElement.id = "checkbox";

    let pElement = document.createElement("p");
    let pText = document.createTextNode(tarefa.nome);
    pElement.appendChild(pText)
    
    let iElement = document.createElement("i");
    iElement.className = "ph ph-trash";

    checkboxElement.checked = tarefa.concluida;
    
    liElement.append(checkboxElement, pElement, iElement);
    
    checkboxElement.addEventListener('change', () => {
      tarefa.concluida = checkboxElement.checked;
      salvarDados();
      mostrarTarefas();
    })
    
  })

  const concluidas = tarefas.filter(t => t.concluida).length;
  qntdConcluidas.textContent = concluidas;


  qntdTarefas.textContent = tarefas.length;
}

mostrarTarefas();

function adicionarTarefa(event) {
  event.preventDefault();
  if(inputElement.value === '') {
    return false;
  } else if(tarefas.some(t => t.nome === inputElement.value)) {
    inputElement.value = "";
    inputElement.placeholder = "Já existe uma tarefa com esse nome!"
    inputElement.classList.add("placeholder-error")
  } else {
    tarefas.push({nome: inputElement.value, concluida: false});
    inputElement.value = '';
    mostrarTarefas();
    salvarDados();
  }
}

listElement.addEventListener("click", (event) => {
  if(event.target.classList.contains("ph-trash")) {
    const li = event.target.parentElement;
    const tarefaText = li.querySelector("p").textContent;
    let index = tarefas.findIndex(t => t.nome === tarefaText);
    if(index > -1) {
      tarefas.splice(index, 1)
    }
    mostrarTarefas();
    salvarDados();
  }
})

inputElement.addEventListener("input", () => {
  if(inputElement.classList.contains("placeholder-error")) {
    inputElement.classList.remove("placeholder-error");
    inputElement.placeholder = "Adicione uma nova tarefa";
  }
});

const formElement = document.getElementById("form");
formElement.addEventListener("submit", adicionarTarefa);

function salvarDados() {
  localStorage.setItem("@listaTarefas", JSON.stringify(tarefas));
}