import {css, html, LitElement} from '../lit.js';

class Metrics extends LitElement {
    static styles = css`
      main {
        display: flex;
        flex: 1 1;
      }

      .content {
        display: block;
        margin: 0 10px 5px 5px;
        width: 100%;
      }
      
      menu {
        margin: 0 0 5px 0;
        padding: 0;
        background-color: #444444;
        display: inline-block;
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

      action{
        width: 33rem;
        display: none;
      }

      .action.active {
        display: inline-block;
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
    }

    render(){
        return html`
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
           <caracal-card>
                <h1 slot="header">Metrics</h1>
                <main>
                    <menu>
                        <a href="#" class="active" data-elm="mqtt-publish" @click=${this._clickHandler}>
                            <slot>
                                <span class="material-symbols-outlined">info</span>
                            </slot>
                            Info</a>
                        <a href="#" data-elm="mqtt-publish" @click=${this._clickHandler}>
                            <slot>
                                <span class="material-symbols-outlined">alt_route</span>
                            </slot>
                            Routs
                        </a>
                    </menu>
                    <metrics-info class="content"></metrics-info>
                </main>
            </caracal-card>
        `;
    }
}

customElements.define('spring-metrics', Metrics);