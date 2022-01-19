let workoutWarmupNumIntervals = 0;
let workoutWarmupTotalTime = 0;
let workoutWarmupAllExercises = 0;
let finishedWarmup = false;

let workoutMainsetNumIntervals = 0;
let workoutMainsetTotalTime = 0;
let workoutMainsetAllExercises = 0;
let finishedMainset = false;

let workoutCooldownNumIntervals = 0;
let workoutCooldownTotalTime = 0;
let workoutCooldownAllExercises = 0;
let finishedCooldown = false;

let currentWorkout = 'warmup';

function showHomeScreenAfterWorkout() {
    $('#finishedWorkoutModal').modal('hide');
    document.getElementById('home').classList.remove('collapse');
    document.getElementById('workoutTimer').classList.add('collapse');
}

function showWorkoutDisplayScreen(){
    document.getElementById('workoutCreation').classList.add('collapse');
    document.getElementById('workoutTimer').classList.remove('collapse');
    setWorkoutParams();
    if(warmUpSetArray.length == 0){
        finishedWarmup = true;
        useWarmup = false;
    }

    if(mainSetArray.length == 0){
        finishedMainset = true;
        useMainSet = false;
    }

    if(cooldownSetArray.length == 0){
        finishedCooldown = true;
        useCooldownSet = false;
    }
    setBaseScreen();
}

function showAlertSwimmerModal(){
    $('#alertSwimmerModal').modal('show');
}

function showSwimmersVitalsModal(){
    $('#swimmersVitalsModal').modal('show');
}

function showAlertCoachModal(){
    if(!($('#alertCoachModal').is(':visible'))){
        $('#alertCoachModal').modal('show');
    }
   
}

function showFinishedWorkoutModal(){
    $('#finishedWorkoutModal').modal('show');
}



function setWorkoutParams(){
    //Calculate num intervals
    //Total time
    //For each
    warmUpSetArray.forEach((set) => {
        let singleSetTime = 0;
        let singleSetNumIntervals = 0;
        set.exercises.forEach((excercise) => {
            let singleExerciseTime = parseInt(excercise.numTimes) * parseInt(excercise.timeInSeconds);
            singleSetNumIntervals += parseInt(excercise.numTimes);
            singleSetTime += singleExerciseTime;
        });
        singleSetTime *= parseInt(set.rounds);
        singleSetNumIntervals *= parseInt(set.rounds);
        workoutWarmupNumIntervals += singleSetNumIntervals;
        workoutWarmupTotalTime += singleSetTime;
    });

    mainSetArray.forEach((set) => {
        let singleSetTime = 0;
        let singleSetNumIntervals = 0;
        set.exercises.forEach((excercise) => {
            let singleExerciseTime = parseInt(excercise.numTimes) * parseInt(excercise.timeInSeconds);
            singleSetNumIntervals += parseInt(excercise.numTimes);
            singleSetTime += singleExerciseTime;
        });
        singleSetTime *= parseInt(set.rounds);
        singleSetNumIntervals *= parseInt(set.rounds);
        workoutMainsetNumIntervals += singleSetNumIntervals;
        workoutMainsetTotalTime += singleSetTime;
    });

    cooldownSetArray.forEach((set) => {
        let singleSetTime = 0;
        let singleSetNumIntervals = 0;
        set.exercises.forEach((excercise) => {
            let singleExerciseTime = parseInt(excercise.numTimes) * parseInt(excercise.timeInSeconds);
            singleSetNumIntervals += parseInt(excercise.numTimes);
            singleSetTime += singleExerciseTime;
        });
        singleSetTime *= parseInt(set.rounds);
        singleSetNumIntervals *= parseInt(set.rounds);
        workoutCooldownNumIntervals += singleSetNumIntervals;
        workoutCooldownTotalTime += singleSetTime;
    });
}

