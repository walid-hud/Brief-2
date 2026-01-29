import { html } from "lit";
import XElement from "../lib/XElement";
import { animate } from "@lit-labs/motion";
import { store } from "../state/store";
import { save_data_row } from "../services/localstorage";
import { toast } from "../utils";
import { define } from "../lib";

class Form extends XElement {
  static properties = {
    is_opened: { state: true },
  };

  constructor() {
    super();
    this.is_opened = false;
  }

  get form() {
    return this.renderRoot?.querySelector("form");
  }

  _toggle() {
    this.is_opened = !this.is_opened;
  }
  _close() {
    this.is_opened = false;
    this.form.blur();
    this.form.querySelectorAll("input").forEach(e=>e.blur())
  }
  _on_escape(ev) {
    if (ev.key === "Escape") {
      this._close();
    }
  }

  _on_submit(ev) {
    ev.preventDefault();
    const data  = {
      id: Date.now(),
      date: (this.form.querySelector("#date")  ).value,
      fn: (this.form.querySelector("#fn")  ).value,
      ln: (this.form.querySelector("#ln")  ).value,
      email: (this.form.querySelector("#email")  ).value,
      tel: (this.form.querySelector("#tel")  ).value,
      reason: (this.form.querySelector("#reason")  ).value,
    }
    if (!this.form.checkValidity()) {
      this.form.reportValidity();
      return;
    }
    store.state.rows.unshift(data);
    save_data_row(data)
    toast("item added successfully" , 2000, "success" );
    this._close();
    this.form.reset();
  }

