import {getValue,setValue,onClick,container,onInput,addCSSInHead,isCSSLoaded,getAttributeValue} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";
import {formatRupiah} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/validate.js";
import {postJSON} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/api.js";
import {getQueryString,setHash} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.9/url.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/cookie.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js';




export async function mainpengeluaranClient(){
  //menambahkan css
  if(!isCSSLoaded("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css")){
    await addCSSInHead("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");
  }
  //pengecekan param pelanggan
  const query = getQueryString();
  if(!query.idpel){
    Swal.fire('Pelanggan Belum Dipilih', 'Silahkan pilih pelanggan dulu dari menu lihat pelanggan', 
      'warning').then(({ isConfirmed }) => {
        if (isConfirmed) {
          setHash('lihatclient');
          return;
        }
      });
  }
  
  //tombol
  onClick('tombolsubmitpengeluaran',aksiSubmit);
  //check kelengkapan
  onInput('jenis',checkInputs);
  onInput('harga',formatRupiah);
  onInput('objek',checkInputs);
  onInput('tanggal',checkInputs);
  onInput('keterangan',checkInputs); 
}


function checkInputs() {
    const query = getQueryString(); // Memanggil fungsi
    if (getValue('jenis').trim() !== '' && getValue('objek').trim() !== '' 
    && getValue('harga').trim() !== '' && getValue('keterangan').trim() !== '' 
    && getValue('tanggal').trim() !== '' && query.idpel !== '' ) {
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
        harga:+getAttributeValue('harga','data-value'),
        keterangan:getValue('keterangan'),
        tanggal:getValue('tanggal')
    }
    console.log(datapengeluaran); 
    container('tombolsubmitpengeluaran').disabled = true; // Nonaktifkan tombol
    postJSON("https://asia-southeast2-awangga.cloudfunctions.net/florka/data/pengeluaran","login",getCookie("login"),datapengeluaran,runafterPostDataPengeluaran)
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
          container('tombolsubmitpengeluaran').disabled = true; // Nonaktifkan tombol
        }
      });
  }else{
    Swal.fire(result.data.status, result.data.response, 'warning');
  }
}