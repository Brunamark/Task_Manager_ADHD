import { StorageService } from "../../services/localStorage-service.js";

document.addEventListener('DOMContentLoaded', async function () {

    const keyCat = "cat";
    const cardSport = document.querySelector(".card-sport");
    const cardArt = document.querySelector(".card-art");
    const cardHealth = document.querySelector(".card-health");
    const cardWork = document.querySelector(".card-work");
    const cardNutrition = document.querySelector(".card-nutrition");
    const cardHome = document.querySelector(".card-home");
    const cardStudy = document.querySelector(".card-study");
    const cardBadHabit = document.querySelector(".card-badHabit");
    const cardEntertainment = document.querySelector(".card-entertainment");
    const cardRead = document.querySelector(".card-read");
    const cardFinance = document.querySelector(".card-finance");
    const cardOther = document.querySelector(".card-other");

    cardSport.addEventListener("click", (event) => { StorageService.saveData(keyCat, 1); });
    cardArt.addEventListener("click", (event) => { StorageService.saveData(keyCat, 7); });
    cardHealth.addEventListener("click", (event) => { StorageService.saveData(keyCat, 2); });
    cardWork.addEventListener("click", (event) => { StorageService.saveData(keyCat, 8); });
    cardNutrition.addEventListener("click", (event) => { StorageService.saveData(keyCat, 3); });
    cardStudy.addEventListener("click", (event) => { StorageService.saveData(keyCat, 4); });
    cardHome.addEventListener("click", (event) => { StorageService.saveData(keyCat, 9); });
    cardBadHabit.addEventListener("click", (event) => { StorageService.saveData(keyCat, 10); });
    cardEntertainment.addEventListener("click", (event) => { StorageService.saveData(keyCat, 5); });
    cardRead.addEventListener("click", (event) => { ; StorageService.saveData(keyCat, 11); });
    cardFinance.addEventListener("click", (event) => { StorageService.saveData(keyCat, 6); });
    cardOther.addEventListener("click", (event) => { StorageService.saveData(keyCat, 12); });
    const allLinks = document.querySelectorAll('a');

    allLinks.forEach(link => {
        //link.innerHTML = "<!DOCTYPE html>";
        link.setAttribute('href', "../view/when.html");
    });

});