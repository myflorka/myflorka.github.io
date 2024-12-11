import {setInner} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.9/element.js";


export function setTitleHeader(result){
    if(result.status===200){
        setInner('headertulisan',result.data.namapelanggan+' & '+result.data.namapasangan);
        return;
    }
    
}