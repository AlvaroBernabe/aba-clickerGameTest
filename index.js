const cookie = document.querySelector("#cookie");
const autoClick = document.querySelector("#auto-click");
const autoClickTextPrice = document.querySelector("#auto-click .price span")

const updateScore = cookies => {
    const title = document.querySelector("title");
    const score = document.querySelector("#score span");

    score.innerText = cookies;
    title.innerHTML = cookies + " cookies - Cookie Clicker"

    localStorage.setItem("cookies", cookies);
}

const updatePowerupsStorage = powerup => {
    let powerups = JSON.parse(localStorage.getItem("powerups")) || [];
    powerups.push(powerup);

    localStorage.setItem("powerups", JSON.stringify(powerups));
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

const autoClickCookie = () => {
    setInterval(() => {
        const score = document.querySelector("#score span");
        const scoreValue = parseInt(score.innerText);

        newScore = scoreValue + 1;

        updateScore(newScore)
    }, 1000)
}

autoClick.addEventListener("click", () => {
    const price = autoClick.getAttribute("data-price");
    const score = document.querySelector("#score span");
    const scoreValue = parseInt(score.innerText)

    if (scoreValue >= price) {
        updatePowerupsStorage("auto-click");

        const storage = getStorage();
        const quantAutoClicks = storage.powerups.filter(powerups => powerups == "auto-click").length;

        const newScore = scoreValue - price;

        updateScore(newScore)

        if (quantAutoClicks == 1) {
            autoClick.setAttribute("data-price", 100 * 2);
            autoClickTextPrice.innerHTML = 100 * 2;
        } else {
            autoClick.setAttribute("data-price", 100 * (quantAutoClicks + 1));
            autoClickTextPrice.innerHTML = 100 * (quantAutoClicks + 1);
        }

        document.querySelector(".auto-clicks").classList.remove("disable")

        document.querySelector(".auto-clicks .cursors").innerHTML += '<img id="cursor" class="cursor auto" src="img/cursor.png" alt="cursor" srcset="">'

        autoClickCookie();

    } else {
        autoClick.classList.add("invalid")
        setTimeout(() => {
            autoClick.classList.remove("invalid")
        }, 300)
    }
})