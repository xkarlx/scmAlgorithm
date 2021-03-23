const { get } = require("../routes/standortplanungEbeneRoutes");

exports.getDistanzmessung = async (req, res, next) => {

    if ("x1" in req.body && "x2" in req.body && "y1" in req.body && "y2" in req.body) {

        var distance_l1 = Math.abs(req.body["x1"] - req.body["y1"]) + Math.abs(req.body["x2"] - req.body["y2"])
        var distance_linf = Math.max(Math.abs(req.body["x1"] - req.body["y1"]), Math.abs(req.body["x2"] - req.body["y2"]))
        var distance_l2 = Math.sqrt(Math.pow(Math.abs(req.body["x1"] - req.body["y1"]), 2) + Math.pow(Math.abs(req.body["x2"] - req.body["y2"]), 2))
        var distance_l22 = Math.pow(Math.abs(req.body["x1"] - req.body["y1"]), 2) + Math.pow(Math.abs(req.body["x2"] - req.body["y2"]), 2)

        res.status(200).json({
            "Tchebychev Entfernung l_inf": Math.round(distance_linf * 100) / 100,
            "Euklidische Entfernung l_2": Math.round(distance_l2 * 100) / 100,
            "Manhatten Entfernung l_1": Math.round(distance_l1 * 100) / 100,
            "l_2^2": Math.round(distance_l22 * 100) / 100
        })
    } else {
        res.status(200).send({ "message": "import not correct defined" });
    }

};

exports.get1MedianproblemeL1 = async (req, res, next) => {

    var inputJSON = req.body
    const checkInput = (element) => {
        if (!("x" in element) || !("y" in element) || !("w" in element)) {
            return true;
        }
        return false;
    };
    var sumWeights = 0;
    var checkDominanz = (element) => {
        if (element.w / sumWeights >= 0.5) {
            return true;
        } else {
            return false;
        }
    }


    var pointList = [];
    if (Object.keys(inputJSON).length > 0) {

        for (const key of Object.keys(inputJSON)) {
            pointList.push(inputJSON[key]);
        }

        if (!pointList.some(checkInput)) {
            sumWeights = pointList.map((a) => a.w).reduce((a, b) => a + b, 0);

            if (!pointList.some(checkDominanz)) {
                pointList.sort((a, b) => a.x - b.x);
                var sumWeightsX = 0
                var sumWeightsY = 0
                var result = { "dominanz kriterium": false }
                for (var i = 0; i < pointList.length; i++) {
                    sumWeightsX += pointList[i].w
                    if (sumWeightsX >= sumWeights / 2) {
                        result.sum_weights_x = sumWeightsX;
                        result.x = pointList[i].x
                        break;
                    }
                }
                pointList.sort((a, b) => a.y - b.y);

                for (var i = 0; i < pointList.length; i++) {
                    sumWeightsY += pointList[i].w
                    if (sumWeightsY >= sumWeights / 2) {
                        result.sum_weights_y = sumWeightsY;
                        result.y = pointList[i].y
                        break;
                    }
                }
                result.f_x = 0
                pointList.forEach(element => {
                    result.f_x += element.w * (Math.abs(element.x - result.x) + Math.abs(element.y - result.y))
                })

                result["l1-Distance"] =0
                pointList.forEach(element => {
                    result["l1-Distance"] +=  (Math.abs(element.x - result.x) + Math.abs(element.y - result.y))
                })

                res.status(200).json(result);

            } else {
                pointList.sort((a, b) => a.w - b.w);
                var result = pointList.pop()
                res.status(200).send({ "dominanz kriterium": true, "x": result.x, "y": result.y, "w": result.w });
            }

        } else {
            res.status(200).send({ "message": "import not correct defined" });
        }
    } else {
        res.status(200).send({ "message": "import not correct defined" });
    }

}


