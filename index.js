const cookie = document.querySelector("#cookie");

const updateScore = cookies => {
    const title = document.querySelector("title");
    const score = document.querySelector("#score span");

    score.innerHTML = cookies;
    title.innerHTML = cookies + " cookies - Cookie Clicker";

    localStorage.setItem("cookies", cookies);
}

const getStorage = () => {
    const cookies = localStorage.getItem("cookies") || 0;
    const powerups = JSON.parse(localStorage.getItem("powerups")) || [];

    const storage = {
        "cookies": cookies,
        "powerups": powerups,
    }
    return storage;
}

const cookieClicked = cookies => {
    const storage = getStorage();

    const score = document.querySelector("#score span");
    const scoreValue = cookies ? cookies : parseInt(score.innerText);

    let newScore;

    newScore = scoreValue + 1;

    updateScore(newScore);
}

const createParticle = (x, y) => {
    const cookieClicks = document.querySelector(".cookie-clicks");

    const particle = document.createElement("img");
    particle.setAttribute("src", "img/cookie.png");
    particle.setAttribute("class", "cookie-particle");
    particle.style.left = x + "px";
    particle.style.top = y + "px";

    cookieClicks.appendChild(particle);

    setTimeout(() => {
        cookieClicks.removeChild(particle);
    }, 3000);
}

cookie.addEventListener("click", (e) => {
    createParticle(e.clientX, e.clientY);
    cookieClicked()
});