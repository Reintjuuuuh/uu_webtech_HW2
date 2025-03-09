const fileLoaderInput = document.getElementById("file-loader__input");
var numberOfAlerts = 0;

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
    readJsonFile(file, x => alert(x.firstName));
}

function readJsonFile(file, functionWhenRead) {
    const reader = new FileReader();

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