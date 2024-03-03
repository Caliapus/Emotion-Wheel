// Initialize application and event listeners once DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initCoreEmotions();
    document.getElementById('submitButton').addEventListener('click', submitSelections); // Event listener for the submit button
});

//global constants
const emotionsBox = document.getElementById('emotions-box');
const feelingsBox = document.getElementById('feelings-box');
const precisefeelingsBox = document.getElementById('precisefeelings-box');
const inputBox = document.getElementById('inputBox');
let currentState = 'feelings'
const transistion_delay=0.1;
// Initialize core emotions display

// Trying to solve the mess of waiting after transitions in CSS from https://stackoverflow.com/questions/15617970/wait-for-css-transition

function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}
var transitionEnd = whichTransitionEvent();

function initCoreEmotions() {
    emotionsBox.innerHTML = ''; // Clear input box for new content
    emotionsBox.style.width = '33.3%'; //to be sure. If something fancy is hapenning before
//    emotionsBox.style.backgroundColor = '#f0f0f0'; // Reset to default color
    //delete the past
    if (precisefeelingsBox.style.width != ''){
        precisefeelingsBox.style.width='0%';
        eraseFeelingBox();
//        precisefeelingsBox.addEventListener(transitionEnd, eraseFeelingBox());
        feelingsBox.addEventListener(transitionEnd, createEmotionsButtons());
    } else {
        if (feelingsBox.style.width!=''){
        eraseFeelingBox();
        feelingsBox.addEventListener(transitionEnd, createEmotionsButtons());
        
        } else {
            createEmotionsButtons();
        } 
    }
    
    // if (feelingsBox.style.width != ''){
        // feelingsBox.style.width='0%';
    // }
    // Iterate through each emotion in the emotionsData object

    let currentState = 'emotions'; //optional. Maybe is needed to check at some point
}
//element.addEventListener(transitionEnd, theFunctionToInvoke, false);

function createEmotionsButtons(){
    Object.keys(emotionsData).forEach(emotion => {
        const button = document.createElement('button');
        button.className = 'emotion-button'; 
        button.textContent = emotion; // Set button text to the emotion name
        button.style.backgroundColor = emotionsData[emotion].color; // Use color from data
        button.addEventListener('click', () => loadFeelings(emotion)); // Load associated feelings when clicked
        emotionsBox.appendChild(button);
    });
}


// Load feelings associated with a selected core emotion
function loadFeelings(emotion) {
    feelingsBox.innerHTML = ''; // Clear feelings box for new content
//    emotionsBox.style.width = '33.33%';
//    emotionsBox.style.backgroundColor = emotionsData[emotion].color; // Change background color based on emotion
    if (precisefeelingsBox.style.width != '') {                        //if there is something in the precisefeelingsbox
        precisefeelingsBox.style.width='0%'                            //make it dissapear
//        precisefeelingsBox.style.backgroundColor = '#f0f0f0';
//        eraseFeelingBox()
        precisefeelingsBox.addEventListener(transitionEnd, eraseFeelingBox(), false); //make disappear the feelingsBox

//        populateFeelingsBox(emotion);
        feelingsBox.addEventListener(transitionEnd, populateFeelingsBox(emotion), false);
    } else {
        if (feelingsBox.style.width != '') {                            //if there is something in the feelingsBox
            eraseFeelingBox();                                          // make it disappear
//            populateFeelingsBox(emotion);
           feelingsBox.addEventListener(transitionEnd, populateFeelingsBox(emotion), false); //wait for the transition to end and then  build another FeelingsBox
        } else {                                                        //if nothing was there
            populateFeelingsBox(emotion);                               //just create it
//            feelingsBox.style.backgroundColor = emotionsData[emotion].color; 
        }
    }
    
    
    // Access the feelings for the selected emotion

    //draw the backbutton -- uuuh not needed anymore? to be confirmed
//    const button = document.createElement('button');
//    button.className = 'semi-transparent-button'; 
//    button.textContent = ' < ';
//    button.addEventListener('click', () => initCoreEmotions());
//    inputBox.appendChild(button)
    currentState = 'feelings';  //optional. Maybe is needed to check at some point
}
function eraseFeelingBox(){ //needed to be able to wait 
    feelingsBox.style.width = '0%';
    console.log('eraseFeelingBox executed')
}
function populateFeelingsBox(emotion) {
    const feelings = emotionsData[emotion].feelings;
    Object.keys(feelings).forEach(feeling => {
        const button = document.createElement('button');
        button.className = 'emotion-button'; 
        button.textContent = feeling;
        button.addEventListener('click', () => loadPreciseFeelings(emotion, feeling));
        button.style.backgroundColor = emotionsData[emotion].color; // Use color from data
        feelingsBox.appendChild(button);
    })
    feelingsBox.style.width = '33.33%';                         //make it appear
    feelingsBox.style.left = '33.33%';
}
// Load precise feelings for a selected feeling
function loadPreciseFeelings(emotion, feeling) {
//    emotionsBox.style.width = '33.33%';
//    feelingsBox.style.width = '33.33%'; //just to be sure
 //   emotionsBox.style.backgroundColor = emotionsData[emotion].color; // Change background color based on emotion
    if (precisefeelingsBox.style.width == '33.33%') {     //if there is a precisefeelingsBox present
       console.log('precisefeelingsBox.style.width is 33.33%')
       console.log(precisefeelingsBox.style.width)
       precisefeelingsBox.style.width = '0%';       //annihilate the box  !! 
       console.log(precisefeelingsBox.style.width)
       precisefeelingsBox.addEventListener(transitionEnd, populatePreciseFeelingsBox(emotion, feeling), false);       //build it again after the transition ends
       console.log(precisefeelingsBox.style.width)
    } else {                                        //else 
        populatePreciseFeelingsBox(emotion, feeling)
 
//        precisefeelingsBox.style.backgroundColor = emotionsData[emotion].color; 
    }
    // Retrieve the precise feelings for the selected feeling
    
    //draw the backbutton --- uuh not needed anymore, after dividing the inputBox in 3
//    const button = document.createElement('button');
//    button.className = 'semi-transparent-button'; 
//    button.textContent = ' < ';
//    button.addEventListener('click', () => loadFeelings(emotion));
//    precisefeelingsBox.appendChild(button)
    currentState = 'preciseFeelings'; //optional. Maybe is needed to check at some point
}


