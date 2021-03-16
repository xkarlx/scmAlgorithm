exports.getRecursivePartioningAlgorithmus = async (req, res, next) => {



}


exports.getKompaktheitsMasse = async (req, res, next) => {

    if ("r_uK" in req.body && "A_Dj" in req.body ) {

        
        res.status(200).json({
            "cp_Dj": Math.round(req.body["A_Dj"]/Math.pow(req.body["r_uK"],2)/Math.PI * 1000) / 1000,
            "A_uK": Math.round(Math.pow(req.body["r_uK"],2)*Math.PI * 100) / 100,
           
        })
    }else if("U_Dj" in req.body && "A_Dj" in req.body ){

        res.status(200).json({
            "cp_Dj": Math.round(2*Math.sqrt(Math.PI*req.body["A_Dj"])/req.body["U_Dj"] * 1000) / 1000,
            "r_uK": Math.round(Math.sqrt(req.body["A_Dj"]/Math.PI) * 100) / 100,
           
        })

    } else {
        res.status(200).send({ "message": "import not correct defined" });
    }

}