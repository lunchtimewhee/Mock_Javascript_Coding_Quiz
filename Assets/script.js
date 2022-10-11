var gameOngoing = false; //Tracks to see if game is ongoing
var score = 0; //Tracks score
var time = 0; //Tracks time remaining
var initials = ''; //Initials of player

var descriptionTextEl = document.getElementById('description-text');
var questionDisplayEl = document.getElementById('question-display');
var h1TextEl = document.getElementById('main-page-header');
var mainPageEl = document.getElementById('main-page');
var startQuizButton = document.getElementById('start-quiz-button');
var quizButtonsULEl = document.getElementById('quiz-buttons');
var scoreEl = document.getElementById('score');
var timeEl = document.getElementById('time');
var quizButtons = document.querySelectorAll('.mcq-button');
var submitScoreForm = document.getElementById('submit-score-form');
var submitScoreButton = document.getElementById('submit-score-button');
var submitScoreInput = document.getElementById('submit-score-input');
var highScoresButtonsEl = document.getElementById('high-scores-buttons-container');
var goBackButton = document.getElementById('go-back-button');
var clearHighScoresButton = document.getElementById('clear-high-scores-button');
var highScoresListEl = document.getElementById('high-scores-list');
var correctIncorrectEl = document.getElementById('correct-incorrect');
var viewHighScoresButton = document.getElementById('view-high-scores');

//Default description text for home page.
var defaultDescriptionText = 'Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by 10 seconds!';

var highScoresList = [];

var currentAnswer = '';

//Master question list that is used to get the list of questions for the current game
var masterQuestionList = [
    ['Javascript is an ______ language?','1. Object-Oriented', '2. Object-Based', '3. Procedural', '4. None of the above',1],
    ['Which of the following keywords is used to define a variable in Javascript?','1. var', '2. let', '3. Both A and B', '4. None of the above',3],
    ['Which of the following methods is used to access HTML elements using Javascript?','1. getElementsByHTML()', '2. getElementsByJS()', '3. getElementById()', '4. getElementsByCSS()',3],
    ['Upon encountering empty statements, what does Javascript interpreter do?','1. Throws an error', '2. Crashes', '3. Gives a warning', '4. Ignores the statements',4],
    ['How do you stop an interval timer in Javascript?','1. clearInterval()', '2. clearTimer()', '3. intervalOver()', '4. timerOver()',1],
    ['How can a datatype be declared to be a constant type?','1. var', '2. const', '3. let', '4. constant',2],
    ['What keyword is used to check whether a given property is valid or not?','1. exists', '2. is in', '3. in', '4. lies',3],
    ['When an operator\'s value is null, the typeof returned by the operator is:','1. Integer', '2. Boolean', '3. Undefined', '4. Object',4],
    ['Which function is used to serialize an object into a JSON string in Javascript?','1. stringify()', '2. parse()', '3. convert()', '4. =',1],
    ['Which of the following is not a Javascript framework?','1. Node', '2. Cassandra', '3. Vue', '4. React',2]
]

//loads in high score list from local storage if there is one
if(JSON.parse(localStorage.getItem('high-scores-list')) && Array.isArray(JSON.parse(localStorage.getItem('high-scores-list')))){
    highScoresList = JSON.parse(localStorage.getItem('high-scores-list')).slice(0);
}



//Function to initialize the game. Resets score, time and question list. Also reveals the MCQ buttons
function playQuiz(){
    //Set initial game values
    gameOngoing = true;
    score = 0;
    time = 60;
    
    currentQuestionList = masterQuestionList.slice(0);


    //Display elements related to quiz buttons
    questionDisplayEl.style.display = 'block';
    mainPageEl.style.display = 'block';
    timeEl.textContent = `Time Remaining: ${time}`;
    scoreEl.textContent = `Score: ${score}`;
        
    //Hide elements not related to quiz questions
    descriptionTextEl.style.display = 'none';
    h1TextEl.style.display = 'none';
    startQuizButton.setAttribute('hidden','hidden');


    //Clear high scores list
    while (highScoresListEl.firstChild){
        highScoresListEl.removeChild(highScoresListEl.lastChild);
    }
    
    if(JSON.parse(localStorage.getItem('high-scores-list')) && Array.isArray(JSON.parse(localStorage.getItem('high-scores-list')))){
        highScoresList = JSON.parse(localStorage.getItem('high-scores-list')).slice(0);
    }

    //Select a random number between 0 and length of questionlist-1 to choose a question to display
    //Then, remove that question from the list
    var questionNumber = Math.floor(Math.random() * (currentQuestionList.length))
    var currentQuestion = currentQuestionList[questionNumber];
    currentQuestionList.splice(questionNumber,1);

    //Display buttons for answers and set question/answers equal to the seleted question
    document.getElementById('quiz-buttons').style.display = 'flex';
    questionDisplayEl.textContent = currentQuestion[0];
    
    for(var i = 0; i < quizButtons.length; i++){
        quizButtons[i].textContent = currentQuestion[i+1];
    }

    //Sets the number of the correct answer so that the chosen answer can be compared to the correct answer
    currentAnswer = currentQuestion[5];

    console.log(currentAnswer);

    //Set timer
    var timeInterval = setInterval(function (){
        if(gameOngoing){
            time--;
            timeEl.textContent = `Time Remaining: ${time}`;
            
            if(time < 1){
                clearInterval(timeInterval);
                gameOngoing = false;
                time = 0;
                timeEl.textContent = `Time Remaining: ${time}`;
                displayRecordScore();                
            }
        }
        else{
            clearInterval(timeInterval);
            time = 0;
            timeEl.textContent = `Time Remaining: ${time}`;
            displayRecordScore();
        }
       
    
      },1000);

}

