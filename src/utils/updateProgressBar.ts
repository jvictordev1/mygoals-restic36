import { Goal } from "../classes/Goal";

export function updateProgressBar(goal: Goal) {
  // função utilizada para atualizar o progresso da barra de progresso, recebendo como parâmetro a meta
  const value = Math.ceil((goal.currentVal / goal.goalVal) * 100); // obtem-se o valor, em %, da meta
  return `
      <div class="progress-done" style="width: ${value < 5 ? 0 : value}%;">
        ${
          value <= 0 || value < 5
            ? ""
            : `${Math.ceil((goal.currentVal / goal.goalVal) * 100)}%`
        }
      </div>
    `; // retorna o novo valor da progress bar
}
