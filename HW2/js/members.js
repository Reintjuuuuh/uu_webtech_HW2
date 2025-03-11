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

    //Create all elements that only apear once
    let h1El = document.createElement("h1");
    let h2El = document.createElement("h2");
    let tableEl = document.createElement("table");


    //Put elements of studentsection in
    header.appendChild(newText(`About ${studentObject.firstName} ${studentObject.lastName}`));
    studentSection.appendChild(h1El);
    let studentSectionTitle = studentSection.getElementsByTagName("h1")[0];
    studentSectionTitle.appendChild(newText(`Who is ${studentObject.firstName} ${studentObject.lastName}?`))

    for (let i = 0; i < 5; i++) {
        let paragraphEl = document.createElement("p");
        studentSection.appendChild(paragraphEl);
    }
    let studentSectionParagraph = studentSection.getElementsByTagName("p");

    studentSectionParagraph[0].appendChild(newText(`Name: ${studentObject.firstName} ${studentObject.lastName}`));
    studentSectionParagraph[1].appendChild(newText(`Age: ${studentObject.age}`));
    studentSectionParagraph[2].appendChild(newText(`Hobbies: ${studentObject.hobbies}`));
    studentSectionParagraph[3].appendChild(newText(`Email: ${studentObject.email}`));
    studentSectionParagraph[4].appendChild(newText(`Major: ${studentObject.major}`));


    //Creating course table
    courseSection.appendChild(tableEl);
    let table = courseSection.getElementsByTagName("table")[0];
    //Creating the head
    let tableHeadEl = document.createElement("thead")
    table.appendChild(tableHeadEl);
    let tableHead = table.getElementsByTagName("thead")[0];
    let tableRow = document.createElement("tr")
    tableHead.appendChild(tableRow);
    let courseTableHeadRow = tableHead.getElementsByTagName("tr")[0];
    for (let i = 0; i < 3; i++) {
        let tableHeadRowText = document.createElement("th");
        courseTableHeadRow.appendChild(tableHeadRowText);
    }
    let courseTableHeadRowElements = courseTableHeadRow.getElementsByTagName("th");
    courseTableHeadRowElements[0].appendChild(newText("Title"));
    courseTableHeadRowElements[1].appendChild(newText("Teacher"));
    courseTableHeadRowElements[2].appendChild(newText("Description"));

    //Creating the body
    let tableBodyEl = document.createElement("tbody")
    table.appendChild(tableBodyEl);
    tableBody = table.getElementsByTagName("tbody")[0];
    for (let i = 0; i < amountOfCourses; i++) {
        let tableRow = document.createElement("tr")
        tableBody.appendChild(tableRow);
    }
    let tableBodyRows = tableBody.getElementsByTagName("tr");
    for (let i = 0; i < tableBodyRows.length; i++) {
        for (let j = 0; j < 3; j++) {
            let tableBodyRowData = document.createElement("td");
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