//Adds all event listeners
var selectedItem;
function addAllEventListeners() {
    document.body.addEventListener("click", (event) => changeAppearance(event));
    window.addEventListener("resize", (event) => insertCourseSection(getObjectFromStorage("student")));
};

//Get json string from storage and return as object
function getObjectFromStorage(key) {
    let jsonString = sessionStorage.getItem(key);
    return JSON.parse(jsonString);
};

function loadPageWithInformation(studentObject) {
    //Reference to elements we need
    const body = document.querySelector("body");
    const articleStudent = body.appendChild(document.createElement('article'));
    const header = articleStudent.appendChild(document.createElement('header'));
    articleStudent.id = 'article-student';

    const studentSection = articleStudent.appendChild(document.createElement('section'));
    studentSection.id = 'section-student';
    const courseSection = articleStudent.appendChild(document.createElement('section'));
    courseSection.id = 'section-course';

    //Put elements of studentsection in
    header.appendChild(newText(`About ${studentObject.firstName} ${studentObject.lastName}`));
    const h1El = document.createElement("h1"); 
    studentSection.appendChild(h1El);
    let studentSectionTitle = studentSection.querySelector("h1");
    studentSectionTitle.appendChild(newText(`Who is ${studentObject.firstName} ${studentObject.lastName}?`));

    var img = document.createElement("img");
    img.src = studentObject.photo;
    studentSection.appendChild(img);

    for (let i = 1; i < 6; i++) {
        let paragraphEl = document.createElement("p");
        studentSection.appendChild(paragraphEl);
    };

    let studentSectionParagraph = studentSection.getElementsByTagName("p");

    studentSectionParagraph[0].appendChild(newText(`Name: ${studentObject.firstName} ${studentObject.lastName}`));
    studentSectionParagraph[1].appendChild(newText(`Age: ${studentObject.age}`));
    studentSectionParagraph[2].appendChild(newText(`Hobbies: ${studentObject.hobbies}`));
    studentSectionParagraph[3].appendChild(newText(`Email: ${studentObject.email}`));
    studentSectionParagraph[4].appendChild(newText(`Major: ${studentObject.major}`));

    //Insert title
    const h2El = document.createElement("h2");
    courseSection.appendChild(h2El);
    h2 = document.querySelector("h2");
    h2.appendChild(newText("Courses"));
    const divEl = document.createElement("div");
    courseSection.appendChild(divEl);
    insertCourseSection(studentObject);

    // Start of option lists
    // Font menu
    const fontMenu = document.createElement("select");  
    fontMenu.id = "fontMenu";
    const fontList = ["Arial", "Verdana", "Tahoma", "Trebuchet MS",  "Times New Roman",  "Georgia",  "Garamond" ];
    for (let i = 0; i < fontList.length; i++){
        const fontListNode = document.createElement("option");
        fontListNode.textContent = fontList[i];
        fontMenu.appendChild(fontListNode);
    }

    // Colour 
    const colourCheckbox = document.createElement("input");
    colourCheckbox.type = "color";
    colourCheckbox.id = "colourCheckbox";

    const colourLabel = document.createElement("label");
    colourLabel.textContent = " Text colour |";

    // Size 
    const sizeCheckbox = document.createElement("input");
    sizeCheckbox.type = "number";
    sizeCheckbox.id = "sizeCheckbox";
    sizeCheckbox.value = "16";

    const sizeLabel = document.createElement("label");
    sizeLabel.textContent = " size (px) |";
    sizeLabel.htmlFor = "sizeCheckbox";

    // Italic
    const italicCheckbox = document.createElement("input");
    italicCheckbox.type = "checkbox";
    italicCheckbox.id = "italicCheckbox";

    const italicLabel = document.createElement("label");
    italicLabel.textContent = " Italic |";
    italicLabel.htmlFor = "italicCheckbox";
    
    // Bold
    const boldCheckbox = document.createElement("input");
    boldCheckbox.type = "checkbox";
    boldCheckbox.id = "boldCheckbox";

    const boldLabel = document.createElement("label");
    boldLabel.textContent = " Bold |";
    boldLabel.htmlFor = "boldCheckbox";
    
    // instantChange
    const instantChangeCheckbox = document.createElement("input");
    instantChangeCheckbox.type = "checkbox";
    instantChangeCheckbox.id = "instantChangeCheckbox";

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

    // Dynamically scan the HTML for all elements
    const allElements = document.querySelectorAll("*");
    // Sets only allow unique elements (prevents a thousand <p> elements from clogging up the dropdown)
    const tagNames = new Set();
    // toLowerCase because for some reason all tag names are full caps by default
    allElements.forEach(element => tagNames.add(element.tagName.toLowerCase()));
    
    tagNames.forEach(tagName => {
        const listNode = document.createElement("option");
        listNode.textContent = tagName;
        menu.appendChild(listNode);
    });

    const selectedItemLabel = document.createElement("label");
    selectedItemLabel.textContent = "Selected item: ";
    selectedItemLabel.id = "SelectedItemLabel";

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
        // querySelectorAll has a handy forEach loop.
        selectedItems = document.querySelectorAll(menu.value)
        selectedItems.forEach(selectedItem => {
            // The styles of the child items need to be cleared, otherwise they won't inherit the style.
            selectedItem.querySelectorAll("*").forEach(child => {child.removeAttribute("style")});

            if (sizeCheckbox.value <= 50) {
                selectedItem.style.fontSize = `${sizeCheckbox.value}px`;
            } else {
                alert("font size may not be greater than 50");
            };

            selectedItem.style.fontFamily = fontMenu.value;
            selectedItem.style.fontStyle = italicCheckbox.checked ? "italic" : "normal";
            selectedItem.style.fontWeight = boldCheckbox.checked ? "bold" : "normal";
            selectedItem.style.color = colourCheckbox.value;

        })

    });
    
    fontButton.appendChild(fontButtonText);
    footer.appendChild(fontButton);
    footer.appendChild(instantChangeLabel);
    footer.appendChild(instantChangeCheckbox);
    document.body.appendChild(footer);
};

