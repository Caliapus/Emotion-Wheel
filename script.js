// Assuming the existence of an emotionsData object in emotion-data.js, included before this script in your HTML

// Initialize application and event listeners once DOM content is fully loaded


document.addEventListener('DOMContentLoaded', () => {

    initCoreEmotions();
  
   
    document.getElementById('submitButton').addEventListener('click', submitSelections); // Event listener for the submit button


});


let currentState = 'emotions'; 
// Initialize core emotions display
function initCoreEmotions() {
    const inputBox = document.getElementById('inputBox');
    inputBox.innerHTML = ''; // Clear input box for new content
    inputBox.style.backgroundColor = '#f0f0f0'; // Reset to default color
    currentState = 'emotions'; 
    // Iterate through each emotion in the emotionsData object
    Object.keys(emotionsData).forEach(emotion => {
        const button = document.createElement('button');
        button.className = 'emotion-button'; 
        button.textContent = emotion; // Set button text to the emotion name
        button.style.backgroundColor = emotionsData[emotion].color; // Use color from data
        button.addEventListener('click', () => loadFeelings(emotion)); // Load associated feelings when clicked
        inputBox.appendChild(button);
    });
}

// Load feelings associated with a selected core emotion
function loadFeelings(emotion) {
    const inputBox = document.getElementById('inputBox');
    inputBox.innerHTML = ''; // Clear input box for new content
    inputBox.style.backgroundColor = emotionsData[emotion].color; // Change background color based on emotion
    currentState = 'feelings'; 

    // Access the feelings for the selected emotion
    const feelings = emotionsData[emotion].feelings;
    Object.keys(feelings).forEach(feeling => {
        const button = document.createElement('button');
        button.className = 'emotion-button'; 
        button.textContent = feeling;
        button.addEventListener('click', () => loadPreciseFeelings(emotion, feeling));
        inputBox.appendChild(button);
    })
    //draw the backbutton
    const button = document.createElement('button');
    button.className = 'semi-transparent-button'; 
    button.textContent = ' < ';
    button.addEventListener('click', () => initCoreEmotions());
    inputBox.appendChild(button)

}

// Load precise feelings for a selected feeling
function loadPreciseFeelings(emotion, feeling) {
    const inputBox = document.getElementById('inputBox');
    inputBox.innerHTML = ''; // Clear input box for new content
    // Retrieve the precise feelings for the selected feeling
    const preciseFeelings = emotionsData[emotion].feelings[feeling];
    currentState = 'preciseFeelings'; 
    preciseFeelings.forEach(preciseFeeling => {
        const button = document.createElement('button');
        button.className = 'emotion-button'; 
        button.textContent = preciseFeeling;
        button.addEventListener('click', () => {
            addToOutputBox(emotion, feeling, preciseFeeling); // Add selection to output box
            initCoreEmotions(); // Re-initialize with core emotions for new selection
        });
        inputBox.appendChild(button);
    });
    //draw the backbutton
    const button = document.createElement('button');
    button.className = 'semi-transparent-button'; 
    button.textContent = ' < ';
    button.addEventListener('click', () => loadFeelings(emotion));
    inputBox.appendChild(button)
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
        .then(response => response.text())
        .then(result => {
            alert('Feelings saved successfully!');
            outputBox.innerHTML = ''
        })
        .catch(error => {
            console.error('Error saving feelings:', error);
        });

    }
}




