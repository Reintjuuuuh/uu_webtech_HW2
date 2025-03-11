//Adds all event listeners
function addAllEventListeners() {
    
}

//Get json string from storage and return as object
function getObjectFromStorage(key) {
    let jsonString = sessionStorage.getItem(key);
    return JSON.parse(jsonString);
}

function loadPageWithInformation(studentObject) {
    //Refrence to elements we need
    const header = document.getElementsByTagName("header")[0];
    const studentSection = document.getElementById("section-student");
    const courseSection = document.getElementById("section-course");
    const amountOfCourses = studentObject.courses.length;

    //Create all elements
    let section = document.createElement("section");
    let h1El = document.createElement("h1");
    let h2 = document.createElement("h2");
    let paragraphEl = document.createElement("p");
    let tableEl = document.createElement("table");

    //Put elements in
    header.appendChild(newText(`About ${studentObject.firstName} ${studentObject.lastName}`));
    studentSection.appendChild(h1El);
    let studentSectionTitle = studentSection.getElementsByTagName("h1")[0];
    studentSectionTitle.appendChild(newText(`Who is ${studentObject.firstName} ${studentObject.lastName}?`))

    studentSection.appendChild(paragraphEl);
    let studentSectionParagraph = studentSection.getElementsByTagName("p")[0];
    studentSectionParagraph.appendChild(newText(studentObject.firstName));
    studentSectionParagraph.appendChild(newText(studentObject.lastName));

    //Creating course table
    courseSection.appendChild(tableEl);
    let table = courseSection.getElementsByTagName("table")[0];
    //Creating the head
    let TableHead = table.getElementsByTagName("thead")[0];
    let tableRow = document.createElement("tr")
    TableHead.appendChild(tableRow);
    let courseTableHeadRow = TableHead.getElementsByTagName("tr")[0];
    for (let i = 0; i < 2; i++) {
        let tableHeadRowText = document.createElement("th");
        courseTableHeadRow.appendChild(tableHeadRowText);
    }
    let courseTableHeadRowElements = courseTableHeadRow.getElementsByTagName("th");
    courseTableHeadRowElements[0].appendChild(newText("Title"));
    courseTableHeadRowElements[1].appendChild(newText("Teacher"));
    courseTableHeadRowElements[2].appendChild(newText("Description"));

    //Creating the body
    tableBody = table.getElementsByTagName("tbody")[0];
    for (let i = 0; i < amountOfCourses - 1; i++) {
        let tableRow = document.createElement("tr")
        tableBody.appendChild(tableRow);
    }
    let tableBodyRows = tableBody.getElementsByTagName("tr");
    for (let i = 0; i < tableBodyRows.length; i++) {
        for (let j = 0; j < 3; j++) {
            let tableBodyRowData = document.createElement("td");
            if (i == 0 && j == 2) {
                continue;
            }
            tableBodyRows[i].appendChild(tableBodyRowData);
        }
    }
    //Filling in the values of the courses
    for (let i = 0; i < tableBodyRows.length; i++) {
        let tableBodyRowTexts = tableBodyRows[i].getElementsByTagName("td");
        tableBodyRowTexts[0].appendChild(newText(studentObject.courses[i].title));
        tableBodyRowTexts[1].appendChild(newText(studentObject.courses[i].teacher.firstName + " " + studentObject.courses[i].teacher.lastName));
        tableBodyRowTexts[2].appendChild(newText(studentObject.courses[i].description));
    }
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