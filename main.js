document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('myModal');
    const closeBtn = modal.querySelector('.close');
    const form = document.getElementById('myForm');
    const cardsContainer = document.querySelector('.cards');
  
    // Инициализация данных из localStorage при загрузке страницы
    const savedData = JSON.parse(localStorage.getItem('cardsData')) || [];
    savedData.forEach(data => {
      const newCard = createCard(data.name, data.profession);
      cardsContainer.appendChild(newCard);
    });
  
    openModalBtn.addEventListener('click', () => {
      form.reset(); // Сброс формы перед открытием модального окна
      modal.style.display = 'block';
    });
  
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    form.addEventListener('submit', event => {
      event.preventDefault();
      const nameInput = document.getElementById('nameInput').value;
      const professionInput = document.getElementById('professionInput').value;
  
      if (nameInput && professionInput) {
        const newCard = createCard(nameInput, professionInput);
        cardsContainer.appendChild(newCard);
  
        // Сохранение данных в localStorage
        const newData = { name: nameInput, profession: professionInput };
        savedData.push(newData);
        localStorage.setItem('cardsData', JSON.stringify(savedData));
  
        modal.style.display = 'none';
        form.reset();
      }
    });
  
    // Вспомогательная функция для создания карточки
    function createCard(name, profession) {
      const newCard = document.createElement('div');
      newCard.className = 'card';
      newCard.innerHTML = `
        <div class="image"></div>
        <p>${name}</p>
        <p class="prof">${profession}</p>
        <button class="edit-btn">Изменить</button>
        <button class="delete-btn">Удалить</button>
      `;
  
      // Обработчики событий для кнопок "Изменить" и "Удалить"
      const editBtn = newCard.querySelector('.edit-btn');
      editBtn.addEventListener('click', () => {
        const newName = prompt('Введите новое имя:', name);
        const newProfession = prompt('Введите новую профессию:', profession);
  
        if (newName !== null && newProfession !== null) {
          name = newName;
          profession = newProfession;
          updateCard(newCard, name, profession);
          updateLocalStorage();
        }
      });
  
      const deleteBtn = newCard.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => {
        cardsContainer.removeChild(newCard);
        deleteCardFromLocalStorage(name, profession);
      });
  
      return newCard;
    }
  
    // Обновление данных на карточке
    function updateCard(card, newName, newProfession) {
      card.querySelector('p').textContent = newName;
      card.querySelector('.prof').textContent = newProfession;
    }
  
    // Обновление данных в localStorage
    function updateLocalStorage() {
      const updatedData = Array.from(cardsContainer.children).map(card => ({
        name: card.querySelector('p').textContent,
        profession: card.querySelector('.prof').textContent
      }));
      localStorage.setItem('cardsData', JSON.stringify(updatedData));
    }
  
    // Удаление данных из localStorage
    function deleteCardFromLocalStorage(name, profession) {
      const newDataIndex = savedData.findIndex(item => item.name === name && item.profession === profession);
      if (newDataIndex !== -1) {
        savedData.splice(newDataIndex, 1);
        localStorage.setItem('cardsData', JSON.stringify(savedData));
      }
    }
  });
  

  