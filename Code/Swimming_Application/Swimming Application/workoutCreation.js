
let warmUpSetArray = [];
let mainSetArray = [];
let cooldownSetArray = [];
let warmUpSetTempo = 0;
let mainSetTempo = 0;
let cooldownSetTempo = 0;
let useWarmup = true;
let useMainSet = true;
let useCooldownSet = true;

function Set(rounds, name, exercises) {
    this.rounds = rounds;
    this.name = name;
    this.exercises = exercises;
}

function Exercise(numTimes, name, distance, timeAlloted, timeInSeconds) {
    this.numTimes = numTimes;
    this.name = name;
    this.distance = distance;
    this.timeAlloted = timeAlloted;
    this.timeInSeconds = timeInSeconds;
}

function removeWorkout(setType){
    let warmupDiv = document.getElementById('warpupDiv');
    let cooldownDiv = document.getElementById('cooldownDiv');

    if(setType == 'warmup'){
        warmupDiv.classList.add('collapse');
        useWarmup = false;
    }


    if(setType == 'cooldown'){
        cooldownDiv.classList.add('collapse');
        useCooldownSet = false;
    }
}


function expandSetInfo(name, setType) {
    if(setType == 'warmup'){
        let expandElement = document.getElementById(name);
     let infoElement = document.getElementById(name.replace('warmupSetExpand', 'warmupSetInfo'));

    if (infoElement.classList.contains('collapse')) {
        infoElement.classList.remove('collapse');
    }
    else {
        infoElement.classList.add('collapse');
    }

    if (expandElement.innerHTML == '<i class="fas fa-chevron-up" aria-hidden="true"></i>') {
        expandElement.innerHTML = '<i class="fas fa-chevron-down"></i>';
    }
    else {
        expandElement.innerHTML = '<i class="fas fa-chevron-up"></i>';
    }
    }

    if(setType == 'mainset'){
        let expandElement = document.getElementById(name);
        let infoElement = document.getElementById(name.replace('mainSetExpand', 'mainSetInfo'));
   
       if (infoElement.classList.contains('collapse')) {
           infoElement.classList.remove('collapse');
       }
       else {
           infoElement.classList.add('collapse');
       }
   
       if (expandElement.innerHTML == '<i class="fas fa-chevron-up" aria-hidden="true"></i>') {
           expandElement.innerHTML = '<i class="fas fa-chevron-down"></i>';
       }
       else {
           expandElement.innerHTML = '<i class="fas fa-chevron-up"></i>';
       }
    }

    if(setType == 'cooldown'){
        let expandElement = document.getElementById(name);
        let infoElement = document.getElementById(name.replace('cooldownSetExpand', 'cooldownSetInfo'));
   
       if (infoElement.classList.contains('collapse')) {
           infoElement.classList.remove('collapse');
       }
       else {
           infoElement.classList.add('collapse');
       }
   
       if (expandElement.innerHTML == '<i class="fas fa-chevron-up" aria-hidden="true"></i>') {
           expandElement.innerHTML = '<i class="fas fa-chevron-down"></i>';
       }
       else {
           expandElement.innerHTML = '<i class="fas fa-chevron-up"></i>';
       }
    }
    
}

function showHomeScreen() {
    document.getElementById('home').classList.remove('collapse');
    document.getElementById('workoutCreation').classList.add('collapse');
}


function showWorkoutCreationScreen(){
    document.getElementById('home').classList.add('collapse');
    document.getElementById('workoutCreation').classList.remove('collapse');
    
}



function showAddASet(setType, elem){
    let warmupSetCreation = document.getElementById('warmupSetCreation');
    let mainSetCreation = document.getElementById('mainSetCreation');
    let cooldownSetCreation = document.getElementById('cooldownSetCreation');

    if(setType == 'warmup'){
        warmupSetCreation.classList.remove('collapse');
        elem.disabled = true;
    }

    if(setType == 'mainset'){
        mainSetCreation.classList.remove('collapse');
        elem.disabled = true;

    }

    if(setType == 'cooldown'){
        cooldownSetCreation.classList.remove('collapse');
        elem.disabled = true;
    }
}



