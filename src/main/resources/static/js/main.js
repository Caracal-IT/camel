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

    const activeMenuItem = document.querySelector("a[href='" + window.location.hash + "']");

    if(activeMenuItem == null) {
        window.location.hash = "settings";
        return;
    }

    const elm = activeMenuItem.dataset.elm;

    const items = document.querySelectorAll("header a");
    items.forEach(i => i.classList.remove('active'))
    activeMenuItem?.classList.add('active');

    const activeItem = document.querySelector('main div .active');
    const newItem = document.querySelector(elm);

    activeItem?.classList.remove('active')
    newItem?.classList.add('active');
}