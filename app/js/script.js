function getCheckedCheckboxes() {
  return document.getElementById("coworkers")
    .querySelectorAll('input[type="checkbox"]:checked')
}

function getCheckedCheckboxesAmount() {
  return getCheckedCheckboxes().length
}

function isRowChecked(item) {
  return item.parentNode.querySelectorAll('input[type="checkbox"]:checked').length === 1
}

function storageCoWorkers() {
  const coWorkers = document.getElementById("coworkers")
    .querySelectorAll('.coworker-item')
  const checkedWorkers = []
  coWorkers.forEach(function(item) {
    if (isRowChecked(item)) {
      checkedWorkers.push({
        name: item.innerText,
        address: item.getAttribute("data-address")
      })
    }
  })
  const dataStorage = {
    data: checkedWorkers
  }
  localStorage.setItem('workers', JSON.stringify(dataStorage))
}

function checkCoWorkers() {
  const checkboxes = getCheckedCheckboxes()
  const checkedWorkers = [];
  checkboxes.forEach(function(checkbox) {
    if (checkedWorkers.length >= 3) {
      alert('Voce atingiu a capacidade maxima de escolhas.')
      checkbox.checked = false
      return
    }
    if (checkbox.value === 'on') {
      checkedWorkers.push(checkbox.value);
    }
  })
  storageCoWorkers()
}

function goToMap() {
  const totalChecked = getCheckedCheckboxesAmount()
  if (totalChecked <= 0) {
    alert('Por favor selecione os colegas de trabalho antes de continuar.')
    return
  }
  window.location.href = "mapa.html"
}

document.addEventListener("DOMContentLoaded", function() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', checkCoWorkers)
  })
  const goMapButton = document.getElementById('gomap')
  goMapButton.addEventListener('click', goToMap)
})
