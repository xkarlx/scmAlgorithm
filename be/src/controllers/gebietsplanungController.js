exports.getRecursivePartioningAlgorithmus = async (req, res, next) => {
    var pointList = []
    var betha = 0.5
    var inputCorrect = false

    const checkInput = (element) => {
        if (!("name" in element) || !("x" in element) || !("y" in element) || !("w" in element)) {
            return true;
        }
        return false;
    };

    if ("list" in req.body) {
        pointList = req.body["list"]
        if (!pointList.some(checkInput)) {
            inputCorrect = true
        }

    } else if (("name" in req.body) && ("x" in req.body) && ("y" in req.body) && ("w" in req.body)) {
     
        if (req.body["name"].length == req.body["x"].length && req.body["y"].length == req.body["w"].length && req.body["x"].length == req.body["w"].length) {
            inputCorrect = true
            
            for (var i = 0; i < req.body["name"].length; i++) {
                pointList.push({ "name": req.body["name"][i], "x": req.body["x"][i], "y": req.body["y"][i], "w": req.body["w"][i] })
            }
        }
    }


    if (inputCorrect) {
        if (! "betha" in req.body) {
            betha = 0.5
        }
        var splitResult ={}
        if("L"in req.body){
            splitResult = getSplitGiveLine(pointList,req.body["L"])
        }else{
            splitResult = getSplit(pointList)          
            
        }
        
        var cpVertical = getCp(splitResult.vertical.pointListLeft,splitResult.vertical.pointListRight,splitResult.vertical.x,true)
        var cpHorizontal = getCp(splitResult.horizontal.pointListUp,splitResult.horizontal.pointListDown,splitResult.horizontal.y,false)
        var balHorizontal = getBal(splitResult.horizontal.pointListUp,splitResult.horizontal.pointListDown)
        var balVertical = getBal(splitResult.vertical.pointListLeft,splitResult.vertical.pointListRight)
        var rk = getRk(balHorizontal,balVertical,cpHorizontal,cpVertical,betha)

        res.status(200).send({"rk":rk ,"cpVertical":cpVertical,"cpHorizontal":cpHorizontal,"balVertical":balVertical,"balHorizontal":balHorizontal,"splitResult": splitResult });


    } else {
        res.status(200).send({ "message": "import not correct defined" });
    }
    //TODO KPI & 4 Beriche

}


function getBal(pointListLeft,pointListRight) {
    var sumW = 0
    var sumLeft = 0
    var sumRight = 0
    pointListLeft.forEach(element => {
        sumLeft += element.w
    });
    pointListRight.forEach(element => {
        sumRight += element.w
    });
    var sumW = sumLeft + sumRight;
    var mu = sumW/2

    var balLeft= Math.abs((sumLeft-mu)/mu)
    var balRight= Math.abs((sumRight-mu)/mu)
    var bal = Math.max(balLeft,balRight)

    return {"bal":bal,"balLeft":balLeft,"balRight":balRight}
}

function getCp(pointListLeft,pointListRight,line,optX) {
    //left == top

    if(optX){
        
        pointLeftBottomY = Math.min(...pointListLeft.map(element => element.y))
       
        pointListLeft.sort((a,b) =>b.x-a.x)
        var pointLeftBottom = pointListLeft.find(element => element.y == pointLeftBottomY)
        
        pointRightBottomY = Math.min(...pointListRight.map(element => element.y))
        pointListRight.sort((a,b) =>a.x-b.x)
        var pointRightBottom = pointListRight.find(element => element.y == pointRightBottomY)
       
        var xPercent = (line-pointRightBottom.x)/(pointRightBottom.x - pointLeftBottom.x)
        var cYDown = xPercent * (pointRightBottom.y-pointLeftBottom.y)  + pointLeftBottom.y
        
        pointLeftTopY = Math.max(...pointListLeft.map(element => element.y))
        pointListLeft.sort((a,b) =>b.x-a.x)
        var pointLeftTop = pointListLeft.find(element => element.y == pointLeftTopY)
        pointRightTopY = Math.max(...pointListRight.map(element => element.y))
        pointListRight.sort((a,b) =>a.x-b.x)
        var pointRightTop = pointListRight.find(element => element.y == pointRightTopY)
        
        xPercent = (line-pointRightTop.x)/(pointRightTop.x - pointLeftTop.x)
        var cYTop = xPercent * (pointRightTop.y-pointLeftTop.y)  + pointLeftTop.y

        return {"c":Math.abs(cYTop-cYDown),"y1":cYDown,"y2":cYTop}

    }else{
        
        pointLeftTopX = Math.min(...pointListLeft.map(element => element.x))
       
        pointListLeft.sort((a,b) =>a.y-b.y)
        var pointLeftTop = pointListLeft.find(element => element.x == pointLeftTopX)
       
        pointLeftTopX = Math.min(...pointListRight.map(element => element.x))
        pointListRight.sort((a,b) =>b.y-a.y)
        var pointLeftBottom = pointListRight.find(element => element.x == pointLeftTopX)
        
        var xPercent = (line-pointLeftBottom.y)/(pointLeftTop.y - pointLeftBottom.y)
        var cXDown = xPercent * (pointLeftTop.x-pointLeftBottom.x)  + pointLeftBottom.x
        
        pointRightTopY = Math.max(...pointListLeft.map(element => element.x))
        pointListLeft.sort((a,b) =>a.y-b.y)
        var pointRightTop = pointListLeft.find(element => element.x == pointRightTopY)
        pointRightBottomY = Math.max(...pointListRight.map(element => element.x))
        pointListRight.sort((a,b) =>b.y-a.y)
        var pointRightBottom = pointListRight.find(element => element.x == pointRightBottomY)
        
        xPercent = (line-pointRightBottom.y)/(pointRightTop.y - pointRightBottom.y)
        var cXTop = xPercent * (pointRightTop.x-pointRightBottom.x)  + pointRightBottom.x
        
        return {"c":Math.abs(cXTop-cXDown),"x1":cXDown,"x2":cXTop}

    }

}


