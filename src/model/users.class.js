import User from "./user.class";
import {
  addUser,
  getAllUsers,
  getUserById,
  removeUser,
} from "../repositories/users.repositories";

export default class Users {
  constructor() {
    this.data = [];
  }

  async getUserById(id) {
    await getUserById(id);
    return this.data.find((item) => item.id === id) || {};
  }

  async populateData() {
    this.data = await getAllUsers();
  }

  async addItem(payload) {
    await addUser(payload);
    const newUser = new User(
      getNextId(this.data),
      payload.email,
      payload.nick,
      payload.password
    );
    this.data.push(newUser);
    return newUser;
  }

  async removeItem(id) {
    await removeUser(id);
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      throw "No existe un usuario con id " + id;
    }
    this.data.splice(index, 1);
    return {};
  }

  toString() {
    let usersToString = `Usuarios (total ${this.data.length})`;
    this.data.forEach(
      (item) =>
        (usersToString += `
    - ${item}`)
    );
    return usersToString;
  }

  getUserByNick(nick) {
    return this.data.find((item) => item.nick === nick) || {};
  }
}

function getNextId(data) {
  return data.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;
}