function insertCourseSection(studentObject) {
    const courseSection = document.getElementById("section-course");
    const div = courseSection.querySelector("div");
    const amountOfCourses = studentObject.courses.length;

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    //Check for amount of colums depending on screen width
    let amountOfColums = 4;
    if (document.body.clientWidth < 1200) {
        amountOfColums = 3;
    };

    if (document.body.clientWidth < 900) {
        amountOfColums = 2;
    };

    if (document.body.clientWidth < 600) {
        amountOfColums = 1;
    };

    //Add multible lists of courses and devide the courses over al lists
    for (let i = 0; i < amountOfColums; i++) {
        const unorderdListEl = document.createElement("ul");
        div.appendChild(unorderdListEl);
        const unorderdList = document.querySelectorAll("ul")[i];
        for (let j = 0; j < amountOfCourses / amountOfColums; j++) {
            let index = j + Math.ceil(amountOfCourses * (i / amountOfColums));
            if (index > amountOfCourses - 1) {
                continue;
            };
            const listEl = document.createElement("li");
            unorderdList.appendChild(listEl);
            const currentList = unorderdList.querySelectorAll("li")[j];
            currentList.appendChild((newText(studentObject.courses[index].title)));
            //Adding the tooltips
            currentList.title = `Teacher: ${studentObject.courses[index].teacher.firstName} ${studentObject.courses[index].teacher.lastName} \n Description: ${studentObject.courses[index].description}`;
        }
    }
}

function changeAppearance(event){
  
  // The buttons are in the footer, those elements shouldn't be changed for every click.
  if (document.getElementsByTagName("footer")[0].contains(event.target)){
    return;
  };
  selectedItem = event.target;
  const targetItemMenu = document.getElementById("SelectedItemLabel");
  targetItemMenu.textContent = `Selected item: ${selectedItem.tagName.toLowerCase()}  | `;
  // Because all lowercase tagnames are in the menu, this will work.
  const itemMenu = document.getElementById("selectedMenu");
  itemMenu.value = selectedItem.tagName.toLowerCase();
  const colourCheckbox = document.getElementById("colourCheckbox");
  const sizeCheckbox = document.getElementById("sizeCheckbox");
  const italicCheckbox = document.getElementById("italicCheckbox");
  const boldCheckbox = document.getElementById("boldCheckbox");

  const instantChangeEnabled = document.getElementById("instantChangeCheckbox").checked;
  // Code is slightly different from the button event, because we only want to change what we click on, not every single occurence of the same element.
  if (instantChangeEnabled)
  {
      // The styles of the child items need to be cleared, otherwise they won't inherit the style.
      selectedItem.querySelectorAll("*").forEach(child => {child.removeAttribute("style")});

      if (sizeCheckbox.value <= 50) {
          selectedItem.style.fontSize = `${sizeCheckbox.value}px`;
      } else {
          alert("Font size may not be greater than 50");
      };

      selectedItem.style.fontFamily = fontMenu.value;
      selectedItem.style.fontStyle = italicCheckbox.checked ? "italic" : "normal";
      selectedItem.style.fontWeight = boldCheckbox.checked ? "bold" : "normal";
      selectedItem.style.color = colourCheckbox.value;
      console.log(selectedItem.style);
  };
};

//Creates a new text node
function newText(text) {
    return document.createTextNode(text);
};

function onRun() {
    addAllEventListeners();

    //Get object and load page
    let studentObject = getObjectFromStorage("student");
    loadPageWithInformation(studentObject);
};

onRun();
