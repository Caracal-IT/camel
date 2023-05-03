import {css, html, LitElement} from '../lit.js';
import {get} from '../components/caracal-utilities.js';
import {Pager} from '../libs/pager.js';
import {buttonStyles} from '../styles/pager.js';

class DbEDITCustomer extends LitElement {
    static styles = [
        buttonStyles,
        css`
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
        `];

    static properties = {
        response: {type: String},
        info: {type: Object}
    };

    constructor() {
        super();

        this.info = [];
    }

    async connectedCallback() {
        super.connectedCallback()

        this.response = 'Loading ...';
        this.info = await get('/camel/customers/1');
        this.response = '';

        setTimeout(() => {
            let pager = new Pager('customers', 7, this.shadowRoot);
            pager.init();
            pager.showPageNav('pageNavPosition');
            pager.showPage(1);
        }, 0);
    }

    async _refresh() {
        const id = this.shadowRoot.getElementById("id").value;

        this.info = await get(`/camel/customers/${id}`);
    }

    async _update() {
        const id = this.shadowRoot.getElementById("id").value;

        const payload = {
            "firstName": this.shadowRoot.getElementById("firstName").value,
            "lastName": this.shadowRoot.getElementById("lastName").value,
            "balance": this.shadowRoot.getElementById("balance").value
        }

        this.info = await post(`/camel/customers/${id}`, payload);
    }

    render(){
        return html`
            <content>
                <section>
                    <h1 slot="header">Customers</h1>
                    <section class="table">
                        <caracal-input caption="ID" id="id" type="number" value="${this.info.id}"></caracal-input>
                        <caracal-input caption="First Name" value="${this.info.firstName}"></caracal-input>
                        <caracal-input caption="Last Name" value="${this.info.lastName}"></caracal-input>
                        <caracal-input caption="Balance" value="${this.info.balance}"></caracal-input>
                    </section>
                </section>
                <section class="buttons">
                    <div id="response">${this.response}</div>
                    <caracal-button id="processButton" @click=${this._refresh}>Update</caracal-button>
                    <caracal-button id="processButton" @click=${this._refresh}>Refresh</caracal-button>
                </section>
            </content>
        `;
    }
}

customElements.define('db-edit-customer', DbEDITCustomer);