function setBaseScreen(){
    if(useWarmup){
        let warmUpTimeLeft= convertSecondsToNiceString(workoutWarmupTotalTime);
        convertArrayOfSetsToArrayOfExercises(warmUpSetArray, 'warmup')
        document.getElementById('timeLeftText').innerHTML = warmUpTimeLeft.replace(/[0-9]/g, "0");
        document.getElementById('intervalTimer').innerHTML =  warmUpTimeLeft.replace(/[0-9]/g, "0");
        document.getElementById('timeRemaingText').innerHTML = warmUpTimeLeft;
        document.getElementById('intervalsText').innerHTML = `1/${workoutWarmupNumIntervals}`;
        document.getElementById('currentWorkoutText').innerHTML = `Warmup`;
        document.getElementById('currentExerciseText').innerHTML = workoutWarmupAllExercises[0].distance + ' ' +workoutWarmupAllExercises[0].name;
        if(workoutWarmupAllExercises.length > 1 ){
            document.getElementById('nextExerciseText').innerHTML = workoutWarmupAllExercises[1].distance + ' ' +workoutWarmupAllExercises[1].name;
        }
        else{
            document.getElementById('nextExerciseText').innerHTML = 'Next Set'
        }
        if(warmUpSetTempo != 0){
            curretExerciseTempo = warmUpSetTempo;
        }
        currentWorkout = 'warmup';
    }
    else if(useMainSet){
        let mainsetTimeLeft= convertSecondsToNiceString(workoutMainsetTotalTime);
        convertArrayOfSetsToArrayOfExercises(mainSetArray, 'mainset')
        document.getElementById('timeLeftText').innerHTML = mainsetTimeLeft.replace(/[0-9]/g, "0");
        document.getElementById('intervalTimer').innerHTML =  mainsetTimeLeft.replace(/[0-9]/g, "0");
        document.getElementById('timeRemaingText').innerHTML = mainsetTimeLeft;
        document.getElementById('intervalsText').innerHTML = `1/${workoutMainsetNumIntervals}`;
        document.getElementById('currentWorkoutText').innerHTML = `Main set`;
        document.getElementById('currentExerciseText').innerHTML = workoutMainsetAllExercises[0].distance + ' ' +workoutMainsetAllExercises[0].name;
        if(workoutMainsetAllExercises.length > 1 ){
            document.getElementById('nextExerciseText').innerHTML = workoutMainsetAllExercises[1].distance + ' ' +workoutMainsetAllExercises[1].name;
        }
        else{
            document.getElementById('nextExerciseText').innerHTML = 'Next Set'
        }

        if(mainSetTempo != 0){
            curretExerciseTempo = mainSetTempo;
        }
        currentWorkout = 'mainset';
    }
    else if(useCooldownSet){
        let cooldownTimeLeft= convertSecondsToNiceString(workoutCooldownTotalTime);
        convertArrayOfSetsToArrayOfExercises(cooldownSetArray, 'cooldown');
        document.getElementById('timeLeftText').innerHTML = cooldownTimeLeft.replace(/[0-9]/g, "0");
        document.getElementById('intervalTimer').innerHTML =  cooldownTimeLeft.replace(/[0-9]/g, "0");
        document.getElementById('timeRemaingText').innerHTML = cooldownTimeLeft;
        document.getElementById('intervalsText').innerHTML = `1/${workoutCooldownNumIntervals}`;
        document.getElementById('currentWorkoutText').innerHTML = `Cooldown`;
        document.getElementById('currentExerciseText').innerHTML = workoutCooldownAllExercises[0].distance + ' ' +workoutCooldownAllExercises[0].name;
        if(workoutCooldownAllExercises.length > 1 ){
            document.getElementById('nextExerciseText').innerHTML = workoutCooldownAllExercises[1].distance + ' ' +workoutCooldownAllExercises[1].name;
        }
        else{
            document.getElementById('nextExerciseText').innerHTML = 'Next Set'
        }

        if(cooldownSetTempo != 0){
            curretExerciseTempo = cooldownSetTempo;
        }
        currentWorkout = 'cooldown';
    }
   
    graphActivity();
}

