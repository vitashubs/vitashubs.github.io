const code = document.getElementById("code");
const codeForm = document.getElementById("codeForm");
const rehearsal= document.getElementById("rehearsal");
const rehearsalField = document.getElementById("rehearsalField");
const rvspForm = document.getElementById("rvsp")
const warning = document.getElementById("warning");

document.getElementById('customForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent the form from submitting immediately

  
  // Show loading screen
  document.getElementById('loadingScreen').style.display = 'block';
  rvspForm.style.display = "none";

  // Create a new FormData object from the form
  var formData = new FormData(this);

  // Submit the form data using fetch (asynchronous)
  fetch(this.action, {
      method: 'POST',
      body: formData
  })
  .then(response => {
      // Hide loading screen
      document.getElementById('loadingScreen').style.display = 'none';

      if (response.ok) {
          // Redirect to a custom page after the form is successfully submitted
          window.location.href = 'success.html';  // Replace with your custom page URL
      } else {
          // Handle the error if the submission fails
          alert('There was an error submitting the form. Please try again.');
      }
  })
  .catch(error => {
      console.error('Error:', error);

      // Hide loading screen
      document.getElementById('loadingScreen').style.display = 'none';
      alert('There was an error submitting the form. Please try again.');
  });
});

document.getElementById('codeButton').onclick = function() {
  if (code.value == 1) {
    rvspForm.style.display = "flex";
    codeForm.style.display = "none";
    rehearsalField.required = false;  // Make it not required
  } else if (code.value == 2) {
    rvspForm.style.display = "flex";
    codeForm.style.display = "none";
    rehearsal.style.display = "flex";
  } else {
    warning.style.visibility = "visible";
  }
};


function setValueRF(value) {
  document.getElementById('rehearsalField').value = value;
  yesButton = document.getElementById("yesButtonRF")
  noButton = document.getElementById("noButtonRF")
    // Change background color of selected button
    if (value === 'Yes') {
      yesButton.style.backgroundColor = '#b77e1c'; // Change color for Yes
      noButton.style.backgroundColor = '#f9f9f9'
      noButton.style.color = "black";
      yesButton.style.color = "white";
    } else {
      noButton.style.backgroundColor = '#b77e1c'; // Change color for No
      yesButton.style.backgroundColor = '#f9f9f9'
      yesButton.style.color = "black";
      noButton.style.color = "white";
    }
}

function setValueCeremony(value) {
  document.getElementById('ceremonyField').value = value;
  yesButton = document.getElementById("yesButtonCeremony")
  noButton = document.getElementById("noButtonCeremony")
    // Change background color of selected button
    if (value === 'Yes') {
      yesButton.style.backgroundColor = '#b77e1c'; // Change color for Yes
      noButton.style.backgroundColor = '#f9f9f9'
      noButton.style.color = "black";
      yesButton.style.color = "white";
    } else {
      noButton.style.backgroundColor = '#b77e1c'; // Change color for No
      yesButton.style.backgroundColor = '#f9f9f9'
      yesButton.style.color = "black";
      noButton.style.color = "white";
    }
}

function setValueBeach(value) {
  document.getElementById('beachField').value = value;
  yesButton = document.getElementById("yesButtonBeach")
  noButton = document.getElementById("noButtonBeach")
    // Change background color of selected button
    if (value === 'Yes') {
      yesButton.style.backgroundColor = '#b77e1c'; // Change color for Yes
      noButton.style.backgroundColor = '#f9f9f9'
      noButton.style.color = "black";
      yesButton.style.color = "white";
    } else {
      noButton.style.backgroundColor = '#b77e1c'; // Change color for No
      yesButton.style.backgroundColor = '#f9f9f9'
      yesButton.style.color = "black";
      noButton.style.color = "white";
    }
}

function setValueShuttle(value) {
  document.getElementById('shuttleField').value = value;
  yesButton = document.getElementById("yesButtonShuttle")
  noButton = document.getElementById("noButtonShuttle")
    // Change background color of selected button
    if (value === 'Yes') {
      yesButton.style.backgroundColor = '#b77e1c'; // Change color for Yes
      noButton.style.backgroundColor = '#f9f9f9'
      noButton.style.color = "black";
      yesButton.style.color = "white";
    } else {
      noButton.style.backgroundColor = '#b77e1c'; // Change color for No
      yesButton.style.backgroundColor = '#f9f9f9'
      yesButton.style.color = "black";
      noButton.style.color = "white";
    }
}