function addExerciseToCurrentSet(setType){
    if(setType == 'warmup'){
        let exerciseTemplate = document.querySelector('#warmupSetCreation #exerciseTemplate');
        let currentExerciseDivs = document.querySelectorAll('#warmupSetCreation .exerciseNum');
        let lastExerciseDiv = currentExerciseDivs[currentExerciseDivs.length-1];
        let newExerciseDiv = document.createElement("div");
        newExerciseDiv.classList.add('exerciseNum');
        lastExerciseDiv.parentNode.insertBefore(newExerciseDiv, lastExerciseDiv.nextSibling);
        currentExerciseDivs = document.querySelectorAll('#warmupSetCreation .exerciseNum');
        lastExerciseDiv = currentExerciseDivs[currentExerciseDivs.length-1];
        lastExerciseDiv.innerHTML = exerciseTemplate.innerHTML;
    }

    if(setType == 'mainset'){
        let exerciseTemplate = document.querySelector('#mainSetCreation #exerciseTemplate');
        let currentExerciseDivs = document.querySelectorAll('#mainSetCreation .exerciseNum');
        let lastExerciseDiv = currentExerciseDivs[currentExerciseDivs.length-1];
        let newExerciseDiv = document.createElement("div");
        newExerciseDiv.classList.add('exerciseNum');
        lastExerciseDiv.parentNode.insertBefore(newExerciseDiv, lastExerciseDiv.nextSibling);
        currentExerciseDivs = document.querySelectorAll('#mainSetCreation .exerciseNum');
        lastExerciseDiv = currentExerciseDivs[currentExerciseDivs.length-1];
        lastExerciseDiv.innerHTML = exerciseTemplate.innerHTML;
    }

    if(setType == 'cooldown'){
        let exerciseTemplate = document.querySelector('#cooldownSetCreation #exerciseTemplate');
        let currentExerciseDivs = document.querySelectorAll('#cooldownSetCreation .exerciseNum');
        let lastExerciseDiv = currentExerciseDivs[currentExerciseDivs.length-1];
        let newExerciseDiv = document.createElement("div");
        newExerciseDiv.classList.add('exerciseNum');
        lastExerciseDiv.parentNode.insertBefore(newExerciseDiv, lastExerciseDiv.nextSibling);
        currentExerciseDivs = document.querySelectorAll('#cooldownSetCreation .exerciseNum');
        lastExerciseDiv = currentExerciseDivs[currentExerciseDivs.length-1];
        lastExerciseDiv.innerHTML = exerciseTemplate.innerHTML;
    }
}

