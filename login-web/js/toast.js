const toast = document.getElementById("toast");

let toastTimeout = null;

/*
=========================================
TAMPILKAN TOAST
=========================================
*/

function showToast(
    message,
    type = "info"
) {

    clearTimeout(toastTimeout);

    let bg = "";

    let icon = "";

    switch (type) {

        case "success":

            bg = "linear-gradient(135deg,#00d68f,#00b46e)";
            icon = "fa-circle-check";

            break;

        case "error":

            bg = "linear-gradient(135deg,#ff4d6d,#ff1744)";
            icon = "fa-circle-xmark";

            break;

        case "warning":

            bg = "linear-gradient(135deg,#ffb703,#fb8500)";
            icon = "fa-triangle-exclamation";

            break;

        default:

            bg = "linear-gradient(135deg,#5B7CFF,#8B5CFF)";
            icon = "fa-circle-info";

    }

    toast.innerHTML = `
        <div class="toast-card">

            <div class="toast-icon">

                <i class="fa-solid ${icon}"></i>

            </div>

            <div class="toast-text">

                ${message}

            </div>

        </div>
    `;

    toast.style.background = bg;

    toast.style.position = "fixed";
    toast.style.top = "25px";
    toast.style.right = "25px";

    toast.style.padding = "16px 22px";

    toast.style.borderRadius = "16px";

    toast.style.color = "#fff";

    toast.style.fontFamily = "Poppins,sans-serif";

    toast.style.fontSize = "14px";

    toast.style.zIndex = "999999";

    toast.style.display = "flex";

    toast.style.alignItems = "center";

    toast.style.boxShadow =
        "0 15px 40px rgba(0,0,0,.35)";

    toast.style.backdropFilter = "blur(20px)";

    toast.style.opacity = "0";

    toast.style.transform =
        "translateX(120px)";

    requestAnimationFrame(() => {

        toast.style.transition =
            ".35s ease";

        toast.style.opacity = "1";

        toast.style.transform =
            "translateX(0)";

    });

    toastTimeout = setTimeout(hideToast, 3000);

}

/*
=========================================
SEMBUNYIKAN
=========================================
*/

function hideToast() {

    toast.style.opacity = "0";

    toast.style.transform =
        "translateX(120px)";

}

/*
=========================================
STYLE
=========================================
*/

const style = document.createElement("style");

style.innerHTML = `

.toast-card{

display:flex;

align-items:center;

gap:12px;

}

.toast-icon{

width:34px;

height:34px;

display:flex;

justify-content:center;

align-items:center;

border-radius:50%;

background:rgba(255,255,255,.18);

font-size:18px;

}

.toast-text{

font-weight:500;

line-height:1.4;

}

@media(max-width:600px){

#toast{

left:15px;

right:15px!important;

top:15px!important;

transform:none!important;

width:auto;

}

}

`;

document.head.appendChild(style);

/*
=========================================
AKSES GLOBAL
=========================================
*/

window.showToast = showToast;
window.hideToast = hideToast;

/*
=========================================
CONTOH

showToast("Login berhasil","success");

showToast("Password salah","error");

showToast("Periksa kembali data","warning");

showToast("Selamat datang","info");

=========================================
*/
