import {css, html, LitElement} from '../lit.js';

class Metrics extends LitElement {
    static styles = css`
      
      caracal-card div {
        display: flex;
        justify-content: space-between;
        gap: 5px;
        margin: 0 0 5px 0;
      }
      
      .content {
        display: block;
        flex: 1 1;
      }
      
      menu {
        margin: 0;
        display: flex;
        flex-direction: column;
        padding: 0 0 5px 0;
        background-color: #444444;
        border-radius: 5px;
        width: 5rem;
      }

      menu a {
        font-family: Roboto;
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: black;
        font-size: 1rem;
        padding: .4rem 0;
        align-items:center;
        justify-content:center;
        color: #888;
        width: 5rem;
        height: 5rem;
      }

      menu a.active {
        //text-decoration: underline;
        color: whitesmoke;
        background-color: #00b4db;
        border-radius: 5px;
      }

      menu a:hover {
        //text-decoration: underline;
      }
      
      span {
        font-family: inherit;
      }

      .material-symbols-outlined {
        font-size: 3.8rem;
      }
    `;

    async _clickHandler(event) {
        event.preventDefault();
        this.shadowRoot.querySelector("a.active")?.classList?.remove('active');

        let menuItem = event.target;

        if(menuItem.localName === 'span')
            menuItem = menuItem.parentElement.parentElement;

        menuItem.classList.add('active');

        const elm = menuItem.dataset.elm;

        const main = this.shadowRoot.querySelector('caracal-card div');
        const current = this.shadowRoot.querySelector('.content');
        const newItem = document.createElement(elm);
        newItem.className = 'content';

        main.replaceChild(newItem, current);
    }

    render(){
        return html`
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
           <caracal-card>
                <h1 slot="header">Metrics</h1>
                <div>
                    <menu>
                        <a href="#" class="active" data-elm="metrics-info" @click=${this._clickHandler}>
                            <slot>
                                <span class="material-symbols-outlined">info</span>
                            </slot>
                            Info</a>
                        <a href="#" data-elm="metrics-routes" @click=${this._clickHandler}>
                            <slot>
                                <span class="material-symbols-outlined">alt_route</span>
                            </slot>
                            Routs
                        </a>
                    </menu>
                    <metrics-info class="content"></metrics-info>
                </div>
            </caracal-card>
        `;
    }
}

customElements.define('spring-metrics', Metrics);