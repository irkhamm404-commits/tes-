// api/logout.js

export default async function handler(req, res) {

    // ==========================
    // HANYA POST
    // ==========================

    if (req.method !== "POST") {

        return res.status(405).json({

            success: false,

            message: "Method Not Allowed"

        });

    }

    try {

        /*
        ==========================================
        Jika menggunakan JWT atau Session Database,
        hapus session/token di sini.
        ==========================================
        */

        return res.status(200).json({

            success: true,

            message: "Logout berhasil."

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error."

        });

    }

}
