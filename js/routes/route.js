import {getHash} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/url.js";
import {renderHTML,addCSSInHead,isCSSLoaded} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.9/element.js";
import {showLoader} from "/js/routes/loader.js";
import {inputClient} from "/js/content/inputclient.js";

export function handleHashChange(event) {
    console.log('Hash changed!');
    console.log('Old URL:', event.oldURL);
    console.log('New URL:', event.newURL);

    // Ambil hash dari URL
    const currentHash = getHash();
    console.log('Current Hash:', currentHash);

    // Tambahkan logika berdasarkan hash
    switch(currentHash) {
        case "home":
            showLoader('main-content');
            // Kode untuk value1
            renderHTML('main-content', '/content/home.html', inputClient);
            break;
        case "inputclient":
            showLoader('main-content');
            if(!isCSSLoaded("/css/form.css")){
                addCSSInHead("/css/form.css");
            }
            // Kode untuk value2
            renderHTML('main-content', '/content/inputclient.html', inputClient);
            break;
        default:
            showLoader('main-content');
            renderHTML('main-content', '/content/home.html', inputClient);
    }
}