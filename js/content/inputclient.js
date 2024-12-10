import {getValue,onClick,container,onInput} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/element.js";
import {validatePhoneNumber} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/validate.js";


export function inputClient(){
    onClick('tombolsubmitclient',aksiSubmit);
    onInput('nomorpelanggan',validatePhoneNumber);
    //check kelengkapan
    onInput('namapelanggan',checkInputs);
    onInput('namapasangan',checkInputs);
    onInput('lokasi',checkInputs);
    onInput('tanggal',checkInputs);
    onInput('paket',checkInputs);
    onInput('harga',checkInputs);
    onInput('alamat',checkInputs);
}


function checkInputs() {
    if (getValue('namapelanggan').trim() !== '' && getValue('nomorpelanggan').trim() !== '' 
    && getValue('namapasangan').trim() !== '' && getValue('lokasi').trim() !== '' 
    && getValue('paket').trim() !== '' && getValue('harga').trim() !== '' 
    && getValue('tanggal').trim() !== '' && getValue('alamat').trim() !== '') {
      container('tombolsubmitclient').disabled = false; // Aktifkan tombol
    } else {
      container('tombolsubmitclient').disabled = true; // Nonaktifkan tombol
    }
  }

function aksiSubmit(){
    const datapelanggan={
        namapelanggan:getValue('namapelanggan'),
        nomorpelanggan:getValue('nomorpelanggan'),
        namapasangan:getValue('namapasangan'),
        alamat:getValue('alamat'),
        lokasi:getValue('lokasi'),
        tanggal:getValue('tanggal'),
        paket:getValue('paket'),
        harga:+getValue('harga')
    }
    console.log(datapelanggan); 
}