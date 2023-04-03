import {LitElement, html, css} from './lit.js';

class CaracalSettings extends LitElement {
    static styles = css``;

    static properties = {
        cloudBrokerUrl: {type: String},
        serverBrokerUrl: {type: String}
    };

    connectedCallback() {
        super.connectedCallback()

        fetch("/api/settings")
            .then(data => data.json())
            .then(settings => {
                this.cloudBrokerUrl = settings.cloudBrokerUrl;
                this.serverBrokerUrl = settings.serverBrokerUrl;
            });
    }

    render() {
        return html`
            <caracal-card>
                <h1 slot="header">Settings</h1>                
                <caracal-input caption="Cloud Broker Url" readonly="readonly" value="${this.cloudBrokerUrl}"></caracal-input>
                <caracal-input caption="Server Broker Url" readonly="readonly" value="${this.serverBrokerUrl}"></caracal-input>
                <div slot="buttons">&nbsp</div>
            </caracal-card>
        `;
    }
}

customElements.define('caracal-settings', CaracalSettings);