//Function to display the next question
function displayNextQuestion(){
    //Select a random number between 0 and length of questionlist-1 to choose a question to display
    //Then, remove that question from the list
    var questionNumber = Math.floor(Math.random() * (currentQuestionList.length - 0))
    var currentQuestion = currentQuestionList[questionNumber];
    currentQuestionList.splice(questionNumber,1);
    

    //Display buttons for answers and set question/answers equal to the seleted question
    document.getElementById('quiz-buttons').style.display = 'flex';
    questionDisplayEl.textContent = currentQuestion[0];
    
    for(var i = 0; i < quizButtons.length; i++){
        quizButtons[i].textContent = currentQuestion[i+1];
    }

    //Sets the number of the correct answer so that the chosen answer can be compared to the correct answer
    currentAnswer = currentQuestion[5];

    console.log(currentAnswer);
    
}

function displayRecordScore(){
    //Display "record score" page elements
    questionDisplayEl.textContent = 'All done!';
    mainPageEl.style.display = 'block';
    descriptionTextEl.style.display = 'block';
    descriptionTextEl.textContent = `Your final score is ${score}.`;

    descriptionTextEl.style.textAlign = 'left';

    //Hide non-"record score" page elements
    quizButtonsULEl.style.display = 'none';
    submitScoreForm.style.display = 'flex';



}

//Function to display high scores
function insertHighScores(){
    //Display "high scores" page elements
    h1TextEl.style.display = 'block';
    h1TextEl.textContent = 'High Scores';
    highScoresListEl.style.display = 'block';

    //Hide non-highscores page elements
    descriptionTextEl.style.display = 'none';
    questionDisplayEl.style.display = 'none';
    submitScoreForm.style.display = 'none';
    startQuizButton.setAttribute('hidden','hidden');
    quizButtonsULEl.style.display = 'none';
    submitScoreForm.style.display = 'none';
    

    //Display high score list
    var scorePlaced = false;
    
    //If high score list is not empty, add all items from high scores list to the display
    for(var i = 0; i < highScoresList.length; i++){
        var currentLineItem = highScoresList[i];
        var newLI = document.createElement('li');


        if(currentLineItem[1] <= score && !scorePlaced){ //If this score is above a score, print this score and insert it into the place in the high score list
            newLI.textContent = `${i+1}. ${initials} -- ${score}`;
            newLI.style.backgroundColor = 'peachPuff';
            highScoresListEl.append(newLI);
            scorePlaced = true;
            highScoresList.splice(i,0,[initials,score]);
        }
        else if(i === highScoresList.length-1 && !scorePlaced){ //If this is the lowest score, print the previous lowest score, then print your score
            //Create a new LI that represents the previous last item and append to high scores list display
            var nextLineItem = document.createElement('li');
            nextLineItem.textContent = `${i+1}. ${currentLineItem[0]} -- ${currentLineItem[1]}`
            highScoresListEl.append(nextLineItem);

            //Insert your score at the end of the high scores list display
            newLI.textContent = `${i+1}. ${initials} -- ${score}`;
            newLI.style.backgroundColor = 'peachPuff';
            highScoresListEl.append(newLI);
            scorePlaced = true;
            highScoresList.push([initials,score]);
            break;
        }
        else{ //If your score does not belong in this high scores slot, print the current record holder at that position
            newLI.textContent = `${i+1}. ${currentLineItem[0]} -- ${currentLineItem[1]}`;
            highScoresListEl.append(newLI);
        }

    }

    //If high score list is empty, put your score in
    if(highScoresList.length === 0){
        var newLI = document.createElement('li');
        newLI.textContent = `1. ${initials} -- ${score}`;
        highScoresListEl.append(newLI);
        scorePlaced = true;
        newLI.style.backgroundColor = 'peachPuff';
        highScoresList.push([initials,score]);
    }

    localStorage.setItem('high-scores-list',JSON.stringify(highScoresList));
}


