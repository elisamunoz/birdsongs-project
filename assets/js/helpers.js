function renderBirdFileRow(title, value = "--") {
  if (!title) {
    return "";
  }

  return `
      <tr>
          <td class="bold-text">${title}:</td>
          <td>${value}</td>
      </tr>
    `;
}
