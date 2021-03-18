exports.getDualAdjustmentVerfahren = async (req, res, next) => {

    //TODO 

}

exports.getDualAscentVerfahren = async (req, res, next) => {

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
            console.log(uList[iterationNumber])
            solutionSpace.forEach((element, i) => {
                var b = 0
                var w = 0

                Object.entries(uList[iterationNumber]).forEach(([key, value]) => {

                    w += Math.max(0, value - inputDict[element][b])

                    b += 1
                })

                wList[iterationNumber][keys[i]] = w - fixedCostDict[keys[i]]
                deltaList[iterationNumber][keys[i]] = w


                //console.log(uList[iterationNumber])
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
                if (value < 0) {
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
            console.log(uList[iterationNumber])
            solutionSpace.forEach((element, i) => {
                var b = 0
                var w = 0

                Object.entries(uList[iterationNumber]).forEach(([key, value]) => {

                    w += Math.max(0, value - inputDict[element][b])

                    b += 1
                })

                wList[iterationNumber][keys[i]] = w - fixedCostDict[keys[i]]
                deltaList[iterationNumber][keys[i]] = w


                //console.log(uList[iterationNumber])
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
                if (value < 0) {
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

    //TODO 

}