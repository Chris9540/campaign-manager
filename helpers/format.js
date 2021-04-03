'use strict'

export function formatUser (type) {
  /**
   * @type {Function}
   * @param {String} value - An objects status
   * @param {String} propType - The property type thats passed into formatters
   * @param {Object} item - The item the formatter is working on
   * @return {String}
   * @description Returns a simple string to containing the users first name
   * and the users last name seperated by a space
   */
  return function execFormatUser (value, key, row) {
    try {
      return row[type].name
    } catch (ex) {
      return '';
    }
  };
}

export function formatPlayers (type) {
  /**
   * @type {Function}
   * @param {String} value - An objects status
   * @param {String} propType - The property type thats passed into formatters
   * @param {Object} item - The item the formatter is working on
   * @return {String}
   * @description Returns a simple string to containing the users first name
   * and the users last name seperated by a space
   */
  return function execFormatPlayers (value, key, row) {
    try {
      const names = []
      row[type].forEach(p=>{
        names.push(`${p.name} [${p['campaign-roles'].role}]`)
      })
      return names.join(', ')
    } catch (ex) {
      return '';
    }
  };
}


export default {
  formatUser,
}