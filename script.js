document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js is loaded and DOM is ready");

  // === 1) Init Particles.js Background ===
  if (typeof window.particlesJS === "function" && document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1
        },
        move: { enable: true, speed: 2, out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" }
        },
        modes: {
          grab: { distance: 200, line_linked: { opacity: 1 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }

  // === 2) Index page confession text sequence ===
  const textSequence = [
    "I have something special to confess to you...",
    "I've been meaning to tell this to you for a long time...",
    "I love you ❤️",
    "Will you go on a date with me?"
  ];

  const textElement = document.getElementById("confession-text");
  const button = document.getElementById("next-btn");
  const box = document.getElementById("confession-box");
  let currentText = 0;

  if (textElement && button && box) {
    button.addEventListener("click", () => {
      currentText++;
      if (currentText < textSequence.length) {
        textElement.innerText = textSequence[currentText];
        if (currentText === textSequence.length - 1) {
          button.innerText = "Yes 💖";
          const noBtn = document.createElement("button");
          noBtn.innerText = "No 😢";
          noBtn.style.marginLeft = "10px";
          noBtn.onclick = () => {
            alert("Maybe next time... 😔");
            window.location.href = "https://google.com";
          };
          box.appendChild(noBtn);
        }
      } else {
        window.location.href = "select-date.html";
      }
    });
  }

  // === 3) Final Page Logic (final.html) ===
  if (window.location.pathname.includes("final.html")) {
    const get = (key) => localStorage.getItem(key) || "—";
    document.getElementById("type").innerText = get("date_type");
    document.getElementById("date").innerText = get("selected_date");
    document.getElementById("time").innerText = get("selected_time");

    const type = get("date_type");
    if (type === "Ganga") {
      document.getElementById("location").innerText = get("ghat_choice");
    } else if (type === "Cafe") {
      document.getElementById("location").innerText = get("cafe_choice");
    } else if (type === "Movie") {
      document.getElementById("movie").innerText = get("movie_choice");
    }

    const heartContainer = document.getElementById("hearts-container");
    if (heartContainer) {
      function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = 3 + Math.random() * 2 + "s";
        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
      }
      setInterval(createHeart, 300);
    }

    // Save full response to array
    const responses = JSON.parse(localStorage.getItem("responses") || "[]");
    const fullResponse = {
      date_type: get("date_type"),
      selected_date: get("selected_date"),
      selected_time: get("selected_time"),
      ghat_choice: localStorage.getItem("ghat_choice") || null,
      cafe_choice: localStorage.getItem("cafe_choice") || null,
      movie_choice: localStorage.getItem("movie_choice") || null
    };
    responses.push(fullResponse);
    localStorage.setItem("responses", JSON.stringify(responses));
  }

  // === 4) Admin Panel (admin.html) ===
// === 4) Admin Page Logic (admin.html) ===
if (window.location.pathname.includes("admin.html")) {
  const container = document.getElementById("admin-output");
  const all = JSON.parse(localStorage.getItem("responses") || "[]");

  if (!all.length) {
    container.innerHTML = "<p style='text-align:center;'>No responses found yet 😶</p>";
    return;
  }

  all.forEach((entry, i) => {
    const box = document.createElement("div");
    box.className = "summary-box";

    let extraInfo = "";
    if (entry.date_type === "Ganga") {
      extraInfo += `<p><strong>Ghat:</strong> ${entry.ghat_choice || "—"}</p>`;
    } else if (entry.date_type === "Cafe") {
      extraInfo += `<p><strong>Cafe:</strong> ${entry.cafe_choice || "—"}</p>`;
    } else if (entry.date_type === "Movie") {
      extraInfo += `<p><strong>Movie:</strong> ${entry.movie_choice || "—"}</p>`;
    }

    box.innerHTML = `
      <h3>Response #${i + 1}</h3>
      <p><strong>Date Type:</strong> ${entry.date_type || "—"}</p>
      ${extraInfo}
      <p><strong>Date:</strong> ${entry.selected_date || "—"}</p>
      <p><strong>Time:</strong> ${entry.selected_time || "—"}</p>
    `;
    container.appendChild(box);
  });
}

  // === 5) Music Toggle ===
  const bgMusic = document.getElementById("bg-music");
  const toggle = document.getElementById("music-toggle");
  if (bgMusic && toggle) {
    toggle.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play();
        toggle.textContent = "🔊";
      } else {
        bgMusic.pause();
        toggle.textContent = "🔇";
      }
    });
  }
});

// Global Clear Function for Admin Panel
function clearAnswers() {
  localStorage.removeItem("responses");
  alert("All responses cleared!");
  location.reload();
}
