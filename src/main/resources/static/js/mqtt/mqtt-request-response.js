import {css, html, LitElement} from '../lit.js';
import {post} from "../components/caracal-utilities.js";

class MqttRequestResponse extends LitElement {
    static styles = [
        css`
          #response {
            height: 1.2rem;
          }

          #response {
            height: 1.2rem;
          }

          #randomAmountOfMessages,
          #retained {
            display: inline-block;
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
        `];

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

    render(){
        return html`
            <content>
                <section>
                    <h1 slot="header">MQTT Request Response</h1>
                    <caracal-input id="reqTopic" caption="Request Topic" value="CARACAL_CUSTOMERS/5B4D8764-3EB1-4C65-A34B-00CFDCE6D77D/req"></caracal-input>
                    <caracal-input id="reqMessage" caption="Request Message" value="Custom Request"></caracal-input>

                    <caracal-input id="rspTopic" caption="Request Topic" value="CARACAL_CUSTOMERS/5B4D8764-3EB1-4C65-A34B-00CFDCE6D77D/rsp"></caracal-input>
                    <caracal-input id="rspMessage" caption="Request Message" value="Custom Response"></caracal-input>
                    <caracal-checkbox id="autoResponse" caption="Auto Response" value=${true}></caracal-checkbox>
                </section>
                <section class="buttons">
                    <div id="response">${this.response}</div>
                    <caracal-button id="publishButton" @click=${this._clickHandler}>Publish</caracal-button>
                </section>
            </content>
        `;
    }
}

customElements.define('mqtt-request-response', MqttRequestResponse);