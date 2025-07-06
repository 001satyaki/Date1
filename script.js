document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js is loaded and DOM is ready");

  // === 1) Init particles background ===
  // — only run if Particles.js has loaded and the container exists —
  if (
    typeof window.particlesJS === "function" &&
    document.getElementById("particles-js")
  ) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 60,
          density: { enable: true, value_area: 800 }
        },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          out_mode: "out"
        }
      },
      interactivity: {
        detect_on: "window",
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
  } else {
    console.warn(
      "⚠️ Particles.js not found or #particles-js missing — skipping background animation"
    );
  }

  // === 2) Confession Sequence (index.html) ===
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
  }

  // === 4) Admin Page Logic (admin.html) ===
  if (window.location.pathname.includes("admin.html")) {
    const get = (key) => localStorage.getItem(key) || "—";
    document.getElementById("admin-type").innerText = get("date_type");
    document.getElementById("admin-date").innerText = get("selected_date");
    document.getElementById("admin-time").innerText = get("selected_time");

    const type = get("date_type");
    if (type === "Ganga") {
      document.getElementById("admin-location").innerText = get("ghat_choice");
    } else if (type === "Cafe") {
      document.getElementById("admin-location").innerText = get("cafe_choice");
    } else if (type === "Movie") {
      document.getElementById("admin-movie").innerText = get("movie_choice");
    }
  }

  // === 5) Music Toggle (all pages) ===
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

// Global for admin “Clear” button
function clearAnswers() {
  localStorage.clear();
  alert("All responses cleared!");
  location.reload();
}
