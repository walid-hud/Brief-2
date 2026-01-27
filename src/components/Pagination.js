import { html } from "lit";
import XElement from "../utils/XElement";
import { ProxyStoreController } from "../controllers/store.controller";
import { store } from "../state/store";
import {define} from "../lib"

class Pagination extends XElement {
  store = new ProxyStoreController(this, store);

  get total_pages() {
    return Math.ceil(store.state.rows.length / store.state.rows_per_page);
  }

  _next() {
    if (store.state.current_page < this.total_pages) {
      store.state.current_page++;
    }
  }
  _prev() {
    if (store.state.current_page > 1) {
      store.state.current_page--;
    }
  }

  _go_to_page(page) {
    if (page >= 1 && page <= this.total_pages) {
      store.state.current_page = page;
    }
  }

  render() {
    const pages = Array.from({ length: this.total_pages }, (_, i) => i + 1);
    return html`
      <div class="w-full flex justify-center gap-x-2 mt-2 items-center  ">
        <button
          @click=${this._prev}
          ?disabled=${store.state.current_page === 1}
          class="px-3 py-2 rounded-(--radius) bg-input  hover:bg-input/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            width="12"
            height="20"
            viewBox="0 0 12 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0457 0.43918C11.3269 0.720471 11.4849 1.10193 11.4849 1.49968C11.4849 1.89743 11.3269 2.27889 11.0457 2.56018L3.62068 9.98518L11.0457 17.4102C11.3189 17.6931 11.4701 18.072 11.4667 18.4653C11.4633 18.8586 11.3055 19.2348 11.0274 19.5129C10.7493 19.791 10.3731 19.9488 9.97978 19.9522C9.58649 19.9556 9.20758 19.8044 8.92468 19.5312L0.43918 11.0457C0.157973 10.7644 0 10.3829 0 9.98518C0 9.58743 0.157973 9.20597 0.43918 8.92468L8.92468 0.43918C9.20597 0.157973 9.58743 0 9.98518 0C10.3829 0 10.7644 0.157973 11.0457 0.43918Z"
              class="fill-primary"
            />
          </svg>
        </button>

        <div class="flex gap-x-1">
          ${pages.map(
            (page) => html`
              <button
                @click=${() => this._go_to_page(page)}
                class="px-3 py-2 rounded-(--radius) ${store.state
                  .current_page === page
                  ? "bg-primary text-accent"
                  : "bg-input hover:bg-input/80"}"
              >
                ${page}
              </button>
            `,
          )}
        </div>

        <button
          @click=${this._next}
          ?disabled=${store.state.current_page === this.total_pages || this.total_pages === 0}
          class="px-3 py-2 rounded-(--radius) bg-input hover:bg-input/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          
          <svg
            class="rotate-180"
            width="12"
            height="20"
            viewBox="0 0 12 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0457 0.43918C11.3269 0.720471 11.4849 1.10193 11.4849 1.49968C11.4849 1.89743 11.3269 2.27889 11.0457 2.56018L3.62068 9.98518L11.0457 17.4102C11.3189 17.6931 11.4701 18.072 11.4667 18.4653C11.4633 18.8586 11.3055 19.2348 11.0274 19.5129C10.7493 19.791 10.3731 19.9488 9.97978 19.9522C9.58649 19.9556 9.20758 19.8044 8.92468 19.5312L0.43918 11.0457C0.157973 10.7644 0 10.3829 0 9.98518C0 9.58743 0.157973 9.20597 0.43918 8.92468L8.92468 0.43918C9.20597 0.157973 9.58743 0 9.98518 0C10.3829 0 10.7644 0.157973 11.0457 0.43918Z"
              class="fill-primary"
            />
          </svg>
        </button>
      </div>
    `;
  }
}
define("x-pagination" , Pagination)
export default Pagination;
