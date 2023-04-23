import {css, html, LitElement} from '../lit.js';
import {get} from "../components/caracal-utilities.js";

class MetricsRoutes extends LitElement {
    static styles = css`
      #response {
        height: 1.2rem;
      }

      content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #DDD;
        border-radius: 5px;
        padding: 5px;
        height: 33rem;
      }

      .buttons {
        display: flex;
        flex-direction: column;
        justify-content: end;
      }

      caracal-button {
        align-self: flex-end;
      }

      #routes {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      #routes td, #routes th {
        border-bottom: 1px solid black;
        padding: 8px;
      }

      #routes tr:nth-child(even){background-color: lightblue;}

      #routes tr:hover {background-color: #ddd;}

      #routes th {
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 2px;
        text-align: left;
        background-color: #0083b0;
        color: white;
      }
    `;

    static properties = {
        response: {type: String},
        info: {type: Object}
    };

    constructor() {
        super();

        this.info = [];
    }

    async connectedCallback() {
        super.connectedCallback()
        this.response = 'Loading ...';
        this.info = await get('/actuator/camelroutes');
        this.response = '';
    }

    async _refresh() {
        await this.connectedCallback();
    }

    render(){
        return html`
            <content>
                <section>
                    <table id="routes">
                        <tr><th>Id</th><th>Uptime</th><th>Status</th></tr>
                        ${this.info.map(i => html`<tr><td>${i.id}</td><td>${i.uptime}</td><td>${i.status}</td></tr>`)}
                    </table>
                </section>
                <section class="buttons">
                    <div id="response">${this.response}</div>
                    <caracal-button id="processButton" @click=${this._refresh}>Refresh</caracal-button>
                </section>
            </content>
        `;
    }
}

customElements.define('metrics-routes', MetricsRoutes);