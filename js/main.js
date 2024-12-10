import {toggleMenu} from "/js/menu/sidebar.js";
import {onClick} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/element.js";
import {onHashChange,redirect} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/url.js";
import {handleHashChange} from "/js/routes/route.js";
import {cekDataUser,logout} from "/js/auth/cek.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/cookie.js";
import {getJSON} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/api.js";


if (getCookie("login")){
    getJSON("https://asia-southeast2-awangga.cloudfunctions.net/florka/data/user","login",getCookie("login"),cekDataUser);
}else{
    redirect("/login");
}

onClick("burger-menu",toggleMenu);
onClick("close-menu",toggleMenu);
onClick("logout-btn",logout);

if (window.location.hash) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
}


onHashChange(handleHashChange);