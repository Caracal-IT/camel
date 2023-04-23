window.addEventListener("hashchange", () => {
    changePage();
});

window.onload = () => {
    changePage();
}

function changePage(){
    if(window.location.hash.length < 2) {
        window.location.hash = "settings";
        return;
    }

    const container = document.querySelector(".container");

    const activeMenuItem = document.querySelector("a[href='" + window.location.hash + "']");

    if(activeMenuItem == null) {
        window.location.hash = "settings";
        return;
    }

    const elm = activeMenuItem.dataset.elm;

    const items = document.querySelectorAll("header a");
    items.forEach(i => i.classList.remove('active'))
    activeMenuItem?.classList.add('active');

    const activeItem = document.querySelector('.container').children[0];
    const newItem = document.createElement(elm);

    if(activeItem !== null)
        container.removeChild(activeItem);

    newItem.className = "action active"
    container.append(newItem)
}