exports.get1MedianproblemeL22 = async (req, res, next) => {

    var inputJSON = req.body
    const checkInput = (element) => {
        if (!("x" in element) || !("y" in element) || !("w" in element)) {
            return true;
        }
        return false;
    };
    var sumWeights = 0;

    var pointList = [];
    if (Object.keys(inputJSON).length > 0) {

        for (const key of Object.keys(inputJSON)) {
            pointList.push(inputJSON[key]);
        }

        if (!pointList.some(checkInput)) {
            result = getCenterOfGravity(pointList)
            res.status(200).json(result);

        } else {
            res.status(200).send({ "message": "import not correct defined" });
        }
    } else {
        res.status(200).send({ "message": "import not correct defined" });
    }

}


exports.get1MedianproblemeL2 = async (req, res, next) => {

    var inputJSON = req.body
    const checkInput = (element) => {
        if (!("x" in element) || !("y" in element) || !("w" in element)) {
            return true;
        }
        return false;
    };
    var sumWeights = 0;

    var pointList = [];
    if ("list" in inputJSON && "delta" in inputJSON) {
        var delta = inputJSON["delta"];

        if (inputJSON["list"].length > 0) {
            pointList = inputJSON["list"]

            if (!pointList.some(checkInput)) {

                var result = {}
                var ergDominanz = []
                for (var i = 0; i < pointList.length; i++) {
                    ergDominanz.push({ ...pointList[i], ...getTightendeDominanzCriteriation(pointList, i) })
                }

                if (ergDominanz.some(element => element.dominanzFullfilled)) {
                    res.status(200).send({ "dominanz": ergDominanz, "dominanzFullfilled": true });
                } else {
                    var centerPoint = {}
                    if ("center" in req.body) {
                        if ("x" in req.body["center"] && "y" in req.body["center"]) {
                            centerPoint = req.body["center"]
                        } else {
                            res.status(200).send({ "message": "import not correct defined" });
                        }
                    } else {
                        centerPoint = getCenterOfGravity(pointList)
                    }

                    var f_centerPoint = getL2FunctionValue(pointList, { "x": centerPoint.x, "y": centerPoint.y })

                    iteration_list = []
                    iteration_list.push({ "x": centerPoint.x, "y": centerPoint.y, "f": f_centerPoint })
                    var delta_new = 0
                    var f = f_centerPoint
                    var f_new = 0
                    var new_point = { "x": centerPoint.x, "y": centerPoint.y }
                    do {

                        new_point = getWeiszfeldIteration(pointList, new_point)
                        f_new = getL2FunctionValue(pointList, new_point)
                        delta_new = (f - f_new) / f
                        f = f_new
                        iteration_list.push({ "x": new_point.x, "y": new_point.y, "f": f_new, "delta": delta_new })
                        console.log(delta, delta_new, delta >= delta_new)
                    } while (delta <= delta_new);

                    res.status(200).send({ "dominanz": ergDominanz, "dominanzFullfilled": true, "nr. iteration": iteration_list.length - 1, "final_iteration": iteration_list[iteration_list.length - 1], "iteration": iteration_list });
                }

            } else {
                res.status(200).send({ "message": "import not correct defined" });
            }
        } else {
            res.status(200).send({ "message": "import not correct defined" });
        }
    } else {
        res.status(200).send({ "message": "import not correct defined" });
    }

}


function getTightendeDominanzCriteriation(pointList, index) {
    var result = 0
    var sum_x = 0
    var sum_y = 0
    var i = 0
    var dominanzFullfilled = false
    pointList.forEach(element => {
        if (i != index) {

            sum_x += element.w * (pointList[index].x - element.x) / getL2Distance({ "x": pointList[index].x, "y": pointList[index].y }, { "x": element.x, "y": element.y })
            sum_y += element.w * (pointList[index].y - element.y) / getL2Distance({ "x": pointList[index].x, "y": pointList[index].y }, { "x": element.x, "y": element.y })

        }
        i += 1
    })
    erg_distance = getL2Distance({ "x": sum_x, "y": sum_y }, { "x": 0, "y": 0 })
    if (erg_distance <= pointList[index].w) {
        dominanzFullfilled = true
    }
    return { "dominanz value": Math.round(erg_distance * 100) / 100, "dominanzFullfilled": dominanzFullfilled, "point": { "x": Math.round(sum_x * 100) / 100, "y": Math.round(sum_y * 100) / 100 } }
}