function setNextWorkout(){
    if(finishedWarmup){
        if(finishedMainset){
            if(finishedCooldown){
                $('#finishedWorkoutModal').modal('show');
            }
            else{
                let cooldownTimeLeft= convertSecondsToNiceString(workoutCooldownTotalTime);
                convertArrayOfSetsToArrayOfExercises(cooldownSetArray, 'cooldown');
                document.getElementById('timeLeftText').innerHTML = cooldownTimeLeft.replace(/[0-9]/g, "0");
                document.getElementById('intervalTimer').innerHTML =  cooldownTimeLeft.replace(/[0-9]/g, "0");
                document.getElementById('timeRemaingText').innerHTML = cooldownTimeLeft;
                document.getElementById('intervalsText').innerHTML = `1/${workoutCooldownNumIntervals}`;
                document.getElementById('currentWorkoutText').innerHTML = `Cooldown`;
                document.getElementById('currentExerciseText').innerHTML = workoutCooldownAllExercises[0].distance + ' ' +workoutCooldownAllExercises[0].name;
             
                if(workoutCooldownAllExercises.length > 1 ){
                    document.getElementById('nextExerciseText').innerHTML = workoutCooldownAllExercises[1].distance + ' ' +workoutCooldownAllExercises[1].name;
                }
                else{
                    document.getElementById('nextExerciseText').innerHTML = 'Next Set'
                }

                if(cooldownSetTempo != 0){
                    curretExerciseTempo = cooldownSetTempo;
                }
                currentWorkout = 'cooldown';
            }
        }
        else{
            let mainsetTimeLeft= convertSecondsToNiceString(workoutMainsetTotalTime);
            convertArrayOfSetsToArrayOfExercises(mainSetArray, 'mainset')
            document.getElementById('timeLeftText').innerHTML = mainsetTimeLeft.replace(/[0-9]/g, "0");
            document.getElementById('intervalTimer').innerHTML =  mainsetTimeLeft.replace(/[0-9]/g, "0");
            document.getElementById('timeRemaingText').innerHTML = mainsetTimeLeft;
            document.getElementById('intervalsText').innerHTML = `1/${workoutMainsetNumIntervals}`;
            document.getElementById('currentWorkoutText').innerHTML = `Main set`;
            document.getElementById('currentExerciseText').innerHTML = workoutMainsetAllExercises[0].distance + ' ' +workoutMainsetAllExercises[0].name;
            if(workoutMainsetAllExercises.length > 1 ){
                document.getElementById('nextExerciseText').innerHTML = workoutMainsetAllExercises[1].distance + ' ' +workoutMainsetAllExercises[1].name;
            }
            else{
                document.getElementById('nextExerciseText').innerHTML = 'Next Set'
            }
            
            if(mainSetTempo != 0){
                curretExerciseTempo = mainSetTempo;
            }
            currentWorkout = 'mainset';
        }
        
    }
    firstClick = true;
    pauseWorkout = true;
    firstLoop = true;
    document.getElementById('btnStartWorkout').innerHTML = '<i class="fas fa-play"></i>';
}



function convertSecondsToNiceString(setSeconds){
    let hours = '';
    let minutes = '';
    let seconds = '';
    if(setSeconds >= 3600){
        let rem = setSeconds % 3600; 
        let hoursInInt = (setSeconds - rem)/ 3600;
        if(hoursInInt < 10){
            hours = '0' + hoursInInt + ':';
        }
        else{
            hours = '' +  hoursInInt + ':';
        }
        setSeconds = setSeconds - hoursInInt * 3600;
    }
    else{
        hours = ''
    }

    if(setSeconds >= 60){
        let rem = setSeconds % 60; 
        let minutesInInt = (setSeconds - rem)/60;
        if(minutesInInt < 10){
            minutes = '0' + minutesInInt + ':';
        }
        else{
            minutes = '' +  minutesInInt+ ':';
        }
        setSeconds = setSeconds - minutesInInt * 60;
    }
    else{
        minutes= '00:'
    }

    if(setSeconds < 10){
        seconds = '0' + setSeconds;
    }
    else{
        seconds = '' + setSeconds;
    }

    let finalString = `${hours}${minutes}${seconds}`;
    return finalString;

}



