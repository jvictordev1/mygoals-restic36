import { v4 as uuidv4 } from "uuid";
export class Transaction {
  // classe criada para instancias de transações
  id: string; // id da transação
  value: number; //valor da transação
  date: string; // data da transação
  type: string; // tipo da transação, que pode ser depósito (deposit) ou saque (withdraw)
  constructor(value: number, type: string) {
    // construtor que inicializa o objeto com o valor e tipo da transação
    this.id = uuidv4(); // atribui id da transação usando biblioteca uuid
    this.value = value; // atribui valor da transação
    this.date = new Date().toLocaleDateString(); // atribui a data da transação (data local do sistema no formato local)
    this.type = type; // atribui o tipo da transação
  }
}
