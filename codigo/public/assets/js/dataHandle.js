import { TaskService } from "../../services/tasks-service.js";
import { StorageService } from '../../services/localStorage-service.js';


document.addEventListener('DOMContentLoaded', async function () {


    var task = new TaskService();
    async function getTasks() {
        return await task.getTasks();
    }
    const tasks = await getTasks();


    var sampleEvents = tasks.map(function(task) {
        var timestamp = new Date(task.startDate + 'T' + task.startTime).getTime();
        return {
            id: task.id,
            title: task.title,
            date: timestamp,
            startDate: task.startDate,
            link: "#",
            priority: task.priority
        };
    });
    console.log("title", sampleEvents);
    $(document).ready(function () {
        $("#calendar").MEC({
            events: sampleEvents
        });


    });
});