function convertArrayOfSetsToArrayOfExercises(setArray, setType){
    let exerciseArray = [];

    setArray.forEach((set) => {
        for(let j = 0; j < set.rounds; j++){
            set.exercises.forEach((excercise) => {
                for(let i =0; i < excercise.numTimes; i++){
                    exerciseArray.push(excercise);
                }
            });
        }
        
    });

    if(setType == 'warmup'){
        workoutWarmupAllExercises = exerciseArray;
    }

    if(setType == 'mainset'){
        workoutMainsetAllExercises = exerciseArray;
    }

    if(setType == 'cooldown'){
        workoutCooldownAllExercises = exerciseArray;
    }

}

let firstClick = true;
let firstLoop = true;
let currentExercise = 0;
let currentExerciseTime = 0;
let workoutTimeElapsed = 0;
let workoutTimeLeft = 0;
let pauseWorkout = true;
let restart = false;
let tempoRestart = false;
let numLoops = 0;
let curretExerciseTempo = 0;
function startWorkout(elem){
    if(elem.innerHTML == '<i class="fas fa-play"></i>'){
        elem.innerHTML = '<i class="fas fa-pause"></i>';
        pauseWorkout = false;
       
        if(firstClick){
            if(currentWorkout == 'warmup'){
                workoutTimeLeft = workoutWarmupTotalTime;
            }
            if(currentWorkout == 'mainset'){
                workoutTimeLeft = workoutMainsetTotalTime;
            }
            if(currentWorkout == 'cooldown'){
                workoutTimeLeft = workoutCooldownTotalTime;
            }
            setWorkoutVariables(0);
            workoutTimeElapsed = 0;
            firstClick = false;
        }
       
    }
    else{
        elem.innerHTML = '<i class="fas fa-play"></i>';
        pauseWorkout = true;
    }
}

function setWorkoutVariables(ex){
    currentExercise = ex;
    currentExerciseTime = 0;
    if(currentWorkout == 'warmup'){
        if(ex < workoutWarmupAllExercises.length){
            numLoops = workoutWarmupAllExercises[currentExercise].timeInSeconds;
            loopUpdateWorkoutTimerDisplay();
            if(curretExerciseTempo != 0){
                loopSendTempoToArduino();
            }
        }
        else{
            finishedWarmup = true;
            setNextWorkout();
        }
    }
    else if(currentWorkout == 'mainset'){
        if(ex < workoutMainsetAllExercises.length){
            numLoops = workoutMainsetAllExercises[currentExercise].timeInSeconds;
            loopUpdateWorkoutTimerDisplay();
            if(curretExerciseTempo != 0){
                loopSendTempoToArduino();
            }
            
        }
        else{
            finishedMainset = true;
            setNextWorkout();
        }
    }
    else if(currentWorkout == 'cooldown'){
        if(ex < workoutCooldownAllExercises.length){
            numLoops = workoutCooldownAllExercises[currentExercise].timeInSeconds;
            loopUpdateWorkoutTimerDisplay();
            if(curretExerciseTempo != 0){
                loopSendTempoToArduino();
            }
        }
        else{
            finishedCooldown = true;
            setNextWorkout();
            
        }
    }

}

function restartCurrentWorkout(){
        tempoRestart = true;
        restart = true;
        firstClick = true;
        pauseWorkout = true;
        firstLoop = true;
        document.getElementById('btnStartWorkout').innerHTML = '<i class="fas fa-play"></i>';
        
}
function restartCurrentTempo(){
    tempoRestart = false;
}

