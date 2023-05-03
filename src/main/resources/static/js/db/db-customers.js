import {css, html, LitElement} from '../lit.js';
import {get} from '../components/caracal-utilities.js';
import {Pager} from '../libs/pager.js';
import {buttonStyles} from '../styles/pager.js';

class DbCustomers extends LitElement {
    static styles = [
        buttonStyles,
        css`
          #response {
            height: 1.2rem;
          }
    
          content {
            display: flex;
            flex-direction: column;
            background-color: #DDD;
            border-radius: 5px;
            height: 31rem;
          }

          .table {
            display: flex;
            height: 23.45rem;
            flex-direction: column;
            justify-content: space-between;
          }
    
          .buttons {
            display: flex;
            flex-direction: row;
            justify-content: end;
            justify-items: end;
            padding: 0 5px;
          }
    
          caracal-checkbox {
            width: 10rem;
            padding-top: 10px;
          }
    
          caracal-button {
            align-self: flex-end;
          }
    
          #customers {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            table-layout: fixed;
            width: 100%;
          }
    
          #customers td, #customers th {
            border-bottom: 1px solid black;
            padding: 8px;
          }
    
          #customers th:first-child {
            border-top-left-radius: 5px;
          }
    
          #customers th:last-child {
            border-top-right-radius: 5px;
          }
    
          #customers tr:nth-child(even){background-color: lightblue;}
    
          #customers tr:hover {background-color: #aaa;}
    
          #customers th {
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 2px;
            text-align: left;
            background-color: #0083b0;
            color: white;
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
        this.info = await get('/camel/customers');
        this.response = '';

        setTimeout(() => {
            let pager = new Pager('customers', 7, this.shadowRoot);
            pager.init();
            pager.showPageNav('pageNavPosition');
            pager.showPage(1);
        }, 0);
    }

    async _refresh() {
        this.info = await get('/camel/customers');
    }

    renderHeader() {
        return html`
            <tr>
                <th style="width: 50px">Id</th>
                <th style="width: 150px">First Name</th>
                <th style="width: 150px">Last Name</th>
                <th style="width: 70px">Balance</th>
            </tr>
        `;
    }

    renderRow(row) {
        let dollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            useGrouping: true
        });

        return html`
            <tr>
                <td>${row.id}</td>
                <td>${row.firstName}</td>
                <td>${row.lastName}</td>
                <td>${dollar.format(row.balance).replace(/^(\D+)/, '$1 ')}</td>
            </tr>`
    }

    render(){
        return html`
            <content>
                <section>
                    <h1 slot="header">Customers</h1>
                    <section class="table">
                        <table id="customers" class="wp-list-table widefat striped posts">
                            <thead>${this.renderHeader()}</thead>
                            <tbody>${this.info.map(this.renderRow)}<tbody>
                        </table>
                        <div id="pageNavPosition" class="pager-nav"></div>
                    </section>
                </section>
                <section class="buttons">
                    <div id="response">${this.response}</div>
                    <caracal-button id="processButton" @click=${this._refresh}>Refresh</caracal-button>
                </section>
            </content>
        `;
    }
}

customElements.define('db-customers', DbCustomers);