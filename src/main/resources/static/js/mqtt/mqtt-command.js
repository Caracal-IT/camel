import {css, html, LitElement} from '../lit.js';
import {post} from "../components/caracal-utilities.js";

class MqttCommand extends LitElement {
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

          .form-data {
            display: flex;
            flex-flow: column;
            gap: .3rem;
            margin: .8rem 0;
          }

          textarea {
            height: 220px;
            border-radius: 10px;
            padding: 5px 5px;
            font: inherit;
            border: 2px solid black;
            resize: none;
          }

          textarea:focus {
            border: 2px solid #0083b0;
            background: lightblue;
            outline:none;
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
            "retained" : true,
            "iterations": 1,
            "randomAmountOfMessages": false,
            "delay": 0
        }

        const response = await post("/api/mqtt/publish", payload);
        this.response = response.message;
    }

    render(){
        return html`
            <content>
                <section>
                    <h1 slot="header">MQTT Command</h1>
                    <caracal-input id="topic" caption="Topic" value="elastic/ID_82"></caracal-input>
                    <div class="form-data">
                        <label for="serverBrokerUrl">Message</label>
                        <textarea id="message">{\r\n\t"version": "4.0.10",\r\n\t"action": "Go working"\r\n}</textarea>
                    </div>
                </section>
                <section class="buttons">
                    <div id="response">${this.response}</div>
                    <caracal-button id="publishButton" @click=${this._clickHandler}>Publish</caracal-button>
                </section>
            </content>
        `;
    }
}

customElements.define('mqtt-command', MqttCommand);