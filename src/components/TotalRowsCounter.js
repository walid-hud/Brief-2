import { html } from "lit";
import XElement from "../lib/XElement";
import { define } from "../lib/index";
import {ProxyStoreController} from "../controllers/store.controller"
import { store } from "../state/store";
class TotalRowsCounter extends XElement{
 store = new ProxyStoreController(this , store)


 render(){

    return html`
    
    
    `
 }



}

define("x-total-counter" , TotalRowsCounter)