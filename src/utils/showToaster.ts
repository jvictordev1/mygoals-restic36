export function showToaster(message: string, variant: string) {
  // função responsável pelo disparo e remoção de toasters da tela, recebendo a mensagem e a variante do toaster
  const toastBox = document.getElementById("toast-box"); // busca a região em tela responsável pala localização dos toasters
  const toast = document.createElement("div"); // cria uma nova div
  toast.classList.add("toast"); // adiciona a classe toast à div
  toast.classList.add(variant); // adiciona a variante do toaster à div
  toast.innerHTML = message; // popula a div com a mensagem do toaster
  toastBox?.appendChild(toast); // coloca o toaster como filho da região em tela responsável pela localização dos toasters (para que sejam mostrados um em cima do outro)
  setTimeout(() => {
    toast.remove();
  }, 4000); // remove o toaster da tela após 4 seg
}
