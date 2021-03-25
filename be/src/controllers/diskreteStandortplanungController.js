

exports.getDualAdjustmentVerfahren = async (req, res, next) => {

    //TODO 

}

exports.getDualAscentVerfahren = async (req, res, next) => {

    if ("iteration" in req.body && "list" in req.body && "sList" in req.body && "vList" in req.body) {

        var iterationNumer = req.body["iteration"]
        var fList = req.body["sList"]
        var sSum = 0

        fList.forEach(element => sSum += element)

        sSum = Math.ceil(sSum)
        var possebilityList = {}
        fList.forEach((element, index) => {
            var helpList = []
            for (var i = element; i <= element + sSum; i++) {
                helpList.push(i)
            }
            possebilityList[index] = helpList
        })

        var combinations = combinate(possebilityList);
        
        var findFixCost = true

        var counting = 0
        while (findFixCost) {


            req.body["kosten"] = [...fList]

            var result = calculateDualAscentVerfahren(req)

            if (checkResults(result, iterationNumer, req.body["sList"], req.body["vList"])) {
                fList = combinations[counting]
                counting += 1


                if (combinations.length < counting) {
                    res.status(200).json({
                        "message": "no starting point found"
                    })
                    findFixCost = false
                }

            } else {
                res.status(200).json({
                    "info": "index starts at 0",
                    "v_sum": result.sumVlist,
                    "sList": result.sList,
                    "JList": result.JList,
                    "vList": result.vList
                })
                findFixCost = false
            }

        }


    } else if ("list" in req.body && "kosten" in req.body) {

        var result = calculateDualAscentVerfahren(req)

        res.status(200).json({
            "info": "index starts at 0",
            "v_sum": result.sumVlist,
            "sList": result.sList,
            "JList": result.JList,
            "vList": result.vList
        })
        /*}catch{
            res.status(200).send({ "message": "error in calculation" }); 
        }*/


    } else {
        res.status(200).send({ "message": "import not correct defined" });
    }

}

function combinate(possebilityList) {
    var result = []
   
    if (Object.entries(possebilityList).length == 3) {
        for (var i = 0; i < possebilityList[0].length; i++) {
            for (var j = 0; j < possebilityList[0].length; j++) {
                for (var k = 0; k < possebilityList[0].length; k++) {
                    result.push([possebilityList[0][i], possebilityList[1][j], possebilityList[2][k]])

                }
            }
        }
    } else if (Object.entries(possebilityList).length == 4) {
        for (var i = 0; i < possebilityList[0].length; i++) {
            for (var j = 0; j < possebilityList[0].length; j++) {
                for (var k = 0; k < possebilityList[0].length; k++) {
                    for (var b = 0; b < possebilityList[0].length; b++) {

                        result.push([possebilityList[0][i], possebilityList[1][j], possebilityList[2][k], possebilityList[3][b]])

                    }
                }
            }
        }
    } else {
        for (var i = 0; i < possebilityList[0].length; i++) {
            for (var j = 0; j < possebilityList[0].length; j++) {
                for (var k = 0; k < possebilityList[0].length; k++) {
                    for (var b = 0; b < possebilityList[0].length; b++) {
                        for (var a = 0; a < possebilityList[0].length; a++) {
                            result.push([possebilityList[0][i], possebilityList[1][j], possebilityList[2][k], possebilityList[3][b], possebilityList[4][a]])
                        }
                    }
                }
            }
        }
    }
    return result
}


function checkResults(result, itertionNumber, sList, vList) {

    var givenSList = result.sList[itertionNumber - 1]
    var givenVList = result.vList[itertionNumber - 1]
    
    var notEqual = false
    
    sList.forEach((element, i) => {
        if (givenSList[i] != element) {
            notEqual = true
        }
    })

    if (!notEqual) {
        vList.forEach((element, i) => {
            if (givenVList[i] != element) {
                notEqual = true
            }
        })
    }

    return notEqual
}


