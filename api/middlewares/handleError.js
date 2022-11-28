function handleError(err, req, res, next){
    
    res.status(400).json({err: err.message})
}

module.exports = handleError