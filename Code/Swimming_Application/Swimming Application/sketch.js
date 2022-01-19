let serial;
let latestData = "waiting for data";
let arduinoOutput = "";


let dataReady = false; // set to true once the first valid string is displayed

let fsrValue = 0;
let inMotion;
let heartRate = 0;
let confidence = 0;
let oxygen = 0;
let status = 0;
let fsrThreshold = 300; 
let currentTimeRead = 0;
let lastTimeRead = 0;
let timeInMotion = 0;
let tempoSound;

//setInterval(function(){ alert("Hello"); }, 3000);
let tempoCount = 0;
//Test Tempo
function testTempo(seconds){
    if(seconds == ''){
        return;
    }
    let milliseconds = seconds*1000;
    tempoCount = 0;
    loopTestTempo(milliseconds);
}

//Function will loop 3-5 times and beep on the computer 
function loopTestTempo(milliseconds){
    setTimeout(() => {
        tempoSound.setVolume(.2);
        tempoSound.play();
        if(tempoCount > 5){
            return;
        }else{
            tempoCount++;
            serial.write('B');
            loopTestTempo(milliseconds); 
        }
    },milliseconds);
}


function preload(){
    tempoSound = loadSound('Sounds/badSelect.mp3');
}

function setup() {
    serial = new p5.SerialPort();

    serial.list();
    serial.open('COM4'); //change per your system

    serial.on('connected', serverConnected);

    serial.on('list', gotList);

    serial.on('data', gotData);

    serial.on('error', gotError);

    serial.on('open', gotOpen);

    serial.on('close', gotClose);

    noCanvas();
}

function draw(){
    handleInput();
}





function serverConnected() {
    print("Connected to Server");
}

function gotList(thelist) {
    print("List of Serial Ports:");

    for (let i = 0; i < thelist.length; i++) {
        print(i + " " + thelist[i]);
    }
}

function gotOpen() {
    print("Serial Port is Open");
}

