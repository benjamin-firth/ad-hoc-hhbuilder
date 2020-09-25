// Styling link:
var fileref = document.createElement("link");
fileref.rel = "stylesheet";
fileref.type = "text/css";
fileref.href = "styles.css";
document.getElementsByTagName("head")[0].appendChild(fileref);
// Normally I would just add this link in the HTML but I'm
// trying to stay true to not modifying that as said in the directions.

var ageInput = document.querySelector('input[name="age"]');
var relInput = document.querySelector('select[name="rel"]');
var smokerInput = document.querySelector('input[name="smoker"]');
var mainForm = document.querySelector('form');
var addButton = document.querySelector('.add');
var submitButton = document.querySelector('button[type="submit"]');
var householdDom = document.querySelector('.household');
var jsonSection = document.querySelector('.debug');
var houseInfo = [];
var submittedHouse = { houseOne: [] };

ageInput.addEventListener('keyup', validateAge);
addButton.addEventListener('click', submitAddForm);
householdDom.addEventListener('click', deleteHouseMember);
relInput.addEventListener('click', clearAlerts);
submitButton.addEventListener('click', submitHouse);
submitButton.parentNode.addEventListener('click', modifyPastHouse);

submitButton.disabled = true;

function deleteHouseMember(e) {
  if (e.target.classList.contains('delete-button')) {
    var houseId = e.target.closest('div').id;
    var newHouseholdList = [];
  
    for (var i = 0; i < houseInfo.length; i++) {
      if (houseInfo[i].personId !== houseId) {
        houseInfo[i].personId = `${newHouseholdList.length}`;
        newHouseholdList.push(houseInfo[i]);
      };
    };
  
    houseInfo = newHouseholdList;
    createHouseList();
    if (houseInfo.length === 0) submitButton.disabled = true;
  };
};

function createAlert(alertText, ageError, relError) {
  var div = document.createElement('div');
  div.className = 'alert';
  div.innerHTML = `<p>${alertText}</p>`;
  
  if (ageError && relError) {
    ageInput.classList.add('alert-border');
    relInput.classList.add('alert-border');
    div.innerHTML = `<p>${alertText} Please add age and relationship.</p>`;
  } else if (relError) {
    relInput.classList.add('alert-border');
    div.innerHTML = `<p>${alertText}  Please add relationship.</p>`;
  } else if (ageError) {
    ageInput.classList.add('alert-border');
    div.innerHTML = `<p>${alertText} Please add age.</p>`;
  };

  mainForm.parentNode.insertBefore(div, mainForm.nextSibling);
};

function clearAlerts() {
  var alertElem = document.querySelector('.alert');

  if (alertElem !== null) alertElem.parentNode.removeChild(alertElem);
  if (ageInput.classList.contains('alert-border')) {
    ageInput.classList.remove('alert-border');
  };
  if (relInput.classList.contains('alert-border')) {
    relInput.classList.remove('alert-border');
  };
};

function clearInputs() {
  ageInput.value = '';
  relInput.value = '';
  smokerInput.checked = false;
};

function validateAge(e) {
  e.preventDefault();

  if (isNaN(e.target.value)){
    clearAlerts();
    createAlert('Please only enter numbers for age!');
    e.target.value = '';
  } else if (!isNaN(e.target.value) && e.target.value === '0') {
    clearAlerts();
    createAlert('Please enter an age greater than 0!');
    e.target.value = '';
  } else {
    clearAlerts();
  };
};

function createHouseList() {
  householdDom.innerHTML = ``;

  for (i = 0; i < houseInfo.length; i++) {
    var newDiv = document.createElement('div');
    newDiv.innerHTML = `
      <div id=${i} class='family-member'>
        <h4>${houseInfo[i].relationship}</h4>
        <p>${houseInfo[i].age}</p>
        <p>${houseInfo[i].smoker}</p>
        <button class='delete-button' type='button'>Delete Entry</button>
      </div>
    `;
    householdDom.appendChild(newDiv);
  };
};

function validateAddForm(age, rel) {
  if (age === '' || rel === '') {
    return false;
  } else {
    return true;
  };
};

function submitAddForm(e) {
  e.preventDefault();
  var age = ageInput.value;
  var relationship = relInput.value;

  if (!validateAddForm(age, relationship)) {
    clearAlerts();

    var relationship = relInput.value;
    var message = `You're missing some important form elements!`;
    createAlert(message, age === '', relationship === '');
  } else {
    var smoker = smokerInput.checked ? 'Smoker' : 'Non-smoker';
    var personId = `${houseInfo.length}`;
    var personInfo = { relationship, age, smoker, personId };
    houseInfo.push(personInfo);
    
    createHouseList();
    clearInputs();
    submitButton.disabled = false;
  };
};

function submitHouse(e) {
  e.preventDefault();
  clearAlerts();
  submittedHouse.houseOne = houseInfo;
  var serializedHouse = JSON.stringify(houseInfo);

  jsonSection.innerHTML = `${serializedHouse}`;
  if (houseInfo.length === 0) {
    jsonSection.style.display = "none";
  } else {
    jsonSection.style.display = "inline";
  };

  houseInfo = [];
  createHouseList();
  submitButton.disabled = true;
  if (document.getElementById('modifyHouse') === null) {
    var modifyButton = document.createElement('button');
    modifyButton.id = 'modifyHouse';
    modifyButton.innerText = `Make changes to previous house`;
    submitButton.parentNode.insertBefore(modifyButton, submitButton.nextSibling);
  };
};

function modifyPastHouse(e) {
  e.preventDefault();
  if (event.target.id === 'modifyHouse') {
    houseInfo = submittedHouse.houseOne;
    createHouseList();
    submitButton.disabled = false;
  };
};
