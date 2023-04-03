import {LitElement, html, css} from '../lit.js';

class CaracalCard extends LitElement {
    static styles = css`
      :host-context {
        display: block;
        height: 100%;
        width: 100%;
      }
      
      section {
        display: flex;
        flex-flow: column;
        justify-content: space-between;        
        background: whitesmoke;
        width: 100%;
        height: 100%;
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: 10px 10px 5px rgba(0,0,0,.3);
      }
      
      #header {
        padding: 0 .5rem;
      }
    
      #content {        
        height: 100%;
        padding: 0 .5rem;
      }
      
      #buttons {
        align-self: flex-end;
      }
    `;

    render() {
        return html`
            <section class="card">
                <div id="header">
                    <slot name="header"></slot>
                </div>
                <div id="content">                   
                    <slot></slot>
                </div>
                <div id="buttons"><slot name="buttons"></slot></div>
            </section>
        `;
    }
}

customElements.define('caracal-card', CaracalCard);