  _on_text_input_change(ev) {
    const input = ev.target  ;
    if (input.value.match(/\d+/g)) {
      input.setCustomValidity("Le message ne doit pas contenir de chiffre");
    } else {
      return input.setCustomValidity("");
    }
  }
  _on_tel_input_change(ev) {
    const input = ev.target  ;
    const value = input.value;

    const onlyDigits = /^\d+$/.test(value);
    const validLength = value.length >= 10;

    if (!onlyDigits || !validLength) {
      input.setCustomValidity("Le numéro de téléphone n'est pas valide");
    } else {
      input.setCustomValidity("");
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("keydown", this._on_escape.bind(this));
  }
  disconnectedCallback() {
    window.removeEventListener("keydown", this._on_escape);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <button
        class="
      flex gap-x-2 items-center  text-nowrap lg:text-lg font-medium bg-input  rounded-(--radius) px-4 py-2
      cursor-pointer hover:bg-input/60 transition-all duration-300 ease-in-out
       text-foreground active:scale-105 disabled:opacity-60 disabled:pointer-events-none pointer-events-auto
        border border-muted-foreground shadow-md 
       "
        .disabled=${this.is_opened}
        @click=${this._toggle}
      >
        <span>ajouter</span>
        <span>
          <svg
            class="mt-1"
            width="22"
            height="22"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 6.5H6.5M6.5 6.5H8.5M6.5 6.5V4.5M6.5 6.5V8.5M12.5 0.9V12.1C12.5 12.2061 12.4579 12.3078 12.3828 12.3828C12.3078 12.4579 12.2061 12.5 12.1 12.5H0.9C0.793913 12.5 0.692172 12.4579 0.617157 12.3828C0.542143 12.3078 0.5 12.2061 0.5 12.1V0.9C0.5 0.793913 0.542143 0.692172 0.617157 0.617157C0.692172 0.542143 0.793913 0.5 0.9 0.5H12.1C12.2061 0.5 12.3078 0.542143 12.3828 0.617157C12.4579 0.692172 12.5 0.793913 12.5 0.9Z"
              stroke="#2E7D32"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        ${animate()}
        class="
        scale-100
        z-10
        fixed pointer-events-auto top-0 left-0 
        w-screen h-screen backdrop-blur-md backdrop-brightness-75
        ${this.is_opened
          ? "opacity-100 pointer-events-auto"
          : " opacity-0 pointer-events-none"}
        "
      >
        <div class="flex items-center justify-center h-screen ">
          <form
            @submit=${this._on_submit}
            class="
                bg-card md:w-1/3 w-full
                px-3 py-4 rounded-(--radius)
                flex flex-col gap-y-4
                *:flex  *:flex-col  
                *:[&>label]:text-xs *:[&>label]:text-muted-foreground 
                *:[&>input]:bg-input *:[&>input]:px-2 *:[&>input]:py-2 *:[&>input]:rounded-md  
                *:[&>input]:w-full
                "
          >
            <div
              class="
                   *:[&>label]:text-xs *:[&>label]:text-muted-foreground 
                *:[&>input]:bg-input *:[&>input]:w-full *:[&>input]:px-2 *:[&>input]:py-2 *:[&>input]:rounded-md  
                *:flex *:flex-col 
                 md:flex-row! gap-x-2 gap-y-4
                  "
            >
              <div>
                <label required for="fn"> Prenom </label>
                <input
                  @change=${this._on_text_input_change}
                  required
                  type="text"
                  id="fn"
                  placeholder="Prenom"
                />
              </div>
              <div>
                <label required for="ln"> Nom </label>
                <input
                  @change=${this._on_text_input_change}
                  required
                  type="text"
                  id="ln"
                  placeholder="Nom"
                />
              </div>
            </div>
            <div>
              <label required for="reason"> Motif </label>
              <input
                @change=${this._on_text_input_change}
                required
                type="text"
                id="reason"
                placeholder="Motif"
              />
            </div>
            <div>
              <label required for="date"> Date </label>
              <input required type="date" id="date" />
            </div>

            <div>
              <label required for="tel"> Telephone </label>
              <input
                @change=${this._on_tel_input_change}
                autocomplete="on"
                required
                type="tel"
                inputmode="tel"
                id="tel"
                placeholder="XX XX XX XX XX"
              />
            </div>

            <div>
              <label required for="email"> Email </label>
              <input
                spellcheck="false"
                autocomplete="on"
                required
                type="email"
                id="email"
                placeholder="Nom@example.com"
              />
            </div>


            <div class="flex flex-row!  *:w-full gap-x-4">
              <button
                type="submit"
                class="
                      flex gap-x-2 items-center text-sm lg:text-lg font-medium bg-input  rounded-(--radius) px-2 py-1
                      cursor-pointer hover:bg-primary transition-all duration-300 ease-in-out
                      text-foreground hover:text-accent active:scale-105 disabled:opacity-60 
                      border border-muted-foreground shadow-sm justify-center group
                       "
              >
                <span>Ajouter </span>
                <span>
                  <svg
                    class="mt-1"
                    width="22"
                    height="22"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="group-hover:stroke-accent transition-all duration-300 ease-in-out"
                      d="M4.5 6.5H6.5M6.5 6.5H8.5M6.5 6.5V4.5M6.5 6.5V8.5M12.5 0.9V12.1C12.5 12.2061 12.4579 12.3078 12.3828 12.3828C12.3078 12.4579 12.2061 12.5 12.1 12.5H0.9C0.793913 12.5 0.692172 12.4579 0.617157 12.3828C0.542143 12.3078 0.5 12.2061 0.5 12.1V0.9C0.5 0.793913 0.542143 0.692172 0.617157 0.617157C0.692172 0.542143 0.793913 0.5 0.9 0.5H12.1C12.2061 0.5 12.3078 0.542143 12.3828 0.617157C12.4579 0.692172 12.5 0.793913 12.5 0.9Z"
                      stroke="#2E7D32"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <button
                @click=${this._close}
                type="reset"
                class="
                      flex gap-x-2 items-center text-sm lg:text-lg font-medium bg-input  rounded-(--radius) px-2 py-1
                      cursor-pointer hover:bg-destructive transition-all duration-300 ease-in-out
                      text-foreground hover:text-accent active:scale-105 disabled:opacity-60 
                      border border-muted-foreground shadow-sm justify-center group
                       "
              >
                <span>Annuler </span>
                <span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="group-hover:fill-accent transition-all duration-300 ease-in-out"
                      d="M6.575 7.975L1.675 12.875C1.49167 13.0583 1.25833 13.15 0.975 13.15C0.691667 13.15 0.458333 13.0583 0.275 12.875C0.0916663 12.6917 0 12.4583 0 12.175C0 11.8917 0.0916663 11.6583 0.275 11.475L5.175 6.575L0.275 1.675C0.0916663 1.49167 0 1.25833 0 0.975C0 0.691667 0.0916663 0.458333 0.275 0.275C0.458333 0.0916663 0.691667 0 0.975 0C1.25833 0 1.49167 0.0916663 1.675 0.275L6.575 5.175L11.475 0.275C11.6583 0.0916663 11.8917 0 12.175 0C12.4583 0 12.6917 0.0916663 12.875 0.275C13.0583 0.458333 13.15 0.691667 13.15 0.975C13.15 1.25833 13.0583 1.49167 12.875 1.675L7.975 6.575L12.875 11.475C13.0583 11.6583 13.15 11.8917 13.15 12.175C13.15 12.4583 13.0583 12.6917 12.875 12.875C12.6917 13.0583 12.4583 13.15 12.175 13.15C11.8917 13.15 11.6583 13.0583 11.475 12.875L6.575 7.975Z"
                      fill="#C62828"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}
define("x-form" , Form)
export { Form };
