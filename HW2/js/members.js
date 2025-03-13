//Adds all event listeners
var selectedItem;
function addAllEventListeners() {
    document.body.addEventListener("click", (event) => changeAppearance(event));
      //    {
      //        alert(You clicked on: ${event.target.tagName} (ID: ${event.target.id || "no ID"}));
      //    });
}

//Get json string from storage and return as object
function getObjectFromStorage(key) {
    let jsonString = sessionStorage.getItem(key);
    return JSON.parse(jsonString);
}

function loadPageWithInformation(studentObject) {
    //Refrence to elements we need
    const header = document.querySelector("header");
    const studentSection = document.getElementById("section-student");
    const courseSection = document.getElementById("section-course");
    const amountOfCourses = studentObject.courses.length;

    //Put elements of studentsection in
    header.appendChild(newText(`About ${studentObject.firstName} ${studentObject.lastName}`));
    const h1El = document.createElement("h1"); 
    studentSection.appendChild(h1El);
    let studentSectionTitle = studentSection.querySelector("h1");
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

    //Insert title
    const article = document.querySelector("article");
    const h2El = document.createElement("h2");
    h2El.appendChild(newText("Courses"));
    article.insertBefore(h2El, courseSection);
    //Add a list of courses
    let amountOfColums = 4;
    if (window.innerWidth < 600) {
        amountOfColums = 2;
    } 

    for (let i = 0; i < amountOfColums; i++) {
        const unorderdListEl = document.createElement("ul");
        courseSection.appendChild(unorderdListEl);
        const unorderdList = document.querySelectorAll("ul")[i];
        for (let j = 0; j < amountOfCourses / amountOfColums; j++) {
            let index = j + Math.ceil(amountOfCourses * (i / amountOfColums));
            if (index > amountOfCourses - 1) {
                continue;
            }
            const listEl = document.createElement("li");
            unorderdList.appendChild(listEl);
            const currentList = unorderdList.querySelectorAll("li")[j];
            currentList.appendChild((newText(studentObject.courses[index].title)));
            //Adding the tooltips
            currentList.title = `Teacher: ${studentObject.courses[index].teacher.firstName} ${studentObject.courses[index].teacher.firstName} \n Description: ${studentObject.courses[index].description}`;
            
        }
    }


    /*//Creating course table
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
    }*/

    // Start of option lists
    // Font menu
    const fontMenu = document.createElement("select");  
    fontMenu.id = "fontMenu";
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
    
    // instantChange
    const instantChangeCheckbox = document.createElement("input");
    instantChangeCheckbox.type = "checkbox";
    instantChangeCheckbox.id = "instantChangeCheckbox"

    const instantChangeLabel = document.createElement("label");
    instantChangeLabel.textContent = "| Change the element on click (no button press required)";
    
    // Start the menu list
    const footer = document.createElement("footer");
    const menu = document.createElement("select");  
    menu.id = "selectedMenu";
    menu.onchange = () => {
      selectedItem = menu.value;
      selectedItemLabel.textContent = `Selected item: ${menu.value}  | `;
    };
    const sectionList = document.querySelectorAll("section");
    const articleList = document.querySelectorAll("article");
    const body = document.querySelector("body");

    for (let i = 0; i < articleList.length; i++)
    {
        const listNode = document.createElement("option"); 
        listNode.textContent = articleList[i].id; 
        menu.appendChild(listNode);
    }

    for (let i = 0; i < sectionList.length; i++)
    {
        const listNode = document.createElement("option"); 
        listNode.textContent = sectionList[i].id; 
        menu.appendChild(listNode);
    }
    // There is only one body
    const bodyElement = document.querySelectorAll("body");
    listNode = document.createElement("option");
    listNode.textContent = "body";
    menu.appendChild(listNode);

    const selectedItemLabel = document.createElement("label");
    selectedItemLabel.textContent = "Selected item: ";
    selectedItemLabel.id = "SelectedItemLabel"

    footer.appendChild(selectedItemLabel);
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
        // In the case of body
        if (!selectedItem)
        {
            selectedItem = document.getElementsByTagName(menu.value)[0];
        }

        if (sizeCheckbox.value <= 50) {
            selectedItem.style.fontSize = `${sizeCheckbox.value}px`;
        } else {
            alert("font size may not be greater than 50");
        }
        selectedItem.style.fontFamily = fontMenu.value;
        selectedItem.style.fontStyle = italicCheckbox.checked ? "italic" : "normal";
        selectedItem.style.fontWeight = boldCheckbox.checked ? "bold" : "normal";
        selectedItem.style.color = colourCheckbox.value;
        console.log(selectedItem.style);   
    })
    
    fontButton.appendChild(fontButtonText);
    footer.appendChild(fontButton);
    footer.appendChild(instantChangeLabel);
    footer.appendChild(instantChangeCheckbox);
    document.body.appendChild(footer);
}


function changeAppearance(event){
  
  // The buttons are in the footer, those elements shouldn't be changed for every click.
  if (document.getElementsByTagName("footer")[0].contains(event.target)){
    return;
  }
  selectedItem = event.target;
  const targetItemMenu = document.getElementById("SelectedItemLabel");
  targetItemMenu.textContent = `Selected item: ${selectedItem.id ? selectedItem.id : selectedItem.tagName}  | `;
  const colourCheckbox = document.getElementById("colourCheckbox");
  const sizeCheckbox = document.getElementById("sizeCheckbox");
  const italicCheckbox = document.getElementById("italicCheckbox");
  const boldCheckbox = document.getElementById("boldCheckbox");

  const instantChangeEnabled = document.getElementById("instantChangeCheckbox").checked;
  if (instantChangeEnabled)
  {
  let targetObject = event.target;

  console.log(event);
  
  if (sizeCheckbox.value <= 50) {
      targetObject.style.fontSize = `${sizeCheckbox.value}px`;
  } else {
      alert("Font size may not be greater than 50");
  }
  targetObject.style.fontFamily = fontMenu.value;
  targetObject.style.fontStyle = italicCheckbox.checked ? "italic" : "normal";
  targetObject.style.fontWeight = boldCheckbox.checked ? "bold" : "normal";
  targetObject.style.color = colourCheckbox.value;
  console.log(targetObject.style);
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
