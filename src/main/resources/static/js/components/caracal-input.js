import {LitElement, html, css} from '../lit.js';

class CaracalInput extends LitElement {
    static properties = {
        type: {type: String},
        caption: {type: String},
        readonly: {type: String},
        value: {
            type:String,
            notify: true,
            observer: '_valueChanged'
        }
    };

    static styles = css`
      .form-data {
        display: flex;
        flex-flow: column;
        gap: .3rem;
        margin: .8rem 0;
      }
      
      input {
        border-radius: 10px;
        padding: 5px 5px;
        font: inherit;
        border: 2px solid black;        
      }

      input:focus {
        border: 2px solid #0083b0;
        background: lightblue;
        outline:none;
      }

      input[readonly],
      input[readonly]:focus {
        background-color: transparent;
        border: 2px solid black;
        cursor: default;
      }
    `;

    constructor() {
        super();
        this.value = '';
    }

    render() {
        if(this.readonly && this.readonly.length > 0)
            return html`
                <div class="form-data">
                    <label for="serverBrokerUrl">${this.caption}</label>
                    <input type="${this.type}" id="serverBrokerUrl" value="${this.value}" readonly="${this.readonly}"  />
                </div
            `;
        else {
            return html`
                <div class="form-data">
                    <label for="serverBrokerUrl">${this.caption}</label>
                    <input id="serverBrokerUrl" type="${this.type}" @input=${event => this.value = event.target.value} .value="${this.value}" />
                </div
            `;
        }
    }
}

customElements.define('caracal-input', CaracalInput);