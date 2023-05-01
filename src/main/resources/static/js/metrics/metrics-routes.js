import {css, html, LitElement} from '../lit.js';
import {get} from '../components/caracal-utilities.js';
import {Pager} from '../libs/pager.js';
import {buttonStyles} from '../styles/pager.js';

class MetricsRoutes extends LitElement {
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
    
          #routes {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            table-layout: fixed;
            width: 100%;
          }
    
          #routes td, #routes th {
            border-bottom: 1px solid black;
            padding: 8px;
          }
    
          #routes th:first-child {
            border-top-left-radius: 5px;
          }
    
          #routes th:last-child {
            border-top-right-radius: 5px;
          }
    
          #routes tr td:last-child {
            font-weight: bolder;
          }
    
          #routes tr:nth-child(even){background-color: lightblue;}
    
          #routes tr:hover {background-color: #aaa;}
    
          #routes th {
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
        info: {type: Object},
        autoRefreshEvent: {type: Object}
    };

    constructor() {
        super();

        this.info = [];
        this.autoRefreshEvent = setInterval(async () => this.info = await get('/actuator/camelroutes'), 1000);
    }

    async connectedCallback() {
        super.connectedCallback()

        this.response = 'Loading ...';
        this.info = await get('/actuator/camelroutes');
        this.response = '';

        setTimeout(() => {
            let pager = new Pager('routes', 7, this.shadowRoot);
            pager.init();
            pager.showPageNav('pageNavPosition');
            pager.showPage(1);
        }, 0);
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        clearInterval(this.autoRefreshEvent);
    }

    async _refresh() {
        await this.connectedCallback();
    }

    _autoRefresh(event) {
        clearInterval(this.autoRefreshEvent);

        if(event.target.value)
            this.autoRefreshEvent = setInterval(async () => this.info = await get('/actuator/camelroutes'), 1000);
    }

    renderHeader() {
        return html`
            <tr>
                <th style="width: 200px">Id</th>
                <th style="width: 100px">Uptime</th>
                <th style="width: 60px">Status</th>
            </tr>
        `;
    }

    renderRow(row) {
        if(!row.id.startsWith("java") && !row.id.startsWith("xml"))
            return null;

        let color = '';
        let status = row.status;

        if(row.uptimeMillis > 40000) {
            color = 'green';
        } else if(row.uptimeMillis > 200) {
            color = 'orange';
            status = 'Pending';
        } else {
            color = 'red';
        }

        return html`
            <tr>
                <td>${row.id}</td>
                <td>${row.uptime}</td>
                <td style="color:${color}">${status}</td>
            </tr>`
    }

    render(){
        return html`
            <content>
                <section>
                    <h1 slot="header">Routes</h1>
                    <section class="table">
                        <table id="routes" class="wp-list-table widefat striped posts">
                            <thead>${this.renderHeader()}</thead>
                            <tbody>${this.info.map(this.renderRow)}<tbody>
                        </table>
                        <div id="pageNavPosition" class="pager-nav"></div>
                    </section>
                </section>
                <section class="buttons">
                    <div id="response">${this.response}</div>
                    <caracal-checkbox id="autoRefresh" @click=${this._autoRefresh} caption="Auto Refresh" value=${true}></caracal-checkbox>
                    <caracal-button id="processButton" @click=${this._refresh}>Refresh</caracal-button>
                </section>
            </content>
        `;
    }
}

customElements.define('metrics-routes', MetricsRoutes);