function addSetToWorkout(setType){
   

    if(setType == 'warmup'){
        let warmupSetName = document.querySelector('#addWarmUpSet .warmupSetName').value;
        let warmupSetNumRounds = document.querySelector('#addWarmUpSet .warmupSetNumRounds').value;
        let addingSet = new Set();
        addingSet.name = warmupSetName;
        addingSet.rounds = warmupSetNumRounds;
        addingSet.exercises = [];

        let currentExerciseDivs = document.querySelectorAll('#warmupSetCreation .exerciseNum');
        for(let i = 0; i < currentExerciseDivs.length; i++){
            let currentExercise = currentExerciseDivs[i];
            let exerciseName = currentExercise.querySelector('.exerciseName').value;
            let exerciseTimes = currentExercise.querySelector('.exerciseTimes').value;
            let exerciseDistance = currentExercise.querySelector('.exerciseDistance').options[currentExercise.querySelector('.exerciseDistance').selectedIndex].text;
            let exerciseTime = currentExercise.querySelector('.exerciseTime').value;
            let seconds = parseInt(exerciseTime.split(':')[0]) * 3600 + parseInt(exerciseTime.split(':')[1]) * 60 + parseInt(exerciseTime.split(':')[2]);
            let addingExercise = new Exercise();
            addingExercise.name = exerciseName;
            addingExercise.numTimes = exerciseTimes; 
            addingExercise.distance = exerciseDistance;
            addingExercise.timeAlloted = exerciseTime;
            addingExercise.timeInSeconds = seconds;
            addingSet.exercises.push(addingExercise);
        }
        warmUpSetArray.push(addingSet); 
        updateWorkoutDisplay('warmup');
        resetWorkInputDisplay('warmup');
    }

    if(setType == 'mainset'){
        let mainSetName = document.querySelector('#addMainSet .mainSetName').value;
        let mainSetNumRounds = document.querySelector('#addMainSet .mainSetNumRounds').value;
        let addingSet = new Set();
        addingSet.name = mainSetName;
        addingSet.rounds = mainSetNumRounds;
        addingSet.exercises = [];

        let currentExerciseDivs = document.querySelectorAll('#mainSetCreation .exerciseNum');
        for(let i = 0; i < currentExerciseDivs.length; i++){
            let currentExercise = currentExerciseDivs[i];
            let exerciseName = currentExercise.querySelector('.exerciseName').value;
            let exerciseTimes = currentExercise.querySelector('.exerciseTimes').value;
            let exerciseDistance = currentExercise.querySelector('.exerciseDistance').options[currentExercise.querySelector('.exerciseDistance').selectedIndex].text;
            let exerciseTime = currentExercise.querySelector('.exerciseTime').value;
            let seconds = parseInt(exerciseTime.split(':')[0]) * 3600 + parseInt(exerciseTime.split(':')[1]) * 60 + parseInt(exerciseTime.split(':')[2]);
            let addingExercise = new Exercise();
            addingExercise.name = exerciseName;
            addingExercise.numTimes = exerciseTimes; 
            addingExercise.distance = exerciseDistance;
            addingExercise.timeAlloted = exerciseTime;
            addingExercise.timeInSeconds = seconds;
            addingSet.exercises.push(addingExercise);
        }

        mainSetArray.push(addingSet);
        updateWorkoutDisplay('mainset');
        resetWorkInputDisplay('mainset');
    }

    if(setType == 'cooldown'){
        let coolDownSetName = document.querySelector('#addCooldownSet .cooldownSetName').value;
        let coolDownSetNumRounds = document.querySelector('#addCooldownSet .cooldownSetNumRounds').value;
        let addingSet = new Set();
        addingSet.name = coolDownSetName;
        addingSet.rounds = coolDownSetNumRounds;
        addingSet.exercises = [];

        let currentExerciseDivs = document.querySelectorAll('#cooldownSetCreation .exerciseNum');
        for(let i = 0; i < currentExerciseDivs.length; i++){
            let currentExercise = currentExerciseDivs[i];
            let exerciseName = currentExercise.querySelector('.exerciseName').value;
            let exerciseTimes = currentExercise.querySelector('.exerciseTimes').value;
            let exerciseDistance = currentExercise.querySelector('.exerciseDistance').options[currentExercise.querySelector('.exerciseDistance').selectedIndex].text;
            let exerciseTime = currentExercise.querySelector('.exerciseTime').value;
            let seconds = parseInt(exerciseTime.split(':')[0]) * 3600 + parseInt(exerciseTime.split(':')[1]) * 60 + parseInt(exerciseTime.split(':')[2]);
            let addingExercise = new Exercise();
            addingExercise.name = exerciseName;
            addingExercise.numTimes = exerciseTimes; 
            addingExercise.distance = exerciseDistance;
            addingExercise.timeAlloted = exerciseTime;
            addingExercise.timeInSeconds = seconds;
            addingSet.exercises.push(addingExercise);
        }

        cooldownSetArray.push(addingSet);
        updateWorkoutDisplay('cooldown');
        resetWorkInputDisplay('cooldown');

    }
}

