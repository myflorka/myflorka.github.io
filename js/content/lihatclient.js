import {getValue,onClick,container,onInput,addCSSInHead,isCSSLoaded} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.9/element.js";
import {getJSON} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.9/api.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.9/cookie.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js';

export async function mainLihatClient(){
    //menambahkan css
    if(!isCSSLoaded("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css")){
        await addCSSInHead("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");
    }
    getJSON("https://asia-southeast2-awangga.cloudfunctions.net/florka/data/pelanggan/all",'login',getCookie('login'),runAfterGetData);
}

function runAfterGetData(result){
    if (result.status!==200){
        Swal.fire(result.data.status, result.data.response, 'warning');
        return;
    }
    const tbody = document.querySelector('.table-container table tbody');
    result.data.forEach((item, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td><a href="?idpel=${item.id}" target="_self">${item.namapelanggan}</a></td>
                <td>${item.namapasangan}</td>
                <td><a href="https://wa.me/${item.nomorpelanggan}" target="_blank">${item.nomorpelanggan}</a></td>
                <td>${item.tanggal}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}