import {css, html, LitElement} from '../lit.js';
import {post} from "../components/caracal-utilities.js";

class RestMail extends LitElement {
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
            "mailFrom": this.shadowRoot.getElementById("mailFrom").value,
            "mailTo": this.shadowRoot.getElementById("mailTo").value,
            "mailSubject": this.shadowRoot.getElementById("mailSubject").value,
            "mailBody": this.shadowRoot.getElementById("mailBody").value
        }

        const resp = await post(`/camel/mail`, payload);
        this.response = resp.message;
    }

    render(){
        return html`
            <content>
                <section>
                    <h1 slot="header">Rest (Camel) Mail</h1>
                    <caracal-input id="mailFrom" caption="From" value="kameelapache@gmail.com"></caracal-input>
                    <caracal-input id="mailTo" caption="To" value="ettienemare@gmail.com"></caracal-input>
                    <caracal-input id="mailSubject" caption="Subject" value="Test Main"></caracal-input>
                    <caracal-input id="mailBody" caption="Message" value="The test email body"></caracal-input>
                </section>
                <section class="buttons">
                    <div id="response">${this.response}</div>
                    <caracal-button id="processButton" @click=${this._clickHandler}>Send Mail</caracal-button>
                </section>
            </content>
        `;
    }
}

customElements.define('rest-mail', RestMail);