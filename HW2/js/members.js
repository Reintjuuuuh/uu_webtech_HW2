/*TODO: Implement getters and setters to make sure the datatypes are correct*/

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