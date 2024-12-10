import {getValue,onClick,container} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/element.js";
import {validatePhoneNumber} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/validate.js";


export function inputClient(){
    onClick('tombolsubmitclient',aksiSubmit);
    validatePhoneNumber(container('nomorpelanggan'));
}

function aksiSubmit(){
    const datapelanggan={
        namapelanggan:getValue('namapelanggan'),
        nomorpelanggan:getValue('nomorpelanggan'),
        namapasangan:getValue('namapasangan'),
        lokasi:getValue('lokasi'),
        tanggal:getValue('tanggal')
    }
    console.log(datapelanggan); 
}