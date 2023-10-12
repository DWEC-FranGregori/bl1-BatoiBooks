import Book from "./book.class";

import BooksRepository from "../repositories/books.repositories";
const repository = new BooksRepository();

const NOTES = "Apunts";

export default class Books {
  constructor() {
    this.data = [];
  }

  async getBookById(id) {
    await repository.getBookById(id);
    return this.data.find((item) => item.id === id) || {};
  }

  async populateData() {
    this.data = await repository.getAllBooks();
  }

  async addItem(payload) {
    await repository.addBook(payload);
    payload.id = getNextId(this.data);
    const newBook = new Book(payload);
    this.data.push(newBook);
    return newBook;
  }

  async removeItem(id) {
    await repository.removeBook(id);
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      throw "No existe un libro con id " + id;
    }
    this.data.splice(index, 1);
    return {};
  }

  toString() {
    let booksToString = `Libros (total ${this.data.length})`;
    this.data.forEach(
      (item) =>
        (booksToString += `
    - ${item}`)
    );
    return booksToString;
  }

  async booksFromUser(userId) {
    await repository.getBooksFromUser(userId);
    const filteredBooks = new Books();
    filteredBooks.data = this.data.filter((item) => item.idUser === userId);
    return filteredBooks;
  }

  async booksFromModule(moduleId) {
    await repository.getBooksFromModule(moduleId);
    const filteredBooks = new Books();
    filteredBooks.data = this.data.filter((item) => item.idModule === moduleId);
    return filteredBooks;
  }

  booksCheeperThan(price) {
    const filteredBooks = new Books();
    filteredBooks.data = this.data.filter((item) => item.price <= price);
    return filteredBooks;
  }

  async booksWithStatus(status) {
    await repository.getBooksWithStatus(status);
    const filteredBooks = new Books();
    filteredBooks.data = this.data.filter((item) => item.status === status);
    return filteredBooks;
  }

  averagePriceOfBooks() {
    const sum = this.data.reduce((total, item) => total + item.price, 0);
    return this.data.length
      ? (sum / this.data.length).toFixed(2) + " €"
      : "0 €";
  }

  booksOfTypeNote() {
    const filteredBooks = new Books();
    filteredBooks.data = this.data.filter((item) => item.publisher === NOTES);
    return filteredBooks;
  }

  booksNotOfTypeNote() {
    const filteredBooks = new Books();
    filteredBooks.data = this.data.filter((item) => item.publisher !== NOTES);
    return filteredBooks;
  }

  booksNotSold() {
    const filteredBooks = new Books();
    filteredBooks.data = this.data.filter((item) => !item.soldDate);
    return filteredBooks;
  }

  async incrementPriceOfbooks(increment) {
    await repository.incrementPriceOfBooks(increment);
    return this.data.map((item) => {
      item.price = item.price + item.price * increment;
      return item;
    });
  }
}

function getNextId(data) {
  return data.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;
}
