// controllers/auth.js
exports.login = async (req, res) => {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name || !role) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    if (role === 'admin') {
        if (password !== 'admin123') {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials",
            });
        }

        return res.status(200).json({
            success: true,
            name: `Dr. ${name}`,
            email,
        });
    }

    // For patients, allow any password (for now)
    if (role === 'patient') {
        return res.status(200).json({
            success: true,
            name,
            email,
        });
    }

    // If role is neither admin nor patient
    return res.status(400).json({
        success: false,
        message: "Invalid role",
    });
};
