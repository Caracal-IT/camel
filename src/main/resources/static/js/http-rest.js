import {LitElement, html, css} from './lit.js';
import {post} from "./components/caracal-utilities.js";

class HttpRest extends LitElement {
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
            "name": this.shadowRoot.getElementById("customerName").value,
            "surname": this.shadowRoot.getElementById("customerSurname").value
        }

        const response = await post("/camel/customer/5B4D8764-3EB1-4C65-A34B-00CFDCE6D77D", payload);
        this.response = response.message;
    }

    render() {
        return html`
            <caracal-card>
                <h1 slot="header">Rest Client</h1>
                <caracal-input id="customerName" caption="Customer Name" value="Joe"></caracal-input>
                <caracal-input id="customerSurname" caption="Customer Surname" value="Soap"></caracal-input>
                <div id="response">${this.response}</div>
                <div slot="buttons">
                    <caracal-button id="processButton" @click=${this._clickHandler}>Process</caracal-button>
                </div>
            </caracal-card>
        `;
    }
}

customElements.define('http-rest', HttpRest);

