import Module from "./module.class";

import ModuleRepository from "../repositories/modules.repositories";
const repository = new ModuleRepository();

export default class Modules {
  constructor() {
    this.data = [];
  }

  async getModuleByCode(code) {
    await repository.getModuleByCode(code);
    return this.data.find((item) => item.code === code) || {};
  }

  async populateData() {
    this.data = await repository.getAllModules();
  }

  async addItem(payload) {
    await repository.addModule(payload);
    const newModule = new Module(
      payload.code,
      payload.cliteral,
      payload.vliteral,
      payload.idCourse
    );
    this.data.push(newModule);
    return newModule;
  }

  async removeItem(code) {
    await repository.removeModule(code);
    const index = this.data.findIndex((item) => item.code === code);
    if (index === -1) {
      throw "No existe un módulo con código " + code;
    }
    this.data.splice(index, 1);
    return {};
  }

  toString() {
    let modulesToString = `Módulos (total ${this.data.length})`;
    this.data.forEach(
      (item) =>
        (modulesToString += `
    - ${item}`)
    );
    return modulesToString;
  }
}
