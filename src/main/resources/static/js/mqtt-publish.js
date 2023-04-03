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
            "topic": "Topic",
            "message": "Message"
        }

        const response = await post("/api/mqtt/publish", payload);

        this.response = response.message;
    }

    render() {
        return html`
            <caracal-card>
                <h1 slot="header">Mqtt Publish</h1>                
                <caracal-input caption="Topic" value="CUSTOMERS"></caracal-input>
                <caracal-input caption="Message" value="Message1"></caracal-input>
                <div id="response">${this.response}</div>
                <div slot="buttons">
                    <caracal-button id="publishButton" @click=${this._clickHandler}>Publish</caracal-button>
                </div>
            </caracal-card>
        `;
    }
}

customElements.define('mqtt-publish', MqttPublish);