HW2
Description
 
Develop a dynamic version of the website created in Assignment 1 using JavaScript (if necessary, you can change/extend the main theme). Use DOM methods, nodes, properties and events to interactively modify the content and appearance of your web pages according to user actions. Use event listeners to process the events. Implement at least 1 case of event propagation (W3C model).
 
* note: if you’re uncomfortable providing information about yourselves, your website can display information about existing or made-up people.
 
Modify the pages about the members of your group in such as a way that the main content of the pages is constructed dynamically purely through DOM manipulation (not document.write(), not .innerHTML) from the JSON files you prepare. Such elements as <nav>, < header>, <footer> and <aside> can still be a part of the corresponding html files, but all the main content of the pages has to be produced by JavaScript on the fly. To load the content, you should use the FileReader interface and the <input type="file"> element. The following MDN page provides a good example of how it can work:
https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 
These pages should be originally empty and contain the <input type="file"> interfaces (with the explanations which files to load). Once the files are loaded by the user, the pages should dynamically construct their content from the selected JSON files.
After reading JSON file you need to create object-oriented structured descriptions of the members of your group, and then use it to populate the content of the pages.
The description should be structured using the following class hierarchy:
 
Class Person:
firstName (String)
lastName(String)
 
Class Student: extend Person
age (Number)
hobbies: (Array of Strings)
email (String)
photo (String): link to a file with a photo
major (String) // university program
courses (Array of Courses)
 
Class Course:
title (String)
teacher (Person)
description (String)
 
Use ES6 classes and ES6-style object construction. Use private fields, getters and setters. Make sure that setters control that only correct data can be set into the corresponding data fields (think of the rules for names, emails, links images, ages, etc.).
The users should be able to mouseover the list of courses and see their extended information in a tooltip.
Implement two menus in your <header> or <footer> that allow the user to dynamically change the appearance of elements on a page. One menu should be used to select an element, another to modify the selected element appearance. The options of the first menu should contain at least body, articles and sections. The options should be created on the fly by traversing the DOM of the page. In other words, a page can have more than one article and more than one section, and not necessarily have an aside, but the menu should be able to read them correctly from the DOM of the page. The options of the second menu should allow to change at least the font size and the font color of the selected elements. To implement menus you can use the HTML Select element. These pages explain how you can create and manipulate the Select element and its properties:
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
- https://www.w3schools.com/jsref/dom_obj_select.asp
 
The website should continue following the principles of responsive design and accessibility.
Do not use external libraries and frameworks.
Maintain good coding style.
In addition to the good coding style rules specified in Assignment 1:
  -  separate scripting from the content
  -  use camelCase notation when naming your methods, variables and classes
  -  use indentation when writing your JavaScript code
  -  use meaningful comments
  -  terminate JavaScript statements with a ";"
 
Procedure
complete and submit your website in groups
a group must be registered beforehand
the website should be archived and submitted as a single zip through the BlackBoard system
Academic integrity
The work should be done by you and your peers only. You can rely on the support of teaching assistants and student assistants during practicums, but you are not allowed to use the code of other groups. It is forbidden to use HTML generating services and programs. If you decide using TypeScript, make sure the resulting JavaScript follows the requirements specified above. You can use external sources for the content of your website, however, you must refer to them by linking and naming them.