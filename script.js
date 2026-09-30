const enter=document.getElementById("enter"),audio=document.getElementById("audio"),playBtn=document.getElementById("playBtn"),typewriter=document.getElementById("typewriter"),views=document.getElementById("views"),volume=document.getElementById("volume"),progress=document.getElementById("progress"),timeText=document.getElementById("timeText");
const messages=["ils enquêtent sur moi comme la CIA","mais ils ne trouvent rien."];let messageIndex=0,pos=0,deleting=false;
function typeLoop(){const t=messages[messageIndex];if(!deleting){pos++;typewriter.textContent=t.slice(0,pos);if(pos>=t.length){deleting=true;setTimeout(typeLoop,2000);return}setTimeout(typeLoop,55)}else{pos--;typewriter.textContent=t.slice(0,pos);if(pos<=0){deleting=false;messageIndex=(messageIndex+1)%messages.length;setTimeout(typeLoop,400);return}setTimeout(typeLoop,30)}}typeLoop();
const stored=Number(localStorage.getItem("sonic_views")||0)+1;localStorage.setItem("sonic_views",stored);views.textContent=stored.toLocaleString("fr-FR");audio.volume=.7;
function fmt(s){if(!Number.isFinite(s))return"0:00";const m=Math.floor(s/60),ss=Math.floor(s%60).toString().padStart(2,"0");return`${m}:${ss}`}
function sync(){if(audio.duration){progress.value=(audio.currentTime/audio.duration)*100;timeText.textContent=`${fmt(audio.currentTime)} / ${fmt(audio.duration)}`}}audio.addEventListener("loadedmetadata",sync);audio.addEventListener("timeupdate",sync);volume.addEventListener("input",()=>audio.volume=Number(volume.value));progress.addEventListener("input",()=>{if(audio.duration)audio.currentTime=(Number(progress.value)/100)*audio.duration});
enter.addEventListener("click",async()=>{enter.classList.add("hidden");try{await audio.play();playBtn.textContent="❚❚"}catch(_){}});playBtn.addEventListener("click",async e=>{e.stopPropagation();if(audio.paused){try{await audio.play()}catch(_){}playBtn.textContent="❚❚"}else{audio.pause();playBtn.textContent="▶"}});audio.addEventListener("ended",()=>playBtn.textContent="▶");
const card=document.getElementById("profileCard");if(card&&matchMedia("(pointer: fine)").matches){card.addEventListener("mousemove",e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`rotateX(${-y*7}deg) rotateY(${x*9}deg) scale3d(1.012,1.012,1.012)`});card.addEventListener("mouseleave",()=>{card.style.transition="transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .25s ease";card.style.transform="rotateX(0) rotateY(0) scale3d(1,1,1)";setTimeout(()=>card.style.transition="transform .12s ease-out,box-shadow .25s ease",460)})}

// Animation du titre de l'onglet : @ Sonic_OFF s'écrit puis s'efface en boucle.
const tabTitleText = "@ Sonic_OFF";
let tabTitlePos = 0;
let tabTitleDeleting = false;
function animateTabTitle(){
  if(!tabTitleDeleting){
    tabTitlePos++;
    document.title = tabTitleText.slice(0,tabTitlePos) || " ";
    if(tabTitlePos >= tabTitleText.length){tabTitleDeleting=true;setTimeout(animateTabTitle,1500);return;}
    setTimeout(animateTabTitle,180);
  }else{
    tabTitlePos--;
    document.title = tabTitleText.slice(0,tabTitlePos) || " ";
    if(tabTitlePos <= 0){tabTitleDeleting=false;setTimeout(animateTabTitle,450);return;}
    setTimeout(animateTabTitle,90);
  }
}
animateTabTitle();
