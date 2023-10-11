"use strict";

const SERVER = import.meta.env.VITE_URL_API;

async function getAllModules() {
  const response = await fetch(SERVER + "/modules");
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function getBookByCode(code) {
  const reponse = await fetch(SERVER + `/modules/${code}`);
  if (!reponse.ok) {
    throw `Error ${reponse.status} de la BBDD: ${reponse.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function addModule(module) {
  const response = await fetch(SERVER + "/modules", {
    method: "POST",
    body: JSON.stringify(module),
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

async function removeModule(code) {
  const response = await fetch(SERVER + `/modules/${code}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function changeModue(module, newModule) {
  const response = await fetch(SERVER + `/modules/${module.code}`, {
    method: "PUT", // or 'PATCH'
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newModule),
  });
  return response.json();
}

export { getAllModules, getBookByCode, addModule, removeModule, changeModue };
