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
            "autoCallback": false
        }

        //const response = await post("/api/mqtt/publish", payload);
        //this.response = response.message;
        this.response = "Ok";
    }

    render() {
        return html`
            <caracal-card>
                <h1 slot="header">Mqtt Publish</h1>
                <caracal-input id="reqTopic" caption="Request Topic" value="ELM_CUSTOMERS/5B4D8764-3EB1-4C65/req"></caracal-input>
                <caracal-input id="reqMessage" caption="Request Message" value="Custom Message"></caracal-input>
                
                <caracal-input id="rspTopic" caption="Request Topic" value="ELM_CUSTOMERS/5B4D8764-3EB1-4C65/rsp"></caracal-input>
                <caracal-input id="rspMessage" caption="Request Message" value="Custom Message Response"></caracal-input>
                <caracal-checkbox id="autoResponse" caption="Auto Response" ></caracal-checkbox>
                <div id="response">${this.response}</div>
                <div slot="buttons">
                    <caracal-button id="publishButton" @click=${this._clickHandler}>Publish</caracal-button>
                </div>
            </caracal-card>
        `;
    }
}

customElements.define('mqtt-request-response', MqttRequestResponse);