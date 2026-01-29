import { html } from "lit";
import XElement from "../lib/XElement";
import { store } from "../state/store";
import { ProxyStoreController } from "../controllers/store.controller";
import { toast } from "../utils";
import { delete_data_row } from "../services/localstorage";
import { define } from "../lib";
import { repeat } from "lit/directives/repeat.js";
import "../components/Card.js";
export default class Table extends XElement {
  store = new ProxyStoreController(this, store);

  get paginated_data() {
    const start = (store.state.current_page - 1) * store.state.rows_per_page;
    const end = start + store.state.rows_per_page;
    return store.state.rows.slice(start, end);
  }
  get total_pages() {
    return Math.ceil(store.state.rows.length / store.state.rows_per_page);
  }

  delete_row(id) {
    store.state.rows = store.state.rows.filter((row) => row.id !== id);
    if (store.state.current_page > this.total_pages) {
      store.state.current_page = 1;
    }
    delete_data_row(id);
    toast("item deleted successfully", 2000, "success");
  }
  render() {
    return html`
      <section id="requests">
        <div
          class="bg-card   ease-in-out rounded-(--radius) border border-border p-4"
        >
          <div
            class="hidden md:grid grid-cols-7 bg-accent text-sm font-medium *:py-3 *:px-4 rounded-(--radius)"
          >
            <div>Nom</div>
            <div>Prenom</div>
            <div>Motif</div>
            <div>Date</div>
            <div>Telephone</div>
            <div>Email</div>
            <div class="text-center">Action</div>
          </div>
          <div>
            ${this.paginated_data.length > 0
              ? repeat(
                  this.paginated_data,
                  (row) => row.id,
                  (row) => html`
                    <x-card
                      ln=${row.ln}
                      fn=${row.fn}
                      reason=${row.reason}
                      date=${row.date}
                      tel=${row.tel}
                      email=${row.email}
                      id=${row.id}
                      @delete_row=${() => this.delete_row(row.id)}
                    ></x-card>
                  `,
                )
              : html`
                  <p class="text-center text-lg py-12 text-foreground/50">
                    Rien ajouté pour le moment
                  </p>
                `}
          </div>
        </div>
      </section>
    `;
  }
}

define("x-table", Table);