function resetWorkInputDisplay(setType){
    if(setType == 'warmup'){
        let currentExerciseDivs = document.querySelectorAll('#warmupSetCreation .exerciseNum');
        for(let i = 0; i < currentExerciseDivs.length; i++){
            let currentExercise = currentExerciseDivs[i];
            currentExercise.remove();
        }
    
        let exerciseTemplate = document.querySelector('#warmupSetCreation #exerciseTemplate');
        let newExerciseDiv = document.createElement("div");
        newExerciseDiv.classList.add('exerciseNum');
        exerciseTemplate.parentNode.insertBefore(newExerciseDiv, exerciseTemplate.nextSibling);
        currentExerciseDivs = document.querySelectorAll('#warmupSetCreation .exerciseNum');
        let lastExerciseDiv = currentExerciseDivs[currentExerciseDivs.length-1];
        lastExerciseDiv.innerHTML = exerciseTemplate.innerHTML;
    
        let setTemplate = document.querySelector('#warmupSetCreation #setTemplate');
        let addWarmUpSet = document.querySelector('#warmupSetCreation #addWarmUpSet');
        addWarmUpSet.innerHTML = setTemplate.innerHTML;
    
        let warmupSetCreation = document.getElementById('warmupSetCreation');
        let warmupSetCreationBtn = document.getElementById('btnAddWarmupSet');
            warmupSetCreation.classList.add('collapse');
            warmupSetCreationBtn.disabled = false;
    }
    if(setType == 'mainset'){
        let currentExerciseDivs = document.querySelectorAll('#mainSetCreation .exerciseNum');
        for(let i = 0; i < currentExerciseDivs.length; i++){
            let currentExercise = currentExerciseDivs[i];
            currentExercise.remove();
        }
    
        let exerciseTemplate = document.querySelector('#mainSetCreation #exerciseTemplate');
        let newExerciseDiv = document.createElement("div");
        newExerciseDiv.classList.add('exerciseNum');
        exerciseTemplate.parentNode.insertBefore(newExerciseDiv, exerciseTemplate.nextSibling);
        currentExerciseDivs = document.querySelectorAll('#mainSetCreation .exerciseNum');
        let lastExerciseDiv = currentExerciseDivs[currentExerciseDivs.length-1];
        lastExerciseDiv.innerHTML = exerciseTemplate.innerHTML;
    
        let setTemplate = document.querySelector('#mainSetCreation #setTemplate');
        let addMainSet = document.querySelector('#mainSetCreation #addMainSet');
        addMainSet.innerHTML = setTemplate.innerHTML;
    
        let mainSetCreation = document.getElementById('mainSetCreation');
        let mainSetCreationBtn = document.getElementById('btnAddMainSet');
            mainSetCreation.classList.add('collapse');
            mainSetCreationBtn.disabled = false;

    }

    if(setType == 'cooldown'){
        let currentExerciseDivs = document.querySelectorAll('#cooldownSetCreation .exerciseNum');
        for(let i = 0; i < currentExerciseDivs.length; i++){
            let currentExercise = currentExerciseDivs[i];
            currentExercise.remove();
        }
    
        let exerciseTemplate = document.querySelector('#cooldownSetCreation #exerciseTemplate');
        let newExerciseDiv = document.createElement("div");
        newExerciseDiv.classList.add('exerciseNum');
        exerciseTemplate.parentNode.insertBefore(newExerciseDiv, exerciseTemplate.nextSibling);
        currentExerciseDivs = document.querySelectorAll('#cooldownSetCreation .exerciseNum');
        let lastExerciseDiv = currentExerciseDivs[currentExerciseDivs.length-1];
        lastExerciseDiv.innerHTML = exerciseTemplate.innerHTML;
    
        let setTemplate = document.querySelector('#cooldownSetCreation #setTemplate');
        let addCooldownSet = document.querySelector('#cooldownSetCreation #addCooldownSet');
        addCooldownSet.innerHTML = setTemplate.innerHTML;
    
        let cooldownSetCreation = document.getElementById('cooldownSetCreation');
        let cooldownSetCreationBtn = document.getElementById('btnAddCooldownSet');
            cooldownSetCreation.classList.add('collapse');
            cooldownSetCreationBtn.disabled = false;
    }
}

