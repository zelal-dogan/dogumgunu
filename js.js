let clickCount = 0;
const egg = document.getElementById("egg");
const message = document.getElementById("message");
const photosDiv = document.getElementById("photos");
const photos = document.querySelectorAll(".photo");
let broken = false;

const positions = [
    { top: '10%', left: '10%', rotate: -30 },
    { top: '15%', right: '15%', rotate: 25 },
    { bottom: '20%', left: '20%', rotate: -15 },
    { bottom: '25%', right: '25%', rotate: 30 },
    { top: '50%', left: '45%', rotate: 0 }
];

egg.addEventListener("click", () => {
    if (broken) return; // kırıldıktan sonra tıklanmasın

    clickCount++;

    if (clickCount === 1) {
        egg.src = "yumurta1.jpeg"; // çatlamış yumurta resmi
    } else if (clickCount === 4) {
        egg.src = "yumurta2.jpeg"; // kırılmış yumurta resmi

        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 }
        });

        photosDiv.style.display = "block";

        photos.forEach((photo, index) => {
            setTimeout(() => {
                photo.style.opacity = 1;
                // Pozisyonları ve dönüşü ayarla
                const pos = positions[index];
                photo.style.top = pos.top || 'auto';
                photo.style.bottom = pos.bottom || 'auto';
                photo.style.left = pos.left || 'auto';
                photo.style.right = pos.right || 'auto';
                photo.style.transform = `rotate(${pos.rotate}deg) scale(1.1)`;
            }, index * 400);
        });

        setTimeout(() => {
            message.style.display = "block";
        }, photos.length * 400 + 500);

        broken = true;
    }
});
