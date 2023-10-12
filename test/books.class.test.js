import { describe, test, expect, beforeEach, vi } from "vitest";
import Books from "../src/model/books.class";
import Book from "../src/model/book.class";
import BooksRepository from "../src/repositories/books.repositories";
import data from "./fixtures/books.json";
import newBooks from "./fixtures/newBooks.json";

let id = 0;
vi.mock("../src/repositories/books.repositories");
BooksRepository.mockImplementation(() => {
  return {
    addBook: (item) => {
      item.id = ++id;
      return item;
    },
    getAllBooks: () => data,
    removeBook: (id) => {
      if (id === data[0].id || id === data[1].id || id === data[2].id)
        return {};
      return Promise.reject(new Error("empty"));
    },
    updatePriceOfBook: (item) => item,
  };
});

describe("Clase Books", () => {
  beforeEach(() => {
    id = 0;
    BooksRepository.mockClear();
  });

  test("Existe la clase Books", () => {
    expect(Books).toBeDefined();
  });

  test("constructor crea el array en la propiedad data", () => {
    const books = new Books();
    expect(books.data).toEqual([]);
  });

  test("addItem añade un nuevo libro", async () => {
    const books = new Books();
    const newBook = await books.addItem(newBooks[0]);
    expect(books.data.length).toBe(1);
    expect(newBook).toBeInstanceOf(Book);
    expect(newBook.id).toBe(1);
    for (let prop in newBooks[0]) {
      expect(newBook[prop]).toBe(newBooks[0][prop]);
    }
  });

  test("addItem asigna id consecutivas sin repetir", async () => {
    const books = new Books();
    let newBook = await books.addItem(newBooks[0]);
    expect(books.data.length).toBe(1);
    expect(newBook.id).toBe(1);
    newBook = await books.addItem(newBooks[1]);
    expect(books.data.length).toBe(2);
    expect(newBook.id).toBe(2);
  });

  test("populateData añade un array de libros", async () => {
    const books = new Books();
    await books.populateData();
    expect(books.data.length).toBe(3);
    for (let i in data) {
      expect(books.data[i]).toBeInstanceOf(Book);
      expect(books.data[i].id).toBe(data[i].id);
      for (let prop in data[i]) {
        expect(books.data[i][prop]).toBe(data[i][prop]);
      }
    }
  });
});

describe("Clase Books", () => {
  let books;
  beforeEach(() => {
    BooksRepository.mockClear();
    books = new Books();
    books.populateData();
  });

  test("removeItem elimina un libro si existe", async () => {
    const bookToRemove = await books.removeItem(data[1].id);
    expect(bookToRemove).toEqual({});
    expect(books.data.length).toBe(2);
    await books.removeItem(data[0].id);
    expect(books.data.length).toBe(1);
  });

  test("removeItem lanza una excepción si un libro no existe", () => {
    expect(() => books.removeItem(100)).rejects.toThrow();
    expect(books.data.length).toBe(3);
  });

  test("incrementPriceOfbooks incrementa el precio un 10% y lo guarda con 2 decimales", async () => {
    const oldPrices = books.data.map((book) => book.price);
    await books.incrementPriceOfbooks(0.1);
    books.data.every(
      (book, index) => book.price === Math.round(oldPrices[index] * 100) / 100
    );
  });

  test("toString pinta correctamente los libros", () => {
    expect(books.toString()).toBe(`Libros (total ${books.data.length})
    - ${data[0].idModule}. Editorial: ${data[0].publisher}. ${
      data[0].pages
    } páginas. ${data[0].price.toFixed(2)} €.
    - ${data[1].idModule}. Editorial: ${data[1].publisher}. ${
      data[1].pages
    } páginas. ${data[1].price.toFixed(2)} €.
    - ${data[2].idModule}. Editorial: ${data[2].publisher}. ${
      data[2].pages
    } páginas. ${data[2].price.toFixed(2)} €.`);
  });
});

describe("Clase Books", () => {
  let books;
  beforeEach(() => {
    BooksRepository.mockClear();
    books = new Books();
    books.populateData();
  });

  test("booksFromUser devuelve un objeto Books con los 2 libros del usuario 2", () => {
    const response = books.booksFromUser(2);
    expect(response).toBeInstanceOf(Books);
    expect(response.data.length).toBe(2);
    response.data.every((item) => expect(item.idUser).toBe(2));
  });

  test("booksFromUser devuelve un objeto Books vacío para el usuario 12", () => {
    const response = books.booksFromUser(12);
    expect(response).toBeInstanceOf(Books);
    expect(response.data).toEqual([]);
  });

  test("booksFromModule devuelve un objeto Books con los 2 libros del módulo ABCD", () => {
    const response = books.booksFromModule("ABCD");
    expect(response).toBeInstanceOf(Books);
    expect(response.data.length).toBe(2);
    for (let item of response.data) {
      expect(item.idModule).toBe("ABCD");
    }
  });

  test("booksFromModule devuelve un array vacío para el módulo ZZZZ", () => {
    const response = books.booksFromModule("ZZZZ");
    expect(response).toBeInstanceOf(Books);
    expect(response.data).toEqual([]);
  });

  test("booksCheeperThan devuelve un array con los 2 libros de 50 € o menos", () => {
    const response = books.booksCheeperThan(50);
    expect(response).toBeInstanceOf(Books);
    expect(response.data.length).toBe(2);
    for (let item of response.data) {
      expect(item.price).not.toBeGreaterThan(50);
    }
  });

  test("booksCheeperThan devuelve un array vacío para menos de 1 €", () => {
    const response = books.booksCheeperThan(1);
    expect(response).toBeInstanceOf(Books);
    expect(response.data).toEqual([]);
  });

  test("booksWithStatus devuelve un array con los 2 libros del estado bad", () => {
    const response = books.booksWithStatus("bad");
    expect(response).toBeInstanceOf(Books);
    expect(response.data.length).toBe(2);
    for (let item of response.data) {
      expect(item.status).toBe("bad");
    }
  });

  test("booksWithStatus devuelve un array vacío para el estado new", () => {
    const response = books.booksWithStatus("new");
    expect(response).toBeInstanceOf(Books);
    expect(response.data).toEqual([]);
  });

  test("averagePriceOfBooks devuelve 32.33 €", () => {
    const response = books.averagePriceOfBooks();
    expect(response).toBe("32.36 €");
  });

  test("booksOfTypeNote devuelve un array con el registro de apuntes", () => {
    const response = books.booksOfTypeNote();
    expect(response).toBeInstanceOf(Books);
    expect(response.data.length).toBe(1);
    expect(response.data[0].publisher).toBe("Apunts");
  });

  test("booksNotOfTypeNote devuelve un array con los 2 libro de editorial", () => {
    const response = books.booksNotOfTypeNote();
    expect(response).toBeInstanceOf(Books);
    expect(response.data.length).toBe(2);
    for (let item of response.data) {
      expect(item.phblisher).not.toBe("Apunts");
    }
  });
});