//Function to display high scores if View Highscores button is pressed
function displayHighScores(){
    score = 0;
    time = 0;
    gameOngoing = false;

    //set up a loading screen while other intervals finish 
    document.getElementById('cover-screen').style.display = 'block';

    setTimeout(function(){
        //Display "high scores" page elements
        document.getElementById('cover-screen').style.display = 'none';
        h1TextEl.style.display = 'block';
        h1TextEl.textContent = 'High Scores';
        highScoresListEl.style.display = 'block';
        mainPageEl.style.display = 'block';
        highScoresButtonsEl.style.display = 'flex';

        //Hide non-highscores page elements
        descriptionTextEl.style.display = 'none';
        questionDisplayEl.style.display = 'none';
        submitScoreForm.style.display = 'none';
        startQuizButton.setAttribute('hidden','hidden');
        quizButtonsULEl.style.display = 'none';
        submitScoreForm.style.display = 'none';

        //Clear the current displayed high score list
        while (highScoresListEl.firstChild){
            highScoresListEl.removeChild(highScoresListEl.lastChild);
        }

        //Display all items in high score list
        for(var i = 0; i < highScoresList.length; i++){
            var currentLineItem = highScoresList[i];
            var newLI = document.createElement('li');
            newLI.textContent = `${i+1}. ${currentLineItem[0]} -- ${currentLineItem[1]}`;
            highScoresListEl.append(newLI);
        }
    },1000);   
}



//Display the original welcome page
function displayMainPage(){
    //Display score and time as 0
    score = 0;
    time = 0;
    
    //Display elements on default main page
    mainPageEl.style.display = 'flex';
    descriptionTextEl.style.display = 'block';
    startQuizButton.removeAttribute('hidden');
    descriptionTextEl.textContent = defaultDescriptionText;
    h1TextEl.textContent = 'Coding Quiz Challenge'
    
    //Hide elements that are not part of default main page
    highScoresButtonsEl.style.display = 'none';
    questionDisplayEl.style.display = 'none';
    highScoresListEl.style.display = 'none';

}


//Temporarily display "Correct!" when a correct answer is chosen
function displayCorrect(){
    correctIncorrectEl.style.display = 'block';
    correctIncorrectEl.textContent = 'Correct!';

    //Set timer
    var timer = 1;

    var correctTimer = setInterval(function (){
        if(gameOngoing){
            timer--;

            if(timer < 1){
                clearInterval(correctTimer);
                timer = 0;
                correctIncorrectEl.style.display = 'none';
            }
        }
        else{
            clearInterval(correctTimer);
            timer = 0;
            correctIncorrectEl.style.display = 'none';
        }
       
    
      },1000);

}

//Temporarily display "Wrong!" when a correct answer is chosen
function displayIncorrect(){
    correctIncorrectEl.style.display = 'block';
    correctIncorrectEl.textContent = 'Wrong!';

    //Set timer
    var timer = 1;

    var incorrectTimer = setInterval(function (){
        if(gameOngoing){
            timer--;

            if(timer < 1){
                clearInterval(incorrectTimer);
                timer = 0;
                correctIncorrectEl.style.display = 'none';
            }
        }
        else{
            clearInterval(incorrectTimer);
            timer = 0;
            correctIncorrectEl.style.display = 'none';
        }
       
    
      },1000);

}




//---------------------------------------------------------------------------------------



//Event listener for the start quiz button
startQuizButton.addEventListener('click',function(){
    playQuiz();
});


//Event listener for when a MCQ button is clicked. Adds points if correct answer, subtracts time if incorrect answer. 
quizButtonsULEl.addEventListener('click',function(event){
    event.stopPropagation();
    //Button clicks only work while game is ongoing
    if(gameOngoing && event.target.classList.contains('mcq-button')){
        //If correct answer is chosen, give 1 point and upate scoreboard
        if(event.target.dataset.choicenum == currentAnswer){
            score++;
            scoreEl.textContent = `Score: ${score}`;
            console.log('correct');
            displayCorrect();
        }
        //If incorrect answer is chosen, subtract 10 seconds from the timer
        else{
            console.log('incorrect');
            displayIncorrect();
            if(time<=10){
                time = 0;
            }
            else{
                time-=10;
            }
        }

        //If there are still questions left in the question list, ask the next question
        //If not, then notify user that the game is complete
        if(currentQuestionList.length > 0){
            displayNextQuestion();
        }
        else{
            gameOngoing = false;
        }
        
    }
})


//Event listener for the submit score button
submitScoreButton.addEventListener('click',function(event){
    event.preventDefault();
    initials = submitScoreInput.value.toUpperCase();
    console.log(submitScoreInput.value);
    submitScoreInput.value = '';
    highScoresButtonsEl.style.display = 'flex';

    insertHighScores();
})


//Event listener for the Clear High Scores button
clearHighScoresButton.addEventListener('click', function(){
    //Clear the high scores from the display
    while (highScoresListEl.firstChild){
        highScoresListEl.removeChild(highScoresListEl.lastChild);
    }

    localStorage.removeItem('high-scores-list');
})

//Event listener for Go Back button
goBackButton.addEventListener('click',function(){
    displayMainPage();
})


viewHighScoresButton.addEventListener('click', function(){
    displayHighScores();
})