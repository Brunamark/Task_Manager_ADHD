import { TaskService } from "../../services/tasks-service.js";
import { CategoriesService } from "../../services/categories-service.js";
import { StorageService } from "../../services/localStorage-service.js"

document.addEventListener('DOMContentLoaded', async function () {
    const task = new TaskService();
    const category = new CategoriesService();
    const keyTask = "taskId";
    const keyUser = "UI";
    const keyDate = "date";

    async function getCategory(id) {
        return await category.getCategories(id);
    }

    async function getTasks() {
        return await task.getTasks();
    }

    async function getTasksById(obj, id) {
        return obj.filter(entry => parseInt(entry.userId) === parseInt(id));
    }

    function getPeriodDay(obj) {
        const timeString = obj.startTime;
        if (!timeString || timeString === 'null') return 'Fulltime';

        const [hour] = timeString.split(":");
        const hourInt = parseInt(hour, 10);

        if (hourInt >= 6 && hourInt < 12) return 'Morning';
        else if (hourInt >= 12 && hourInt < 18) return 'Afternoon';
        else if (hourInt >= 18 && hourInt < 21) return 'Evening';
        else return 'Night';
    }

    function getCategoryNameById(obj, id) {
        const category = obj.find(category => parseInt(category.id) === parseInt(id));
        return category ? category.name : null;
    }

    async function getImageCategory(id) {
        const objCategory = await getCategory(id);
        const name = getCategoryNameById(objCategory, id);
        switch (name) {
            case "Sports":
                return '../assets/images/dumbbell.png';
            case "Health":
                return '../assets/images/health.png';
            case "Nutrition":
                return '../assets/images/nutrition.png';
            case "Study":
                return '../assets/images/study.png';
            case "Entertainment":
                return '../assets/images/entertainment.png';
            case "Finance":
                return '../assets/images/finance.png';
            case "Art":
                return '../assets/images/art.png';
            case "Work":
                return '../assets/images/work.png';
            case "Home":
                return '../assets/images/home.png';
            case "BadHabit":
                return '../assets/images/bad-habit.png';
            case "Read":
                return '../assets/images/read.png';
            case "Other":
                return '../assets/images/other.png';
        }
    }

    async function getColorCategory(id) {
        const objCategory = await getCategory(id);
        const name = getCategoryNameById(objCategory, id);
        switch (name) {
            case "Sports":
                return '#FF5C00';
            case "Health":
                return '#4AA633';
            case "Nutrition":
                return '#FF9A51';
            case "Study":
                return '#594CEE';
            case "Entertainment":
                return '#9E00FF';
            case "Finance":
                return '#FFC700';
            case "Art":
                return '#FF017B';
            case "Work":
                return '#34FF9D';
            case "Home":
                return '#818260';
            case "BadHabit":
                return '#FD6161';
            case "Read":
                return '#2AFFD9';
            case "Other":
                return '#EF31C6';
        }
    }

    const userId = StorageService.loadData(keyUser);
    let objTasks = await getTasks();
    objTasks = await getTasksById(objTasks, userId);

    const date = StorageService.loadData(keyDate);
    objTasks = objTasks.filter(tasks=> tasks.startDate === date );


    const periods = ['Fulltime', 'Morning', 'Afternoon', 'Evening', 'Night'];
    const section = document.querySelector('.cards');

    for (const period of periods) {
        let periodTasks = objTasks.filter(task => getPeriodDay(task) === period);

        if (periodTasks.length > 0) {
            const divTitle = document.createElement('div');
            divTitle.setAttribute('class', 'title');
            const mainTitle = document.createElement('h1');
            mainTitle.innerHTML = period;
            const dateTask = document.createElement('p');
            dateTask.innerHTML = periodTasks[0].startDate;
            divTitle.appendChild(mainTitle);
            divTitle.appendChild(dateTask);
            section.appendChild(divTitle);

            for (const currentValue of periodTasks) {
                const divCard = document.createElement('div');
                divCard.setAttribute('class', 'card');
                const divInt = document.createElement('div');
                divInt.setAttribute("class", "container");

                const divCat = document.createElement('div');
                divCat.setAttribute("class", "divImg");

                const categoryId = currentValue.categoryId;
                const urlImg = await getImageCategory(categoryId);

                const divImgCard = document.createElement('div');
                divImgCard.setAttribute("class", "border-img");
                divImgCard.style.backgroundColor = await getColorCategory(categoryId);
                const img = document.createElement('img');
                img.setAttribute("src", urlImg);

                const nameTag = document.createElement('p');
                let title = currentValue.title;
                if (title.toLowerCase() === 'add your title') {
                    const objCategory = await getCategory(categoryId);
                    title = getCategoryNameById(objCategory, categoryId);
                }
                nameTag.innerHTML = title;

                if (currentValue.priority) {
                    divCard.style.position = 'relative';
                    const importanceDiv = document.createElement('div');
                    importanceDiv.setAttribute('class', 'importance');
                    importanceDiv.style.position = 'absolute';
                    divCard.appendChild(importanceDiv);
                }

                divImgCard.appendChild(img);
                divCat.appendChild(divImgCard);
                divCat.appendChild(nameTag);
                divInt.appendChild(divCat);

                const divBtn = document.createElement('div');
                divBtn.setAttribute("class", "container-button");

                const btn = document.createElement("button");
                btn.setAttribute("class", "add");
                btn.setAttribute("data-task-id", currentValue.id);

                const imgBtn = document.createElement("img");
                imgBtn.setAttribute("id", "imgBtn");
                imgBtn.setAttribute("src", "../assets/images/plus_icon.svg");

                btn.appendChild(imgBtn);
                divBtn.appendChild(btn);
                divInt.appendChild(divBtn);
                divCard.appendChild(divInt);
                section.appendChild(divCard);
            }
        }
    }
    const buttons = document.querySelectorAll('.add');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            var value = button.getAttribute('data-task-id');
            StorageService.saveData(keyTask,value);
            window.location.href = '../view/registrationChange.html';

        });
    });
});
