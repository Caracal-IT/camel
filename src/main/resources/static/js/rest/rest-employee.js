import {css, html, LitElement} from '../lit.js';
import {get, post} from "../components/caracal-utilities.js";

class RestEmployee extends LitElement {
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
        response: {type: String},
        employee: {type: Object}
    };

    constructor() {
        super();

        this.employee = {}
    }

    async connectedCallback() {
        super.connectedCallback()
        this.response = 'Loading ...';
        this.employee = await get('/camel/employee/AA4D8764-3EB1-4C65-A34B-00CFDCE6D77D');
        this.response = this.employee.message;
    }

    async _clickHandler() {
        this.response = "Loading...";

        const payload = {
            "firstName": this.shadowRoot.getElementById('employeeName').value,
            "lastName": this.shadowRoot.getElementById('employeeSurname').value
        }

        this.employee = await post(`/camel/employee/${this.shadowRoot.getElementById('employeeId').value}`, payload);
        this.response = this.employee.message;
    }

    render(){
        return html`
            <content>
                <section>
                    <h1 slot="header">Rest (Camel) Employee</h1>
                    <caracal-input id="employeeId" caption="Employee Identifier" value="${this.employee.id}"></caracal-input>
                    <caracal-input id="employeeName" caption="Employee Name" value="${this.employee.firstName}"></caracal-input>
                    <caracal-input id="employeeSurname" caption="Employee Surname" value="${this.employee.lastName}"></caracal-input>
                    <caracal-input id="employeeNumber" caption="Employee Number" value="${this.employee.number}"></caracal-input>
                </section>
                <section class="buttons">
                    <div id="response">${this.response}</div>
                    <caracal-button id="processButton" @click=${this._clickHandler}>Create Emp No</caracal-button>
                </section>
            </content>
        `;
    }
}

customElements.define('rest-employee', RestEmployee);