import {css, html, LitElement} from './lit.js';
import {get} from "./components/caracal-utilities.js";

class Metrics extends LitElement {
    static styles = css`
      #response {
        height: 1.2rem;
      }

      main {
        display: flex;
        flex: 1 1;
      }

      content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0 0 5px 5px;
        background-color: #DDD;
        border-radius: 5px;
        padding: 5px;
        width: 100%;
      }

      .buttons {
        display: flex;
        flex-direction: column;
        justify-content: end;
      }

      caracal-button {
        align-self: flex-end;
      }
      
      menu {
        margin: 0 0 5px 0;
        padding: 0;
        background-color: #444444;
        display: inline-block;
        border-radius: 5px;
        width: 5rem;
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

    static properties = {
        response: {type: String},
        info: {type: Object}
    };

    constructor() {
        super();

        this.info = {}
    }

    _clickHandler(event) {
        event.preventDefault();
        this.shadowRoot.querySelector("a.active")?.classList?.remove('active');

        let menuItem = event.target;

        if(menuItem.localName === 'span')
            menuItem = menuItem.parentElement.parentElement;

        menuItem.classList.add('active');
    }

    async connectedCallback() {
        super.connectedCallback()
        this.response = 'Loading ...';
        this.info = await get('/actuator/info');
        this.response = '';
    }

    async _refresh() {
        await this.connectedCallback();
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
                        <section>
                            <caracal-input caption="Name" readonly="readonly" value="${this.info["camel.name"]}"></caracal-input>
                            <caracal-input caption="App Version" readonly="readonly" value="${this.info["version"]}"></caracal-input>
                            <caracal-input caption="Camel Version" readonly="readonly" value="${this.info["camel.version"]}"></caracal-input>
                            <caracal-input caption="Uptime" readonly="readonly" value="${this.info["camel.uptime"]}"></caracal-input>
                            <caracal-input caption="Status" readonly="readonly" value="${this.info["camel.status"]}"></caracal-input>
                        </section>
                        <section class="buttons">
                            <div id="response">${this.response}</div>
                            <caracal-button id="processButton" @click=${this._refresh}>Refresh</caracal-button>
                        </section>
                    </content>
                </main>
            </caracal-card>
        `;
    }
}

customElements.define('spring-metrics', Metrics);