function updateWorkoutDisplay(setType){
    if(setType == 'warmup' || setType=='all') {
        let warmupWorkout = document.getElementById('warmupWorkout');
        let warmUpWorkoutString = '';
        for(let i = 0; i < warmUpSetArray.length; i++){
            let currentWarmupWorkoutString = `<div class="col-md-12 mt-3">
                                                <div class="row">
                                                    <div class="col-md-6 text-left">
                                                    <h4>${warmUpSetArray[i].name}   ${warmUpSetArray[i].rounds}</h4>
                                                    </div>
                                                    <div class="col-md-6 text-right">
                                                    <h4 id="warmupSetExpand${i}" class="mb-0" onclick="expandSetInfo('warmupSetExpand${i}', 'warmup');"><i class="fas fa-chevron-up"></i></h4>
                                                    </div>
                                                </div>
                                                </div>`;

            let exerciseString = `<div class="col-md-12 collapse" id="warmupSetInfo${i}">`;
            exerciseString += `<div class="row">
            <div class="col-md-3">
                Name:
            </div>
            <div class="col-md-3">
            Num Times:
            </div>
            <div class="col-md-3">
            Distance:
            </div>
            <div class="col-md-3">
            Interval:
            </div>
            </div>`
            for(let j = 0; j < warmUpSetArray[i].exercises.length; j++){
                exerciseString += `<div class="row">
                                    <div class="col-md-3">
                                    ${warmUpSetArray[i].exercises[j].name}
                                    </div>
                                    <div class="col-md-3">
                                    ${warmUpSetArray[i].exercises[j].numTimes}
                                    </div>
                                    <div class="col-md-3">
                                    ${warmUpSetArray[i].exercises[j].distance}
                                    </div>
                                    <div class="col-md-3">
                                    ${warmUpSetArray[i].exercises[j].timeAlloted}
                                    </div>
                                    </div>`
            }
            exerciseString += '</div>';
            currentWarmupWorkoutString += exerciseString;
            warmUpWorkoutString += currentWarmupWorkoutString;
        }
        warmupWorkout.innerHTML = warmUpWorkoutString;
    }

    if(setType == 'mainset'|| setType=='all'){
        let mainsetWorkout = document.getElementById('mainsetWorkout');
        let mainsetWorkoutString = '';
        for(let i = 0; i < mainSetArray.length; i++){
            let currentMainsetWorkoutString = `<div class="col-md-12 mt-3">
                                                <div class="row">
                                                    <div class="col-md-6 text-left">
                                                    <h4>${mainSetArray[i].name}   ${mainSetArray[i].rounds}</h4>
                                                    </div>
                                                    <div class="col-md-6 text-right">
                                                    <h4 id="mainSetExpand${i}" class="mb-0" onclick="expandSetInfo('mainSetExpand${i}', 'mainset');"><i class="fas fa-chevron-up"></i></h4>
                                                    </div>
                                                </div>
                                                </div>`;

            let exerciseString = `<div class="col-md-12 collapse" id="mainSetInfo${i}">`;
            exerciseString += `<div class="row">
            <div class="col-md-3">
                Name:
            </div>
            <div class="col-md-3">
            Num Times:
            </div>
            <div class="col-md-3">
            Distance:
            </div>
            <div class="col-md-3">
            Interval:
            </div>
            </div>`
            for(let j = 0; j < mainSetArray[i].exercises.length; j++){
                exerciseString += `<div class="row">
                                    <div class="col-md-3">
                                    ${mainSetArray[i].exercises[j].name}
                                    </div>
                                    <div class="col-md-3">
                                    ${mainSetArray[i].exercises[j].numTimes}
                                    </div>
                                    <div class="col-md-3">
                                    ${mainSetArray[i].exercises[j].distance}
                                    </div>
                                    <div class="col-md-3">
                                    ${mainSetArray[i].exercises[j].timeAlloted}
                                    </div>
                                    </div>`
            }
            exerciseString += '</div>';
            currentMainsetWorkoutString += exerciseString;
            mainsetWorkoutString += currentMainsetWorkoutString;
        }
        mainsetWorkout.innerHTML = mainsetWorkoutString;
    }

    if(setType == 'cooldown'|| setType=='all'){
        let cooldownWorkout = document.getElementById('cooldownWorkout');
        let cooldownWorkoutString = '';
        for(let i = 0; i < cooldownSetArray.length; i++){
            let currentCooldownWorkoutString = `<div class="col-md-12 mt-3">
                                                <div class="row">
                                                    <div class="col-md-6 text-left">
                                                    <h4>${cooldownSetArray[i].name}   ${cooldownSetArray[i].rounds}</h4>
                                                    </div>
                                                    <div class="col-md-6 text-right">
                                                    <h4 id="cooldownSetExpand${i}" class="mb-0" onclick="expandSetInfo('cooldownSetExpand${i}', 'cooldown');"><i class="fas fa-chevron-up"></i></h4>
                                                    </div>
                                                </div>
                                                </div>`;

            let exerciseString = `<div class="col-md-12 collapse" id="cooldownSetInfo${i}">`;
            exerciseString += `<div class="row">
            <div class="col-md-3">
                Name:
            </div>
            <div class="col-md-3">
            Num Times:
            </div>
            <div class="col-md-3">
            Distance:
            </div>
            <div class="col-md-3">
            Interval:
            </div>
            </div>`
            for(let j = 0; j < cooldownSetArray[i].exercises.length; j++){
                exerciseString += `<div class="row">
                                    <div class="col-md-3">
                                    ${cooldownSetArray[i].exercises[j].name}
                                    </div>
                                    <div class="col-md-3">
                                    ${cooldownSetArray[i].exercises[j].numTimes}
                                    </div>
                                    <div class="col-md-3">
                                    ${cooldownSetArray[i].exercises[j].distance}
                                    </div>
                                    <div class="col-md-3">
                                    ${cooldownSetArray[i].exercises[j].timeAlloted}
                                    </div>
                                    </div>`
            }
            exerciseString += '</div>';
            currentCooldownWorkoutString += exerciseString;
            cooldownWorkoutString += currentCooldownWorkoutString;
        }
        cooldownWorkout.innerHTML = cooldownWorkoutString;
    }
}