function gotClose(){
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

function gotError(theerror) {
    print(theerror);
}

function gotData() {

    let currentString = serial.readLine();
    trim(currentString);
    if (!currentString) return;
    console.log(currentString);
    latestData = "Getting Data";
    // only update our stored data if the string is valid
    if (validString(currentString)) {
        arduinoOutput = currentString;
        updateValues(); 
    }
}

// returns if the string is formatted correctly
// probably unneeded but added thanks to the values instilled in me by the great Professor John Lillis 
function validString(data) {
    let splitData = data.split('$');
    if (splitData.length != 3) {
        console.log("bad string length:" + splitData.length);
        return false;
    }

    for (let i = 0; i < splitData.length; i++) {   
        if (i == 0) { 
            if (isNaN(parseInt(splitData[i]))) {
                console.log("not an integer: " + splitData[i]);
                return false;
            }
        } else if (i == 1) {
            if (parseInt(splitData[i]) != 0 && parseInt(splitData[i]) != 1) {
                console.log("not a boolean: " + splitData[i] );
                return false;
            }
        } else {
            let splitPPG = splitData[i].split(',');
            for (let j = 0; j < splitData.length; j++) {   
                if (isNaN(parseInt(splitPPG[j]))) {
                    console.log("not a int: " + splitData[j] );
                    return false;
                }
            }
           
        }
        
        
    }
    return true;

}

function updateValues() {
    let splitData = arduinoOutput.split('$');
    fsrValue = parseInt(splitData[0]);
    inMotion = parseInt(splitData[1]);
    let splitPPG = splitData[2].split(',');
    if(parseInt(splitPPG[0]) > 20 && parseInt(splitPPG[3]) == 3){
        heartRate = parseInt(splitPPG[0]);
        confidence = parseInt(splitPPG[1]);
        oxygen = parseInt(splitPPG[2]);
    }
    lastTimeRead = currentTimeRead;
    currentTimeRead =  parseInt(splitPPG[4]);
}


function sendTempoToArduino(){
    serial.write('B');
}

function sendSwimmerMessage(){
    serial.write('S');
}


function handleInput() {
    // if all 4 fingers are down then we must switch modes
    if(!pauseWorkout){

        if(fsrValue >= fsrThreshold){
            showAlertCoachModal();
        }

        //Update vitals
        document.getElementById('bpmVal').innerHTML = heartRate;
        document.getElementById('bloodOxygenLevel').innerHTML = oxygen;
    
        //Track in motion
        if(inMotion){
            timeInMotion += (currentTimeRead - lastTimeRead);
        }
    }

    //Better test tempo sound
    //Final activity graphs
    
}



function graphActivity() {
    console.log("Here main scope");
    let g1 = new p5((sketch) => {

        let plot;
        let points = [];
        let cv; 
        let timeStarted;
        let firstLoop = true;

        sketch.setup = function() {
          
            sketch.createCanvas(500, 300);
            //sketch.background(3, 252, 32);
            plot = new GPlot(sketch);
            plot.setPos(0, 0);
            //plot.setDim(500, 500);
            plot.getTitle().setText("Heartrate");
            plot.getXAxis().getAxisLabel().setText("Time (sec) ");
            plot.getYAxis().getAxisLabel().setText("BPM");
        }

        sketch.draw = function() {

            if (!pauseWorkout) {
                if (firstLoop) {
                    timeStarted = millis();
                    firstLoop = false;
                }
            
                plot.addPoint((millis() - timeStarted)/ 1000, heartRate, "(" + msToTime(millis()) + " , " + str(heartRate) + ")");
  
                plot.setPointColor(color(3, 252, 32));
       
                // Draw the plot  
                plot.beginDraw();
                plot.drawBackground();
                plot.drawBox();
                plot.drawXAxis();
                plot.drawYAxis();
                plot.drawTitle();
                plot.drawGridLines(GPlot.BOTH);
                plot.drawLines();
                plot.drawPoints();
                plot.endDraw();
            }

        }

        
    

    },'heartrateGraph')

    let g2 = new p5((sketch) => {

        let plot;
        let points = [];
        let cv; 
        let timeStarted;
        let firstLoop = true;

        sketch.setup = function() {
          
            sketch.createCanvas(500, 300);
            //sketch.background(3, 252, 32);
            plot = new GPlot(sketch);
            plot.setPos(0, 0);
            //plot.setDim(500, 500);
            plot.getTitle().setText("Blood Oxygen Level");
            plot.getXAxis().getAxisLabel().setText("Time (sec) ");
            plot.getYAxis().getAxisLabel().setText("mmHG");
        }

        sketch.draw = function() {

            if (!pauseWorkout) {
                if (firstLoop) {
                    timeStarted = millis();
                    firstLoop = false;
                }
                plot.addPoint((millis() - timeStarted)/ 1000, oxygen, "(" + msToTime(millis()) + " , " + str(oxygen) + ")");
  
                plot.setPointColor(color(246, 250, 12));
       
                // Draw the plot  
                plot.beginDraw();
                plot.drawBackground();
                plot.drawBox();
                plot.drawXAxis();
                plot.drawYAxis();
                plot.drawTitle();
                plot.drawGridLines(GPlot.BOTH);
                plot.drawLines();
                plot.drawPoints();
                plot.endDraw();
            }

        }

        
    

    },'oxygenGraph')

    let g3 = new p5((sketch) => {

        let plot;
        let points = [];
        let cv; 
        let timeStarted;
        let firstLoop = true;

        sketch.setup = function() {
          
            sketch.createCanvas(500, 300);
            //sketch.background(3, 252, 32);
            plot = new GPlot(sketch);
            plot.setPos(0, 0);
            //plot.setDim(500, 500);
            plot.getTitle().setText("Workout Activity");
            plot.getXAxis().getAxisLabel().setText("Time (sec) ");
            plot.getYAxis().getAxisLabel().setText("I Motion");
        }

        sketch.draw = function() {

            if (!pauseWorkout){
                if (firstLoop) {
                    timeStarted = millis();
                    firstLoop = false;
                }
                plot.addPoint((millis() - timeStarted)/ 1000, inMotion, "(" + msToTime(millis()).secs + " , " + str(inMotion) + ")");
  
                plot.setPointColor(color(242, 7, 39));
       
                // Draw the plot  
                plot.beginDraw();
                plot.drawBackground();
                plot.drawBox();
                plot.drawXAxis();
                plot.drawYAxis();
                plot.drawTitle();
                plot.drawGridLines(GPlot.BOTH);
                plot.drawLines();
                plot.drawPoints();
                plot.endDraw();
            }
         

        }

        
    

    },'activityGraph')
}




//Import export stuff

function exportWorkoutTxt() {

    let writer = createWriter('MyWorkout.txt');
    let data = createData();
    writer.write([data]);
    writer.close();
 
}

function exportWorkoutPdf() {
    let pdf = createPDF();
    var file = pdf;
    if (file === undefined) {
      file = "demo";
    }
    if (typeof doc !== "undefined") {
      doc.save("MyWorkout.pdf");
    } else if (typeof pdf !== "undefined") {
      setTimeout(function() {
        pdf.save("MyWorkout.pdf");
      }, 2000);
    } else {
      alert("Error 0xE001BADF");
    }
    
}

function importWorkoutTxt() {
    
    document.querySelector('#p5Import').innerHTML = '';
    let input = createFileInput(getData);
    
    input.parent('p5Import');
    
    
  
}

// get array contents and format for text file 
function createData() {

    let tmp = '';
    tmp += '\n** Formatting details ** \n';
    tmp += '\n - Application is broken down into Warmup, Main, and Cooldown workouts (separated by #)'
    tmp += '\n - Setting a tempo for each workout is optional; \'#cooldownSet @ 5000\' means a tempo of 5000ms (5 seconds)'
    tmp += '\n - If you wish to skip a workout, simply do not enter any set information for it'
    tmp += '\n - Each workout consists of sets followed by their exercises'
    tmp += '\n - Set: name of set  * number of rounds'
    tmp +=  '\n - Exercise: name of exercise * number of repetitions, distance, time allotted (HH:MM:SS)'

    tmp += '\n\nThanks for using our application, here is your set:\n\n';


    tmp += "#warmUpSet";
    if (warmUpSetTempo != 0 && warmUpSetTempo != null) {
        tmp += ` @ ${warmUpSetTempo}`;
    }
    tmp += "\n";
    warmUpSetArray.forEach(( set) => {
        tmp += (`\nSet: ${set.name} * ${set.rounds}`);
        set.exercises.forEach((exercise) => {
            tmp += (`\nExercise: ${exercise.name} * ${exercise.numTimes}, ${exercise.distance},${exercise.timeAlloted}`)
        })
    })

    
    tmp += "\n\n#mainSet";
    if (mainSetTempo != 0 && mainSetTempo != null) {
        tmp += ` @ ${mainSetTempo}`;
    }
    tmp += "\n";
    mainSetArray.forEach(( set) => {
        tmp += (`\nSet: ${set.name} * ${set.rounds}`);
        set.exercises.forEach((exercise) => {
            tmp += (`\nExercise: ${exercise.name} * ${exercise.numTimes}, ${exercise.distance},${exercise.timeAlloted}`)
        })
    })

    
    tmp += "\n\n#cooldownSet";
    if (cooldownSetTempo != 0 && cooldownSetTempo != null)  {
        tmp += ` @ ${cooldownSetTempo}`;
    }
    tmp += "\n";
    cooldownSetArray.forEach(( set) => {
        tmp += (`\nSet: ${set.name} * ${set.rounds}`);
        set.exercises.forEach((exercise) => {
            tmp += (`\nExercise: ${exercise.name} * ${exercise.numTimes}, ${exercise.distance},${exercise.timeAlloted}`)
        })
    })
    return tmp;
}

function createPDF() {
    let doc = new jspdf.jsPDF();

    doc.setFontSize(30);
    let yPos = 30;
    doc.setFont("helvetica", "bold");
    doc.text("Today's Workout", 105, 20, null, null, "center");

    if (warmUpSetArray.length > 0) {
        doc.setFontSize(24);
        doc.setFont("helvetica", "italic");
        let warmupString = "Warmup";
        if (warmUpSetTempo != 0 && warmUpSetTempo != null) {
            warmupString += `, ${warmUpSetTempo / 1000} sec tempo`;
        }
        doc.text(warmupString, 20, yPos += 10);
        doc.setFontSize(18);
        doc.setFont("helvetica", "normal");
        warmUpSetArray.forEach(( set) => {
            if (yPos >= 270) {
                doc.addPage();
                yPos = 10;
            }
            doc.text(`${set.name}: ${set.rounds} rounds`, 20, yPos += 10);
            set.exercises.forEach((exercise) => {
                //console.log(`${exercise.timeAlloted.indexOf(/[^1-9]/g)} aka ${exercise.timeAlloted.substring(exercise.timeAlloted.indexOf(/[^1-9]/g) + 1)}`);
                doc.text(`${exercise.numTimes} x ${exercise.distance} ${exercise.name} on ${exercise.timeAlloted}`, 30, yPos += 10);
            })
        })
        yPos += 10;

    }

    if (mainSetArray.length > 0) {
        doc.setFontSize(24);
        doc.setFont("helvetica", "italic");
        let mainString = "Main Workout";
        if (mainSetTempo != 0 && mainSetTempo != null) {
            mainString += `, ${mainSetTempo / 1000} sec tempo`;
        }
        doc.text(mainString, 20, yPos += 10);
        doc.setFontSize(18);
        doc.setFont("helvetica", "normal");
        mainSetArray.forEach(( set) => {
            if (yPos >= 270) {
                doc.addPage();
                yPos = 10;
            }
            doc.text(`${set.name}: ${set.rounds} rounds`, 20, yPos += 10);
            set.exercises.forEach((exercise) => {
                //console.log(`${exercise.timeAlloted.indexOf(/[^1-9]/g)} aka ${exercise.timeAlloted.substring(exercise.timeAlloted.indexOf(/[^1-9]/g) + 1)}`);
                doc.text(`${exercise.numTimes} x ${exercise.distance} ${exercise.name} on ${exercise.timeAlloted}`, 30, yPos += 10);
            })
        })
        yPos += 10;
    }

    if (cooldownSetArray.length > 0) {
        doc.setFontSize(24);
        doc.setFont("helvetica", "italic");
        let coolString = "Cooldown";
        if (cooldownSetTempo != 0 && cooldownSetTempo != null) {
            coolString += `, ${cooldownSetTempo / 1000} sec tempo`;
        }
        doc.text(coolString, 20, yPos += 10);
        doc.setFontSize(18);
        doc.setFont("helvetica", "normal");
        cooldownSetArray.forEach(( set) => {
            if (yPos >= 270) {
                doc.addPage();
                yPos = 10;
            }
            doc.text(`${set.name}: ${set.rounds} rounds`, 20, yPos += 10);
            set.exercises.forEach((exercise) => {
                //console.log(`${exercise.timeAlloted.indexOf(/[^1-9]/g)} aka ${exercise.timeAlloted.substring(exercise.timeAlloted.indexOf(/[^1-9]/g) + 1)}`);
                doc.text(`${exercise.numTimes} x ${exercise.distance} ${exercise.name} on ${exercise.timeAlloted}`, 30, yPos += 10);
            })
        })
    }
    


    return doc;
}

function stupidIndexOf(string) {
    // finds index of 1-9 for pdf formatting

}

// get data from text file and populate arrays
function getData(file) {
    console.log(file.data);

    let tokens = file.data.split('\n');
    let arrayToEdit;
    let startedFile = false;
    let errorCount = 0; 
    resetAllValues();
    let errorText = '';
    let timeRegex = new RegExp('^(2[0-3]|[0-1][\d]):[0-5][\d]:[0-5][\d]$');
    tokens.forEach( (t) => {
    
        //console.log(`|${t}|`);
        if (t.includes("#warmUpSet")) {
            arrayToEdit = warmUpSetArray;
            startedFile = true;
            if (t.includes("@")) {
                // set the tempo
                setTempoFromImport('warmup', parseInt(t.substring(t.indexOf('@') + 1)));
            }
        } 

        else if (t.includes("#mainSet") && startedFile) {
            arrayToEdit = mainSetArray;
            if (t.includes("@")) {
                // set the tempo
                setTempoFromImport('mainset', parseInt(t.substring(t.indexOf('@') + 1)));
            }
        }

        else if (t.includes("#cooldownSet") && startedFile) {
            arrayToEdit = cooldownSetArray;
            if (t.includes("@")) {
                // set the tempo
                setTempoFromImport('cooldown', parseInt(t.substring(t.indexOf('@') + 1)));
            }
        }

        else if(t.includes("Set:") && startedFile) {
            let tmp = new Set();
                        
            if (t.split(':').join(',').split('*').join(',').split(',').length == 3) {
                tmp.name = t.substring(4, t.indexOf('*')).trim();
                tmp.rounds = t.substring(t.indexOf('*') + 1).trim();
                tmp.exercises = [];
                arrayToEdit.push(tmp);
            } else {
                errorCount++;
                console.log ('error in adding set, you provided"' + t + '"- please review format at top of file');
                errorText += '**error in adding set, you provided"' + t + '"- please review format at top of file' + "<br />" ;
            }
           
        }

        else if (t.includes("Exercise:") && startedFile) {
            let tmp = new Exercise();
            if (t.split('*').join(',').split(',').length == 4) {
                let lastIndex = t.indexOf('*');
                tmp.name = t.substring(9, lastIndex).trim(); 
                tmp.numTimes = t.substring(lastIndex + 1, t.indexOf(',', lastIndex + 1)).trim();
                lastIndex = t.indexOf(',', lastIndex + 1);
                tmp.distance = t.substring(lastIndex + 1, t.indexOf(',', lastIndex + 1)).trim();
                lastIndex = t.indexOf(',', lastIndex + 1);
                let time = t.substring(lastIndex + 1).trim();
                if (/^(2[0-3]|[0-1][\d]):[0-5][\d]:[0-5][\d]$/.test(time)) {
                    tmp.timeAlloted = time;
                    let seconds = parseInt(time.split(':')[0]) * 3600 + parseInt(time.split(':')[1]) * 60 + parseInt(time.split(':')[2]);
                    tmp.timeInSeconds = seconds;
                } else {
                    errorCount++;
                    console.log ('error adding exercise "' + t + '"- please make sure the time is correct and in HH:MM:SS');
                    errorText += '**error adding exercise "' + t + '"- please make sure the time is correct and in HH:MM:SS' + "<br />" ;
                }
                if (arrayToEdit.length != 0) {
                    arrayToEdit[arrayToEdit.length - 1].exercises.push(tmp);
                } else {
                    errorCount++;
                    console.log ('error adding provided exercise"' + t + '"- please add a correctly formatted set before you enter an exercise')
                    errorText += '**error adding provided exercise"' + t + '"- please add a correctly formatted set before you enter an exercise' + "<br />" ;
                }
            } else {
                errorCount++;
                console.log ('error in adding exercise, you provided"' + t + '"- please review format at top of file');
                errorText += '**error in adding exercise, you provided"' + t + '"- please review format at top of file' +  "<br />" ;

            }
            
        }
    })
    if (errorCount == 0) {
        console.log("Successfully imported workout");
        setTimeout(function(){
            updateWorkoutDisplay('all');
            $('#importModal').modal('hide');
        }, 1000);
    } else {
        // show errors to user 
        document.querySelector('#errorTextImportModal').innerHTML = errorText;
        document.querySelector('#p5Import input').value = '';
        $('#importErrorModal').modal('show');

    }
    
}


function resetAllValues() {
    warmUpSetArray = [];
    mainSetArray = [];
    cooldownSetArray = [];
    warmUpSetTempo = 0;
    mainSetTempo = 0;
    cooldownSetTempo = 0;
    cooldownTempo.value = '';
    mainsetTempo.value  = '';
    warmupTempo.value = '';

}


function msToTime(ms) {
    
    let min = 0;
    let sec = 0;
    let timeVal = '';
    if(ms > 60000){
        min = parseInt(ms / 60000);
        sec = parseInt((ms - (min * 60000))/1000);

        if(min < 10){
            timeVal = '0' + min + ':';
        }
        else{
            timeVal = min + ':';
        }

        
        if(sec < 10){
            timeVal += '0' + sec;
        }
        else{
            timeVal += sec;
        }
    }
    else{
        timeVal = '00:';
        sec = parseInt(ms / 1000);
        if(sec < 10){
            timeVal += '0' + sec;
        }
        else{
            timeVal += sec;
        }

    }
    
    var time = {
        mins: min,
        secs: sec,
        timeString: timeVal
    }

    return time;
  }