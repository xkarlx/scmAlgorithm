
exports.getKostenminimalerWohnstandort = async (req, res, next) => {
    
    if("P_z" in req.body && "d_1" in req.body && "P_d1" in req.body && "Q" in req.body && "V" in req.body && "K" in req.body){
        
        var r = - 1 / req.body["d_1"] * Math.log(req.body["P_d1"]/req.body["P_z"])
        
        var d_opt = 1 / r * ( Math.log(r* req.body["Q"] * req.body["P_z"]) - Math.log(req.body["V"] * req.body["K"]) )
        var C_d = req.body["Q"] * req.body["P_z"] * Math.exp(-r*d_opt) + req.body["V"]*req.body["K"]*d_opt
        
        var V_wohnung_zentrum = r * req.body["Q"] * req.body["P_z"] / req.body["K"]

        res.status(200).json({"C(d_opt)": Math.round(C_d*100)/100,
                                "d_opt": Math.round(d_opt*100)/100,
                                "r": Math.round(r*1000)/1000,
                                "V_wohnung_zentrum" :  Math.round(V_wohnung_zentrum*100)/100
                    })
    }else{
        res.status(200).send({"message":"import not correct defined"});
    }
  
  
};

exports.getBodennutzung = async (req, res, next) => {

    data = req.body
    result = []
    data.sort(function(a, b) {
        return a.Transportkosten - b.Transportkosten;
      });
    data.sort(function(a, b) {
        return a.Gewinn - b.Gewinn;
      }).reverse();
    
    last_push = data.shift()
    last_push.d = 0;
    result.push ( last_push );

    while (data.length > 0){
        data.sort(function(a, b) {
            return a.Gewinn - b.Gewinn;
          }).reverse();

        data.forEach(element => {
            element.d = ( last_push.Gewinn - element.Gewinn ) / (last_push.Transportkosten - element.Transportkosten )
        });
        
        var data = data.filter(element =>  element.d >= 0)
        data.sort(function(a, b) {
            return a.d - b.d;
          })
        if(data.length>0){
            last_last_d = last_push.d
            last_push = data.shift()      
            if(last_push.Gewinn -last_last_d * last_push.Transportkosten >0 ){
                result.push(last_push)
            }
           
        }
        
    }
    last_element = result[result.length - 1]
    d_max = last_element.Gewinn / last_element.Transportkosten
    result.forEach(element => {
        element.d = Math.round(element.d * 100) / 100
    });

    res.status(200).json({ data: result, d_max :  Math.round(d_max * 100) / 100
                    })


};


exports.getModelHuff = async (req, res, next) => {
  
    if("r" in req.body && "einrichtungen" in req.body){
  
        locations = req.body["einrichtungen"]
        sumA_EK = 0
        locations.forEach(element => {
            element.A_EK = element.w_E / Math.pow(element.d_KE,req.body["r"])
            sumA_EK+= element.A_EK
        })

        locations.forEach(element => {
            element.P_EK = Math.round(element.A_EK / sumA_EK *10000)/10000
            element.A_EK = Math.round(element.A_EK  *100)/100         
        })

        res.status(200).json({"locations": locations
                    })
    }else{
        res.status(200).send({"message":"import not correct defined"});
    }
  
  
};