function calculateDualAscentVerfahren(req) {
    var list = req.body["list"]
    var fixedCostList = req.body["kosten"]

    var solutionSpace = list[0].map((element, i) => i)

    var iterationFinished = false

    var iterationResults = []
    var iterationNumber = 0

    var resultSpace = []

    var inputDict = {}
    var vList = [{}]
    var JList = [{}]
    var sList = [{}]
    var kList = {}
    var fixedCostDict = {}

    solutionSpace.forEach((element, i) => {
        inputDict[i] = []
        fixedCostDict[i] = fixedCostList[i]
        sList[0][i] = fixedCostList[i]
    })


    for (var i = 0; i < solutionSpace.length; i++) {
        for (var i2 = 0; i2 < list.length; i2++) {
            inputDict[i].push(list[i2][i])
        }
    }
    var iList = inputDict[0].map((element, i) => i)

    //iteration 0
    inputDict[0].forEach((element, i) => kList[i] = 0)
    var keys = solutionSpace
    for (var i = 0; i < inputDict[keys[0]].length; i++) {
        var cList = []

        keys.forEach(element => { cList.push(inputDict[element][i]) })
        vList[0][i] = Math.min(...cList)

        var cMinList = []
        var cListSorted = [...cList.map((element, i) => [element, i])]
        cListSorted.sort((a, b) => a[0] - b[0])

        cListSorted.forEach(cElement => {
            if (cElement[0] == vList[0][i]) {
                cMinList.push(cElement[1])
            }
        })

        

        JList[0][i] = [...cMinList.map(cMinIndex => cMinIndex)]
        cMinList = cMinList.slice(0, -1)
        
        cMinList.forEach(element3 => {
            if (kList[i] + 1 < cListSorted.length) {
                kList[i] += 1
            }
        }
        )
        
    }
   
    var oldSHelp = {}

    while (!iterationFinished) {

        JList.push({})
        vList.push({})
        var nothingDone = true

        sHelp = { ...sList[iterationNumber] }
      
        iList.forEach(element => {
           
            jValues = [...JList[iterationNumber][element]]


            var index = 0
            var delta_i = Infinity
            jValues.forEach(element2 => {
                if (sHelp[element2] < delta_i) {
                    index = element2
                    delta_i = sHelp[element2]
                }
            })
            cList = []

            solutionSpace.forEach(element2 => {
                cList.push(inputDict[element2][parseInt(element)])
            })



            var cListSorted = [...cList.map((element, i) => [element, i])]

            cListSorted.sort((a, b) => a[0] - b[0])


            var cMinValue = 0
            if (kList[element] + 1 < cListSorted.length) {
                cMinValue = cListSorted[kList[element] + 1][0]
            } else {
                cMinValue = cListSorted[kList[element]][0]
            }
            var cMinList = []
            cListSorted.forEach(cElement => {
                if (cElement[0] == cMinValue) {
                    cMinList.push(cElement[1])
                }
            })
          
            var delta = 0

            if (delta_i >= cMinValue - vList[iterationNumber][element]) {

                cMinList.forEach(element3 => {
                    if (kList[element] + 1 < cListSorted.length) {
                        kList[element] += 1
                    }
                }
                )

                delta = cMinValue - vList[iterationNumber][element]

                var checkNegative = jValues.some(jValue => {
                    if (sHelp[jValue] - delta < 0) { return true }
                    else { return false }
                })
          

                if (!checkNegative) {
                    
                    JList[iterationNumber + 1][element] = [...new Set([...JList[iterationNumber][element], ...cMinList.map(cMinIndex => cMinIndex)])]
                    vList[iterationNumber + 1][element] = vList[iterationNumber][element] + delta
                    jValues.forEach(jValue => sHelp[jValue] -= delta)
                    nothingDone = false
                } else {
                    delta = delta_i
                    vList[iterationNumber + 1][element] = vList[iterationNumber][element] + delta
                    jValues.forEach(jValue => sHelp[jValue] -= delta)
                }

            } else {
                JList[iterationNumber + 1][element] = [...JList[iterationNumber][element]]
                delta = delta_i
                vList[iterationNumber + 1][element] = vList[iterationNumber][element] + delta
                jValues.forEach(jValue => sHelp[jValue] -= delta)
            }
           
        })

        sList.push(sHelp)
     

        if (nothingDone || shallowEqual(oldSHelp, sHelp)) {
            iterationFinished = true
           
        }
        oldSHelp = { ...sHelp }

        iterationNumber += 1

    }

    if(shallowEqual(sList[iterationNumber], sList[iterationNumber-1])){
        sList = sList.slice(0, -1)
        JList = JList.slice(0, -1)
        vList = vList.slice(0, -1)

    }
   
    

    var sumVlist = (Object.entries(vList[vList.length - 1]).map(([k, v]) => v)).reduce((a, b) => a + b)

    return { "sList": sList, "vList": vList, "JList": JList, "sumVList": sumVlist }

}





function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (object1[key] !== object2[key]) {
            return false;
        }
    }

    return true;
}

