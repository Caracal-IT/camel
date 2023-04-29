import {css, html, LitElement} from '../lit.js';
import {get} from "../components/caracal-utilities.js";

class MqttInfo extends LitElement {
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
        padding: 0 5px;
        height: 31rem;
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
        cloudBrokerUrl: {type: String},
        serverBrokerUrl: {type: String},
        appVersion: {type: String}
    };

    async connectedCallback() {
        super.connectedCallback()

        const settings = await get("/api/mqtt/settings");

        this.cloudBrokerUrl = settings.cloudBrokerUrl;
        this.serverBrokerUrl = settings.serverBrokerUrl;
        this.appVersion = settings.appVersion;
    }

    render(){
        return html`
            <content>
                <section>
                    <h1 slot="header">Settings</h1>
                    <caracal-input caption="Cloud Broker Url" readonly="readonly" value="${this.cloudBrokerUrl}"></caracal-input>
                    <caracal-input caption="Server Broker Url" readonly="readonly" value="${this.serverBrokerUrl}"></caracal-input>
                    <caracal-input caption="Version" readonly="readonly" value="${this.appVersion}"></caracal-input>
                    <div slot="buttons">&nbsp</div>
                </section>
            </content>
        `;
    }
}

customElements.define('mqtt-info', MqttInfo);