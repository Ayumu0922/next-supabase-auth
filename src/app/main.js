if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const interBubble = document.querySelector(".interactive");
    if (!interBubble) {
      console.error('Element with class "interactive" not found.');
      return;
    }

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 500;
      curY += (tgY - curY) / 500;
      interBubble.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    }

    window.addEventListener("mousemove", (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    });

    move();
  });
}
