const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

let isLoading = false;
let offset = 5;

const getData = (api) => {
  const paginatedAPI = api + `?offset=${offset}&limit=10`;
  offset += 10;
  if (offset >= 205) {
  }
  isLoading = true;
  fetch(paginatedAPI)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map((product) => {
        console.log(product);
        return `
        <article class="Card">
        <img src="${product.images[0]}" />
          <h2>
          ${product.title}
          <small>$ ${product.price}</small>
          </h2>
          </article>`;
      });
      output = output.join("");
      let newItem = document.createElement("section");
      newItem.classList.add("Item");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      isLoading = false; // Indicar que la carga de datos ha terminado
    });
};

const loadData = () => {
  if (!isLoading) {
    getData(API);
  }
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: "100% 0px 0px 0px",
  }
);

intersectionObserver.observe($observe);
