module.exports.isAdmin = (req,res,next) => {
    try {
        const {role} = req.user
        if(role === 'admin') {
            next()
        }
        else {
            return res.status(403).json({
                error: {
                    message: 'ไม่มีสิทธิ์ใช้งาน เฉพาะ admin'
                }
            })
        }
    } catch (error) {
        next(error)
    }
}