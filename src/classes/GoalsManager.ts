import { onDialogOpen } from "../utils/onDialogOpen";
import { updateProgressBar } from "../utils/updateProgressBar";
import { Goal } from "./Goal";
import { Transaction } from "./Transaction";

export class GoalsManager {
  // classe utilizada para gerenciar todas as atividades referentes às metas registradas pelo usuário
  goalList: Goal[]; // lista de metas atuais
  updatedListLength: number; // número referente à quantidade de metas atuais
  constructor() {
    // construtor utilizado para inicializar a classe
    this.goalList = [];
    this.updatedListLength = 0;
    const goals = localStorage.getItem("goals");
    if (goals && goals.length > 0) {
      // verificação utilizada para buscar, se houver, as tarefas armazenadas em local storage
      this.goalList = JSON.parse(goals); // converte a lista de metas em local storage de string para json e armazena na lista de metas
      window.onload = () => this.updateList(); // quando a página carregar chama o método updateList para mostrar as metas na lista
    }
  }
  addGoal(goal: Goal) {
    // método utilizado para adicionar uma nova meta à lista, recebendo como parâmetro a própria meta
    this.goalList.push(goal); // coloca a meta no final do array de metas
    this.updateList(); // atualiza a lista de metas
    this.updateLocalStorage(); // atualiza o armazenamento em localStorage através do método updateLocalStorage
  }
  updateLocalStorage() {
    // método utilizado para fazer a atualização dos itens em armazenamento local
    if (this.goalList.length) {
      // caso minha lista tenha metas, eu atualizo o local storage colocando o array de metas no mesmo
      localStorage.setItem("goals", JSON.stringify(this.goalList)); // conversão de JSON para string para armazenar em local storage
      return;
    }
    localStorage.clear(); // caso não haja metas no meu array, simplesmente limpo o local storage
  }
  updateGoalData(goalId: string, newGoalData: Goal) {
    // método utilizado para atualizar as informações de uma dada meta tanto no dialog quanto no seu card
    const dialog = document.querySelector("dialog[open='']"); // obtem-se o dialog aberto
    const goalDataInfo = dialog?.querySelector("#goal-data-info"); // busca-se o elemento que contém as informações da meta dentro do dialog
    const dialogGoalProgressBar = dialog?.querySelector(".progress-bar"); // busca-se a progress bar dentro do dialog
    const goal = document.getElementById(goalId); // encontra o card que contem a meta dentro da lista de metas
    const goalCardProgressBar = goal?.querySelector(".progress-bar"); // obtem a progress bar dentro do card da meta
    const goalItemValues = goal?.querySelector(".goal-item-price"); // obtem o elemento que contem os valores da meta dentro do card

    goalDataInfo!.innerHTML = `
      <h1 name="${goalId}">${newGoalData?.name}</h1>
      <h4>R$ ${newGoalData?.currentVal.toFixed(
        2
      )} de R$ ${newGoalData?.goalVal.toFixed(2)}</h4>
      `; // atualiza-se os valores da meta dentro do dialog
    goalItemValues!.innerHTML = `
      <h4>R$ ${newGoalData.currentVal.toFixed(2)}</h4>
      <p>de R$ ${newGoalData.goalVal.toFixed(2)}</p>
      `; // atualiza-se os valores da meta dentro do card na lista de metas
    dialogGoalProgressBar!.innerHTML = updateProgressBar(newGoalData); // atualiza-se a progress bar dentro do dialog
    goalCardProgressBar!.innerHTML = updateProgressBar(newGoalData); // atualiza-se a progress bar dentro do card na lista de metas
  }
  addNewTransaction(goalId: string, transaction: Transaction) {
    // método utilizado para realizar a adição de uma nova transação numa meta
    const transactionsList = document.getElementById("transactions-list"); // obtem-se o elemento que engloba todas as transações
    const li = document.createElement("li"); // cria-se um novo elemento li para a nova transação
    li.setAttribute("id", transaction.id); // atribui o id da transação ao elemento li
    li.classList.add("transaction-item"); // adiciona a classe transaction-item para o elemento li
    li.innerHTML = `
          <h1 class="${
            transaction.type === "deposit" ? "deposit" : "withdraw"
          }">R$
          ${
            transaction.type === "deposit" ? "+" : "-"
          } ${transaction.value.toFixed(2)}</h1>
          <p class="transaction-item-date">${transaction.date}</p>
      `; // popula-se o elemento li com as informações referentes à transação, como seu tipo, valores e data
    transactionsList?.appendChild(li); // adiciona a nova transação a lista de transações
    this.goalList.find((goal) => {
      if (goal.id === goalId) {
        goal.transactions.push(transaction);
        transaction.type === "deposit"
          ? (goal.currentVal += transaction.value)
          : (goal.currentVal -= transaction.value);
        this.updateGoalData(goalId, goal);
      }
    }); // encontra-se a meta para adicionar a nova transação ao seu array de transações
    this.updateLocalStorage(); // atualiza o local storage
  }
  removeGoal(removeGoalId: string) {
    // método utilizado para remover uma meta
    const listItem = document.getElementById(removeGoalId); // encontra-se o card da meta a ser removida
    this.goalList = this.goalList.filter((goal) => goal.id !== removeGoalId); // filtra-se a lista de metas a fim de remover a meta escolhida
    this.updatedListLength = this.goalList.length; // atualiza-se o tamanho da lista de metas
    listItem!.remove(); // remove-se o nó da meta do DOM
    this.updateLocalStorage(); // atualiza o local storage
  }
  updateList() {
    // método utilizado para recarregar toda a lista de metas
    const goalDataDialog = <HTMLDialogElement>(
      document.getElementById("goal-data-dialog")
    ); // encontra-se o elemento goal-data-dialog
    if (this.updatedListLength !== this.goalList.length) {
      // verifica se a quantidade de itens na lista de metas da classe é diferente da quantidade de itens na lista mais atualizada e, se for, adiciona somente as novas metas
      const list = document.getElementById("goals-list"); // busca o elemento da lista de metas
      const newGoals: Goal[] = this.goalList.slice(
        this.updatedListLength,
        this.goalList.length
      ); // separa as novas metas (as que ainda não estão na tela) daquelas que estão, para somente renderizar as mesmas, evitando renderizações completas da lista sem motivo
      newGoals.forEach((goal) => {
        // pra cada nova meta, executa este bloco
        const li = document.createElement("li"); // cria-se um novo elemento li
        li.setAttribute("id", goal.id); // atribui-se o id da meta para o elemento li
        li.innerHTML = `
          <button class="goal-button" id="goal-button">
                <div class="goal-item-heading">
                  <h1>${goal.name}</h1>
                  <div class="goal-item-price">
                    <h4>R$ ${goal.currentVal.toFixed(2)}</h4>
                    <p>de R$ ${goal.goalVal.toFixed(2)}</p>
                  </div>
                </div>
                <div class="progress-bar">
                  ${updateProgressBar(goal)}
                </div>
              </button>
          `; // popula-se o elemento li com as informações da meta
        li.addEventListener("click", () => onDialogOpen(goalDataDialog, goal)); // adiciona o evento de click no card para abrir o dialog
        list!.appendChild(li); // adiciona o card a lista de metas
      });
      this.updatedListLength = this.goalList.length; // atualiza o número de metas mais atual
    } else {
      // código acionado caso a lista ja esteja totalmente atualizada
      return;
    }
  }
}
