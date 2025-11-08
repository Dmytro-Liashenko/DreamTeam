import { furnitureList } from "./Furniture-List-Section";

export function renderFurniture(items, clearList = false) {
  const html = items
    .map(({ _id, images, name, color, price }) => {
      const imageSrc = images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image';
      const colorDots = Array.isArray(color)
        ? color.map(c => `<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${c};margin:0 2px;"></span>`).join('')
        : '—';

      return `
        <li class="furniture-item" data-id="${_id}">
          <img src="${imageSrc}" alt="${name}" style="width: 310px; height: 256px; object-fit: cover; border-radius: 8px;" />
          <h3>${name}</h3>
          <p>Кольори: ${colorDots}</p>
          <p>Ціна: ${price} грн</p>
          <a href="/product/${_id}">Детальніше</a>
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
