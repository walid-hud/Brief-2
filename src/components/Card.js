import { html } from "lit";
import XElement from "../lib/XElement";
import { define } from "../lib/index";

class Card extends XElement {
  static properties = {
    ln: { type: String },
    fn: { type: String },
    reason: { type: String },
    date: { type: String },
    tel: { type: String },
    id: { type: Number },
    email: { type: String },
    open:{state:true}
  };
  delete_row(id) {
    this.open = false
    this.dispatchEvent(
      new CustomEvent("delete_row", {
        detail: { id },
        bubbles: true,
        composed: true,
      }),
    );
  }
  constructor(){
    super()
    this.open = false
  }
  render() {
    return html`
      <div
        class="
        transition-discrete  duration-300 ease-in-out [interpolate-size:allow-keywords]
        grid grid-cols-3 md:grid-cols-7 bg-muted px-2 my-4  md:px-0 md:my-0
        border border-border md:border-0 md:bg-transparent md:rounded-none  
        items-center rounded-(--radius) py-2 gap-2 text-sm overflow-hidden
        ${this.open ? "h-auto" :"h-16"}
        "
      >
        <div class="md:hidden row-span-7 flex h-full   ">
          <button
          @click=${()=>{
            this.open = !this.open
          }}
          class="border-border border bg-primary-foreground size-12 flex items-center  justify-center rounded-(--radius)">
            <svg
            class="transition-transform duration-300 ${this.open ? "rotate-0" : "rotate-180"}"
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 8L8 1L15 8"
              class="stroke-primary"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          </button>
        </div>
        <div class="md:hidden font-semibold">Nom</div>
        <div class="md:py-2 md:px-4">${this.ln}</div>

        <div class="md:hidden font-semibold">Prenom</div>
        <div class="md:py-2 md:px-4">${this.fn}</div>

        <div class="md:hidden font-semibold">Motif</div>
        <div class="md:py-2 md:px-4">${this.reason}</div>

        <div class="md:hidden font-semibold">Date</div>
        <div class="md:py-2 md:px-4">${this.date}</div>

        <div class="md:hidden font-semibold">Telephone</div>
        <div class="md:py-2 md:px-4">${this.tel}</div>

        <div class="md:hidden font-semibold">Email</div>
        <div class="md:py-2 md:px-4 truncate" title=${this.email}>
          ${this.email}
        </div>

        <div class="md:hidden font-semibold">Action</div>
        <div class="flex items-center justify-center">
          <button
            @click=${() => this.delete_row(Number(this.id) ?? Infinity)}
            class="cursor-pointer hover:opacity-90 transition-opacity duration-200 ease-in
                      w-full  justify-center md:w-fit py-2 md:px-2 lg:py-2 text-sm rounded text-destructive-foreground bg-destructive flex items-center gap-2"
            title="delete entry"
          >
            <svg
              class="hover:scale-110 transition-transform duration-200 ease-in"
              width="11"
              height="12"
              viewBox="0 0 11 12"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 12C1.63334 12 1.31956 11.8696 1.05867 11.6087C0.79778 11.3478 0.667113 11.0338 0.666669 10.6667V2C0.47778 2 0.319558 1.936 0.192002 1.808C0.0644468 1.68 0.000446743 1.52178 2.29885e-06 1.33333C-0.000442146 1.14489 0.0635579 0.986667 0.192002 0.858667C0.320447 0.730667 0.478669 0.666667 0.666669 0.666667H3.33334C3.33334 0.477778 3.39734 0.319556 3.52534 0.192C3.65334 0.0644445 3.81156 0.000444444 4 0H6.66667C6.85556 0 7.014 0.0640001 7.142 0.192C7.27 0.32 7.33378 0.478222 7.33334 0.666667H10C10.1889 0.666667 10.3473 0.730667 10.4753 0.858667C10.6033 0.986667 10.6671 1.14489 10.6667 1.33333C10.6662 1.52178 10.6022 1.68022 10.4747 1.80867C10.3471 1.93711 10.1889 2.00089 10 2V10.6667C10 11.0333 9.86956 11.3473 9.60867 11.6087C9.34778 11.87 9.03378 12.0004 8.66667 12H2ZM4 9.33333C4.18889 9.33333 4.34734 9.26933 4.47534 9.14133C4.60334 9.01333 4.66711 8.85511 4.66667 8.66667V4C4.66667 3.81111 4.60267 3.65289 4.47467 3.52533C4.34667 3.39778 4.18845 3.33378 4 3.33333C3.81156 3.33289 3.65334 3.39689 3.52534 3.52533C3.39734 3.65378 3.33334 3.812 3.33334 4V8.66667C3.33334 8.85556 3.39734 9.014 3.52534 9.142C3.65334 9.27 3.81156 9.33378 4 9.33333ZM6.66667 9.33333C6.85556 9.33333 7.014 9.26933 7.142 9.14133C7.27 9.01333 7.33378 8.85511 7.33334 8.66667V4C7.33334 3.81111 7.26934 3.65289 7.14134 3.52533C7.01334 3.39778 6.85511 3.33378 6.66667 3.33333C6.47822 3.33289 6.32 3.39689 6.192 3.52533C6.064 3.65378 6 3.812 6 4V8.66667C6 8.85556 6.064 9.014 6.192 9.142C6.32 9.27 6.47822 9.33378 6.66667 9.33333Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <!-- <div
              class="
              grid grid-cols-2 md:grid-cols-7
                  bg-muted px-2 my-4  md:px-0 md:my-0 border border-border md:border-0 md:bg-transparent md:rounded-none   items-center rounded-(--radius)
                  py-2 gap-2 text-sm
                  "
              >
              <div class="md:hidden font-semibold">Nom</div>
              <div class="md:py-2 md:px-4">${this.ln}</div>

              <div class="md:hidden font-semibold">Prenom</div>
              <div class="md:py-2 md:px-4">${this.fn}</div>
              
              <div class="md:hidden font-semibold">Motif</div>
              <div class="md:py-2 md:px-4">${this.reason}</div>

              <div class="md:hidden font-semibold">Date</div>
                <div class="md:py-2 md:px-4">${this.date}</div>
                
                <div class="md:hidden font-semibold">Telephone</div>
                <div class="md:py-2 md:px-4">${this.tel}</div>
                
                <div class="md:hidden font-semibold">Email</div>
                <div class="md:py-2 md:px-4 truncate" title=${this.email}>${this
        .email}</div>

                <div class="md:hidden font-semibold">Action</div>
                <div class="flex items-center justify-center">
                  <button
                  @click=${() => this.delete_row(Number(this.id) ?? Infinity)}
                    class="cursor-pointer hover:opacity-90 transition-opacity duration-200 ease-in
                      w-full  justify-center md:w-fit py-2 md:px-2 lg:py-2 text-sm rounded text-destructive-foreground bg-destructive flex items-center gap-2"
                    title="delete entry"
                  >
                    <svg
                      class="hover:scale-110 transition-transform duration-200 ease-in"
                      width="11"
                      height="12"
                      viewBox="0 0 11 12"
                      fill="#fff"
                      xmlns="http://www.w3.org/2000/svg"
                      >
                      <path
                        d="M2 12C1.63334 12 1.31956 11.8696 1.05867 11.6087C0.79778 11.3478 0.667113 11.0338 0.666669 10.6667V2C0.47778 2 0.319558 1.936 0.192002 1.808C0.0644468 1.68 0.000446743 1.52178 2.29885e-06 1.33333C-0.000442146 1.14489 0.0635579 0.986667 0.192002 0.858667C0.320447 0.730667 0.478669 0.666667 0.666669 0.666667H3.33334C3.33334 0.477778 3.39734 0.319556 3.52534 0.192C3.65334 0.0644445 3.81156 0.000444444 4 0H6.66667C6.85556 0 7.014 0.0640001 7.142 0.192C7.27 0.32 7.33378 0.478222 7.33334 0.666667H10C10.1889 0.666667 10.3473 0.730667 10.4753 0.858667C10.6033 0.986667 10.6671 1.14489 10.6667 1.33333C10.6662 1.52178 10.6022 1.68022 10.4747 1.80867C10.3471 1.93711 10.1889 2.00089 10 2V10.6667C10 11.0333 9.86956 11.3473 9.60867 11.6087C9.34778 11.87 9.03378 12.0004 8.66667 12H2ZM4 9.33333C4.18889 9.33333 4.34734 9.26933 4.47534 9.14133C4.60334 9.01333 4.66711 8.85511 4.66667 8.66667V4C4.66667 3.81111 4.60267 3.65289 4.47467 3.52533C4.34667 3.39778 4.18845 3.33378 4 3.33333C3.81156 3.33289 3.65334 3.39689 3.52534 3.52533C3.39734 3.65378 3.33334 3.812 3.33334 4V8.66667C3.33334 8.85556 3.39734 9.014 3.52534 9.142C3.65334 9.27 3.81156 9.33378 4 9.33333ZM6.66667 9.33333C6.85556 9.33333 7.014 9.26933 7.142 9.14133C7.27 9.01333 7.33378 8.85511 7.33334 8.66667V4C7.33334 3.81111 7.26934 3.65289 7.14134 3.52533C7.01334 3.39778 6.85511 3.33378 6.66667 3.33333C6.47822 3.33289 6.32 3.39689 6.192 3.52533C6.064 3.65378 6 3.812 6 4V8.66667C6 8.85556 6.064 9.014 6.192 9.142C6.32 9.27 6.47822 9.33378 6.66667 9.33333Z"
                      />
                    </svg>
                  </button>
                </div>
              </div> -->
    `;
  }
}

define("x-card", Card);
export default Card;
