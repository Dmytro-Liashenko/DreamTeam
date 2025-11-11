import { colorMarkup } from './Furniture-Details-Modal';
import { furnitureList } from './Furniture-List-Section';

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
            <p class="furniture-item-color">${colorMarkup(color)}</p>
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

// frame for categories
