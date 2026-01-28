import { fuse } from "../state/store";


/**
 * @param {string} selector
 * @returns {HTMLElement|null}
 */
export const $ = (selector) => document.querySelector(selector);
/**
 * @typedef {Object} RowData
 * @property {number} id
 * @property {string} fn
 * @property {string} ln
 * @property {string} email
 * @property {string|number} tel
 * @property {string} reason
 * @property {string} date
 */

/**
 * @param {string} message
 * @param {number} duration
 * @param {"success"|"error"} variant
 */
export function toast(message, duration, variant) {
  const container = /** @type {any} */ ($("x-toast-container"));
  if (!container || typeof container.add_toast !== "function") return;
  container.add_toast(message, duration, variant);
}

/** I hate ts 💔
 * @param {Function} callback
 * @param {number} delay
 */
export function debounce(callback , delay){
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(this, args), delay);
  };
}

/**
 * @param {string} query
*/
export function query_rows(query){
  const matches =  fuse.search(query)
  let data = {
    rows:[],
    matches:[]
  }
  matches.forEach((m)=>{
    data.rows.push(m.item)
    data.matches.push(m.matches)
  })
  return data
}

