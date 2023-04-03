import {LitElement, html, css} from '../lit.js';

class CaracalButton extends LitElement {
    static styles = css`          
          button {
            display: inline-block;
            background-color: #0083b0;
            padding: .5rem .7rem;
            min-width: 100px;
            color: #ffffff;
            text-align: center;
            border: 1px solid #cccccc; 
            border-radius: 10px; 
            font-size: 1rem; 
            margin: .5rem;
          }
    
          button:hover {
            background-color: #00b4db;
          }
    `;

    render() {
        return html`
            <button><slot></slot></button>
        `;
    }
}

customElements.define('caracal-button', CaracalButton);