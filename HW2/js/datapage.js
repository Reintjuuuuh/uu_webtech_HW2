//Adds all event listeners
function addAllEventListeners() {
    
}

//Get json string from storage and return as object
function getObjectFromStorage(key) {
    let jsonString = sessionStorage.getItem(key);
    console.log(jsonString);
    return JSON.parse(jsonString);
}

function loadPageWithInformation(studentObject) {
    //Refrence to elements we need
    const header = document.getElementsByTagName("header")[0];
    const studentSection = document.getElementById("section-student");
    const courseSection = document.getElementById("sectino-course");

    //Create all elements
    let h1 = document.createElement("h1");
    let h2 = document.createElement("h2");
    let paragraph = document.createElement("p");
    let table = document.createElement("table");
    let tableHead = document.createElement("thead")
    let TableBody = document.createElement("tbody")
    let tableRow = document.createElement("tr")
    let tableHeadText = document.createElement("th");
    let courseTableRowText = document.createElement("td");

    //Put elements in
    header.appendChild(newText(`About ${studentObject.firstName} ${studentObject.lastName}`));

    studentSection.appendChild(h1);
    let studentSectionTitle = studentSection.getElementsByTagName("h1")[0];
    studentSectionTitle.appendChild(newText(`Who is ${studentObject.firstName} ${studentObject.lastName}?`))

    studentSection.appendChild(paragraph);
    let studentSectionParagraph = studentSection.getElementsByTagName("p")[0];
    studentSectionParagraph.appendChild(newText(studentObject.firstName));
    studentSectionParagraph.appendChild(newText(studentObject.lastName));
}

//Creates a new text node
function newText(text) {
    return document.createTextNode(text);
}


function onRun() {
    addAllEventListeners();

    //Get object and load page
    let studentObject = getObjectFromStorage("student");
    loadPageWithInformation(studentObject);
}

onRun();