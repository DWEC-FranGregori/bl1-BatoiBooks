"use strict";

const SERVER = import.meta.env.VITE_URL_API;

async function getAllUsers() {
  const response = await fetch(SERVER + "/users");
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function getUserById(id) {
  const response = await fetch(SERVER + `/users/${id}`);
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function addUser(user) {
  const response = await fetch(SERVER + "/users", {
    method: "POST",
    body: JSON.stringify(user),
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

async function removeUser(id) {
  const response = await fetch(SERVER + `/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function changeUser(user, newUser) {
  const response = await fetch(SERVER + `/users/${user.id}`, {
    method: "PUT", // or 'PATCH'
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  return response.json();
}

async function updateUserPassword(id, password) {
  const response = await fetch(SERVER + `/users/${id}`, {
    method: "PATCH", // or 'PUT'
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(password),
  });
  return response.json();
}

export {
  getAllUsers,
  getUserById,
  addUser,
  removeUser,
  changeUser,
  updateUserPassword,
};
