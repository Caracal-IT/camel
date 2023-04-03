import {LitElement, html, css} from './lit.js';

class MqttPublish extends LitElement {
    static styles = css``;

    static properties = {
        cloudBrokerUrl: {type: String},
        serverBrokerUrl: {type: String}
    };

    connectedCallback() {
        super.connectedCallback()

        //const publishButton = document.getElementById("publishButton");
        //publishButton.addEventListener('click', this.publish)
    }

    _clickHandler(){
        alert("zzzz");
    }

    render() {
        return html`
            <caracal-card>
                <h1 slot="header">Mqtt Publish</h1>                
                <caracal-input caption="Topic" value="CUSTOMERS"></caracal-input>
                <caracal-input caption="Message" value="Message1"></caracal-input>
                <div slot="buttons">
                    <caracal-button id="publishButton" @click=${this._clickHandler}>Publish</caracal-button>
                </div>
            </caracal-card>
        `;
    }
}

customElements.define('mqtt-publish', MqttPublish);