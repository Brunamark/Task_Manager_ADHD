import * as TimePicker from './timerPicker.js';
import * as CreateElements from './createElements.js';
import { TaskService } from '../../services/tasks-service.js';
import { StorageService } from '../../services/localStorage-service.js';
import { UserService } from "../../services/user-service.js";


document.addEventListener('DOMContentLoaded', async function () {
    const task = new TaskService;
    const user = new UserService();

    async function getTask(id) {
        return await task.getTask(id);
    }
    async function getUsers() {
        const users = await user.getUsers();
        return users;
    }
    
    const buttonDone = document.querySelector('#addBtn');
    const addBtn2 = document.querySelector('#addText');
    const containerTextDiv = document.querySelector('.container-text');
    const divP = document.querySelector('.container-p');
    var textP = divP.childNodes;
    var onClick = true;
    var selectCompletionCreated = false;
    const taskId = StorageService.loadData("taskId");
    var data = await getTask(taskId);
    var obj = {};

    titleHandle(data);


    function titleHandle(data) {
        const titleArea = document.querySelector('#textTitle');
        titleArea.textContent = data.title;

    }
    async function attachEventListeners() {

        const checkbox = document.querySelector('#switch');
        const titleArea = document.querySelector('#textTitle');
        const textArea = document.querySelector('.text');


        if (textArea) {
            textArea.addEventListener('input', function () {
                data.message = textArea.value;


            });
        }
        if (titleArea) {
            titleArea.addEventListener('input', function () {
                data.title = titleArea.value;


            });
        }


        if (checkbox) {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    console.log("Checked");
                    data.completion = true;
                    createOrUpdateTimePickerSections();
                } else {
                    removeTimePickerSections();
                    data.completion = false;
                    console.log("Not checked");
                }
            });
        }
    }

    addBtn2.addEventListener('click', (event) => {
        const imgBtn = document.querySelector('#imgBtn');
        if (onClick) {
            onClick = false;
            console.log("on click");
            containerTextDiv.style.height = '70%';
            imgBtn.setAttribute("src", "../assets/images/minus.svg");

            textP[1].textContent = data.title;
            textP[1].style.color = '#FFC700';
            removeExistingSections();
            var textArea = document.createElement("textarea");
            var elementChild = document.querySelector('body > main > section.add-button');
            textArea.setAttribute("rows", "10");
            textArea.setAttribute("cols", "40");
            textArea.setAttribute("maxlength", "320");
            textArea.setAttribute("class", "text");

            textArea.textContent = data.message;
            containerTextDiv.appendChild(textArea);
            var elementParent = elementChild.parentNode;
            elementParent.insertBefore(containerTextDiv, elementChild);
            attachEventListeners();
        } else {
            onClick = true;
            console.log("is not clicked");
            imgBtn.setAttribute("src", "./../assets/images/plus_icon.svg");
            containerTextDiv.style.height = '150px';
            textP[1].style.color = '#FFFF';
            var textArea = containerTextDiv.querySelector(".text");
            if (textArea) {
                textArea.remove();
            }

            if (!selectCompletionCreated) {
                var section = CreateElements.createSection("container-select-completion");
                var title = CreateElements.createTitle("Select the completion");
                section.appendChild(title);
                var elementChild = document.querySelector('body > main > section.add-button');
                var elementParent = elementChild.parentNode;
                elementParent.insertBefore(section, elementChild);
                selectCompletionCreated = true;

                var div = CreateElements.createDiv("container-p");
                var paragraph = CreateElements.createParagraph("The task has a defined time?");
                div.appendChild(paragraph);
                var divBtn = CreateElements.createDiv("switch");
                divBtn.setAttribute("id", "switchButton");
                var input = CreateElements.createInput("checkbox", "switch");
                divBtn.appendChild(input);
                var label = CreateElements.createLabel("switch", "Toggle");
                divBtn.appendChild(label);
                section = CreateElements.createSection("container-select");
                section.appendChild(div);
                section.appendChild(divBtn);
                elementChild = document.querySelector('body > main > section.add-button');
                elementParent.insertBefore(section, elementChild);

                /*
                var div = CreateElements.createDiv("container-paragraph");
                var paragraph = CreateElements.createParagraph("Was the task completed?");
                div.appendChild(paragraph);
                var divBtn = CreateElements.createDiv("switch2");
                divBtn.setAttribute("id", "switchButton2");
                var input = CreateElements.createInput("checkbox", "switchBtn2");
                divBtn.appendChild(input);
                var label = CreateElements.createLabel("switchBtn2", "Toggle");
                divBtn.appendChild(label);
                section = CreateElements.createSection("completed-task");
                section.appendChild(div);
                section.appendChild(divBtn);
                elementChild = document.querySelector('body > main > section.add-button');
                elementParent.insertBefore(section, elementChild);*/

                attachEventListeners();
            }

        }
    }, false);
    function pad(value) {
        if (parseInt(value) === 0) {
            return value.toString().padStart(2, '0');
        }
        return value;
    }
    buttonDone.addEventListener('click', async () => {
        var hourStart = StorageService.loadData('startTime-hour');
        var minuteStart = StorageService.loadData('startTime-minute');
        var hourEnd = StorageService.loadData('endTime-hour');
        var minuteEnd = StorageService.loadData('endTime-minute');
        if (hourStart === 'null')hourStart = '0';  
        if(minuteStart==='null')minuteStart = '0';
        if(hourEnd==='null')hourEnd = '0';
        if(minuteEnd==='null')minuteEnd = '0';
        data.startTime = `${pad(hourStart)}:${pad(minuteStart)}`;
        data.endTime = `${pad(hourEnd)}:${pad(minuteEnd)}`;

        var objTask = {
            id: data.id,
            userId: data.userId,
            categoryId: data.categoryId,
            completion: data.completion,
            startTime: data.startTime,
            endTime: data.endTime,
            message: data.message,
            title: data.title,
            startDate: data.startDate,
            endDate: data.endDate,
            priority: data.priority
        }
        task.updateTask(data.id, objTask);
    }, false);

    function removeExistingSections() {
        const sections = document.querySelectorAll('.container-select-completion, .container-select, .completed-task, .removeExistingSections, .container-date ');
        sections.forEach(section => {
            section.remove();
        });
        selectCompletionCreated = false;
    }

    function createOrUpdateTimePickerSections() {
        removeTimePickerSections();
        var section = document.createElement("section");
        section.setAttribute("class", "container-date");
        var text = document.createElement('p');
        text.textContent = "End Time:";
        section.appendChild(text);
        let elementChild = document.querySelector('body > main > section.add-button');
        var endTimeData = data.endTime;
        var timeParts = endTimeData.split(":");
        var hours = timeParts[0];
        var minutes = timeParts[1];
        var objTime = {
            hour: parseInt(hours),
            minute: parseInt(minutes)
        };

        var divTimePicker = TimePicker.buildTimePicker(objTime);
        section.appendChild(divTimePicker);

        var elementParent = elementChild.parentNode;
        elementParent.insertBefore(section, elementChild);

        var sectionStart = document.createElement("section");
        sectionStart.setAttribute("class", "container-date");
        var textStart = document.createElement("p");
        textStart.textContent = "Start Time:";
        sectionStart.appendChild(textStart);
        elementChild = document.querySelector('body > main > section.container-date');
        const startTimeData = data.startTime;
        timeParts = startTimeData.split(":");
        hours = timeParts[0];
        minutes = timeParts[1];
        var objTime = {
            hour: parseInt(hours),
            minute: parseInt(minutes)
        };

        divTimePicker = TimePicker.buildTimePicker(objTime);
        sectionStart.appendChild(divTimePicker);
        elementParent = elementChild.parentNode;
        elementParent.insertBefore(sectionStart, elementChild);

        const timePickers = document.querySelectorAll(".time-picker");
        var timePickerStart = timePickers[0];
        var timePickerEnd = timePickers[1];

        var dataTimer = {
            hour: 0,
            minute: 0
        };
        try {
            obj = TimePicker.selectHandle(timePickerStart, "startTime", dataTimer);
            TimePicker.selectHandle(timePickerEnd, "endTime", dataTimer);
        } catch (error) {
            console.error(error.message);
        }

    }

    function removeTimePickerSections() {
        const sections = document.querySelectorAll('.container-date');
        sections.forEach(section => {
            section.remove();
        });
    }

    attachEventListeners();

});
