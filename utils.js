export function clearElement(element) {
  while (element.firstChild) {
    element.firstChild.remove();
  }
}

export function createTypeBox(typeName) {
  const typeBox = document.createElement("span");
  typeBox.innerText = typeName.toUpperCase();
  typeBox.classList.add("type-box", typeName); // Add styling classes
  return typeBox;
}
