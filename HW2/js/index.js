//Make a refrence to elements that are needed
const fileLoaderInput = document.getElementById("file-loader__input");

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
    #firstName; #lastName;
    constructor(firstName, lastName) {
        this.#firstName = firstName; /*uses setter*/
        this.#lastName = lastName; /*uses setter*/
    }
    
    get firstName() {
        return this.#firstName;
    }
    set firstName(newFirstName) {
        this.#firstName = validateString(newFirstName, "firstName");
    }

    get lastName() {
        return this.#lastName;
    }
    set lastName(newLastName) {
        this.#lastName = validateString(newLastName, "lastName");
    }
}

class Student extends Person {
    #age; #hobbies; #email; #photo; #major; #courses;
    constructor(firstName, lastName, age, hobbies, email, photo, major, courses) {
        super(firstName, lastName);
        this.age = age; /*Number*/
        this.hobbies = hobbies; /*Array of strings*/
        this.email = email; /*String*/
        this.photo = photo; /*String: link to a file with a photo*/
        this.major = major; /*String*/
        this.courses = courses;//courses.map(x => new Course(x.title, x.teacher, x.description)); //TODOO::: zorg dat courses aangemaakt worden ipv in de setter gecheckt worden.
    }

    get age() {
        return this.#age;
    }
    set age(newAge) {
        if (newAge < 0 || newAge > 200) {
            throw new Error("Invalid age");
        }
        this.#age = newAge;
    }

    get hobbies() {
        return this.#hobbies;
    }
    set hobbies(newHobbies) {
        if (!newHobbies.every(i => typeof i === "string")) {
            throw new Error("Not all hobbies are strings");
        }
        this.#hobbies = newHobbies;
    }

    get email() {
        return this.#email;
    }
    set email(newEmail) {
        //regex from https://stackoverflow.com/questions/46155/
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.toLowerCase())) {
            throw new Error("Invalid email");
        }
        this.#email = newEmail;
    }

    get photo() {
        return this.#photo;
    }
    set photo(newPhoto) {
        if (!/^https?:\/\/.*\.(jpeg|jpg|gif|png)$/i.test(newPhoto)) {
            throw new Error("Invalid image link");
        }
        this.#photo = newPhoto;
    }

    get major() {
        return this.#major;
    }
    set major(newMajor) {
        this.#major = validateString(newMajor, "major");;
    }

    get courses() {
        return this.#courses;
    }
    set courses(newCourses) {
        if (!Array.isArray(newCourses)) {
            throw new Error("Courses must be an array");
        }
        
        this.#courses = newCourses.map(course => {
            if (typeof course !== "object" || !course.title || !course.teacher || !course.description) {
                throw new Error("Invalid course object");
            }
            else {
                course = new Course(course.title, course.teacher, course.description)
            }
        });
    }
}   

class Course {
    #title; #teacher; #description;
    constructor(title, teacher, description) {
        this.title = title; /*String*/
        this.teacher = teacher; /*Person*/
        this.description = description; /*String*/
    }

    get title() {
        return this.#title;
    }
    set title(newTitle) {
        this.#title = validateString(newTitle, "title");;
    }

    get teacher() {
        return this.#teacher;
    }
    set teacher(newTeacher) {
        if (typeof newTeacher !== "object" || !newTeacher.firstName || !newTeacher.lastName) {
            throw new Error("Invalid teacher object");
        }

        this.#teacher = new Person(teacher.firstName, teacher.lastName); 
    };

    get description() {
        return this.#description;
    }
    set description(newDescription) {
        this.#description = validateString(newDescription, "description");;
    }
    }


function validateString(name, field) {
    if (typeof name !== 'string') {
        throw new Error(`${field} must be a string`);
    }

    name = name.trim(); // Trim BEFORE validation for empty string
    
    if (!name) {
        throw new Error(`${field} cannot be empty`);
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
        throw new Error(`Formatting error in ${field}. ${field} can only include letters.`);
    }

    return String(name[0]).toUpperCase() + String(name).slice(1); //capitalize first letter
}


onRun();