function getL2Distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
}

function getCenterOfGravity(pointList) {
    sumWeights = pointList.map((a) => a.w).reduce((a, b) => a + b, 0);
    var result = {}
    result.x = 0
    result.y = 0
    result.f_x = 0
    result.f_y = 0
    pointList.forEach(element => {
        result.x += element.w * element.x / sumWeights;
        result.y += element.w * element.y / sumWeights
    }
    )
    pointList.forEach(element => {
        result.f_x += element.w * Math.pow(element.x - result.x, 2);
        result.f_y += element.w * Math.pow(element.y - result.y, 2);
    }
    )
    result.f_xy = Math.round((result.f_x + result.f_y) * 100) / 100
    result.f_x = Math.round(result.f_x * 100) / 100
    result.f_y = Math.round(result.f_y * 100) / 100
    result.x = Math.round(result.x * 100) / 100
    result.y = Math.round(result.y * 100) / 100

    result.distance_x_l2 = 0
    result.distance_y_l2  = 0
    result.distance_xy_l2  = 0

    result.distance_x_l2_ungewichtet = 0
    result.distance_y_l2_ungewichtet  = 0
    result.distance_xy_l2_ungewichtet  = 0

    pointList.forEach(element => {
        result.distance_x_l2_ungewichtet += getL2Distance({"x":element.x,"y":0},{"x":result.x,"y":0});
        result.distance_y_l2_ungewichtet +=getL2Distance({"x":0,"y":element.y},{"x":0,"y":result.y});
        result.distance_xy_l2_ungewichtet += getL2Distance(element,result);
    })

    result.distance_x_l2_ungewichtet = Math.round(result.distance_x_l2_ungewichtet * 100) / 100    
    result.distance_y_l2_ungewichtet = Math.round(result.distance_y_l2_ungewichtet * 100) / 100
    result.distance_xy_l2_ungewichtet = Math.round(result.distance_xy_l2_ungewichtet * 100) / 100

    pointList.forEach(element => {
        result.distance_x_l2 += element.w * getL2Distance({"x":element.x,"y":0},{"x":result.x,"y":0});
        result.distance_y_l2 += element.w *getL2Distance({"x":0,"y":element.y},{"x":0,"y":result.y});
        result.distance_xy_l2 += element.w *getL2Distance(element,result);
    })

    result.distance_x_l2 = Math.round(result.distance_x_l2 * 100) / 100    
    result.distance_y_l2 = Math.round(result.distance_y_l2 * 100) / 100
    result.distance_xy_l2 = Math.round(result.distance_xy_l2 * 100) / 100


    return result
}



function getWeiszfeldIteration(pointList, point) {
    var result_x = 0
    var result_y = 0
    var result_1_x = 0
    var result_1_y = 0
    pointList.forEach(element => {
        var distance = getL2Distance(point, { "x": element.x, "y": element.y });
        result_x += element.w * element.x / distance
        result_y += element.w * element.y / distance
        result_1_x += element.w * 1 / distance
        result_1_y += element.w * 1 / distance
    })
    return { "x": result_x / result_1_x, "y": result_y / result_1_y }
}

function getL2FunctionValue(pointList, point) {
    var result = 0
    pointList.forEach(element => {
        result += element.w * Math.sqrt(Math.pow(element.x - point.x, 2) + Math.pow(element.y - point.y, 2))
    })

    return result
}



