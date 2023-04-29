import {LitElement, html, css} from './lit.js';
class CaracalInfo extends LitElement {
    static styles = css`
      content {
        display: flex;
        background: #DDD url("/images/camel.png");
        flex-direction: column;
        justify-content: space-between;
        border-radius: 5px;
        padding: 0 5px;
        margin-bottom: 5px;
        height: 31rem;
      }
    `;

    render() {
        return html`
            <caracal-card>
                <h1 slot="header">Caracal Camel Demo</h1>
                <content>
                
                </content>
            </caracal-card>
        `;
    }
}

customElements.define('caracal-info', CaracalInfo);