module.exports = {  
    // Secret key for JWT signing and encryption
    'secret': process.env.SECRET,
    // Database connection information
    'database': process.env.DB_HOST,
    // Setting port for server
    'port': process.env.PORT || 3000
}