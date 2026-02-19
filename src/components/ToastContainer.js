import { html } from "lit";
import XElement from "../lib/XElement";
import { define } from "../lib";
import { repeat } from "lit/directives/repeat.js";

export default class ToastContainer extends XElement {
  static properties = {
    toasts: { state: true },
  };
  constructor() {
    super()
    this.toasts = []
  }
  toastId = 0;
  add_toast(message, duration, variant) {
    const id = this.toastId++;
    this.toasts = [...this.toasts, { id, message, variant }];
    setTimeout(() => this.remove_toast(id), duration);
  }
  remove_toast(id) {
    const toastElement = this.querySelector(`#toast-${id}`);
    if (toastElement) {
      toastElement.classList.remove("toast-fly-in");
      toastElement.classList.add("toast-fly-out");
      setTimeout(() => {
        (toastElement).style.display = "none"
        this.toasts = this.toasts.filter((toast) => toast.id !== id);
      }, 500);
    }
  }
  render() {
    return html`
      <div
        id="toast-container"
        class="fixed  px-4 w-screen h-screen flex items-center flex-col   z-9999 pointer-events-none"
      >
      ${repeat(
      this.toasts,
      (toast) => toast.od,
      ({ id, message, variant }) => {
        return html`
            <div
            id=toast-${id}
            class="
            w-full lg:w-1/4 flex justify-between text-secondary relative rounded-(--radius) mb-2  top-2 py-3 px-3 toast-fly-in
            ${variant === "success" ? "bg-primary" : "bg-destructive"}
            "
            >
            <span>${message}</span>
            <span>
                <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM12 20.7188C7.18594 20.7188 3.28125 16.8141 3.28125 12C3.28125 7.18594 7.18594 3.28125 12 3.28125C16.8141 3.28125 20.7188 7.18594 20.7188 12C20.7188 16.8141 16.8141 20.7188 12 20.7188Z"
                    fill="#F0E9E0"
                  />
                  <path
                  d="M10.875 7.875C10.875 8.17337 10.9935 8.45952 11.2045 8.6705C11.4155 8.88147 11.7016 9 12 9C12.2984 9 12.5845 8.88147 12.7955 8.6705C13.0065 8.45952 13.125 8.17337 13.125 7.875C13.125 7.57663 13.0065 7.29048 12.7955 7.0795C12.5845 6.86853 12.2984 6.75 12 6.75C11.7016 6.75 11.4155 6.86853 11.2045 7.0795C10.9935 7.29048 10.875 7.57663 10.875 7.875ZM12.5625 10.5H11.4375C11.3344 10.5 11.25 10.5844 11.25 10.6875V17.0625C11.25 17.1656 11.3344 17.25 11.4375 17.25H12.5625C12.6656 17.25 12.75 17.1656 12.75 17.0625V10.6875C12.75 10.5844 12.6656 10.5 12.5625 10.5Z"
                  fill="#F0E9E0"
                  />
                </svg>
              </span>
            </div>
          `
      }
    )}
    </div>
   `
  }
}

define('x-toast-container', ToastContainer)
export { ToastContainer };
