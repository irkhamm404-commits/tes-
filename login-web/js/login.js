// ==========================================
// CodingXOndev - LOGIN SYSTEM
// js/login.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENT
    // ==========================================

    const loginForm = document.getElementById("loginForm");

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const togglePassword = document.getElementById("togglePassword");

    const loginButton = document.getElementById("loginButton");

    const buttonText = loginButton.querySelector(".text");
    const loader = loginButton.querySelector(".loader");

    const rememberCheckbox = document.querySelector(
        ".remember input[type='checkbox']"
    );


    // ==========================================
    // RESTORE REMEMBERED USERNAME
    // ==========================================

    const rememberedUsername = localStorage.getItem(
        "rememberedUsername"
    );

    if (rememberedUsername) {

        usernameInput.value = rememberedUsername;

        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }

    }


    // ==========================================
    // SHOW / HIDE PASSWORD
    // ==========================================

    togglePassword.addEventListener("click", () => {

        const icon = togglePassword.querySelector("i");

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            icon.classList.remove("fa-eye");

            icon.classList.add("fa-eye-slash");

        } else {

            passwordInput.type = "password";

            icon.classList.remove("fa-eye-slash");

            icon.classList.add("fa-eye");

        }

    });


    // ==========================================
    // SET LOADING STATE
    // ==========================================

    function setLoading(status) {

        if (status) {

            loginButton.disabled = true;

            buttonText.textContent = "Memproses...";

            loader.style.display = "block";

            loginButton.style.cursor = "not-allowed";

            loginButton.style.opacity = ".8";

        } else {

            loginButton.disabled = false;

            buttonText.textContent = "Login";

            loader.style.display = "none";

            loginButton.style.cursor = "pointer";

            loginButton.style.opacity = "1";

        }

    }


    // ==========================================
    // INPUT ERROR EFFECT
    // ==========================================

    function inputError(input) {

        input.style.border = "1px solid #ff4d6d";

        input.style.boxShadow =
            "0 0 18px rgba(255,77,109,.30)";

        input.animate(
            [
                {
                    transform: "translateX(0)"
                },

                {
                    transform: "translateX(-6px)"
                },

                {
                    transform: "translateX(6px)"
                },

                {
                    transform: "translateX(-4px)"
                },

                {
                    transform: "translateX(4px)"
                },

                {
                    transform: "translateX(0)"
                }
            ],
            {
                duration: 350,
                easing: "ease"
            }
        );

    }


    // ==========================================
    // CLEAR INPUT ERROR
    // ==========================================

    function clearInputError(input) {

        input.style.border = "";

        input.style.boxShadow = "";

    }


    usernameInput.addEventListener("input", () => {

        clearInputError(usernameInput);

    });


    passwordInput.addEventListener("input", () => {

        clearInputError(passwordInput);

    });


    // ==========================================
    // FORM SUBMIT
    // ==========================================

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        // ==========================================
        // AMBIL VALUE
        // ==========================================

        const username = usernameInput.value.trim();

        const password = passwordInput.value;


        // ==========================================
        // VALIDASI USERNAME
        // ==========================================

        if (!username) {

            inputError(usernameInput);

            showToast(
                "Username wajib diisi.",
                "warning"
            );

            usernameInput.focus();

            return;

        }


        // ==========================================
        // VALIDASI PASSWORD
        // ==========================================

        if (!password) {

            inputError(passwordInput);

            showToast(
                "Password wajib diisi.",
                "warning"
            );

            passwordInput.focus();

            return;

        }


        // ==========================================
        // MINIMAL PASSWORD
        // ==========================================

        if (password.length < 4) {

            inputError(passwordInput);

            showToast(
                "Password minimal 4 karakter.",
                "warning"
            );

            passwordInput.focus();

            return;

        }


        // ==========================================
        // LOADING
        // ==========================================

        setLoading(true);


        try {

            // ==========================================
            // REQUEST LOGIN
            // ==========================================

            const response = await fetch(
                "/api/login",
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        username,
                        password

                    })

                }
            );


            // ==========================================
            // PARSE RESPONSE
            // ==========================================

            let data;

            try {

                data = await response.json();

            } catch {

                throw new Error(
                    "Response server tidak valid."
                );

            }


            // ==========================================
            // LOGIN GAGAL
            // ==========================================

            if (!response.ok || !data.success) {

                inputError(passwordInput);

                showToast(
                    data.message ||
                    "Username atau password salah.",
                    "error"
                );

                setLoading(false);

                return;

            }


            // ==========================================
            // REMEMBER USERNAME
            // ==========================================

            if (
                rememberCheckbox &&
                rememberCheckbox.checked
            ) {

                localStorage.setItem(
                    "rememberedUsername",
                    username
                );

            } else {

                localStorage.removeItem(
                    "rememberedUsername"
                );

            }


            // ==========================================
            // SIMPAN DATA USER NON-SENSITIF
            // ==========================================

            const userData = {

                username:
                    data.user?.username ||
                    username,

                name:
                    data.user?.name ||
                    username,

                role:
                    data.user?.role ||
                    "User"

            };


            localStorage.setItem(
                "user",
                JSON.stringify(userData)
            );


            // ==========================================
            // LOGIN SUCCESS
            // ==========================================

            buttonText.textContent =
                "Berhasil!";


            showToast(
                `Selamat datang, ${userData.name}!`,
                "success"
            );


            // ==========================================
            // REDIRECT
            // ==========================================

            setTimeout(() => {

                window.location.replace(
                    "/dashboard.html"
                );

            }, 1000);


        } catch (error) {

            console.error(
                "Login Error:",
                error
            );


            showToast(
                "Tidak dapat terhubung ke server.",
                "error"
            );


            setLoading(false);

        }

    });


    // ==========================================
    // ENTER PASSWORD
    // ==========================================

    passwordInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                loginForm.requestSubmit();

            }

        }
    );


    // ==========================================
    // ENTER USERNAME
    // ==========================================

    usernameInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                passwordInput.focus();

            }

        }
    );

});
