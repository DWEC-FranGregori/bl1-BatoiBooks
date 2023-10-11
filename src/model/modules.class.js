import Module from "./module.class";
import {
  addModule,
  getAllModules,
  removeModule,
} from "../repositories/modules.repository";

export default class Modules {
  constructor() {
    this.data = [];
  }

  getModuleByCode(code) {
    return this.data.find((item) => item.code === code) || {};
  }

  async populateData() {
    this.data = await getAllModules();
  }

  async addItem(payload) {
    await addModule(payload);
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
    await removeModule(code);
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