exports.get1CenterproblemeL1 = async (req, res, next) => {

    var inputJSON = req.body
    const checkInput = (element) => {
        if (!("x" in element) || !("y" in element)) {
            return true;
        }
        return false;
    };

    var pointList = [];
    if ("list" in inputJSON && "l_1" in inputJSON) {
        var transformPoints = inputJSON["l_1"];




        if (inputJSON["list"].length > 0) {
            pointList = inputJSON["list"]

            if (!pointList.some(checkInput)) {

                if (transformPoints) {
                    pointList.forEach(element => {

                        var transformedPoints = transformL1ToLinf({ "x": element.x, "y": element.y })
                        element.xInf = transformedPoints.xInf
                        element.yInf = transformedPoints.yInf
                    })
                } else {
                    pointList.forEach(element => {
                        var transformedPoints = transformLInfToL1({ "xInf": element.x, "yInf": element.y })
                        element.xInf = element.x
                        element.yInf = element.y
                        element.x = transformedPoints.x
                        element.y = transformedPoints.y
                    })
                }
                var rectangle = {
                    "ul": { "xInf": Math.min(...pointList.map(element => element.xInf)), "yInf": Math.min(...pointList.map(element => element.yInf)) },
                    "or": { "xInf": Math.max(...pointList.map(element => element.xInf)), "yInf": Math.max(...pointList.map(element => element.yInf)) }
                }
                var rectangleQ1 ={}
                var rectangleQ2 ={} 
                if(Math.abs(rectangle["ul"]["xInf"]-rectangle["or"]["xInf"]) >  Math.abs(rectangle["ul"]["yInf"]-rectangle["or"]["yInf"])){
                    //dehne in y Richtung
                     rectangleQ1 = { "ul": rectangle["ul"], "or": { "xInf": rectangle["or"]["xInf"], "yInf": rectangle["ul"]["yInf"] + rectangle["or"]["xInf"] - rectangle["ul"]["xInf"] } }
                     rectangleQ2 = { "ul": { "xInf": rectangle["ul"]["xInf"], "yInf": rectangle["or"]["yInf"] - rectangle["or"]["xInf"] + rectangle["ul"]["xInf"] }, "or": rectangle["or"] }
               
                }else{
                    var scaleLength = Math.abs(rectangle["ul"]["yInf"]-rectangle["or"]["yInf"])-Math.abs(rectangle["ul"]["xInf"]-rectangle["or"]["xInf"])
                    rectangleQ1 = { "ul": { "xInf": rectangle["ul"]["xInf"] - scaleLength  , "yInf":rectangle["ul"]["yInf"] }, "or": rectangle["or"]  }
                    rectangleQ2 = { "ul":  rectangle["ul"], "or": {"xInf":rectangle["or"]["xInf"]+scaleLength , "yInf":rectangle["or"]["yInf"]} }
               
                }

                 var m1 = {}
                m1 = getMidllePointRect(rectangleQ1["ul"], rectangleQ1["or"])
                var m2 = getMidllePointRect(rectangleQ2["ul"], rectangleQ2["or"])
                m1 = { ...m1, ...transformLInfToL1(m1) }
                m2 = { ...m2, ...transformLInfToL1(m2) }

                res.status(200).send({ "m1": m1, "m2": m2, "rectangle": rectangle, "rectangleQ1": rectangleQ1, "rectangleQ2": rectangleQ2, "input": pointList });


            } else {
                res.status(200).send({ "message": "import not correct defined" });
            }
        } else {
            res.status(200).send({ "message": "import not correct defined" });
        }
    } else {
        res.status(200).send({ "message": "import not correct defined" });
    }

}

function transformL1ToLinf(point) {
    return { "xInf": point.x + point.y, "yInf": -point.x + point.y }
}

function transformLInfToL1(point) {
    return { "x": 0.5 * (point.xInf - point.yInf), "y": 0.5 * (point.xInf + point.yInf) }
}

