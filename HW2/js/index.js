//Make a refrence to elements that are needed
const fileLoaderInput = document.getElementById("file-loader__input");

//Add all eventlisteners
function addAllEventListeners() {
    fileLoaderInput.addEventListener("change", fileSelection);

}

function fileSelection(event) {
    let file = event.target.files[0];

    //Validates the file
    if (!file) {
        alert("No file selected, please try again!");
        return;
    }

    if (!file.name.endsWith(".json")) {
        console.log(file.type);
        alert("filetype not supported, please select a '.json' file");
        return;
    }

    //Reads the file
    readJsonFile(file, x => sessionStorage.setItem("student", x));
}

function readJsonFile(file, functionWhenRead) {
    const reader = new FileReader();

    //When loaded, parse json and execute given function
    reader.onload = () => {
        let jsonString = reader.result;
        console.log(jsonString);
        let jsonObject = JSON.parse(jsonString);
        if (verifyClass(jsonObject)) {
            functionWhenRead(jsonString);
            window.location.href = "members.html";
        }
        else {
            alert("JSON file not in valid format");
        }
    }

    reader.onerror = () => {
        alert("Something went wrong");
    }

    reader.readAsText(file);
}

function verifyClass(jsonObject) {
    const requiredClass = Student;

    try {
        verifiedObject = new requiredClass(
            jsonObject.firstName,
            jsonObject.lastName,
            jsonObject.age,
            jsonObject.hobbies,
            jsonObject.email,
            jsonObject.photo,
            jsonObject.major,
            jsonObject.courses
        );
        return true;
    }

    catch {
        alert("json is not of valid type");
        return false;
    }
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
    constructor(firstName, lastName, age, hobbies, email, photo, major, courses) {
        super(firstName, lastName);
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