let problemRange = [];
let currentProblem = 0;
let randomNum = 0;
let rangeCount = 1;
let marker = -1;
let totalQuestions = 0;
let completedQuestions = 0;
let percentageVar = 0;
let timerStatus = 0;
let seconds = 0;
let timerInterval;
let timerRunning = false;


function makeRange(start, end, spec){
    const ex_array = [];
    for (let i = start; i <= end; i++) {
        if(spec == "all")
        {
            ex_array.push(i);
        }
        else if(spec == "odd")
        {
            if((i % 2) != 0)
            {
                ex_array.push(i);
            }
        }
        else if(spec == "even")
        {
            if((i % 2) == 0)
            {
                ex_array.push(i);
            }
        }
    }
    return ex_array;
}

function removeSpaces(stringVar)
{
    if(stringVar.indexOf(" ") != -1)
    {
        stringVar = stringVar.replace(" ", "");
        removeSpaces(stringVar);
    }
    else
    {
        return stringVar;
    }
    
}

function stringToArray(stringVar)
{
    let result = [];
    for (let i = 0; i <= stringVar.length; i++) 
    {
        if(stringVar[i] == ",")
        {
            result.push(stringVar.substring((marker + 1), i));
            marker = i;
        }
    }

    if(result == [])
    {
        result = stringVar;
    }
    else
    {
        result.push(stringVar.substring((marker + 1)));
    }
    return result;
}

function StartSite(){
    // Make first div hidden
    document.getElementById("StartScreen").style.display = "none";
    document.getElementById("ScreenScreen").style.display = "block";
    // Make second div visible
    let vRange1 = makeRange(parseInt(document.getElementById("firstP").value), parseInt(document.getElementById("lastP").value), document.getElementById("qSpec").value);
    let vRange2 = makeRange(parseInt(document.getElementById("firstP2").value), parseInt(document.getElementById("lastP2").value), document.getElementById("qSpec2").value);
    let vRange3 = makeRange(parseInt(document.getElementById("firstP3").value), parseInt(document.getElementById("lastP3").value), document.getElementById("qSpec3").value);
    let vRange4 = makeRange(parseInt(document.getElementById("firstP4").value), parseInt(document.getElementById("lastP4").value), document.getElementById("qSpec4").value);
    let vRange5 = makeRange(parseInt(document.getElementById("firstP5").value), parseInt(document.getElementById("lastP5").value), document.getElementById("qSpec5").value);

    problemRange = vRange1.concat(vRange2, vRange3, vRange4, vRange5);

    

    if(document.getElementById("individuals").value != document.getElementById("emptyTextInput").value)
    {
        let independantArray = stringToArray(removeSpaces(document.getElementById("individuals").value));
        for (let i = 0; i <= (independantArray.length - 1); i++)
        {
            
            problemRange.push(independantArray[i]);
        }
    }
    
    // Use list of numbers to generate table
    totalQuestions = problemRange.length;
    document.getElementById("displayCount").innerHTML = completedQuestions + " / " + totalQuestions;
    
}

function RandomNumber(){
    randomNum = Math.ceil(Math.random() * problemRange.length);
    currentProblem = problemRange[randomNum - 1];

    document.getElementById("RandomQButton").style.display = "none";
    document.getElementById("pNum").innerHTML = "Problem #" + currentProblem;

    document.getElementById("ScreenScreen").style.display = "block";
    document.getElementById("FinishQuestion").style.display = "block";
    document.getElementById("SkipQuestion").style.display = "block";
}

function finishQuestion(){
    problemRange.splice((randomNum - 1), 1);
    completedQuestions += 1;
    if(problemRange.length == 1)
    {
        currentProblem = problemRange[0];
        document.getElementById("pNum").innerHTML = "Problem #" + currentProblem;
        document.getElementById("SkipQuestion").style.display = "none";
        document.getElementById("FinishQuestion").style.display = "none";
        document.getElementById("FinishAssignment").style.display = "block";
    }
    else
    {
        randomNum = Math.ceil(Math.random() * problemRange.length);
        currentProblem = problemRange[randomNum - 1];

        document.getElementById("pNum").innerHTML = "Problem #" + currentProblem;
    }

    percentageVar = (completedQuestions / totalQuestions)*80;
    document.getElementById("completedProgressBar").style.width = percentageVar + "%";
    document.getElementById("displayCount").innerHTML = completedQuestions + " / " + totalQuestions;
    // Remove current number from list
    // Hide div displaying number
}

function skipQuestion(){
    randomNum = Math.ceil(Math.random() * problemRange.length);
    currentProblem = problemRange[randomNum - 1];

    document.getElementById("pNum").innerHTML = "Problem #" + currentProblem;
}

function finishAssignment(){
    document.getElementById("ScreenScreen").style.display = "none";
    document.getElementById("congrats").style.display = "block";
}
function individualNums(){
    document.getElementById("individuals").style.display = "block";
}
function newRange(){
    if(rangeCount >= 5)
    {
        alert("Maximum number of ranges met. Please add the rest of the numbers as Individual Numbers.");
    }
    else
    {
        rangeCount += 1;
        if(rangeCount == 2)
        {
            document.getElementById("range2").style.display = "block";
        }
        else if(rangeCount == 3)
        {
            document.getElementById("range3").style.display = "block";
        }
        else if(rangeCount == 4)
        {
            document.getElementById("range4").style.display = "block";
        }
        else if(rangeCount == 5)
        {
            document.getElementById("range5").style.display = "block";
        }
    }
}
function toggleTimer(){
    if(timerStatus == 0)
    {
        timerStatus = 1;
    }
    else if(timerStatus == 1)
    {
        timerStatus = 0;
    }

    if(timerStatus == 0)
    {
        document.getElementById("timerDisplay").style.display = "none";
        document.getElementById("timerButton").innerHTML = "Show Timer";
        document.getElementById("timerButton").style.borderStyle = "outset";
    }
    else if(timerStatus == 1)
    {
        document.getElementById("timerDisplay").style.display = "block";
        document.getElementById("timerButton").innerHTML = "Hide Timer";
        document.getElementById("timerButton").style.borderStyle = "inset";
    }
}
function startTimer(){
    if(timerRunning == false)
    {
        timerInterval = setInterval(function() {
            seconds++;
            updateTimer();
        }, 1000);
        
        document.getElementById("startTimer").style.borderStyle = "inset";
        document.getElementById("stopTimer").style.borderStyle = "outset";

        timerRunning = true;
    }
}
function stopTimer(){
    if(timerRunning == true)
    {
        clearInterval(timerInterval);
        document.getElementById("stopTimer").style.borderStyle = "inset";
        document.getElementById("startTimer").style.borderStyle = "outset";

        timerRunning = false;
    }
}
function updateTimer() {
    let timerElement = document.getElementById('time');
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    // Display the timer in the '00:00' format
    if(remainingSeconds < 10)
    {
        timerElement.innerHTML = minutes + ":0" + remainingSeconds;
    }
    else
    {
        timerElement.innerHTML = minutes + ":" + remainingSeconds;
    }
}
function resetTimer(){
    seconds = 0;
    document.getElementById("time").innerHTML = "0:00";
    stopTimer();
    document.getElementById("startTimer").style.borderStyle = "outset";
    document.getElementById("stopTimer").style.borderStyle = "outset";
}