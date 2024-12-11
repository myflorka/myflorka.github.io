import {getValue,onClick,container,onInput,addCSSInHead,isCSSLoaded} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.9/element.js";
import {validatePhoneNumber} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/validate.js";
import {postJSON} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/api.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/cookie.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js';




export async function mainpengeluaranClient(){
    //menambahkan css
    if(!isCSSLoaded("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css")){
      await addCSSInHead("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");
    }
    //tombol
    onClick('tombolsubmitpengeluaran',aksiSubmit);
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
        idpelanggan:getValue('idpel'),
        jenis:getValue('jenis'),
        objek:getValue('objek'),
        harga:getValue('harga'),
        keterangan:getValue('keterangan'),
        tanggal:getValue('tanggal')
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