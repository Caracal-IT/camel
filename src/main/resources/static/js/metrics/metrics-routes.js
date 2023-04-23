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
        height: 33.6rem;
      }

      .buttons {
        display: flex;
        flex-direction: row;
        justify-content: end;
      }

      caracal-checkbox {
        width: 10rem;
        padding-top: 10px;
      }

      caracal-button {
        align-self: flex-end;
      }

      #routes {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        table-layout: fixed;
        width: 100%;
      }

      #routes td, #routes th {
        border-bottom: 1px solid black;
        padding: 8px;
      }

      #routes th:first-child {
        border-top-left-radius: 5px;
      }

      #routes th:last-child {
        border-top-right-radius: 5px;
      }

      #routes tr:nth-child(even){background-color: lightblue;}

      #routes tr:hover {background-color: #aaa;}

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
        info: {type: Object},
        autoRefreshEvent: {type: Object}
    };

    constructor() {
        super();

        this.info = [];
        this.autoRefreshEvent = null;
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

    _autoRefresh(event) {
        if(this.autoRefreshEvent)
            clearInterval(this.autoRefreshEvent);

        if(event.target.value)
            this.autoRefreshEvent = setInterval(async () => this.info = await get('/actuator/camelroutes'), 500);
    }

    render(){
        return html`
            <content>
                <section>
                    <table id="routes">
                        <tr><th style="width: 200px">Id</th><th style="width: 100px">Uptime</th><th style="width: 60px">Status</th></tr>
                        ${this.info.map(i => html`<tr><td>${i.id}</td><td>${i.uptime}</td><td>${i.status}</td></tr>`)}
                    </table>
                </section>
                <section class="buttons">
                    <div id="response">${this.response}</div>
                    <caracal-checkbox id="autoRefresh" @click=${this._autoRefresh} caption="Auto Refresh"></caracal-checkbox>
                    <caracal-button id="processButton" @click=${this._refresh}>Refresh</caracal-button>
                </section>
            </content>
        `;
    }
}

customElements.define('metrics-routes', MetricsRoutes);