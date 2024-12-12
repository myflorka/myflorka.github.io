import {getValue,onClick,container,onInput,addCSSInHead,isCSSLoaded,getAttributeValue} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";
import {validatePhoneNumber,formatRupiah} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/validate.js";
import {postJSON} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/api.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/cookie.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js';




export async function inputClient(){
    //menambahkan css
    if(!isCSSLoaded("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css")){
      await addCSSInHead("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");
    }
    //tombol
    onClick('tombolsubmitclient',aksiSubmit);
    onInput('nomorpelanggan',validatePhoneNumber);
    //check kelengkapan
    onInput('namapelanggan',checkInputs);
    onInput('namapasangan',checkInputs);
    onInput('lokasi',checkInputs);
    onInput('tanggal',checkInputs);
    onInput('paket',checkInputs);
    onInput('harga',formatRupiah);
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
        harga:+getAttributeValue('harga','data-value')
    }
    console.log(datapelanggan); 
    postJSON("https://asia-southeast2-awangga.cloudfunctions.net/florka/data/pelanggan","login",getCookie("login"),datapelanggan,runafterPostDataPelanggan)
}

function runafterPostDataPelanggan(result){
  console.log(result);
  if (result.status === 200){
    Swal.fire('Berhasil', 'Data '+result.data.namapelanggan+' sudah dimasukkan dengan ID '+result.data.id, 
      'success').then(({ isConfirmed }) => {
        if (isConfirmed) {
          window.location.href = '/';
        }
      });
  }else{
    Swal.fire(result.data.status, result.data.response, 'warning');
  }
}