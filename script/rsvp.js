// Guest verification
let guestList = {};
let guestObj = null;
let guestObj_Index = -1;

fetch('https://www.july10.us/guest_list.json')
  .then(res => res.json())
  .then(json => {
    guestList = json;
    console.log('vs vs vs');
    console.log(guestList);
  })

const firstName = document.getElementById("firstNameInput");
const lastName = document.getElementById("lastNameInput");
const nextBtn = document.getElementById("rsvp-next");
const rsvpMessage = document.getElementById("rsvp-name-message");
const questions = document.getElementById("questions");

const checkName = function() {
  let guestName = firstName.value.trim() + " " + lastName.value.trim(); 
  for (let i = 0; i < guestList.list.length; i++) {
    for (let j = 0; j < guestList.list[i].guests.length; j++) {
      if (guestName.toLowerCase() == guestList.list[i].guests[j].toLowerCase()) {
        guestObj = guestList.list[i];
        guestObj_Index = j;
        break;
      }
    }
    for (let k = 0; k < guestList.list[i].alternates.length; k++) {
      if (guestName.toLowerCase() == guestList.list[i].alternates[k].toLowerCase()) {
        guestObj = guestList.list[i];
        guestObj_Index = k;
        break;
      }
    }
    if (guestObj != null) { break; }
  }

  if (guestObj == null) {
    rsvpMessage.style = "visibility: visible; color:red;";
  } else {
    nextBtn.style = "display:none";
    rsvpMessage.style = "display:none"
    firstName.readOnly = true;
    lastName.readOnly = true;
    questions.style = "visibility:visible;max-height:5000px";

    if (guestObj.guests.length > 1) {
      document.getElementById("relatedGuests").style = "display:flex;"
      relatedNames = document.getElementById("relatedGuests-Names");
      guestStr = [guestObj.guests.slice(0, -1).join(', '), guestObj.guests.slice(-1)[0]].join(guestObj.guests.length < 2 ? '' : ' and ');
      relatedNames.innerText = "Looks like your party consists of " + guestStr;
    }
  }
}

nextBtn.addEventListener('click', checkName);
lastName.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    event.preventDefault();
    checkName();
  }
});
firstName.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    event.preventDefault();
    checkName();
  }
});


let code = (document.URL.split('?')[1]).split("=")[1].split("#")[0];

// Get the hamburger and menu elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const sideMenu = document.getElementById('side-menu');
const closeBtn = document.getElementById('close-btn');

// Open the menu
hamburgerBtn.addEventListener('click', (e) => {
    sideMenu.classList.add('active');
    hamburgerBtn.style.zIndex = "-100";

    // Stop propagation to prevent triggering the document click listener
    e.stopPropagation();
});

// Close the menu via the close button
closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    hamburgerBtn.style.zIndex = "100";
});

// Close the menu if clicking outside of it
document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && e.target !== hamburgerBtn) {
        sideMenu.classList.remove('active');
        hamburgerBtn.style.zIndex = "100";
    }
});

// Prevent clicks inside the menu from propagating to the document
sideMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});


const codeForm = document.getElementById("codeForm");
const rehearsal= document.getElementById("rehearsal");
const rehearsalField = document.getElementById("rehearsalField");
const rsvpForm = document.getElementById("rsvp")
const warning = document.getElementById("warning");
const guest = document.getElementById("guest")


let param = (document.URL.split('?')[1]).split("=")[1];

if (param == "vitamason-rd") {
  rehearsal.style.display = "flex";
} else if (param == "vitamason-g") {
  guest.style.display = "flex";
} else if (param == "vitamason-rdg") {
  guest.style.display = "flex";
  rehearsal.style.display = "flex";
}

else {
  rehearsalField.required = false;  // Make it not required
}

document.getElementById('customForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent the form from submitting immediately

  
  // Show loading screen
  document.getElementById('loadingScreen').style.display = 'block';
  rsvpForm.style.display = "none";

  // Create a new FormData object from the form
  var formData = new FormData(this);

  var hasError = false;
  if (guest != null && guestObj_Index != -1 && document.getElementById("partyField").value == "Yes") {
    // make another form data
    for (let i = 0; i < guestObj.guests.length; i++) {
      if (i == guestObj_Index) {
        continue;
      }
      let formData2 = new FormData(this);
      let name = guestObj.guests[i].split(" ");
      formData2.set('firstName', name[0]);
      formData2.set('lastName', name[1]);
      fetch(this.action, {
        method: 'POST',
        body: formData2
      }).then(response => {
        if (!response.ok) {
          hasError = true;
        }
      });
    }
  }

  // Submit the form data using fetch (asynchronous)
  fetch(this.action, {
      method: 'POST',
      body: formData
  })
  .then(response => {
      // Hide loading screen
      document.getElementById('loadingScreen').style.display = 'none';

      if (response.ok && !hasError) {
          // Redirect to a custom page after the form is successfully submitted
          window.location.href = 'success.html?code='+code;  // Replace with your custom page URL
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

document.getElementById("mainLink").href = "main.html?code=" + code +"#main";
document.getElementById("dateLink").href = "main.html?code=" + code +"#date";
document.getElementById("scheduleLink").href = "main.html?code=" + code +"#schedule";
document.getElementById("storyLink").href = "main.html?code=" + code +"#story";
document.getElementById("tidbitsLink").href = "main.html?code=" + code +"#tidbits";
document.getElementById("infoLink").href = "main.html?code=" + code +"#info";
document.getElementById("registryLink").href = "main.html?code=" + code +"#registry";
document.getElementById("qaLink").href = "main.html?code=" + code +"#QA";


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

function setValueParty(value) {
  document.getElementById('partyField').value = value;
  yesButton = document.getElementById("yesButtonParty")
  noButton = document.getElementById("noButtonParty")
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
