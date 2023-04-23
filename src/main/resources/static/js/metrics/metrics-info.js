import {css, html, LitElement} from '../lit.js';
import {get} from "../components/caracal-utilities.js";

class MetricsInfo extends LitElement {
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
        `;
    }
}

customElements.define('metrics-info', MetricsInfo);