import {LitElement, html, css} from './lit.js';
import {post} from './components/caracal-utilities.js';

class MqttPublish extends LitElement {
    static styles = css`
      #response {
        height: 1.2rem;
      }
    `;

    static properties = {
        response: {type: String}
    };

    async _clickHandler(){
        this.response = "Loading...";

        const payload = {
            "topic": this.shadowRoot.getElementById("topic").value,
            "message": this.shadowRoot.getElementById("message").value
        }

        const response = await post("/api/mqtt/publish", payload);
        this.response = response.message;
    }

    render() {
        return html`
            <caracal-card>
                <h1 slot="header">Mqtt Publish</h1>                
                <caracal-input id="topic" caption="Topic" value="CUSTOMERS/5B4D8764-3EB1-4C65-A34B-00CFDCE6D77D"></caracal-input>
                <caracal-input id="message" caption="Message" value="Custom Message"></caracal-input>
                <div id="response">${this.response}</div>
                <div slot="buttons">
                    <caracal-button id="publishButton" @click=${this._clickHandler}>Publish</caracal-button>
                </div>
            </caracal-card>
        `;
    }
}

customElements.define('mqtt-publish', MqttPublish);