function getRk(balHorizontal,balVertical,cpHorizontal,cpVertical,betha) {
    var bal_max = Math.max(balHorizontal.bal,balVertical.bal)
    var cp_max = Math.max(cpHorizontal.c,cpVertical.c)

    var rkHorizontal = betha * balHorizontal.bal/bal_max + (1-betha) * cpHorizontal.c/cp_max
    var rkVertical = betha * balVertical.bal/bal_max + (1-betha) * cpVertical.c/cp_max
    var choose="both"
    if(rkHorizontal>rkVertical){
        choose="vetical"
    }else if(rkHorizontal<rkVertical){
        choose="horizontal"
    }
    return {"rkHorizontal":rkHorizontal,"rkVertical":rkVertical, "choose":choose}
}

function getSplitGiveLine(pointList,lines){

    var sumW = 0
    pointList.forEach(element => {
        sumW += element.w
    });

    sumWwish = sumW / 2

    pointList.sort((a, b) => a.x - b.x)

    var pointListLeftX = []
    var pointListRightX = []
    var wLeftX = 0
    var lastX = 0

    pointList.forEach(element => {
        if (element.x <= lines.x) {
            wLeftX += element.w
            lastX = element.x
            pointListLeftX.push(element)
        } else {
            pointListRightX.push(element)
        }
    });

    var verticalResult = { "x": lastX, "wSum": wLeftX, "pointListLeft": pointListLeftX, "pointListRight": pointListRightX }

    pointList.sort((a, b) => b.y - a.y)

    var pointListUpY = []
    var pointListDownY = []
    var wLeftY = 0
    var lastY = 0

    pointList.forEach(element => {
        if (element.y >= lines.y) {
            wLeftY += element.w
            lastY = element.y
            pointListUpY.push(element)
        } else {
            pointListDownY.push(element)
        }
    });

    var horizontalResult = { "y": lastY, "wSum": wLeftY, "pointListUp": pointListUpY, "pointListDown": pointListDownY }


    return { "horizontal": horizontalResult, "vertical": verticalResult }

}


function getSplit(pointList) {

    var sumW = 0
    pointList.forEach(element => {
        sumW += element.w
    });

    sumWwish = sumW / 2

    pointList.sort((a, b) => a.x - b.x)

    var pointListLeftX = []
    var pointListRightX = []
    var wLeftX = 0
    var lastX = 0

    pointList.forEach(element => {
        if (wLeftX + element.w < sumWwish || (wLeftX + element.w >= sumWwish && lastX == element.x)) {
            wLeftX += element.w
            lastX = element.x
            pointListLeftX.push(element)
        } else {
            pointListRightX.push(element)
        }
    });

    var verticalResult = { "x": lastX, "wSum": wLeftX, "pointListLeft": pointListLeftX, "pointListRight": pointListRightX }

    pointList.sort((a, b) => b.y - a.y)

    var pointListUpY = []
    var pointListDownY = []
    var wLeftY = 0
    var lastY = 0

    pointList.forEach(element => {
        if (wLeftY + element.w < sumWwish || (wLeftY + element.w >= sumWwish && lastY == element.y)) {
            wLeftY += element.w
            lastY = element.y
            pointListUpY.push(element)
        } else {
            pointListDownY.push(element)
        }
    });

    var horizontalResult = { "y": lastY, "wSum": wLeftY, "pointListUp": pointListUpY, "pointListDown": pointListDownY }


    return { "horizontal": horizontalResult, "vertical": verticalResult }
}





exports.getKompaktheitsMasse = async (req, res, next) => {

    if ("r_uK" in req.body && "A_Dj" in req.body) {


        res.status(200).json({
            "cp_Dj": Math.round(req.body["A_Dj"] / Math.pow(req.body["r_uK"], 2) / Math.PI * 1000) / 1000,
            "A_uK": Math.round(Math.pow(req.body["r_uK"], 2) * Math.PI * 100) / 100,

        })
    } else if ("U_Dj" in req.body && "A_Dj" in req.body) {

        res.status(200).json({
            "cp_Dj": Math.round(2 * Math.sqrt(Math.PI * req.body["A_Dj"]) / req.body["U_Dj"] * 1000) / 1000,
            "r_uK": Math.round(Math.sqrt(req.body["A_Dj"] / Math.PI) * 100) / 100,

        })

    } else {
        res.status(200).send({ "message": "import not correct defined" });
    }

}