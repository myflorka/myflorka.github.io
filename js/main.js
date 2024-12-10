import {toggleMenu} from "/js/menu/sidebar.js";
import {onClick} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/element.js";
import {onHashChange} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/url.js";
import {handleHashChange} from "/js/routes/route.js";

onClick("burger-menu",toggleMenu);
onClick("close-menu",toggleMenu);

if (window.location.hash) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
}


onHashChange(handleHashChange);