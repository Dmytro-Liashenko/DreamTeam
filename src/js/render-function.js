import { furnitureList } from './Furniture-List-Section';
import { getCategory } from './products-api';

const categoriesList = document.getElementById('categories-list-item');

// export function renderFurniture(items, clearList = false) {
//   const html = items
//     .map(({ _id, images, name, color, price }) => {
//       const imageSrc =
//         images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image';

//       return `
//               <li class="furniture-item">
//           <div class="furniture-img">
//             <img class="furniture-item-img" src="${imageSrc}" alt="${name}" style="width: 310px; height: 256px; object-fit: cover; border-radius: 8px;" />
//           </div>
//           <div class="furniture-information">
//             <h3 class="furniture-item-name">${name}</h3>
//             <p class="furniture-item-color">${colorMarkup(color)}</p>
//             <p class="furniture-item-price">${price} грн</p>
//             <button type="button" class="item-btn" data-id="${_id}">Детальніше</button>
//           </div>
//         </li>
//       `;
//     })
//     .join('');

//   if (clearList) {
//     furnitureList.innerHTML = html;
//   } else {
//     furnitureList.insertAdjacentHTML('beforeend', html);
//   }
// }

export const colorIndicatorMarkup = color => {
  return Array.isArray(color)
    ? color
        .map(c => {
          const colorCode = c.hex || c;
          const isWhite =
            colorCode.toLowerCase() === '#fff' ||
            colorCode.toLowerCase() === 'white' ||
            colorCode.toLowerCase() === '#ffffff';

          const defaultClass = isWhite
            ? 'color-indicator color-indicator-white'
            : 'color-indicator';

          return `
            <span 
              class="${defaultClass}" 
              style="
                display:inline-block;
                width:24px;
                height:24px;
                background:${colorCode};
                border-radius:50%;
                margin-right:8px;
                border: 1px solid ${isWhite ? '#ccc' : 'transparent'};
              "
            ></span>`;
        })
        .join('')
    : `<span class="product-color-item">—</span>`;
};

export function renderFurniture(items, clearList = false) {
  const html = items
    .map(({ _id, images, name, color, price }) => {
      const originalSrc =
        images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image';

      const optimizedSrc = originalSrc.startsWith('https://')
        ? `https://images.weserv.nl/?url=${originalSrc.slice(
            8
          )}&w=310&h=256&fit=cover&output=webp&q=80`
        : originalSrc;

      return `
        <li class="furniture-item">
          <div class="furniture-img">
            <img
              class="furniture-item-img"
              src="${optimizedSrc}"
              alt="${name}"
              loading="lazy"
              width="310"
              height="256"
              style="object-fit: cover; border-radius: 8px;"
            />
          </div>
          <div class="furniture-information">
            <h3 class="furniture-item-name">${name}</h3>
            <p class="furniture-item-color">${colorIndicatorMarkup(color)}</p>
            <p class="furniture-item-price">${price} грн</p>
            <button type="button" class="item-btn" data-id="${_id}">
              Детальніше
            </button>
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
      'Шафи та системи зберігання',
      'Ліжка та матраци',
      'Столи',
      'Стільці та табурети',
      'Кухні',
      'Меблі для дитячої',
      'Меблі для офісу',
      'Меблі для передпокою',
      'Меблі для ванної кімнати',
      'Садові та вуличні меблі',
      'Декор та аксесуари',
    ];

    const sortedCategories = order
      .map(name => categories.find(c => c.name === name))
      .filter(Boolean);

    const items = document.querySelectorAll('.categories-item');

    sortedCategories.forEach((category, index) => {
      const item = items[index + 1];
      if (!item) return;

      const textEl = item.querySelector('.img-categories-text');
      if (textEl) textEl.textContent = category.name;

      item.dataset.categoryId = category._id;
    });
  } catch (error) {
    console.error('Помилка при завантаженні категорій:', error);
  }
}

fillCategoryText();
