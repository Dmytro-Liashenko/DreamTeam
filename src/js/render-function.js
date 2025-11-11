
import { furnitureList } from "./Furniture-List-Section";
import { getCategory } from "./products-api";
import { colorMarkup } from './Furniture-Details-Modal';

const categoriesList = document.getElementById('categories-list-item');


export function renderFurniture(items, clearList = false) {
  const html = items
    .map(({ _id, images, name, color, price }) => {
      const imageSrc =
        images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image';

      return `
              <li class="furniture-item">
          <div class="furniture-img">
            <img class="furniture-item-img" src="${imageSrc}" alt="${name}" style="width: 310px; height: 256px; object-fit: cover; border-radius: 8px;" />
          </div>
          <div class="furniture-information">
            <h3 class="furniture-item-name">${name}</h3>
            <p class="furniture-item-color">${colorMarkup(color)}</p>
            <p class="furniture-item-price">${price} грн</p>
            <button type="button" class="item-btn" data-id="${_id}">Детальніше</button>
          </div>
        </li>
      `;
    })
    .join('');

  if (clearList) {
    furnitureList.innerHTML = html;
  } else {
    furnitureList.insertAdjacentHTML('beforeend', html);
  }
}

export function clearFurniture() {
  document.querySelector('.furniture-list').innerHTML = '';
}


async function fillCategoryText() {
  try {
    const categories = await getCategory(); 

    const order = [
      "М'які меблі",
      "Шафи та системи зберігання",
      "Ліжка та матраци",
      "Столи",
      "Стільці та табурети",
      "Кухні",
      "Меблі для дитячої",
      "Меблі для офісу",
      "Меблі для передпокою",
      "Меблі для ванної кімнати",
      "Садові та вуличні меблі",
      "Декор та аксесуари",
    ];

    const sortedCategories = order
      .map(name => categories.find(c => c.name === name))
      .filter(Boolean);

    const items = document.querySelectorAll(".categories-item");

    sortedCategories.forEach((category, index) => {
      const item = items[index + 1]; 
      if (!item) return;

      const textEl = item.querySelector(".img-categories-text");
      if (textEl) textEl.textContent = category.name;

      item.dataset.categoryId = category._id;
    });

  } catch (error) {
    console.error("Помилка при завантаженні категорій:", error);
  }
}

fillCategoryText();

