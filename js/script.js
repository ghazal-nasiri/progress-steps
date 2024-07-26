const root = document.querySelector(":root")
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressStep = document.querySelectorAll(".step");
const background = document.querySelector(".background");

const colorSelection = document.querySelector(".colorSelection");
let currentActive = 1;
let clickedColor;



addEventListener("load" , ()=>{
    if(localStorage.getItem("step")){
        currentActive = Number(localStorage.getItem("step"))
        update();

    }
    clickedColor = localStorage.getItem("color")
    color(clickedColor)

})

    colorSelection.addEventListener("click" , (e)=>{
        let clickedColor = e.target.className;
        color(clickedColor);
    })


    function color(clickedColor){
        if(clickedColor === "pink"){
            saveColorToStorage("pink");
            setColor("rgb(255, 106, 131)","pink","rgb(253, 159, 173)")
        }
        else if(clickedColor === "red"){
            saveColorToStorage("red");
            setColor("red","rgb(255, 107, 107)","rgb(255, 92, 92)")
        }
        else if(clickedColor === "orange"){
            saveColorToStorage("orange");
            setColor("orange","rgb(255, 220, 156)","rgb(255, 202, 103)")
        }
        else if(clickedColor === "blue"){
            saveColorToStorage("blue")
            setColor("blue","lightblue","skyblue")
        }
        else if(clickedColor === "green"){
            saveColorToStorage("green")
            setColor("green","lightgreen","rgb(127, 214, 127)")
        }
    }





function setColor(deep, light, border) {
    root.style.setProperty("--deep", deep);
    root.style.setProperty("--light", light);
    root.style.setProperty("--border", border);
}

nextBtn.addEventListener("click", () => {
    currentActive++;
    if (currentActive > progressStep.length) {
        currentActive = progressStep.length;
    }
    update()
})
prevBtn.addEventListener("click", () => {
    currentActive--;
    if (currentActive < 1) {
        currentActive = 1;
    }
    update()
})

progressStep.forEach((element, index) => {
    element.addEventListener("click", () => {
        currentActive = index + 1;
        for (let i = 1; i < currentActive; i++) {
            progressStep[i].classList.add("active")
        }
        for (let i = currentActive; i < progressStep.length; i++) {
            progressStep[i].classList.remove("active")
        }
        progress.style.width = (currentActive - 1) / (progressStep.length - 1) * 100 + "%";
        background.style.left = `-${(currentActive - 1) * 100}%`
        if (currentActive === progressStep.length) {
            nextBtn.disabled = true;
            prevBtn.disabled = false;
        }
        else if (currentActive === 1) {
            prevBtn.disabled = true;
            nextBtn.disabled = false;
        }
        else {
            nextBtn.disabled = false;
            prevBtn.disabled = false;
        }
        saveStepToStorage(currentActive)
    })
});

function update() {
    progressStep.forEach((item, index) => {
        if (index < currentActive) {
            item.classList.add("active")
        }
        else {
            item.classList.remove("active")
        }
        progress.style.width = (currentActive - 1) / (progressStep.length - 1) * 100 + "%";
        background.style.left = `-${(currentActive - 1) * 100}%`
        if (currentActive === 1) {
            prevBtn.disabled = true;
            nextBtn.disabled = false;

        }
        else if (currentActive === progressStep.length) {
            nextBtn.disabled = true;
            prevBtn.disabled = false;
        }
        else {
            prevBtn.disabled = false;
            nextBtn.disabled = false;
        }
        saveStepToStorage(currentActive)
    });
}

function saveStepToStorage(currActive){
    localStorage.setItem("step" , currActive);
}
function saveColorToStorage(color){
    localStorage.setItem("color" , color)
}