/**
 * Tiny DOM helper (kept as JS; no TS generics).
 * @param {string} selector
 * @returns {HTMLElement|null}
 */
const $ = (selector) => document.querySelector(selector);

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
 * Send a toast message via `<x-toast-container>`.
 * @param {string} message
 * @param {number} duration
 * @param {"success"|"error"} variant
 */
function toast(message, duration, variant) {
  const container = /** @type {any} */ ($("x-toast-container"));
  if (!container || typeof container.add_toast !== "function") return;
  container.add_toast(message, duration, variant);
}

export { $, toast };
