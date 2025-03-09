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
    let jsonObject = readJsonFile(file);

}

function readJsonFile(file) {
    const reader = new FileReader();
    let fileContent;

    reader.onload = () => {
        fileContent = reader.result;
        alert(fileContent);
    }

    let jsonString = reader.readAsText(file);
    let jsonObject = JSON.parse(jsonString);
    return jsonObject;
}

function onRun() {
    addAllEventListeners();
}

onRun();