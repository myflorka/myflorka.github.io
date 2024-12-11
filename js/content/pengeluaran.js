import {getValue,setValue,onClick,container,onInput,addCSSInHead,isCSSLoaded} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.9/element.js";
import {postJSON} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/api.js";
import {getQueryString} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.9/url.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/cookie.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js';




export async function mainpengeluaranClient(){
    //menambahkan css
    if(!isCSSLoaded("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css")){
      await addCSSInHead("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");
    }
    //tombol
    onClick('tombolsubmitpengeluaran',aksiSubmit);
    //check kelengkapan
    onInput('jenis',checkInputs);
    onInput('harga',checkInputs);
    onInput('objek',checkInputs);
    onInput('tanggal',checkInputs);
    onInput('keterangan',checkInputs);
   
}


function checkInputs() {
    const query = getQueryString(); // Memanggil fungsi
    if (getValue('jenis').trim() !== '' && getValue('objek').trim() !== '' 
    && getValue('harga').trim() !== '' && getValue('keterangan').trim() !== '' 
    && getValue('tanggal').trim() !== '' && query.idpel.trim() !== '' ) {
      container('tombolsubmitpengeluaran').disabled = false; // Aktifkan tombol
    } else {
      container('tombolsubmitpengeluaran').disabled = true; // Nonaktifkan tombol
    }
  }

function aksiSubmit(){
  const query = getQueryString();
    const datapengeluaran={
        idpelanggan:query.idpel,
        jenis:getValue('jenis'),
        objek:getValue('objek'),
        harga:getValue('harga'),
        keterangan:getValue('keterangan'),
        tanggal:getValue('tanggal')
    }
    console.log(datapengeluaran); 
    postJSON("https://asia-southeast2-awangga.cloudfunctions.net/florka/data/pengeluaran","login",getCookie("login"),datapelanggan,runafterPostDataPengeluaran)
}

function runafterPostDataPengeluaran(result){
  console.log(result);
  if (result.status === 200){
    Swal.fire('Berhasil', 'Data '+result.data.objek+' sudah dimasukkan dengan ID '+result.data.id, 
      'success').then(({ isConfirmed }) => {
        if (isConfirmed) {
          setValue('jenis','');
          setValue('objek','');
          setValue('harga','');
          setValue('keterangan','');
          setValue('tanggal','');
        }
      });
  }else{
    Swal.fire(result.data.status, result.data.response, 'warning');
  }
}