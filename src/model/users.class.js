import User from "./user.class";

export default class Users {
  constructor() {
    this.data = [];
  }

  getUserById(id) {
    return this.data.find((item) => item.id === id) || {};
  }

  populateData(payload) {
    this.data = payload.map(
      (item) => new User(item.id, item.email, item.nick, item.password)
    );
  }

  addItem(payload) {
    const newUser = new User(
      getNextId(this.data),
      payload.email,
      payload.nick,
      payload.password
    );
    this.data.push(newUser);
    return newUser;
  }

  removeItem(id) {
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