function restartCurrentWorkoutDisplay(){

    if(currentWorkout == 'warmup'){
        let warmUpTimeLeft= convertSecondsToNiceString(workoutWarmupTotalTime);
        convertArrayOfSetsToArrayOfExercises(warmUpSetArray, 'warmup')
        document.getElementById('timeLeftText').innerHTML = warmUpTimeLeft.replace(/[0-9]/g, "0");
        document.getElementById('intervalTimer').innerHTML =  warmUpTimeLeft.replace(/[0-9]/g, "0");
        document.getElementById('timeRemaingText').innerHTML = warmUpTimeLeft;
        document.getElementById('intervalsText').innerHTML = `1/${workoutWarmupNumIntervals}`;
        document.getElementById('currentWorkoutText').innerHTML = `Warmup`;
        document.getElementById('currentExerciseText').innerHTML = workoutWarmupAllExercises[0].distance + ' ' +workoutWarmupAllExercises[0].name;
        if(workoutWarmupAllExercises.length > 1 ){
            document.getElementById('nextExerciseText').innerHTML = workoutWarmupAllExercises[1].distance + ' ' +workoutWarmupAllExercises[1].name;
        }
        else{
            document.getElementById('nextExerciseText').innerHTML = 'Next Set'
        }
        if(warmUpSetTempo != 0){
            curretExerciseTempo = warmUpSetTempo;
        }
        currentWorkout = 'warmup';
    }
    
    if(currentWorkout == 'mainset'){
        let mainsetTimeLeft= convertSecondsToNiceString(workoutMainsetTotalTime);
        convertArrayOfSetsToArrayOfExercises(mainSetArray, 'mainset')
        document.getElementById('timeLeftText').innerHTML = mainsetTimeLeft.replace(/[0-9]/g, "0");
        document.getElementById('intervalTimer').innerHTML =  mainsetTimeLeft.replace(/[0-9]/g, "0");
        document.getElementById('timeRemaingText').innerHTML = mainsetTimeLeft;
        document.getElementById('intervalsText').innerHTML = `1/${workoutMainsetNumIntervals}`;
        document.getElementById('currentWorkoutText').innerHTML = `Main set`;
        document.getElementById('currentExerciseText').innerHTML = workoutMainsetAllExercises[0].distance + ' ' +workoutMainsetAllExercises[0].name;
        if(workoutMainsetAllExercises.length > 1 ){
            document.getElementById('nextExerciseText').innerHTML = workoutMainsetAllExercises[1].distance + ' ' +workoutMainsetAllExercises[1].name;
        }
        else{
            document.getElementById('nextExerciseText').innerHTML = 'Next Set'
        }

        if(mainSetTempo != 0){
            curretExerciseTempo = mainSetTempo;
        }
        currentWorkout = 'mainset';
    }

    if(currentWorkout == 'cooldown'){
        let cooldownTimeLeft= convertSecondsToNiceString(workoutCooldownTotalTime);
        convertArrayOfSetsToArrayOfExercises(cooldownSetArray, 'cooldown');
        document.getElementById('timeLeftText').innerHTML = cooldownTimeLeft.replace(/[0-9]/g, "0");
        document.getElementById('intervalTimer').innerHTML =  cooldownTimeLeft.replace(/[0-9]/g, "0");
        document.getElementById('timeRemaingText').innerHTML = cooldownTimeLeft;
        document.getElementById('intervalsText').innerHTML = `1/${workoutCooldownNumIntervals}`;
        document.getElementById('currentWorkoutText').innerHTML = `Cooldown`;
        document.getElementById('currentExerciseText').innerHTML = workoutCooldownAllExercises[0].distance + ' ' +workoutCooldownAllExercises[0].name;
        if(workoutCooldownAllExercises.length > 1 ){
            document.getElementById('nextExerciseText').innerHTML = workoutCooldownAllExercises[1].distance + ' ' +workoutCooldownAllExercises[1].name;
        }
        else{
            document.getElementById('nextExerciseText').innerHTML = 'Next Set'
        }

        if(cooldownSetTempo != 0){
            curretExerciseTempo = cooldownSetTempo;
        }

        currentWorkout = 'cooldown';
    }
    firstClick = true;
    pauseWorkout = true;
    firstLoop = true;
    document.getElementById('btnStartWorkout').innerHTML = '<i class="fas fa-play"></i>';
    restart = false;
}

