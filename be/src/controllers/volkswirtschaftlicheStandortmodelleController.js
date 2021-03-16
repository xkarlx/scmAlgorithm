
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

    data.forEach(element => {
        element.d_max = element.Gewinn/element.Transportkosten
    })

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
        console.log(data,last_push)
        data = data.filter(element =>  element.d >= 0 && element.d < Math.min(element.d_max,last_push.d_max))
        
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
        element.d_max = Math.round(element.d_max * 100) / 100
    });

    res.status(200).json({ data: result, d_max :  Math.round(d_max * 100) / 100
                    })


};


exports.getModelHuff = async (req, res, next) => {
  
    if("r" in req.body && "einrichtungen" in req.body){
  
        var locations = req.body["einrichtungen"]
        var sumA_EK = 0
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


exports.getLeaderFollowerModelle = async (req, res, next) => {
    
    if("s_r" in req.body && "s_l" in req.body && "nachfrage" in req.body){
  
        var demands = req.body["nachfrage"]
        var s_r = req.body["s_r"]
        var s_l = req.body["s_l"]
        var marketShare = {}
        var aggressivStrategy = {}
        var maxStrategy ={}
        if("leader" in req.body){
            var leaderPosition = req.body["leader"]   
            var marketShare = getMarketShareLeaderGiven(demands,s_r,s_l,leaderPosition)
            var aggressivStrategyIndex = marketShare["leader"].indexOf(Math.min(...marketShare["leader"]))
            aggressivStrategy = {"index": aggressivStrategyIndex,"marketShareLeader":marketShare["leader"][aggressivStrategyIndex],"marketShareFollower":marketShare["follower"][aggressivStrategyIndex],"marketShare":marketShare};
            var maxStrategyIndex = marketShare["follower"].indexOf(Math.max(...marketShare["follower"]));
            maxStrategy = {"index": maxStrategyIndex,"marketShareLeader":marketShare["leader"][maxStrategyIndex],"marketShareFollower":marketShare["follower"][maxStrategyIndex],"marketShare":marketShare};
           
        }else{

        }

        res.status(200).json({"aggressivStrategy": aggressivStrategy, "maxStrategy":maxStrategy
                    })
    }else{
        res.status(200).send({"message":"import not correct defined"});
    }
  
  
};

function getMarketShareLeaderGiven(demands,s_r,s_l,leaderPosition){
    
    marketShare={}
    marketShare["follower"]=demands.map(x => 0)
    marketShare["leader"]=demands.map(x => 0)

    if(leaderPosition-s_l>=0){
        leaderPositionLeft = leaderPosition-s_l
    }else{
        leaderPositionLeft = 0
    }
    if(leaderPosition-s_r<demands.length){
        leaderPositionRight = leaderPosition+s_r
    }else{
        leaderPositionRight = 0
    }

    for(var followerPosition=0; followerPosition<demands.length;followerPosition++){
        if(followerPosition != leaderPosition){
            
        for(var i=-s_l+followerPosition; i<=s_r+followerPosition;i++){
            
            if(i>=0 && i < demands.length ){
                
                if(i<=followerPosition && followerPosition < leaderPosition){
                    marketShare["follower"][followerPosition] += demands[i]
                    
                }else if(Math.abs(i-followerPosition)==Math.abs(i-leaderPosition)){
                    marketShare["follower"][followerPosition] += demands[i]/2
                    
                }else if(Math.abs(i-followerPosition)<Math.abs(i-leaderPosition)){
                    marketShare["follower"][followerPosition] += demands[i]
                }
            }
        }  
        
        for(var i=leaderPositionLeft; i<=leaderPositionRight;i++){
            
            if(i>=0 && i < demands.length ){
               
                if(Math.abs(i-followerPosition)-Math.abs(i-leaderPosition)>0){
                    marketShare["leader"][followerPosition] += demands[i]
                    
                }else if(Math.abs(i-followerPosition)-Math.abs(i-leaderPosition)==0){
                    marketShare["leader"][followerPosition] += demands[i]/2
                }
            }
        }   
        
        
        }else{
            marketShare["leader"][leaderPosition] = Infinity
            marketShare["follower"][leaderPosition] = 0
        }

    }


    
    return marketShare

}