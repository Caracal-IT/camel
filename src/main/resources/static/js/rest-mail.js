import {css, html, LitElement} from './lit.js';
import {get, post} from "./components/caracal-utilities.js";

class Mail extends LitElement {
    static styles = css`
      #response {
        height: 1.2rem;
      }
    `;

    static properties = {
        response: {type: String}
    };

    async _clickHandler() {
        this.response = "Loading...";

        const payload = {
            "mailFrom": this.shadowRoot.getElementById("mailFrom").value,
            "mailTo": this.shadowRoot.getElementById("mailTo").value,
            "mailSubject": this.shadowRoot.getElementById("mailSubject").value,
            "mailBody": this.shadowRoot.getElementById("mailBody").value
        }

        const resp = await post(`/camel/mail`, payload);
        this.response = resp.message;
    }

    render() {
        return html`
            <caracal-card>
                <h1 slot="header">Mail</h1>
                <caracal-input id="mailFrom" caption="From" value="kameelapache@gmail.com"></caracal-input>
                <caracal-input id="mailTo" caption="To" value="ettienemare@gmail.com"></caracal-input>
                <caracal-input id="mailSubject" caption="Subject" value="Test Main"></caracal-input>
                <caracal-input id="mailBody" caption="Message" value="The test email body"></caracal-input>                
                <div id="response">${this.response}</div>
                <div slot="buttons">
                    <caracal-button id="processButton" @click=${this._clickHandler}>Send Mail</caracal-button>
                </div>
            </caracal-card>
        `;
    }
}

customElements.define('rest-mail', Mail);