function populatePreciseFeelingsBox(emotion, feeling) {
        const preciseFeelings = emotionsData[emotion].feelings[feeling];
        precisefeelingsBox.innerHTML = ''; // Clear precise feelings box for new content
        preciseFeelings.forEach(preciseFeeling => {
        const button = document.createElement('button');
            button.className = 'emotion-button'; 
            button.textContent = preciseFeeling;
            button.style.backgroundColor = emotionsData[emotion].color; // Use color from data
            button.addEventListener('click', () => {
                addToOutputBox(emotion, feeling, preciseFeeling); // Add selection to output box
                initCoreEmotions(); // Re-initialize with core emotions for new selection
        });
        precisefeelingsBox.appendChild(button);
        precisefeelingsBox.style.width = '33.33%';  
        precisefeelingsBox.style.left = '66.66%'; 
    });
}




var all_feelings=[] 
// Function to add selections to the output box and to the global array all_selections

function addToOutputBox(emotion, feeling, preciseFeeling) {
    const outputBox = document.getElementById('outputBox');
    const selectionDiv = document.createElement('div');
    selectionDiv.className = 'selection-div';

    const selection = document.createElement('button');
    selection.className = 'output-emotion-button';
    selection.textContent = `${emotion} \u2282 ${feeling} \u2282 ${preciseFeeling}`;
    selection.style.backgroundColor = emotionsData[emotion].color;

    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = function() { deleteFeeling(selection.textContent); };

    if (all_feelings.includes(selection.textContent)) {
        alert('Feeling already chosen!');
    } else {
        selectionDiv.appendChild(selection);
        selectionDiv.appendChild(closeButton);
        outputBox.appendChild(selectionDiv);
        all_feelings.push(selection.textContent);
    }
}
//function to delete the feeling from the outbox if a selection is pressed 

function deleteFeeling(feelingText) {
    const outputBox = document.getElementById('outputBox');
    const divs = outputBox.getElementsByClassName('selection-div');
    
    for (let i = 0; i < divs.length; i++) {
        let selection = divs[i].getElementsByTagName('button')[0];
        if (selection && selection.textContent === feelingText) {
            divs[i].parentNode.removeChild(divs[i]);
            break; // Assuming unique feelings, stop after finding the right one
        }
    }

    // Update the all_feelings array
    all_feelings = all_feelings.filter(feeling => feeling !== feelingText);
    console.log(all_feelings);
}

// Function to handle submit button click, displaying all selections
function submitSelections() {
    const outputBox = document.getElementById('outputBox');
    let formData = new FormData();
    formData.append('date', new Date().toISOString().slice(0,10)); // Today's date in YYYY-MM-DD format
    formData.append('feelings', JSON.stringify(all_feelings)); // Convert array to JSON string
    if (all_feelings.length !==0) {
        console.log(all_feelings)
        fetch('saveFeelings.php', { // Assuming a PHP server-side script. Adjust for your actual server-side solution
            method: 'POST',
            body: formData
        }
        )
        .then(response => response.text()) //I don't know what this does. I am afraid to delete it. Maybe later.
        .then(result => {
            alert('Feelings saved successfully!');
            outputBox.innerHTML = '' //deletes everything in the output box
        })
        .catch(error => {
            console.error('Error saving feelings:', error);
        });

    }
}




