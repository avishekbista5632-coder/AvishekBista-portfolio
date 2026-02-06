const webProjectsData = [
    {
        title: "E-Commerce Website",
        desc: "Django based full-stack store with cart & checkouts",
        image: "https://picsum.photos/400/250?1",
        tech: ["python", "django"],
        date: "2025-01-12",
        live: "#",
        github: "#"
    },
    {
        title: "Flask To-Do App",
        desc: "CRUD app using Flask & SQLite",
        image: "https://picsum.photos/400/250?2",
        tech: ["python", "flask"],
        date: "2024-12-01",
        live: "#",
        github: "#"
    },
    {
        title: "PHP Blog",
        desc: "Multi-page blog system",
        image: "https://picsum.photos/400/250?3",
        tech: ["php", "mysql"],
        date: "2024-06-10",
        live: "#",
        github: "#"
    }
];
const behanceProjectsData = [
    {
        title: "Portfolio Design",
        desc: "• Wireframe • UI",
        image: "assets/images/portfolio.png",
        behance: "https://www.behance.net/gallery/243055057/portfolio-design"
    },
    {
        title: "AD for a drink",
        desc: "Adverstisement for a can product, animation",
        image: "https://picsum.photos/400/250?5",
        behance: "https://www.behance.net/gallery/231193459/AD-for-a-drink"
    },
    {
        title: "UI for opening an app",
        desc: "Animation for opening a app",
        image: "https://picsum.photos/400/250?6",
        behance: "https://www.behance.net/gallery/231185009/opening-for-a-app"
    },
    {
        title: "Interactive menu and automatic carousel",
        desc: "This is a design for an interactive menu and automatic carousel",
        image: "https://picsum.photos/400/250?6",
        behance: "https://www.behance.net/gallery/231341921/interactive-menu-bar-and-automated-image-carousel"
    }
];

// ===== RENDER WEB PROJECTS =====
const webProjectsContainer = document.getElementById("webProjectsData");

if (webProjectsContainer) {
    webProjectsData.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="overlay">
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
                <div class="buttons">
                    <a href="${project.live}" target="_blank" class="btn live">
                        🚀 Live
                    </a>
                    <a href="${project.github}" target="_blank" class="btn github">
                        <img src="assets/images/2026-02-06.png" class="icon" alt="GitHub">
                        GitHub
                    </a>
                </div>
            </div>
        `;

        webProjectsContainer.appendChild(card);
    });
}
// ===== RENDER BEHANCE PROJECTS =====
const behanceContainer = document.getElementById("behanceProjects");

if (behanceContainer) {
    behanceProjectsData.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="overlay">
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
                <div class="buttons">
                <a href="${project.behance}" target="_blank" class="btn behance">
                    <img src="assets/images/2026-02-06.png" class="icon" alt="Behance">
                    Behance
                </a>
                </div>
            </div>
        `;

        behanceContainer.appendChild(card);
    });
}
// ===== LIVE SEARCH FUNCTION =====
function setupLiveSearch(inputId, suggestionsId, projectsArray, renderContainerId) {
    const input = document.getElementById(inputId);
    const suggestionsEl = document.getElementById(suggestionsId);
    const projectsContainer = document.getElementById(renderContainerId);

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();
        suggestionsEl.innerHTML = "";

        if (!query) {
            suggestionsEl.style.display = "none";
            renderProjects(projectsArray, projectsContainer);
            return;
        }

        const matched = projectsArray.filter(proj => {
            const title = proj.title.toLowerCase();
            const desc = proj.desc.toLowerCase();
            const tech = (proj.tech || []).join(" ").toLowerCase();
            return title.includes(query) || desc.includes(query) || tech.includes(query);
        });

        // Show suggestions
        matched.slice(0, 5).forEach(proj => {
            const li = document.createElement("li");
            li.textContent = proj.title;
            li.addEventListener("click", () => {
                input.value = proj.title;
                suggestionsEl.style.display = "none";
                renderProjects([proj], projectsContainer); // show selected project
            });
            suggestionsEl.appendChild(li);
        });

        suggestionsEl.style.display = matched.length ? "block" : "none";

        // Also filter projects live
        renderProjects(matched, projectsContainer);
    });
}

