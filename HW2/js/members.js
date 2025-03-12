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

    // Start of option lists
    // Font menu
    const fontMenu = document.createElement("select");  
    const fontList = ["Arial", "Verdana", "Tahoma", "Trebuchet MS",  "Times New Roman",  "Georgia",  "Garamond" ]
    for (let i = 0; i < fontList.length; i++){
        const fontListNode = document.createElement("option")
        fontListNode.textContent = fontList[i];
        fontMenu.appendChild(fontListNode);
    }

    // Colour 
    const colourCheckbox = document.createElement("input");
    colourCheckbox.type = "color";
    colourCheckbox.id = "colourCheckbox"

    const colourLabel = document.createElement("label");
    colourLabel.textContent = " Text colour |";

    // Size 
    const sizeCheckbox = document.createElement("input");
    sizeCheckbox.type = "number";
    sizeCheckbox.id = "sizeCheckbox"
    sizeCheckbox.value = "16";

    const sizeLabel = document.createElement("label");
    sizeLabel.textContent = " size (px) |";
    sizeLabel.htmlFor = "sizeCheckbox";

    // Italic
    const italicCheckbox = document.createElement("input");
    italicCheckbox.type = "checkbox";
    italicCheckbox.id = "italicCheckbox"

    const italicLabel = document.createElement("label");
    italicLabel.textContent = " Italic |";
    italicLabel.htmlFor = "italicCheckbox";
    
    // Bold
    const boldCheckbox = document.createElement("input");
    boldCheckbox.type = "checkbox";
    boldCheckbox.id = "boldCheckbox"

    const boldLabel = document.createElement("label");
    boldLabel.textContent = " Bold |";
    boldLabel.htmlFor = "boldCheckbox";
    
    // Start the menu list
    const footer = document.createElement("footer");
    const menu = document.createElement("select");  
    const sectionList = document.querySelectorAll("section");
    const articleList = document.querySelectorAll("article");
    const body = document.querySelector("body");

    /*menu.addEventListener("change", function() {
        const article = document.getElementById(menu.value);
        fontMenu.value = window.getComputedStyle(article).fontFamily;
        console.log("Article font: " + article.style.fontFamily);
        console.log("Menu value: " + fontMenu.value);
    })*/

    for (let i = 0; i < sectionList.length; i++)
    {
        const listNode = document.createElement("option"); 
        listNode.textContent = sectionList[i].id; 
        menu.appendChild(listNode);
    }
    const bodyElement = document.querySelectorAll("body");
    listNode = document.createElement("option");
    listNode.textContent = "body";
    menu.appendChild(listNode);

    footer.appendChild(menu);
    footer.appendChild(fontMenu);
    footer.appendChild(colourCheckbox);
    footer.appendChild(colourLabel);
    footer.appendChild(sizeCheckbox);
    footer.appendChild(sizeLabel);
    footer.appendChild(italicCheckbox);
    footer.appendChild(italicLabel);
    footer.appendChild(boldCheckbox);
    footer.appendChild(boldLabel);
    
    fontButton = document.createElement("button");
    fontButtonText = document.createTextNode("Change appearance!");
    fontButton.addEventListener("click", function() {
        console.log(`test: ${fontMenu.value}, ${menu.value}, ${sizeCheckbox.value}, ${boldCheckbox.checked}`);
        let article = document.getElementById(menu.value);
        // In the case of body
        if (!article)
        {
            article = document.getElementsByTagName(menu.value)[0];
        }

        if (sizeCheckbox.value <= 50) {
            article.style.fontSize = `${sizeCheckbox.value}px`;
        } else {
            alert("font size may not be greater than 50");
        }
        article.style.fontFamily = fontMenu.value;
        article.style.fontStyle = italicCheckbox.checked ? "italic" : "normal";
        article.style.fontWeight = boldCheckbox.checked ? "bold" : "normal";
        article.style.color = colourCheckbox.value;
        console.log(article.style);   
    })
    
    fontButton.appendChild(fontButtonText);
    footer.appendChild(fontButton);
    document.body.appendChild(footer);
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
