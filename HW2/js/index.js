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
    readJsonFile(file, jsonData => {
        sessionStorage.setItem("student", jsonData);
        window.location.href = "members.html";
    });
}

function readJsonFile(file, functionWhenRead) {
    const reader = new FileReader();

    //When loaded, parse json and execute given function
    reader.onload = () => {
        try {
            let jsonObject = JSON.parse(reader.result);
            let verifiedObject = verifyClass(jsonObject);
            if (verifiedObject) {
                verifiedObject = verifiedObject.toJSON();
                verifiedObject = JSON.stringify(verifiedObject);
                functionWhenRead(verifiedObject);
            }
            else {
                alert("Invalid JSON structure");
            }
        }
        catch (error) {
            alert("Error parsing JSON file");
        }
        
    }

    reader.onerror = () => {
        alert("Something went wrong");
    }

    reader.readAsText(file);
}

function verifyClass(jsonObject) {
    try {
        let verifiedObject = new Student(
            jsonObject.firstName,
            jsonObject.lastName,
            jsonObject.age,
            jsonObject.hobbies,
            jsonObject.email,
            jsonObject.photo,
            jsonObject.major,
            jsonObject.courses
        );
        //werkt, er is een verifiedobject
        return verifiedObject;
    }
    catch (error) {
        console.error("Validation error:", error);
        return null;
    }
}

function onRun() {
    addAllEventListeners(); 
}

class Person {
    #firstName; #lastName;
    constructor(firstName, lastName) {
        this.firstName = firstName; /*uses setter*/
        this.lastName = lastName; /*uses setter*/
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

    toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName
        };
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
        this.courses = courses;
    }

    get age() {
        return this.#age;
    }
    set age(newAge) {
        if (newAge < 0 || newAge > 200) {
            alert("Invalid age");
            throw new Error("Invalid age");
        }
        this.#age = newAge;
    }

    get hobbies() {
        return this.#hobbies;
    }
    set hobbies(newHobbies) {
        if (!Array.isArray(newHobbies)) {
            alert("Hobbies must be an array");
            throw new TypeError("Hobbies must be an array");
        }
        if (!newHobbies.every(i => typeof i === "string")) {
            alert("Not all hobbies are strings");
            throw new Error("Not all hobbies are strings");
        }
        this.#hobbies = newHobbies.map(hobby => {
            return validateString(hobby, "Hobby");
        });
    }

    get email() {
        return this.#email;
    }
    set email(newEmail) {
        //regex from https://stackoverflow.com/questions/46155/
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.toLowerCase())) {
            alert("Invalid email");
            throw new Error("Invalid email");
        }
        this.#email = newEmail;
    }

    get photo() {
        return this.#photo;
    }
    set photo(newPhoto) {
        if (!/^https?:\/\/.*\.(jpeg|jpg|gif|png)$/i.test(newPhoto)) {
            alert("Invalid image link");
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
            alert("Courses must be an array");
            throw new Error("Courses must be an array");
        }
        
        this.#courses = newCourses.map(course => {
            if (typeof course !== "object" || !course.title || !course.teacher || !course.description) {
                alert("Invalid course object");
                throw new Error("Invalid course object");
            }
            
            return new Course(course.title, course.teacher, course.description);
        });
    }

    toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age,
            hobbies: this.hobbies,
            email: this.email,
            photo: this.photo,
            major: this.major,
            courses: this.courses.map(course => course.toJSON()) // Convert courses to JSON
        };
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
            alert("Invalid teacher object");
            throw new Error("Invalid teacher object");
        }

        this.#teacher = new Person(newTeacher.firstName, newTeacher.lastName); 
    };

    get description() {
        return this.#description;
    }
    set description(newDescription) {
        this.#description = validateString(newDescription, "description");;
    }

    toJSON() {
        return {
            title: this.title,
            teacher: this.teacher.toJSON(), // Convert teacher to JSON
            description: this.description
        };
    }
}


function validateString(text, field) {
    if (typeof text !== 'string') {
        alert(`${field} must be a string`);
        throw new Error(`${field} must be a string`);
    }

    text = text.trim(); // Trim BEFORE validation for empty string
    
    if (!text) {
        alert(`${field} cannot be empty`);
        throw new Error(`${field} cannot be empty`);
    }
    if ((field === "firstName" || field === "lastName") //allows only letters
        && !/^[A-Za-z\s]+$/.test(text)) {
        alert(`Formatting error in ${field}. ${field} can only include letters.`);
        throw new Error(`Formatting error in ${field}. ${field} can only include letters.`);
    }
    else if (!/^[\p{L}\p{M}\p{N}\p{P}\p{Z}\p{S}]+$/u.test(text)) { //allows basically all text.
        alert(`Formatting error in ${field}.`);
        throw new Error(`Formatting error in ${field}.`);
    }

    if (field === "Hobby") {
        return ' ' + String(text[0]).toUpperCase() + String(text).slice(1); //for spaces in the hobby list. Now it will look like "Reading, Hiking" instead of "Reading,Hiking"
    }

    return String(text[0]).toUpperCase() + String(text).slice(1); //capitalize first letter
}


onRun();