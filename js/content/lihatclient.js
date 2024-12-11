import {getJSON} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.9/api.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.9/cookie.js";

export function mainLihatClient(){
    getJSON("",'login',getCookie('login'),runAfterGetData);
}

function runAfterGetData(){
    
}