// ===== RENDER FUNCTION =====
function renderProjects(projects, container) {
    container.innerHTML = "";

    // ❌ No results case
    if (projects.length === 0) {
        const msg = document.createElement("div");
        msg.className = "no-results";
        msg.innerHTML = `
            <span>😕</span>
            Sorry, no projects found
        `;
        container.appendChild(msg);
        return;
    }

    // ✅ Render cards
    projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        if (project.live && project.github) {
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="overlay">
                    <h3>${project.title}</h3>
                    <p>${project.desc}</p>
                    <div class="buttons">
                        <a href="${project.live}" target="_blank" class="btn live">🚀 Live</a>
                        <a href="${project.github}" target="_blank" class="btn github">🐙 GitHub</a>
                    </div>
                </div>
            `;
        } else {
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="overlay">
                    <h3>${project.title}</h3>
                    <p>${project.desc}</p>
                    <div class="buttons">
                        <a href="${project.behance}" target="_blank" class="btn behance">🎨 Behance</a>
                    </div>
                </div>
            `;
        }

        container.appendChild(card);
    });
}

// Initialize
setupLiveSearch("web-search", "web-suggestions", webProjectsData, "webProjectsData");
setupLiveSearch("behance-search", "behance-suggestions", behanceProjectsData, "behanceProjects");

// ===== CONFIG =====
const WEATHER_API_KEY = "7f7b992d873d67b38aa26f56f1167e38";
const CITY = "Kathmandu";

// ===== DAY / NIGHT =====
function updateDayNight() {
    const hour = new Date().getHours();
    const icon = (hour >= 6 && hour < 18) ? "☀️" : "🌙";
    const el = document.getElementById("dayNight");
    if (el) el.innerText = icon;
}
updateDayNight();

// ===== CLOCK =====
function updateClock() {
    const now = new Date();
    const clock = document.getElementById("clock");
    if (!clock) return;

    clock.innerText = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}
updateClock();
setInterval(updateClock, 1000);

// ===== LOCATION =====
const locationEl = document.getElementById("location");
if (locationEl) {
    locationEl.innerText = "📍 Kathmandu, Nepal";
}

// ===== WEATHER =====
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${WEATHER_API_KEY}`)
    .then(res => {
        if (!res.ok) throw new Error("Weather fetch failed");
        return res.json();
    })
    .then(data => {
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].main;

        let icon = "🌤";
        if (condition.includes("Rain")) icon = "🌧";
        else if (condition.includes("Cloud")) icon = "☁️";
        else if (condition.includes("Clear")) icon = "☀️";
        else if (condition.includes("Snow")) icon = "❄️";
        else if (condition.includes("Thunder")) icon = "⛈";
        else if (condition.includes("Mist") || condition.includes("Fog")) icon = "🌫";

        const weatherEl = document.getElementById("weather");
        if (weatherEl) {
            weatherEl.innerText = `${icon} ${temp}°C`;
        }
    })
    .catch(() => {
        const weatherEl = document.getElementById("weather");
        if (weatherEl) {
            weatherEl.innerText = "🌤 --°C";
        }
    });
document.querySelectorAll(".horizontal-scroll-wrapper").forEach(wrapper => {
    const projects = wrapper.querySelector(".projects");
    const leftBtn = wrapper.querySelector(".scroll-btn.left");
    const rightBtn = wrapper.querySelector(".scroll-btn.right");

    leftBtn.addEventListener("click", () => {
        projects.scrollBy({ left: -300, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
        projects.scrollBy({ left: 300, behavior: "smooth" });
    });
});

document.querySelectorAll(".toggle-btn").forEach(button => {

    button.addEventListener("click", () => {

        const content = button.nextElementSibling;

        document.querySelectorAll(".expand-content").forEach(el => {
            if (el !== content) el.classList.remove("active");
        });

        content.classList.toggle("active");

    });

});

const canvas = document.getElementById("particle-bg");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const mouse = {
    x: null,
    y: null,
    radius: 160
};

window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
});

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.baseSize = this.size;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;

        if (mouse.x && mouse.y) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                this.size = this.baseSize + (mouse.radius - distance) / 25;
            } else {
                this.size = this.baseSize;
            }
        }
    }

    draw() {
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let particles = [];

function initParticles() {
    particles = [];
    const count = Math.floor((width * height) / 5000);

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {

            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 130) {
                ctx.strokeStyle = `rgba(255,255,255,${(1 - distance / 130) * 0.25})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }

        if (mouse.x && mouse.y) {
            const dxm = particles[a].x - mouse.x;
            const dym = particles[a].y - mouse.y;
            const distMouse = Math.sqrt(dxm * dxm + dym * dym);

            if (distMouse < mouse.radius) {
                const intensity = 1 - distMouse / mouse.radius;

                const red = Math.floor(255 * intensity);
                const gb = Math.floor(255 * (1 - intensity));

                ctx.strokeStyle = `rgba(${red},${gb},${gb},${intensity})`;
                ctx.lineWidth = 2;

                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    connectParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
