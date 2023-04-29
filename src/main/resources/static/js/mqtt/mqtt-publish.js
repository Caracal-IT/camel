import {css, html, LitElement} from '../lit.js';
import {post} from "../components/caracal-utilities.js";

class MqttPublish extends LitElement {
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

    async _clickHandler(){
        this.response = "Loading...";

        const payload = {
            "topic": this.shadowRoot.getElementById("topic").value,
            "message": this.shadowRoot.getElementById("message").value,
            "retained" : this.shadowRoot.getElementById("retained").value,
            "iterations": this.shadowRoot.getElementById("iterations").value,
            "randomAmountOfMessages": this.shadowRoot.getElementById("randomAmountOfMessages").value,
            "delay": this.shadowRoot.getElementById("delay").value
        }

        const response = await post("/api/mqtt/publish", payload);
        this.response = response.message;
    }

    render(){
        return html`
            <content>
                <section>
                    <h1 slot="header">MQTT Publish</h1>
                    <caracal-input id="topic" caption="Topic" value="CUSTOMERS/5B4D8764-3EB1-4C65-A34B-00CFDCE6D77D"></caracal-input>
                    <caracal-input id="message" caption="Message" value="Custom Message"></caracal-input>
                    <caracal-input id="iterations" type="number" caption="Iterations" value="1"></caracal-input>
                    <caracal-input id="delay" type="number" caption="Delay in milli-seconds" value="0"></caracal-input>
                    <caracal-checkbox id="randomAmountOfMessages" caption="Random Amount Of Messages [1 - 5]" value=${true}></caracal-checkbox>
                    <caracal-checkbox id="retained" caption="Retained" value=${true}></caracal-checkbox>
                </section>
                <section class="buttons">
                    <div id="response">${this.response}</div>
                    <caracal-button id="publishButton" @click=${this._clickHandler}>Publish</caracal-button>
                </section>
            </content>
        `;
    }
}

customElements.define('mqtt-publish', MqttPublish);