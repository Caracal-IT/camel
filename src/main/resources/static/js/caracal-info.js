import {LitElement, html, css} from './lit.js';
class CaracalInfo extends LitElement {
    static styles = css`
      content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 5px;
        margin-bottom: 5px;
        height: 31rem;
      }

      content div {
        display: flex;
        background: #DDD;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        height: 31rem;
        width: 31rem;
        margin: 5px auto;
      }

      img {
        height: 25rem;
        width: 25rem;
        margin-left: 50px;
      }

      .fade-in {
        animation: fadeIn ease 10s;
        -webkit-animation: fadeIn ease 10s;
        -moz-animation: fadeIn ease 10s;
        -o-animation: fadeIn ease 10s;
        -ms-animation: fadeIn ease 10s;
      }
      @keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
      }

      @-moz-keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
      }

      @-webkit-keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
      }

      @-o-keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
      }

      @-ms-keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
      }
    `;

    render() {
        return html`
            <caracal-card>
                <h1 slot="header">Caracal Camel Demo</h1>
                <content>
                    <div>
                        <div class="fade-in">
                            <img alt="logo" src="images/camel.png" />
                        </div>
                    </div>
                </content>
            </caracal-card>
        `;
    }
}

customElements.define('caracal-info', CaracalInfo);