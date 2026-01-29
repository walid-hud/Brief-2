import { html } from "lit";
import XElement from "../lib/XElement";
import { store } from "../state/store";
import { define } from "../lib";
import {debounce, query_rows} from "../utils/index"
const old_rows =    [...store.state.rows] 
class Search extends XElement {
  
  _on_change(ev){
    let query = ev.target.value.trim().toLowerCase()
    if(!query){
      store.state.rows = old_rows
      return
    }
    console.log("query changed : "  , query)
    const {rows , matches} =  query_rows(query) 
    store.state.rows = rows 
  }
  
  disconnectedCallback(){
    this.input.removeEventListener("input" , this._on_change)
  }
  render() {
    return html`
      <div class=" *:transition-all *:duration-300 *:ease-in-out relative 
       border border-muted-foreground rounded-(--radius) overflow-clip shadow-md
        lg:w-lg md:w-md
         "> 
        <input
        @keyup=${debounce(this._on_change , 300)}
          type="search"
          name="search"
          placeholder="search..."
          spellcheck="false"
          class="
            bg-input px-2 py-2  w-full text-lg  
            focus:outline-0 text-foreground outline-0 border-0  
            rounded-(--radius)
            "
        />
        <button
        class="
        absolute right-0 top-1/2 -translate-y-1/2 h-full px-3            
        flex items-center **:stroke-primary  cursor-pointer 
        rounded-r-(--radius) 
        "
        
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

          >
            <path
              d="M18.7502 18.7502L14.4072 14.4072M14.4072 14.4072C15.1501 13.6643 15.7394 12.7824 16.1414 11.8118C16.5435 10.8411 16.7504 9.80081 16.7504 8.75021C16.7504 7.6996 16.5435 6.65929 16.1414 5.68866C15.7394 4.71803 15.1501 3.83609 14.4072 3.09321C13.6643 2.35032 12.7824 1.76103 11.8118 1.35898C10.8411 0.956931 9.80081 0.75 8.75021 0.75C7.6996 0.75 6.65929 0.956931 5.68866 1.35898C4.71803 1.76103 3.83609 2.35032 3.09321 3.09321C1.59288 4.59354 0.75 6.62842 0.75 8.75021C0.75 10.872 1.59288 12.9069 3.09321 14.4072C4.59354 15.9075 6.62842 16.7504 8.75021 16.7504C10.872 16.7504 12.9069 15.9075 14.4072 14.4072Z"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
  </button>
      </div>
    `;
  }
}
define("x-search", Search);
export default Search;
