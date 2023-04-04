import {LitElement, html, css} from '../lit.js';

class CaracalInput extends LitElement {
    static properties = {
        caption: {type: String},
        readonly: {type: String},
        value: {type:String}
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
        background-color: whitesmoke;
        border: 2px solid black;
        cursor: default;
      }
    `;

    render() {
        if(this.readonly && this.readonly.length > 0)
            return html`
                <div class="form-data">
                    <label for="serverBrokerUrl">${this.caption}</label>
                    <input id="serverBrokerUrl" value="${this.value}" readonly="${this.readonly}"  />
                </div
            `;
        else {
            return html`
                <div class="form-data">
                    <label for="serverBrokerUrl">${this.caption}</label>
                    <input id="serverBrokerUrl" value="${this.value}" />
                </div
            `;
        }
    }
}

customElements.define('caracal-input', CaracalInput);