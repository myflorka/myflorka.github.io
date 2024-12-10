import {setInner} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/element.js";
import {deleteCookie} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/cookie.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/url.js";

export function cekDataUser(result){
    console.log(result);
    if (result.status !== 200){
        redirect("/login");
    }else{
        setInner("user-name",result.data.name);
    }
}

export function logout(){
    deleteCookie("login");
    redirect("/login");
}