import { LitElement, } from "lit";
import tailwindCss from '../index.css?inline'
const tailwindSheet = new CSSStyleSheet()
tailwindSheet.replaceSync(tailwindCss)
export default class XElement extends LitElement{
    firstUpdated() {
        this.shadowRoot.adoptedStyleSheets = [tailwindSheet]
    }
    createRenderRoot(){
        return this 
    }

}