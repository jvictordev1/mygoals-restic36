import { v4 as uuidv4 } from "uuid";
import { Transaction } from "./Transaction";

export class Goal {
  // classe utilizada para instancias de metas
  id: string; // id da meta
  name: string; // nome da meta
  currentVal: number; // valor atual da meta
  goalVal: number; // valor objetivo da meta
  transactions: Transaction[]; // transações realizadas na meta
  constructor(name: string, currentVal: number, goalValue: number) {
    // construtor que inicializa a instancia com o nome, valor atual e valor objetivo
    this.id = uuidv4(); // atribui id à meta utilizando a biblioteca uuid
    this.name = name; // adiciona o nome da meta
    this.currentVal = currentVal; // adiciona o valor atual da meta
    this.goalVal = goalValue; // adicionar o valor objetivo da meta
    this.transactions = []; // inicializa o array de transações vazio
  }
}