function getMidllePointRect(ul, or) {
    return { "xInf": (ul.xInf + or.xInf) / 2, "yInf": (ul.yInf + or.yInf) / 2 }
}

exports.get1CenterproblemeGewichtet = async (req, res, next) => {

    var inputJSON = req.body
    const checkInput = (element) => {
        if (!("x" in element) || !("y" in element) || !("w" in element)) {
            return true;
        }
        return false;
    };

    var pointList = [];
    if ("list" in inputJSON && "l_1" in inputJSON) {
        var transformPoints = inputJSON["l_1"];
        console.log(transformPoints);
        if (inputJSON["list"].length > 0) {
            pointList = inputJSON["list"]

            if (!pointList.some(checkInput)) {

                if (transformPoints) {
                    pointList.forEach(element => {

                        var transformedPoints = transformL1ToLinf({ "x": element.x, "y": element.y })
                        element.xInf = transformedPoints.xInf
                        element.yInf = transformedPoints.yInf
                    })
                } else {
                    pointList.forEach(element => {
                        var transformedPoints = transformLInfToL1({ "xInf": element.x, "yInf": element.y })
                        element.xInf = element.x
                        element.yInf = element.y
                        element.x = transformedPoints.x
                        element.y = transformedPoints.y
                    })
                }
                var d_list = []
                var i1 = 0

                pointList.forEach(element => {
                    var i2 = 0
                    pointList.forEach(element2 => {
                        if (i2 != i1) {
                            d_list.push({
                                "info": "index starts at 1", "name": "d_" + (i1 + 1) + (i2 + 1), "d_x": element.w * element2.w / (element2.w + element.w) * (element2.xInf - element.xInf), "i": i1 + 1, "j": i2 + 1,
                                "d_y": element.w * element2.w / (element2.w + element.w) * (element2.yInf - element.yInf)
                            })
                        }
                        i2 += 1
                    })
                    i1 += 1
                })


                var result_x = d_list.find(element2 => element2.d_x == Math.max(...d_list.map(element => element.d_x)))
                var result_y = d_list.find(element2 => element2.d_y == Math.max(...d_list.map(element => element.d_y)))
                var z_x = result_x.d_x
                var z_y = result_y.d_y
               
                var x_x = (pointList[result_x.i - 1].w * pointList[result_x.i - 1].xInf + pointList[result_x.j - 1].w * pointList[result_x.j - 1].xInf) / (pointList[result_x.i - 1].w + pointList[result_x.j - 1].w)
                var x_y = (pointList[result_y.i - 1].w * pointList[result_y.i - 1].yInf + pointList[result_y.j - 1].w * pointList[result_y.j - 1].yInf) / (pointList[result_y.i - 1].w + pointList[result_y.j - 1].w)

                var l1_solution = transformLInfToL1({ "xInf": x_x, "yInf": x_y })

                res.status(200).send({ "z*_x": z_x, "z*_y": z_y, "z*": Math.max(z_x, z_y), "x*_x": x_x, "x*_y": x_y, "l1_solution": l1_solution, "d_list": d_list ,"pointList":pointList});


            } else {
                res.status(200).send({ "message": "import not correct defined" });
            }
        } else {
            res.status(200).send({ "message": "import not correct defined" });
        }
    } else {
        res.status(200).send({ "message": "import not correct defined" });
    }


}

