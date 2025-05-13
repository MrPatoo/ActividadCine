const logoutController = {};
logoutController.logout = async (req, res)=>{
    //borrar las cookies de "authToken"
    res.clearCookies("authToken")

    return res.json({message: "Sesion cerrada"});

};

export default logoutController