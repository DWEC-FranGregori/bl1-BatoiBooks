"use strict";

const SERVER = import.meta.env.VITE_URL_API;

async function getAllBooks() {
  const response = await fetch(SERVER + "/books");
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function getBookById(id) {
  const response = await fetch(SERVER + `/books/${id}`);
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function addBook(book) {
  const response = await fetch(SERVER + "/books", {
    method: "POST",
    body: JSON.stringify(book),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function removeBook(id) {
  const response = await fetch(SERVER + `/books/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function changeBook(book, newBook) {
  const response = await fetch(SERVER + `/books/${book.id}`, {
    method: "PUT", // or 'PATCH'
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBook),
  });
  return response.json();
}

async function incrementPriceOfBooks(price) {
  const response = await fetch(SERVER + `/books`, {
    method: "PATCH", // or 'PUT'
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(price),
  });
  return response.json();
}

async function updatePriceOfBook(id, price) {
  const response = await fetch(SERVER + `/books/${id}`, {
    method: "PATCH", // or 'PUT'
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(price),
  });
  return response.json();
}

export {
  getAllBooks,
  getBookById,
  addBook,
  removeBook,
  changeBook,
  incrementPriceOfBooks,
  updatePriceOfBook,
};
