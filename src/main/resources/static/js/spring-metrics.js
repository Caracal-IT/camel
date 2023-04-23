import {css, html, LitElement} from './lit.js';
import {get} from "./components/caracal-utilities.js";

class Metrics extends LitElement {
    static styles = css`
      #response {
        height: 1.2rem;
      }

      main {
        display: flex;
      }

      content {
        margin: 0 5px 5px 5px;
        background-color: #DDD;
        border-radius: 5px;
        padding: 5px;
        width: 100%;
      }

      caracal-input {
        background-color: hotpink;
      }

      menu {
        margin: 0 0 5px 0;
        padding: 0;
        background-color: #444444;
        display: inline-block;
        border-radius: 5px;
        width: 5rem;
        height: 25rem;
      }

      menu a {
        font-family: Roboto;
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: black;
        font-size: 1rem;
        padding: .4rem 0;
        align-items:center;
        justify-content:center;
        color: #888;
        width: 5rem;
        height: 5rem;
      }

      menu a.active {
        //text-decoration: underline;
        color: whitesmoke;
        background-color: #00b4db;
        border-radius: 5px;
      }

      menu a:hover {
        //text-decoration: underline;
      }

      action{
        width: 33rem;
        display: none;
      }

      .action.active {
        display: inline-block;
      }

      span {
        font-family: inherit;
      }

      .material-symbols-outlined {
        font-size: 3.8rem;
      }
    `;

    _clickHandler(event) {
        event.preventDefault();
        this.shadowRoot.querySelector("a.active")?.classList?.remove('active');

        let menuItem = event.target;

        if(menuItem.localName === 'span')
            menuItem = menuItem.parentElement.parentElement;

        menuItem.classList.add('active');
    }

    render(){
        return html`
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
           <caracal-card>
                <h1 slot="header">Metrics</h1>
                <main>
                    <menu>
                        <a href="#publish" class="active" data-elm="mqtt-publish" @click=${this._clickHandler}>
                            <slot>
                                <span class="material-symbols-outlined">info</span>
                            </slot>
                            Info</a>
                        <a href="#publish" data-elm="mqtt-publish" @click=${this._clickHandler}>
                            <slot>
                                <span class="material-symbols-outlined">alt_route</span>
                            </slot>
                            Routs
                        </a>
                    </menu>
                    <content>
                        <caracal-input caption="Cloud Broker Url" readonly="readonly" value="rrvrvrv"></caracal-input>
                        <caracal-input caption="Server Broker Url" readonly="readonly" value="rfvrvfrfvrv"></caracal-input>
                    </content>
                </main>
            </caracal-card>
        `;
    }
}

customElements.define('spring-metrics', Metrics);