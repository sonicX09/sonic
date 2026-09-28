const enter = document.getElementById("enter");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const typewriter = document.getElementById("typewriter");
const views = document.getElementById("views");
const discordLink = document.getElementById("discordLink");

const fullText = "ils enquêtent sur moi comme la CIA mais ils ne trouvent rien.";

let pos = 0;
let deleting = false;

function typeLoop() {
  if (!deleting) {
    pos++;
    typewriter.textContent = fullText.slice(0, pos);
    if (pos >= fullText.length) {
      deleting = true;
      setTimeout(typeLoop, 1500);
      return;
    }
    setTimeout(typeLoop, 55);
  } else {
    pos--;
    typewriter.textContent = fullText.slice(0, pos);
    if (pos <= 0) {
      deleting = false;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 30);
  }
}

typeLoop();

// Démo locale du compteur. Pour un vrai compteur partagé entre visiteurs,
// il faudra connecter le site à une base/solution de statistiques.
const stored = Number(localStorage.getItem("sonic_views") || 0) + 1;
localStorage.setItem("sonic_views", stored);
views.textContent = stored.toLocaleString("fr-FR");

// Le navigateur autorise la musique après une interaction utilisateur.
enter.addEventListener("click", async () => {
  enter.classList.add("hidden");
  try {
    await audio.play();
    playBtn.textContent = "❚❚";
  } catch (_) {}
});

playBtn.addEventListener("click", async (event) => {
  event.stopPropagation();
  if (audio.paused) {
    try { await audio.play(); } catch (_) {}
    playBtn.textContent = "❚❚";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

audio.addEventListener("ended", () => {
  playBtn.textContent = "▶";
});

// Le lien Discord est configuré directement dans index.html.
