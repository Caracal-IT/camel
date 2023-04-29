import {css, html, LitElement} from '../lit.js';
import {post} from "../components/caracal-utilities.js";

class RestCustomer extends LitElement {
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
            "name": this.shadowRoot.getElementById("customerName").value,
            "surname": this.shadowRoot.getElementById("customerSurname").value
        }

        const response = await post("/camel/customer/5B4D8764-3EB1-4C65-A34B-00CFDCE6D77D", payload);
        this.response = response.message;
    }

    render(){
        return html`
            <content>
                <section>
                    <h1 slot="header">Rest (Camel) Customer</h1>
                    <caracal-input id="customerName" caption="Customer Name" value="Joe"></caracal-input>
                    <caracal-input id="customerSurname" caption="Customer Surname" value="Soap"></caracal-input>
                </section>
                <section class="buttons">
                    <div id="response">${this.response}</div>
                    <caracal-button id="processButton" @click=${this._clickHandler}>Process</caracal-button>
                </section>
            </content>
        `;
    }
}

customElements.define('rest-cust', RestCustomer);