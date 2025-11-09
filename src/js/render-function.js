export function renderCategories(categories) {
  const container = document.querySelector('.categories-list');
  container.innerHTML = categories
    .map(
      cat =>
        `<button class="category-btn" data-category="${cat.slug}">${cat.name}</button>`
    )
    .join('');
}

export function renderFurniture(items) {
  const list = document.querySelector('.furniture-list');

  const markup = items
    .map(
      ({ id, image, name, color, price }) => `
      <li class="furniture-card">
        <img src="${image}" alt="${name}" />
        <h3>${name}</h3>
        <p>Колір: ${color}</p>
        <p>Ціна: ${price} ₴</p>
        <button class="details-btn" data-id="${id}">Детальніше</button>
      </li>`
    )
    .join('');
  list.insertAdjacentHTML('beforeend', markup);
}

export function clearFurniture() {
  document.querySelector('.furniture-list').innerHTML = '';
}

// frame for categories
