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
        width: 100%;
        height: 100%;
      }

      .buttons {
        display: flex;
        flex-direction: column;
        justify-content: end;
      }

      caracal-button {
        align-self: flex-end;
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
            <content>
                <section>
                    Empty
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