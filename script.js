const enter = document.getElementById("enter");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const typewriter = document.getElementById("typewriter");
const views = document.getElementById("views");
const discordLink = document.getElementById("discordLink");

const messages = [
  "ils enquêtent sur moi comme la CIA",
  "mais ils ne trouvent rien."
];

let messageIndex = 0;
let pos = 0;
let deleting = false;

function typeLoop() {
  const currentText = messages[messageIndex];

  if (!deleting) {
    pos++;
    typewriter.textContent = currentText.slice(0, pos);

    if (pos >= currentText.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }

    setTimeout(typeLoop, 55);
  } else {
    pos--;
    typewriter.textContent = currentText.slice(0, pos);

    if (pos <= 0) {
      deleting = false;
      messageIndex = (messageIndex + 1) % messages.length;
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

// Effet 3D : le cadre suit doucement la position de la souris.
const profileCard = document.getElementById("profileCard");
if (profileCard && window.matchMedia("(pointer: fine)").matches) {
  profileCard.addEventListener("mousemove", (e) => {
    const r = profileCard.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    profileCard.style.transform = `rotateX(${-y * 7}deg) rotateY(${x * 9}deg) scale3d(1.012,1.012,1.012)`;
  });
  profileCard.addEventListener("mouseleave", () => {
    profileCard.style.transition = "transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .25s ease";
    profileCard.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    setTimeout(() => profileCard.style.transition = "transform .12s ease-out, box-shadow .25s ease", 460);
  });
}
