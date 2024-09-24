import { TaskService } from '../../services/tasks-service.js';
import { StorageService } from '../../services/localStorage-service.js';

document.addEventListener('DOMContentLoaded', () => {
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const checkbox = document.querySelector('#switch');
    const nextButton = document.getElementById('nextBtn');

    const keyUser = "UI";
    const userId = StorageService.loadData(keyUser);
    const keyCategory = "cat"; 
    const categoryId = StorageService.loadData(keyCategory);

    const data = {
        userId: userId, 
        categoryId: categoryId, 
        completion: false,
        startTime: "00:00", 
        endTime: "00:00", 
        message: "Add your text", 
        title: "Add your title", 
        startDate: "",
        endDate: "",
        priority: false,
        id: ""
    };

    const taskService = new TaskService();

    // Toggle Priority Button
    if (checkbox) {
        checkbox.addEventListener('change', () => {
            data.priority = checkbox.checked;
        });
    }

    // Next Button Click Event Listener
    if (nextButton) {
        nextButton.addEventListener('click', async () => {
            if (startDateInput.value && endDateInput.value) {
                data.startDate = formatDate(startDateInput.value);
                data.endDate = formatDate(endDateInput.value);

                // Generate ID for the task
                data.id = generateTaskId(); // Implement this function to generate a unique ID

                try {
                    // Create the task using TaskService
                    const createdTask = await taskService.createTask(data);
                    console.log("New Task Created:", createdTask);
                    
                    // Redirection to tasksView after successful creation
                    window.location.href = '../view/tasksView.html';
                } catch (error) {
                    console.error("Error creating task:", error);
                    // Handle error as needed
                }
            } else {
                console.error("Start date and end date are required.");
            }
        });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        return formattedDate;
    }

    function generateTaskId() {
        // Implement your logic to generate a unique task ID
        const randomId = Math.floor(Math.random() * 100000).toString();
        return randomId;
    }
});
