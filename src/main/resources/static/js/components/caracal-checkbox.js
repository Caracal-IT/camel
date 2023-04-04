import {LitElement, html, css} from '../lit.js';

class CaracalCheckbox extends LitElement {
    static properties = {
        caption: {type: String},
        value: {type:String}
    };

    static styles = css`
          .container {
            display: block;
            position: relative;
            padding-left: 35px;
            margin-bottom: 12px;
            cursor: pointer;
            font-size: 22px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
      
          #caption {
            font-size: 1rem;
          }
        
          /* Hide the browser's default checkbox */
          .container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }
        
          /* Create a custom checkbox */
          .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 25px;
            width: 25px;
            background-color: white;
            border: 1px solid black;
            border-radius: 5px;
          }
        
          /* On mouse-over, add a grey background color */
          .container:hover input ~ .checkmark {
            background-color: #ccc;
          }
        
          /* When the checkbox is checked, add a blue background */
          .container input:checked ~ .checkmark {
            background-color: #2196F3;
          }
        
          /* Create the checkmark/indicator (hidden when not checked) */
          .checkmark:after {
            content: "";
            position: absolute;
            display: none;
          }
        
          /* Show the checkmark when checked */
          .container input:checked ~ .checkmark:after {
            display: block;
          }
        
          /* Style the checkmark/indicator */
          .container .checkmark:after {
            left: 9px;
            top: 5px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
          }
    `;

    render() {
        return html`
            <label class="container">
                <span id="caption">${this.caption}</span>
                <input type="checkbox" value="${this.value}">
                <span class="checkmark"></span>
            </label>            
        `;
    }
}

customElements.define('caracal-checkbox', CaracalCheckbox);