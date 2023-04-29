import {css, html, LitElement} from '../lit.js';
import {get, post} from "../components/caracal-utilities.js";

class MetricsLogs extends LitElement {
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
        flex-direction: row;
        justify-content: end;
        justify-items: end;
      }

      caracal-button {
        align-self: flex-end;
      }
    `;

    static properties = {
        response: {type: String},
        info: {type: Object}
    };

    async _clickHandler() {
        this.response = 'Loading...';

        const payload = {
            "logFile": this.shadowRoot.getElementById('logFile').value,
            "severity": this.shadowRoot.getElementById('severity').value,
            "message": this.shadowRoot.getElementById('message').value,
            "iterations": this.shadowRoot.getElementById('iterations').value
        }

        const resp = await post('/camel/log-generator', payload);
        this.response = resp.message;
    }

    render(){
        return html`
            <content>
                <section>
                    <h1 slot="header">Fake Log Generator</h1>
                    <caracal-input id="logFile" caption="Logfile" value="caracal_demo_log.log"></caracal-input>
                    <caracal-input id="severity" caption="Severity" value="INFO"></caracal-input>
                    <caracal-input id="message" caption="Message" value="A fake error message is not a genuine malware threat by itself."></caracal-input>
                    <caracal-input id="iterations" type="number" caption="Iterations" value="1"></caracal-input>
                 </section>
                <section class="buttons">
                    <div id="response">${this.response}</div>
                    <caracal-button id="processButton" @click=${this._clickHandler}>Submit</caracal-button>
                </section>
            </content>
        `;
    }
}

customElements.define('metrics-logs', MetricsLogs);