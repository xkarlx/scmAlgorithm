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

        var keys = solutionSpace
        for (var i = 0; i < inputDict[keys[0]].length; i++) {
            var cList = []

            keys.forEach(element => { cList.push(inputDict[element][i]) })
            vList[0][i] = Math.min(...cList)
            JList[0][i] = [keys[cList.indexOf(Math.min(...cList))]]


        }
        inputDict[0].forEach((element, i) => kList[i] = 0)


        while (!iterationFinished) {

            JList.push({})
            vList.push({})
            var nothingDone=true

            sHelp = { ...sList[iterationNumber] }

            iList.forEach(element => {
                
                jValues = JList[kList[element]][element]

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

                var cMinValue = cListSorted[kList[element] + 1][0]
                var cMinList = []
                cListSorted.forEach(cElement => {
                    if (cElement[0] == cMinValue) {
                        cMinList.push(cElement[1])
                    }
                })

                var delta = 0

               

                if (delta_i >= cMinValue - vList[kList[element]][element]) {
                    kList[element] += 1

                    delta = cMinValue - vList[iterationNumber][element]

                    var checkNegative=jValues.some(jValue => {
                        if (sHelp[jValue] - delta < 0) { return true }
                        else { return false }
                    })
                   
                    if(! checkNegative){
                        
                         JList[iterationNumber + 1][element] = [...new Set([...JList[iterationNumber][element], ...cMinList.map(cMinIndex =>cMinIndex)])]
                        vList[iterationNumber + 1][element] = vList[iterationNumber][element] + delta
                        jValues.forEach(jValue => sHelp[jValue] -= delta)
                        nothingDone=false
                    } else {
                        delta = delta_i
                        vList[iterationNumber + 1][element] = vList[iterationNumber][element] + delta
                        jValues.forEach(jValue => sHelp[jValue] -= delta)
                    }

                } else {

                    delta = delta_i
                    vList[iterationNumber + 1][element] = vList[iterationNumber][element] + delta
                    jValues.forEach(jValue => sHelp[jValue] -= delta)
                }


            })

            sList.push(sHelp)

            if (nothingDone) {
                iterationFinished = true
            }
            iterationNumber += 1

        }

        sList = sList.slice(0,-1)
        JList = JList.slice(0,-1)
        vList = vList.slice(0,-1)

        var sumVlist = (Object.entries(vList[vList.length-1]).map(([k,v]) => v)).reduce((a,b)=>a+b)


        res.status(200).json({
            "info": "index starts at 0",      
            "v_sum": sumVlist,     
            "sList": sList,
            "JList": JList,
            "vList": vList
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

    if ("list" in req.body && "kosten" in req.body && "v" in req.body) {

        var list = req.body["list"]
        var fixedCostList = req.body["kosten"]
        var vList = req.body["v"]

       
        
        var xList = []
        var sum = 0
        var xCustomer = []
        
        list.forEach((elementList,i) => {
            var minList = []

            elementList.forEach((element,i2)=> {if(element <= vList[i]){
                minList.push([element,i2,xList.includes(i2)])
            }})
            minList.sort((a,b)=>a[0]-b[0])

            for(var i2=0;i2<minList.length;i2++){
                if(xList.includes(minList[i2][1])){
                    sum+=minList[i2][0]
                    xCustomer.push("x_"+i+""+minList[i2][1])
                    break;
                }else if(minList.some(element=>element[2])){

                }else{
                    sum+=minList[i2][0]
                    xList.push(minList[i2][1])
                    sum+=fixedCostList[minList[i2][1]]
                    xCustomer.push("x_"+i+""+minList[i2][1])
                    break;

                }
            }            

        })
       
        

        res.status(200).json({
            "info": "index starts at 0",      
            "X": xList,
            "sum_cost" : sum ,
            "xCustomer": xCustomer
           
        })


    } else {
        res.status(200).send({ "message": "import not correct defined" });
    }

}