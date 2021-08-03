function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    // Catch se for supor que pode dar errado
    .then((res) => res.json())
    .then((states) => {
      // esse state é uma variável criada agora
      for (const state of states) {
        ufSelect.innerHTML += `<option value= "${state.id}">${state.nome}</option>`;
      }
    });
}

populateUFs();

function getCities(event) {
  // Aqui ele ta selecionando a o select de nome city setado no create-point.html que é o campo das cidades que esta disabled
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
  citySelect.disabled = true;

  fetch(url)
    // Catch se for supor que pode dar errado
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value= "${city.nome}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
  // Esse click é um evento de quando for pressionado
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;
  itemLi.classList.toggle("selected");
  const itemId = event.target.dataset.id;
  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId;
    return itemFound;
  });
}
// acima adiciona os itens de coleta selecionados, abaixo remove
if (alreadySelected >= 0) {
  const filteredItems = selectedItems.filter((item) => {
    const itemIsDifferent = item != itemId;
    return itemIsDifferent;
  });
  selectedItems = filteredItems;
} else {
  selectedItems.push(itemId);
}

collectedItems.value = selectedItems;