exports.getGreedyHeuristik = async (req, res, next) => {

    if ("list" in req.body && "kosten" in req.body) {

        var list = req.body["list"]
        var fixedCostList = req.body["kosten"]

        var solutionSpace = list[0].map((element, i) => i)
        var iterationFinished = false

        var iterationResults = []
        var iterationNumber = 0

        var resultSpace = []

        var inputDict = {}
        var fixedCostDict = {}
        solutionSpace.forEach((element, i) => {
            inputDict[i] = []
            fixedCostDict[i] = fixedCostList[i]
        })

        for (var i = 0; i < solutionSpace.length; i++) {
            for (var i2 = 0; i2 < list.length; i2++) {
                inputDict[i].push(list[i2][i])
            }
        }

        var uList = [{}]
        var wList = [{}]
        var deltaList = [{}]
        var fList = []

        while (!iterationFinished) {
            var keys = solutionSpace
           
            if (iterationNumber == 0) {
                for (var i = 0; i < inputDict[keys[0]].length; i++) {
                    var cList = []

                    keys.forEach(element => { cList.push(inputDict[element][i]) })

                    uList[iterationNumber][i] = Math.max(...cList)
                }
            } else {
                for (var i = 0; i < inputDict[keys[0]].length; i++) {
                    var cList = []
                    resultSpace.forEach(element => { cList.push(inputDict[element][i]) })
                    uList[iterationNumber][i] = Math.min(...cList)
                }
            }
            solutionSpace.forEach((element, i) => {
                var b = 0
                var w = 0

                Object.entries(uList[iterationNumber]).forEach(([key, value]) => {

                    w += Math.max(0, value - inputDict[element][b])

                    b += 1
                })

                wList[iterationNumber][keys[i]] = w - fixedCostDict[keys[i]]
                deltaList[iterationNumber][keys[i]] = w

            })
            var f = 0
            if (iterationNumber == 0) {

                Object.entries(uList[iterationNumber]).forEach(([key, value]) => {
                    f += value
                })
            } else {

                f = fList[fList.length - 1] - wList[iterationNumber - 1][resultSpace[resultSpace.length - 1]]

            }
            fList.push(f)
            var maxValue = Math.max(...Object.entries(wList[iterationNumber]).map(([key, element]) => element))
            if (maxValue > 0) {
                Object.entries(wList[iterationNumber]).filter(([key, value]) => {
                    if (value == maxValue) {
                        solutionSpace = solutionSpace.filter(value2 => value2 != key)
                        resultSpace.push(key)
                    }
                })
            }

            Object.entries(wList[iterationNumber]).forEach(([key, value]) => {
                if (value <= 0) {
                    solutionSpace = solutionSpace.filter(value2 => value2 != key)
                }
            })
         
            if (solutionSpace.length == 0) {
                iterationFinished = true
            } else {
                iterationNumber += 1
                uList.push({})
                wList.push({})
                deltaList.push({})
            }

        }
        var finalF = 0
        if (wList[iterationNumber][resultSpace[resultSpace.length - 1]] > 0) {
            finalF = fList[fList.length - 1] - wList[iterationNumber][resultSpace[resultSpace.length - 1]]
        } else {
            finalF = fList[fList.length - 1]
        }


        res.status(200).json({
            "result": resultSpace,
            "f": fList,
            "u": uList,
            "wList": wList,
            "deltaList": deltaList,
            "F_X": finalF
        })


    } else {
        res.status(200).send({ "message": "import not correct defined" });
    }

}

exports.getInterchangeHeuristik = async (req, res, next) => {

    //TODO 

}

exports.getKonstruktionsHeuristik = async (req, res, next) => {

    if ("list" in req.body && "kosten" in req.body && "v" in req.body) {

        var list = req.body["list"]
        var fixedCostList = req.body["kosten"]
        var vList = req.body["v"]



        var xList = []
        var sum = 0
        var xCustomer = []

        list.forEach((elementList, i) => {
            var minList = []

            elementList.forEach((element, i2) => {
                if (element <= vList[i]) {
                    minList.push([element, i2, xList.includes(i2)])
                }
            })
            minList.sort((a, b) => a[0] - b[0])

            for (var i2 = 0; i2 < minList.length; i2++) {
                if (xList.includes(minList[i2][1])) {
                    break;
                } else if (minList.some(element => element[2])) {

                } else {
                    xList.push(minList[i2][1])
                    sum += fixedCostList[minList[i2][1]]
                    break;

                }
            }

        })

        list.forEach((elementList, i) => {
            var minList = []

            elementList.forEach((element, i2) => {
                if (element <= vList[i]) {
                    minList.push([element, i2, xList.includes(i2)])
                }
            })
            minList.sort((a, b) => a[0] - b[0])
            for (var i2 = 0; i2 < minList.length; i2++) {
                if (xList.includes(minList[i2][1])) {
                    sum += minList[i2][0]
                    xCustomer.push("x_" + i + "" + minList[i2][1])
                    break;
                }
            }

        })

        res.status(200).json({
            "info": "index starts at 0",
            "X": xList,
            "sum_cost": sum,
            "xCustomer": xCustomer

        })


    } else {
        res.status(200).send({ "message": "import not correct defined" });
    }

}