function updateWorkoutTimerDisplay(){
    if(currentWorkout == 'warmup'){
        document.getElementById('timeLeftText').innerHTML =convertSecondsToNiceString(workoutTimeElapsed);
        document.getElementById('intervalTimer').innerHTML =  convertSecondsToNiceString(currentExerciseTime);
        document.getElementById('timeRemaingText').innerHTML =convertSecondsToNiceString(workoutTimeLeft);
        document.getElementById('intervalsText').innerHTML = `${currentExercise + 1}/${workoutWarmupNumIntervals}`;
        document.getElementById('currentWorkoutText').innerHTML = `Warmup`;
        document.getElementById('currentExerciseText').innerHTML = workoutWarmupAllExercises[currentExercise].distance + ' ' +workoutWarmupAllExercises[currentExercise].name;
        if(currentExercise + 1 < workoutWarmupAllExercises.length){
            document.getElementById('nextExerciseText').innerHTML = workoutWarmupAllExercises[currentExercise+1].distance + ' ' +workoutWarmupAllExercises[currentExercise+1].name;
        }
        else{
            document.getElementById('nextExerciseText').innerHTML = 'Next Set'
        }
    }
    
    if(currentWorkout == 'mainset'){
        document.getElementById('timeLeftText').innerHTML =convertSecondsToNiceString(workoutTimeElapsed);
        document.getElementById('intervalTimer').innerHTML =  convertSecondsToNiceString(currentExerciseTime);
        document.getElementById('timeRemaingText').innerHTML =convertSecondsToNiceString(workoutTimeLeft);
        document.getElementById('intervalsText').innerHTML = `${currentExercise + 1}/${workoutMainsetNumIntervals}`;
        document.getElementById('currentWorkoutText').innerHTML = `Main Set`;
        document.getElementById('currentExerciseText').innerHTML = workoutMainsetAllExercises[currentExercise].distance + ' ' +workoutMainsetAllExercises[currentExercise].name;
        if(currentExercise + 1 < workoutMainsetAllExercises.length){
            document.getElementById('nextExerciseText').innerHTML = workoutMainsetAllExercises[currentExercise+1].distance + ' ' +workoutMainsetAllExercises[currentExercise+1].name;
        }
        else{
            document.getElementById('nextExerciseText').innerHTML = 'Next Set'
        }
    }

    if(currentWorkout == 'cooldown'){
        document.getElementById('timeLeftText').innerHTML =convertSecondsToNiceString(workoutTimeElapsed);
        document.getElementById('intervalTimer').innerHTML =  convertSecondsToNiceString(currentExerciseTime);
        document.getElementById('timeRemaingText').innerHTML =convertSecondsToNiceString(workoutTimeLeft);
        document.getElementById('intervalsText').innerHTML = `${currentExercise + 1}/${workoutCooldownNumIntervals}`;
        document.getElementById('currentWorkoutText').innerHTML = `Cooldown`;
        document.getElementById('currentExerciseText').innerHTML = workoutCooldownAllExercises[currentExercise].distance + ' ' +workoutCooldownAllExercises[currentExercise].name;
        if(currentExercise + 1 < workoutCooldownAllExercises.length){
            document.getElementById('nextExerciseText').innerHTML = workoutCooldownAllExercises[currentExercise+1].distance + ' ' +workoutCooldownAllExercises[currentExercise+1].name;
        }
        else{
            document.getElementById('nextExerciseText').innerHTML = 'Next Set'
        }
    }
}

function loopUpdateWorkoutTimerDisplay(){
    if(!pauseWorkout){
        setTimeout(() => {
            if(currentExerciseTime == numLoops){
                setWorkoutVariables(currentExercise + 1); 
            }
            else{
                currentExerciseTime++;
                workoutTimeElapsed++;
                workoutTimeLeft--;
                updateWorkoutTimerDisplay();
                loopUpdateWorkoutTimerDisplay();
            }
        },1000);
    }
    else{
        if(!restart){
            setTimeout(() => {
                loopUpdateWorkoutTimerDisplay();
            },1000);
        }
        else{
            restartCurrentWorkoutDisplay();
        }
    }
}

function loopSendTempoToArduino(){
    if(!pauseWorkout){
        setTimeout(() => {
            sendTempoToArduino();
            loopSendTempoToArduino();
        },curretExerciseTempo);
    }
    else{
        if(!tempoRestart){
            setTimeout(() => {
                loopSendTempoToArduino();
            },curretExerciseTempo);
        }
        else{
            restartCurrentTempo();
        }
    }
}
