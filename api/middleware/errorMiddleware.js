const errorCatch = (err, req, res, next) => {

    // console.log(err)
    if (err.code === 11000) {
        return res.json({
            message: Object.keys(err.keyValue) + "için girilen " + Object.values(err.keyValue) 
            + " veritabanında olduğundan tekrar eklenemez/güncellenemez.",
            errorCode: 400
        })
    }
    if (err.code === 66) {
        return res.json({
            message: "Değiştirilemez bir alanı güncelleyemezsiniz.",
            errorCode: 400
        })
    }
    res.status(err.statusCode || 500)
    res.json({
        errorCode: err.statusCode || 500,
        message: err.message
    })
}
module.exports = errorCatch