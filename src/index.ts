import { Goal } from "./classes/Goal";
import { GoalsManager } from "./classes/GoalsManager";
import { Transaction } from "./classes/Transaction";
import { onDialogOpen } from "./utils/onDialogOpen";
import { showToaster } from "./utils/showToaster";

const goalListManager = new GoalsManager(); // cria nova instância da classe responsável pelo manejo das metas
const newGoalButton = document.getElementById("new-goal-button"); // obtem o botão para adicionar nova meta
const newTransactionForm = document.getElementById("new-transaction-form"); // obtem o elemento de formulario para nova transação
const deleteGoalButton = document.getElementById("delete-goal-button"); // obtem o botão de deletar meta nos dialogs
const newGoalDialog = <HTMLDialogElement>(
  document.getElementById("new-goal-dialog")
); // obtem o dialog para adição de novas metas
const newGoalForm = document.getElementById("new-goal-form"); // obtem o elemento de formulario para adicionar nova meta

newGoalButton?.addEventListener("click", () => {
  // adiciona resposta a evento de click no botão de nova meta, disparando a abertura do dialog para adição de novas metas
  onDialogOpen(newGoalDialog);
});
newTransactionForm?.addEventListener("submit", (e) => {
  // adiciona resposta a evento de submit do formulário de nova transação
  e.preventDefault(); // previne comportamento default do submit
  const goalId = document
    .querySelector("dialog[open='']")
    ?.getAttribute("name"); // obtém id referente à meta sendo mostrada dentro do dialog
  const transactionType = document.querySelector(
    'input[name="transaction-type"]:checked'
  ) as HTMLInputElement; // obtem o tipo de transação selecionada pelo user
  const transactionValue = document.getElementById(
    "transaction-value"
  ) as HTMLInputElement; // obtém o valor da transação inputada pelo user
  const newTransaction = new Transaction(
    parseFloat(transactionValue.value),
    transactionType.value
  ); // cria uma nova instância de transação com as informações fornecidas pelo user
  goalId ? goalListManager.addNewTransaction(goalId, newTransaction) : null; // adiciona nova transação à lista de transações
  showToaster(
    `<span class="material-symbols-outlined">check_circle</span>Transação de ${
      transactionType.value === "deposit" ? "+" : "-"
    } R$ ${transactionValue.value} realizada com sucesso.`,
    "sucess"
  ); // dispara toaster de sucesso na operação
  transactionValue.value = ""; // limpa campo de valor da transação
});
newGoalForm?.addEventListener("submit", (e) => {
  // adiciona resposta a evento de submit do formulário de nova meta
  e.preventDefault(); // previne comportamento default do submit
  const goalNameInput = <HTMLInputElement>document.getElementById("goal-name"); // busca input de nome da meta
  const goalCurrValueInput = <HTMLInputElement>(
    document.getElementById("goal-current-value")
  ); // busca input do valor atual da meta
  const goalValueInput = <HTMLInputElement>(
    document.getElementById("goal-value")
  ); // busca input do valor objetivo da meta
  const newGoal = new Goal(
    goalNameInput.value,
    parseFloat(goalCurrValueInput.value),
    parseFloat(goalValueInput.value)
  ); // cria uma nova instância da meta
  goalListManager.addGoal(newGoal); // adiciona a nova meta à lista de metas
  goalNameInput.value = ""; // limpa os campos
  goalCurrValueInput.value = "";
  goalValueInput.value = "";
  showToaster(
    `<span class="material-symbols-outlined">check_circle</span>Meta cadastrada com sucesso`,
    "sucess"
  ); // dispara toaster de sucesso na operação
});
deleteGoalButton?.addEventListener("click", () => {
  // adiciona resposta a evento de clique do botão de remover uma meta
  const dialog = <HTMLDialogElement>document.querySelector("dialog[open='']"); // busca dialog correntemente aberto
  const goalId = dialog.getAttribute("name"); // busca valor do atributo name do dialog, ou seja, id da meta sendo mostrada
  goalListManager.removeGoal(goalId!); // remove a meta da lista de metas
  dialog?.close(); // fecha o dialog
  showToaster(
    `<span class="material-symbols-outlined">check_circle</span>Meta removida com sucesso`,
    "sucess"
  ); // dispara toaster de sucesso na operação
});
