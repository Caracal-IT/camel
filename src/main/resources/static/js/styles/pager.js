import {css} from '../lit.js';
export const buttonStyles = css`
    .pager-nav {
        margin: 16px 0;
    }
    .pager-nav span {
        display: inline-block;
        padding: 4px 8px;
        margin: 1px;
        cursor: pointer;
        font-size: 14px;
        background-color: #FFFFFF;
        border: 1px solid #e1e1e1;
        border-radius: 3px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    }
    .pager-nav span:hover,
    .pager-nav .pg-selected {
        background-color: #f9f9f9;
        border: 1px solid #CCCCCC;
    }
`;