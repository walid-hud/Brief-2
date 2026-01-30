import { html } from "lit";
import XElement from "./lib/XElement";
import "./components/Table";
import "./components/Form";
import "./components/ToastContainer";
import "./components/Pagination";
import "./components/Searchbar";
import { define } from "./lib";

class App extends XElement {
  render() {
    return html`
      <x-toast-container></x-toast-container>
      <main
        class="min-h-screen px-4 py-2 bg-linear-180 from-primary/20  via-muted-foreground/20  to-secondary "
      >
        <nav class=" flex justify-between items-center md:mb-4  ">
          <div>
            <a href="/" class="text-3xl font-bold text-primary font-serif">
              HealthCare
            </a>
          </div>
          <x-search class="hidden md:block"> </x-search>
          <div>
            
            <x-form></x-form>
          </div>
        </nav>
        <x-search class=" block md:hidden  my-4"> </x-search>
        <x-table> </x-table>
        <x-pagination></x-pagination>
      </main>
    `;
  }
}

define("x-app", App);

export default App;
