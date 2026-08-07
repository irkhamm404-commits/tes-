/*
==========================================
CodingXOndev Dashboard
==========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*
    ==========================================
    AMBIL DATA USER
    ==========================================
    */

    const user = JSON.parse(localStorage.getItem("user"));

    /*
    ==========================================
    BELUM LOGIN
    ==========================================
    */

    if (!user) {

        window.location.replace("/");

        return;

    }

    /*
    ==========================================
    ELEMENT
    ==========================================
    */

    const username = document.getElementById("username");

    const welcomeName = document.getElementById("welcomeName");

    const avatar = document.getElementById("avatar");

    const logoutBtn = document.getElementById("logoutBtn");

    /*
    ==========================================
    TAMPILKAN DATA
    ==========================================
    */

    username.textContent = user.username;

    welcomeName.textContent =
        user.name || user.username;

    /*
    ==========================================
    AVATAR
    ==========================================
    */

    let firstLetter =
        (user.name || user.username)
        .charAt(0)
        .toUpperCase();

    avatar.textContent = firstLetter;

    /*
    ==========================================
    ANIMASI CARD
    ==========================================
    */

    const cards =
        document.querySelectorAll(".card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(25px)";

        setTimeout(() => {

            card.style.transition =
                ".45s ease";

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0)";

        }, index * 100);

    });

    /*
    ==========================================
    WAKTU
    ==========================================
    */

    function greeting() {

        const hour = new Date().getHours();

        let text = "";

        if (hour >= 5 && hour < 11) {

            text = "Selamat Pagi";

        } else if (hour < 15) {

            text = "Selamat Siang";

        } else if (hour < 18) {

            text = "Selamat Sore";

        } else {

            text = "Selamat Malam";

        }

        document.querySelector(".welcome").innerHTML =
            `${text}, <span id="welcomeName">${user.name || user.username}</span> 👋`;

    }

    greeting();

    /*
    ==========================================
    LOGOUT
    ==========================================
    */

    logoutBtn.addEventListener("click", async () => {

        logoutBtn.disabled = true;

        logoutBtn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i>';

        try {

            await fetch("/api/logout", {
                method: "POST"
            });

        } catch (e) {

            console.log(e);

        }

        localStorage.removeItem("user");

        setTimeout(() => {

            window.location.replace("/");

        }, 500);

    });

    /*
    ==========================================
    ANTI BACK
    ==========================================
    */

    window.history.pushState(null, "", window.location.href);

    window.onpopstate = function () {

        window.history.pushState(
            null,
            "",
            window.location.href
        );

    };

    /*
    ==========================================
    UPDATE JAM
    ==========================================
    */

    setInterval(() => {

        greeting();

    }, 60000);

});