function hideSet(setType, elem){
    let warmupCardBody = document.getElementById('warmupCardBody');
    let mainCardBody = document.getElementById('mainCardBody');
    let cooldownCardBody = document.getElementById('cooldownCardBody');

    if(setType == 'warmup'){
        if( warmupCardBody.classList.contains('collapse')){
            warmupCardBody.classList.remove('collapse');
            elem.innerHTML = "Hide" 
        }
        else{
            warmupCardBody.classList.add('collapse');
            elem.innerHTML = "Show" 
        }
    }

    if(setType == 'mainset'){
        if( mainCardBody.classList.contains('collapse')){
            mainCardBody.classList.remove('collapse');
            elem.innerHTML = "Hide" 
        }
        else{
            mainCardBody.classList.add('collapse');
            elem.innerHTML = "Show" 
        }
    }

    if(setType == 'cooldown'){
        if( cooldownCardBody.classList.contains('collapse')){
            cooldownCardBody.classList.remove('collapse');
            elem.innerHTML = "Hide" 
        }
        else{
            cooldownCardBody.classList.add('collapse');
            elem.innerHTML = "Show" 
        }
    }
}

function formatTime(timeInput) {

    intValidNum = timeInput.value;
  
    if (intValidNum < 24 && intValidNum.length == 2) {
        timeInput.value = timeInput.value + ":";
        return false;  
    }
    if (intValidNum == 24 && intValidNum.length == 2) {
        timeInput.value = timeInput.value.length - 2 + "0:";
        return false;
    }
    if (intValidNum > 24 && intValidNum.length == 2) {
        timeInput.value = "";
        return false;
    }
  
    if (intValidNum.length == 5 && intValidNum.slice(-2) < 60) {
      timeInput.value = timeInput.value + ":";
      return false;
    }
    if (intValidNum.length == 5 && intValidNum.slice(-2) > 60) {
      timeInput.value = timeInput.value.slice(0, 2) + ":";
      return false;
    }
    if (intValidNum.length == 5 && intValidNum.slice(-2) == 60) {
      timeInput.value = timeInput.value.slice(0, 2) + ":00:";
      return false;
    }
  
    if (intValidNum.length == 8 && intValidNum.slice(-2) > 60) {
      timeInput.value = timeInput.value.slice(0, 5) + ":";
      return false;
    }
    if (intValidNum.length == 8 && intValidNum.slice(-2) == 60) {
      timeInput.value = timeInput.value.slice(0, 5) + ":00";
      return false;
    }
  
  
  
  } //end function

function setTempo(setType, tempo){
    if(setType == 'warmup'){     
       warmUpSetTempo = tempo != '' ? tempo * 1000 : null;
    }

    if(setType == 'mainset'){
        mainSetTempo = tempo != '' ? tempo * 1000 : null;
    }

    if(setType == 'cooldown'){
      cooldownSetTempo = tempo != '' ? tempo * 1000 : null;
    }
}

function setTempoFromImport(setType, tempo){
    if(setType == 'warmup'){     
       warmUpSetTempo = tempo != '' ? tempo : null;
       warmupTempo.value = tempo / 1000;
    }

    if(setType == 'mainset'){
        mainSetTempo = tempo != '' ? tempo : null;
        mainsetTempo.value = tempo / 1000;
    }

    if(setType == 'cooldown'){
      cooldownSetTempo = tempo != '' ? tempo : null;
      cooldownTempo.value = tempo / 1000;
    }
}


function showImportModal(){
    $('#importModal').modal('show');
    importWorkoutTxt();
}


function showExportModal(){
    $('#exportModal').modal('show');
}