exports.get1CenterproblemeL2 = async (req, res, next) => {

    var inputJSON = req.body
    const checkInput = (element) => {
        if (!("x" in element) || !("y" in element)) {
            return true;
        }
        return false;
    };
    var sumWeights = 0;

    var pointList = [];

    if (Object.keys(inputJSON).length > 0) {

        for (const key of Object.keys(inputJSON)) {
            pointList.push(inputJSON[key]);
        }

        if (!pointList.some(checkInput)) {
            
            possebilityList = []
            for (var i = 0; i < pointList.length; i++) {
                for (var i2 = i; i2 < pointList.length; i2++) {
                    if (i != i2) {
                        possebilityList.push({ "index": "a_" + (i + 1) + (i2 + 1), "info": "index increased by 1", "list": [pointList[i],  pointList[i2]] })
                    }
                }
            }
            for (var i = 0; i < pointList.length; i++) {
                for (var i2 = i; i2 < pointList.length; i2++) {
                    if (i != i2) {
                        for (var i3 = i2; i3 < pointList.length; i3++) {
                            if (i3 != i2 && i3 != i) {
                                possebilityList.push({ "index": "a_" + (i + 1) + (i2 + 1)+(i3+1), "info": "index increased by 1", "list": [pointList[i], pointList[i2] , pointList[i3]] })
                            }
                        }
                    }
                }
            }

            possebilityList.forEach(element => {
                if(element.list.length==2){
                    element.m = {"x":(element.list[0].x+element.list[1].x)/2,"y":(element.list[0].y+element.list[1].y)/2}
                    element.m.r= getL2Distance(element.m,element.list[0])          
                    element.m.ueberdeckung=getUeberdeckung(pointList,{"x":element.m.x,"y":element.m.y},element.m.r)
                }else if(element.list.length==3){
                    var m_01 = (element.list[0].x-element.list[1].x)/(element.list[1].y-element.list[0].y)
                    var m_02 =  (element.list[0].x-element.list[2].x)/(element.list[2].y-element.list[0].y)
                    var b_01 = (Math.pow(element.list[1].x,2)+Math.pow(element.list[1].y,2)-Math.pow(element.list[0].x,2)-Math.pow(element.list[0].y,2) ) / (2 * (element.list[1].y-element.list[0].y))
                    var b_02 = (Math.pow(element.list[2].x,2)+Math.pow(element.list[2].y,2)-Math.pow(element.list[0].x,2)-Math.pow(element.list[0].y,2) ) / (2 * (element.list[2].y-element.list[0].y))
                    
                    var erg1 = {"x": (b_02-b_01)/(m_01-m_02),"y": (m_01*b_02-b_01*m_02)/(m_01-m_02)}
                    erg1 ={...erg1, "r":getL2Distance(erg1,element.list[0])}
                    element.m = erg1
                    element.m.ueberdeckung=getUeberdeckung(pointList,element.m,element.m.r)
                    
                    possebilityList.forEach(element2 => {
                        if(element2.list.length==2){
                           
                            if(checkIfListEqual(element2.m.ueberdeckung,element.m.ueberdeckung)){
                               
                                if(element.m.r>element2.m.r){
                                    
                                    element.m={...element2.m,"equalTo":element2.index}
                                    
                                }
                            }
                        }
                    })
                   
                }
            }
            )

            
            
            possebilityList.forEach(element => {
                element.m.x = Math.round(element.m.x*100)/100
                element.m.y = Math.round(element.m.y*100)/100
                element.m.r = Math.round(element.m.r*100)/100
            })
            
            var filteredList = possebilityList.filter(element => !element.m.ueberdeckung.some(element2 => element2==false)  )

            if(filteredList.length>0){
                
                var result = filteredList.find(element2 => element2.m.r == Math.min(...filteredList.map(element => element.m.r)))
                res.status(200).json({"x":result.m.x,"y":result.m.y,"r":result.m.r,"all possebilities":possebilityList});
            }else{
                res.status(200).send({ "message": "no max circle found" });
            }
        } else {
            res.status(200).send({ "message": "import not correct defined" });
        }
    } else {
        res.status(200).send({ "message": "import not correct defined" });
    }

}

function getUeberdeckung(pointList,m,r){
    
    return pointList.map(element => {return getL2Distance(element,m)-0.0001<=r})
}

function checkIfListEqual(list1,list2){
    var listEqual=true
    list1.forEach((element,i)=>{
        if(element!=list2[i]){
            listEqual=false
        }
    })
    return listEqual
}