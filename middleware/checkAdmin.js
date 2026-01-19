const checkAdmin = (req,res,next) => {
    const isAdmin = req.body.isAdmin;
    if (isAdmin) {
        next();
} else {
    res.status(403).send
    ({message:"You are not allowed tho perform the activity !"})

}
};

export default checkAdmin;