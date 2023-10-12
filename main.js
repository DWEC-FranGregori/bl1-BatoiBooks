import "./style.css";
import batoiLogo from "/logoBatoi.png";
import Books from "./src/model/books.class";
import Users from "./src/model/users.class";
import Modules from "./src/model/modules.class";

const books = new Books();
const modules = new Modules();
const users = new Users();

document.querySelector("#app").innerHTML = `
  <div>
    <a href="http://www.cipfpbatoi.es" target="_blank">
      <img src="${batoiLogo}" class="logo" alt="CIP FP Batoi" />
    </a>
    <p class="read-the-docs">
      Abre la consola (F12)
    </p>
  </div>
`;

function init() {
  books.populateData();
  modules.populateData();
  users.populateData();
}

init();
console.log(books);
console.log(modules);
console.log(users);

searches();

async function searches() {
  console.log(await users.getUserById(3));

  console.log("TAREAS");
  console.log(await books.booksFromUser(4));
  const booksFromModule5021 = await books.booksFromModule("5021");
  console.log(await booksFromModule5021.booksWithStatus("good"));
  const booksFromModule5025 = await books.booksFromModule("5025");
  console.log(await booksFromModule5025.incrementPriceOfbooks(0.1));
}
