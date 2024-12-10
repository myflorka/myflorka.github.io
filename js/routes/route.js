import {getHash} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/url.js";
import {renderHTML,addCSSInHead} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/element.js";
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
            renderHTML('content', '/content/home.html', inputClient);
            break;
        case "inputclient":
            addCSSInHead("/css/form.css");
            showLoader('main-content');
            // Kode untuk value2
            renderHTML('content', '/content/inputclient.html', inputClient);
            break;
        default:
            showLoader('main-content');
            renderHTML('content', '/content/home.html', inputClient);
    }
}