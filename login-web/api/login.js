// api/login.js

export default async function handler(req, res) {

    // Hanya menerima POST
    if (req.method !== "POST") {

        return res.status(405).json({
            success: false,
            message: "Method Not Allowed"
        });

    }

    try {

        const { username, password } = req.body || {};

        // Validasi input
        if (!username || !password) {

            return res.status(400).json({

                success: false,

                message: "Username dan password wajib diisi."

            });

        }

        // ==========================
        // DAFTAR USER
        // ==========================

        const users = [

            {

                username: "admin",

                password: "admin123",

                name: "Administrator",

                role: "Admin"

            },

            {

                username: "user",

                password: "user123",

                name: "User",

                role: "Member"

            }

        ];

        // Cari user
        const account = users.find(user =>

            user.username === username &&
            user.password === password

        );

        if (!account) {

            return res.status(401).json({

                success: false,

                message: "Username atau password salah."

            });

        }

        // Token sederhana (contoh)
        const token = Buffer.from(

            `${account.username}:${Date.now()}`

        ).toString("base64");

        return res.status(200).json({

            success: true,

            message: "Login berhasil.",

            token,

            user: {

                username: account.username,

                name: account.name,

                role: account.role

            }

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Terjadi kesalahan pada server."

        });

    }

                  }
