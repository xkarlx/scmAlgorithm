const { permittedCrossDomainPolicies } = require("helmet");

exports.getMedianproblemeKnotenbeschraenkt = async (req, res, next) => {
    
    if("kosten" in req.body && "distanzmatrix" in req.body ){
        
        var costList = req.body["kosten"]
        var costMatrix = transformCostList(costList)
        var distanzMatrix = req.body["distanzmatrix"]
        
        var resultMatrix = multiplyMatrices(costMatrix,distanzMatrix)
        
        var columSumList = columnSum(resultMatrix);
        
        var result = Math.min(...columSumList)
        var indexList = []
        var i=0
        columSumList.forEach(element => {
            if(element == result){
                indexList.push(i)
            }
            i+=1
        });
       
        res.status(200).json({ "index": indexList,
                                "info":"index starts at 0",
                                "f_minimum": result,
                                "columSum": columSumList,
                                "matrix" : resultMatrix
                    })
    }else{
        res.status(200).send({"message":"import not correct defined"});
    }
  
  
};

function multiplyMatrices(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

function transformCostList(costList){
    var matrix = []
    for(var i =0; i<costList.length;i++){
        var row=[]
        for(var i2=0;i2<costList.length;i2++){
            if(i==i2){
                row.push(costList[i])
            }else{
                row.push(0)
            }
        }
        matrix.push(row)
    }
    return matrix
}

function columnSum(m1){
    var resultList = m1.map(element => 0)
    for(var i=0; i< resultList.length; i++){
        for(var i2=0;i2 <resultList.length;i2++){            
            resultList[i2] += m1[i][i2]
        }  
    }
    return resultList;
}

function columnMax(m1){
    var transposedMatrix=transposeMatrix(m1)
    var resultList = []
    transposedMatrix.forEach(element => {
        resultList.push(Math.max(...element))
    })
    return resultList;
}

function transposeMatrix(m1){
    var newArray = [];
    for(var i = 0; i < m1.length; i++){
        newArray.push([]);
    };

    for(var i = 0; i < m1.length; i++){
        for(var j = 0; j < m1.length; j++){
            newArray[j].push(m1[i][j]);
        };
    };

    return newArray;
}

exports.getCenterproblemeKnotenbeschraenkt = async (req, res, next) => {
    
    if("kosten" in req.body && "distanzmatrix" in req.body ){
        
        var costList = req.body["kosten"]
        var costMatrix = transformCostList(costList)
        var unweightedCostMatrix = transformCostList(costList.map(element=>1))
        var distanzMatrix = req.body["distanzmatrix"]
        
        var resultMatrix = multiplyMatrices(costMatrix,distanzMatrix)
        var unweightedResultMatrix = distanzMatrix

        var columnMaxList = columnMax(resultMatrix);
        var columnUnweightedMaxList = columnMax(unweightedResultMatrix);
        
        var result = Math.min(...columnMaxList)
        var resultUnweighted = Math.min(...columnUnweightedMaxList)

        var indexList = []
        var i=0
        columnMaxList.forEach(element => {
            if(element == result){
                indexList.push(i)
            }
            i+=1
        });

        var indexUnweightedList = []
        var i=0
        columnUnweightedMaxList.forEach(element => {
            if(element == resultUnweighted){
                indexUnweightedList.push(i)
            }
            i+=1
        });
       
        res.status(200).json({"gewichtet":{ "index": indexList,
                                "info":"index starts at 0",
                                "f_minimum": result,
                                "columMax": columnMaxList,
                                "matrix" : resultMatrix
                    },"ungewichtet":{ "index": indexUnweightedList,
                    "info":"index starts at 0",
                    "f_minimum": resultUnweighted,
                    "columMax": columnUnweightedMaxList,
                    "matrix" : unweightedResultMatrix
                    }})
    }else{
        res.status(200).send({"message":"import not correct defined"});
    }
  
  
};

exports.getDistanzmessungNetzwerke = async (req, res, next) => {

    const checkInput = (element) => {
        if (!("name" in element) || !("0" in element) || !("1" in element)) {
            return true;
        }
        return false;
    };
    
    if("0" in req.body && "1" in req.body && "d_01" in req.body && "distanzen" in req.body ){
        
        var nameStart = req.body["0"]
        var nameZiel = req.body["1"]
        var distanceStraigth = req.body["d_01"]
        var distanceList = req.body["distanzen"]
        if(!distanceList.some(checkInput)){
            
            var filterStart = distanceList.filter(element => element.name == nameStart);
            var filterZiel = distanceList.filter(element => element.name == nameZiel);

            if(filterStart.length==0){
                distanceList.push({"name":nameStart,"0":0,"1":distanceStraigth})
            }
            if(filterZiel.length==0){
                distanceList.push({"name":nameZiel,"0":distanceStraigth,"1":0})
            }
            var result = []
            distanceList.forEach(element => {
                result.push(getStraigthData(element,distanceStraigth))
            })
            

            res.status(200).json(result)

        }else{
            res.status(200).send({"message":"import not correct defined"});
        }
       
        
    }else{
        res.status(200).send({"message":"import not correct defined"});
    }
}

function getStraigthData(element,distanceStraigth){
    var k=0
    
    k = (element["1"] - element["0"]+distanceStraigth)/2/distanceStraigth
    

    var name = element["name"]
    var isBottleneck = false
    if(k<=0){
        k=0
        isBottleneck = false
    }else if (k>=1){
        k=1
        isBottleneck = false
    }else{
        isBottleneck = true
    }
    var straight = ""
    if(element["0"]<element[1]+distanceStraigth){
        straight = distanceStraigth +" * t " + element[0]
    }else{        
        straight = "-"+distanceStraigth +" * t " + (element[1]+distanceStraigth)
    }
    return {"name": name, "k": k, "isBottleneck": isBottleneck, "straight": straight}


}