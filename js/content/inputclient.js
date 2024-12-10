import {getValue,onClick} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/element.js";

export function inputClient(){
    onClick('tombolsubmitclient',aksiSubmit);
    
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