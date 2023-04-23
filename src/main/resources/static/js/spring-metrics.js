import {css, html, LitElement} from './lit.js';
import {get} from "./components/caracal-utilities.js";

class Metrics extends LitElement {
    static styles = css`
      #response {
        height: 1.2rem;
      }

      a {
        display: inline-block;
        text-decoration: none;
        color: black;
        font-size: 1rem;
        padding: .5rem;
      }

      a.active {
        text-decoration: underline;
        color: hotpink;
      }

      a:hover {
        text-decoration: underline;
      }

      action{
        width: 33rem;
        display: none;
      }

      .action.active {
        display: inline-block;
        color: hotpink;
      }
    `;

    _clickHandler(event) {
        event.preventDefault();

        for (let element of this.shadowRoot.querySelectorAll("a")) {
            element.classList.remove('active')
        }

        const menuItem = event.target;
        menuItem.classList.add('active');
    }

    render(){
        return html`
            <caracal-card>
                <h1 slot="header">Metrics</h1>
                <a href="#publish" class="active" data-elm="mqtt-publish" @click=${this._clickHandler}>Metrics</a>
                |<a href="#publish" data-elm="mqtt-publish" @click=${this._clickHandler}>Publish</a>
            </caracal-card>
        `;
    }
}

customElements.define('spring-metrics', Metrics);