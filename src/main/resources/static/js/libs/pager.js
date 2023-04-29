export function Pager(tableName, itemsPerPage, parent) {
    'use strict';

    this.tableName = tableName;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.pages = 0;
    this.inited = false;
    this.parent = parent;

    this.showRecords = function (from, to) {
        let rows = this.parent.getElementById(tableName).rows;

        // i starts from 1 to skip table header row
        for (let i = 1; i < rows.length; i++) {
            if (i < from || i > to) {
                rows[i].style.display = 'none';
            } else {
                rows[i].style.display = '';
            }
        }
    };

    this.showPage = function (pageNumber) {
        if (!this.inited) {
            // Not initialized
            return;
        }

        let oldPageAnchor = this.parent.getElementById('pg' + this.currentPage);
        oldPageAnchor.className = 'pg-normal';

        this.currentPage = pageNumber;
        let newPageAnchor = this.parent.getElementById('pg' + this.currentPage);
        newPageAnchor.className = 'pg-selected';

        let from = (pageNumber - 1) * itemsPerPage + 1;
        let to = from + itemsPerPage - 1;
        this.showRecords(from, to);
    };

    this.prev = function () {
        if (this.currentPage > 1) {
            this.showPage(this.currentPage - 1);
        }
    };

    this.next = function () {
        if (this.currentPage < this.pages) {
            this.showPage(this.currentPage + 1);
        }
    };

    this.init = function () {
        let rows = this.parent.getElementById(tableName).rows;
        let records = (rows.length - 1);

        this.pages = Math.ceil(records / itemsPerPage);
        this.inited = true;
    };

    this.showPageNav = function (positionId) {
        if (!this.inited) {
            // Not initialized
            return;
        }

        let element = this.parent.getElementById(positionId);
        let pagerHtml = '';

        for (let page = 1; page <= this.pages; page++)
            pagerHtml += `<span id="pg${page}" data-page="${page}" class="pg-normal pg-next">${page}</span>`;

        element.innerHTML = pagerHtml;

        this.parent
            .querySelectorAll(".pg-next")
            .forEach(i => i.addEventListener('click', (e) => { this.showPage(e.target.dataset["page"]) }));
    };
}