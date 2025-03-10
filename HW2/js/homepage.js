const fileLoaderInput = document.getElementById("file-loader__input");
var numberOfAlerts = 0;

//Add all eventlisteners
function addAllEventListeners() {
    fileLoaderInput.addEventListener("change", fileSelection);
}

function fileSelection(event) {
    let file = event.target.files[0];

    //Validate the file
    if (!file) {
        alert("No file selected, please try again!");
        return;
    }

    if (!file.name.endsWith(".json")) {
        console.log(file.type);
        alert("filetype not supported, please select a '.json' file");
        return;
    }

    //Read the file
    readJsonFile(file, loadPageWithInformation);
}

function readJsonFile(file, functionWhenRead) {
    const reader = new FileReader();

    //When loaded, parse json and execute given function
    reader.onload = () => {
        let jsonString = reader.result;
        let jsonObject = JSON.parse(jsonString);
        functionWhenRead(jsonObject);
    }

    reader.onerror = () => {
        alert("Something went wrong");
    }

    reader.readAsText(file);
}

function loadPageWithInformation(studentObject) {
    window.location.href = "mainLayout.html";
    console.log("Done");
    //Refrence to elements we need
    const studentSection = document.getElementById("section-student");
    const courseSection = document.getElementById("sectino-course");
    console.log("Done");
    //Create all elements
    let studentSectionTitle = document.createElement("h1");
    let courseSectionTitle = document.createElement("h2");
    let paragraph = document.createElement("p");
    let table = document.createElement("table");
    let tableHead = document.createElement("thead")
    let TableBody = document.createElement("tbody")
    let tableRow = document.createElement("tr")
    let tableHeadText = document.createElement("th");
    let courseTableRowText = document.createElement("td");

    //Put elements in
    studentSection.appendChild(paragraph);
    studentSection.p.appendChild(newText(studentObject.firstName));
    studentSection.p.appendChild(newText(studentObject.lastName));
    console.log("Done");
}


function VerifyClass(jsonObject) {
    const classes = [Person, Student, Course];
    let currentClass;
    for (let i = 0; i < classes.length; i++) {
        if (jsonObject instanceof classes[i]) {
            currentClass = classes[i];
        }
    }
    return currentClass;
}

//Creates a new text node
function newText(text) {
    return document.createTextNode(text);
}

function onRun() {
    addAllEventListeners(); 
}

class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName; /*String*/
        this.lastName = lastName; /*String*/
    }
}

class Student extends Person {
    constructor(age, hobbies, email, photo, major, courses) {
        this.age = age; /*Number*/
        this.hobbies = hobbies; /*Array of strings*/
        this.email = email; /*String: link to a file with a photo*/
        this.photo = photo; /*String*/
        this.major = major; /*String*/
        this.courses = courses.map(x => new Course(x.title, x.teacher, x.description));
    }
}

class Course {
    constructor(title, teacher, description) {
        this.title = title; /*String*/
        this.teacher = new Person(teacher.firstName, teacher.lastName); /*Person*/
        this.description = description; /*String*/
    }
}  

onRun();