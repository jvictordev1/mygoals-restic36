import { Goal } from "../classes/Goal";
import { updateProgressBar } from "./updateProgressBar";

export function onDialogOpen(dialog: HTMLDialogElement, goalData?: Goal) {
  // função utilizada ao abrir novos dialogs na tela,
  // recebe o elemento do dialog a ser aberto e, opcionalmente,
  // os dados a serem preenchidos no dialog (para o caso do dialog de informações da meta)
  const closeButton = dialog.querySelector("#close-dialog-button"); // busca o botão de fechar o dialog
  const transactionList = document.querySelector("#transactions-list"); // busca a lista de transações dentro do dialog
  closeButton!.addEventListener("click", () => {
    transactionList!.innerHTML = "";
    dialog.close();
  }); // adiciona o evento de fechar o dialog ao clicar no botão de fechar e limpa a lista de transações ao fecha-lo
  dialog.showModal(); // mostra o dialog em tela
  if (goalData) {
    // se os dados para preencher o dialog foram passados à função, executa o trecho de código abaixo
    dialog.setAttribute("name", goalData.id); // seta o atributo name do dialog para o id da meta (para fins de identificação de qual meta esta sendo mostrada)
    const goalDataInfo = document.querySelector("#goal-data-info"); // busca o elemento responsável pelas informações da meta dentro do dialog
    const progressBar = document.querySelector(".progress-bar"); // busca o elemento da progress bar no dialog
    progressBar!.innerHTML = updateProgressBar(goalData); // atualiza a progress bar do dialog
    goalDataInfo!.innerHTML = `
    <h1 name="${goalData.id}">${goalData?.name}</h1>
    <h4>R$ ${goalData?.currentVal.toFixed(2)} de R$ ${goalData?.goalVal.toFixed(
      2
    )}</h4>
  `; // atualiza as informações da meta dentro do dialog
    if (goalData.transactions.length > 0) {
      // caso a meta possua uma ou mais transações, executa este bloco de código
      goalData.transactions.forEach((transaction) => {
        // para cada transação pertencente a meta, executa esse bloco de código
        const li = document.createElement("li"); // cria um novo elemento li
        li.setAttribute("id", transaction.id); // seta o atributo id do elemento li para o id da transação
        li.classList.add("transaction-item"); // adiciona a classe transaction-item ao elemento li
        li.innerHTML = `
            <h1 class="${
              transaction.type === "deposit" ? "deposit" : "withdraw"
            }">R$ ${
          transaction.type === "deposit" ? "+" : "-"
        } ${transaction.value.toFixed(2)}</h1>
            <p class="transaction-item-date">${transaction.date}</p>
        `; // atualiza-se o conteúdo da lista com as informações da transação
        transactionList?.appendChild(li); // coloca o elemento li como filho da lista de transações
      });
    }
  }
}
