import {LitElement, html, css} from './lit.js';
import {post} from "./components/caracal-utilities.js";

class MqttRequestResponse extends LitElement {
    static styles = css`
    `;

    static properties = {
        response: {type: String}
    };

    async _clickHandler() {
        this.response = "Loading...";

        const payload = {
            "requestTopic": this.shadowRoot.getElementById("reqTopic").value,
            "requestMessage": this.shadowRoot.getElementById("reqMessage").value,
            "responseTopic": this.shadowRoot.getElementById("rspTopic").value,
            "responseMessage": this.shadowRoot.getElementById("rspMessage").value,
            "autoCallback": this.shadowRoot.getElementById("autoResponse").value
        }

        const response = await post("/api/mqtt/command", payload);
        this.response = response.message;
    }

    render() {
        return html`
            <caracal-card>
                <h1 slot="header">Mqtt Publish</h1>
                <caracal-input id="reqTopic" caption="Request Topic" value="ELM_CUSTOMERS/5B4D8764-3EB1-4C65-A34B-00CFDCE6D77D/req"></caracal-input>
                <caracal-input id="reqMessage" caption="Request Message" value="Custom Request"></caracal-input>
                
                <caracal-input id="rspTopic" caption="Request Topic" value="ELM_CUSTOMERS/5B4D8764-3EB1-4C65-A34B-00CFDCE6D77D/rsp"></caracal-input>
                <caracal-input id="rspMessage" caption="Request Message" value="Custom Response"></caracal-input>
                <caracal-checkbox id="autoResponse" caption="Auto Response" value=${true}></caracal-checkbox>
                <div id="response">${this.response}</div>
                <div slot="buttons">
                    <caracal-button id="publishButton" @click=${this._clickHandler}>Publish</caracal-button>
                </div>
            </caracal-card>
        `;
    }
}

customElements.define('mqtt-request-response', MqttRequestResponse);