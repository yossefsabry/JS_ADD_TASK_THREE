const inputTask = document.querySelector("#inputTask"),
    create = document.querySelector("#create");
    tmp = "",
    add_update = "create";

// start storage the data from user

// ** fisrt check if there any data in the local storage
let dataStorage;
if (localStorage.tasks != null) {
    dataStorage = JSON.parse(localStorage.tasks);
} else {
    dataStorage = [];
}
// * making the functino that gone collect the data for the localstorage
create.addEventListener("click", collectData);
inputTask.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        collectData();
    }
});
function collectData() {
    if (add_update === "create") {
        let task = {
            taskVal: inputTask.value,
        };
        if (inputTask.value != "") {
            dataStorage.push(task);
        }
        localStorage.setItem("tasks", JSON.stringify(dataStorage));
        inputTask.value = "";
    } else {
        dataStorage[tmp].taskVal = inputTask.value;
        add_update = "create";
        create.value = "Add";
        inputTask.value = "";
    }
    showData();
}

// start showDate
function showData() {
    let items = "";
    for (let i = 0; i < dataStorage.length; i++) {
        let item = `
        <li class="task">
            <div class="task-content">
                <input type="checkbox" id="checkbox">
                <span>${dataStorage[i].taskVal}</span>
            </div>
            <div class="icon">
                <i class="fas fa-edit" onclick="updata(${i})"></i>
                <i class="fas fa-trash" onclick="deleteRow(${i})"></i>
            </div>
        </li>
        `;
        items += item;
    }
    document.querySelector("ul").innerHTML = items;
    count_task();
}
showData();

// start delete row
function deleteRow(i) {
    dataStorage.splice(i, 1);
    localStorage.tasks = JSON.stringify(dataStorage);
    showData();
}

// start updata function
function updata(i) {
    inputTask.value = dataStorage[i].taskVal;
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
    create.value = "update";
    add_update = "update";
}

// count for the task
function count_task() {
    let count = document.querySelector(".info p");

    count.innerHTML = `You Have ${dataStorage.length} Task`;
}

// clear all
let clear = document.querySelector("#clear");

clear.onclick = function () {
    dataStorage.splice(0);
    localStorage.clear();
    showData();
};
