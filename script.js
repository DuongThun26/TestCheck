document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const wrap = document.getElementById("wrap");
  const confess = document.getElementById("confess");
  const restart = document.getElementById("restart");

  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  const finalMessage = document.getElementById("finalMessage");
  const letter = confess.querySelector("div"); // lá thư 💌

  let noScale = 1;
  let yesScale = 1;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // Nút Không đồng ý → nhỏ dần, né tránh
  noBtn.addEventListener("click", () => {
    noScale = clamp(noScale - 0.14, 0.35, 1.0);
    yesScale = clamp(yesScale + 0.18, 1.0, 1.9);
    noBtn.style.transform = `scale(${noScale})`;
    yesBtn.style.transform = `scale(${yesScale})`;

    const rect = wrap.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const maxX = Math.max(0, rect.width - btnRect.width - 8);
    const maxY = Math.max(0, rect.height - btnRect.height - 8);
    const x = Math.round(Math.random() * maxX);
    const y = Math.round(Math.random() * maxY);
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  });

  // Nút Đồng ý → ẩn left/right, hiện confess
  yesBtn.addEventListener("click", () => {
    left.style.display = "none";
    right.style.display = "none";
    confess.style.display = "flex";
    startHearts();

    // chạy hiệu ứng gõ chữ ngay khi hiện confess
    typeText(
      finalMessage,
      "Anh muốn nói rằng: từ lúc biết em, anh đã thấy mọi thứ đủ đầy. Anh yêu em — em làm người yêu anh nhé?",
      50
    );
  });


  // Restart
  restart.addEventListener("click", () => {
    noScale = 1;
    yesScale = 1;
    noBtn.style.transform = `scale(${noScale})`;
    yesBtn.style.transform = `scale(${yesScale})`;
    noBtn.style.left = "18%";
    yesBtn.style.left = "60%";

    left.style.display = "block";
    right.style.display = "block";
    confess.style.display = "none";

    finalMessage.textContent = ""; // reset text
  });

  // Hàm gõ chữ
  function typeText(element, text, speed) {
    element.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
  }

  // Hiệu ứng trái tim rơi
  function startHearts() {
    setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "❤";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = 20 + Math.random() * 20 + "px";
      heart.style.animationDuration = 3 + Math.random() * 3 + "s";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }, 500);
  }
});
