(function() {
    const mathjaxURL = "https://cdn.jsdelivr.net/npm/mathjax@4.0.0/tex-mml-chtml.js";

    if (!document.getElementById("MathJax-script")) {
        const script = document.createElement("script");
        script.id = "MathJax-script";
        script.async = true;
        script.src = mathjaxURL;

        const head = document.head;
        const title = head.querySelector("title");

        if (title) {
            head.insertBefore(script, title);
        } else {
            head.prepend(script);
        }
    }
})();

document.addEventListener("DOMContentLoaded", function() {
    const enlaces = {
        con: "https://campusvirtual.unm.edu.ar/moodle/mod/forum/view.php?id=365957",
        Geo: "https://www.geogebra.org/classic",
        Req: "https://drive.google.com/file/d/1OjLunEFZ8VwrUmWhlOEmdlTYVoPUjepR/view?usp=sharing",
        downgeo: "https://geogebra.github.io/docs/reference/en/GeoGebra_Installation/",
        trid: "https://www.geogebra.org/classic#3d",
        hoja: "https://www.geogebra.org/classic#spreadsheet"
    };

    Object.keys(enlaces).forEach(clase => {
        document.querySelectorAll(`.${clase}`).forEach(elemento => {
            elemento.href = enlaces[clase];
            elemento.target = "_blank";
            elemento.rel = "noopener noreferrer";
        });
    });

    const isMobile = window.innerWidth <= 720;
    if (isMobile) {
        const botones = document.querySelectorAll(".index-page .button");
        const coordsMovil = [
            // 0–12 → btn1 a btn13
            { left: 60,  top: 267 },   // btn1
            { left: 102, top: 238 },   // btn2
            { left: 202, top: 248 },   // btn3
            { left: 232, top: 300 },   // btn4
            { left: 242, top: 360 },   // btn5
            { left: 273, top: 410 },   // btn6
            { left: 310, top: 455 },   // btn7
            { left: 337, top: 520 },   // btn8
            { left: 360, top: 552 },   // btn9
            { left: 365, top: 606 },   // btn10
            { left: 376, top: 652 },   // btn11
            { left: 490, top: 708 },   // btn12
            { left: 515, top: 755 },   // btn13
            
            // 13–18 → btn17 a btn22
            { left: 250, top: 1000 },  // btn17
            { left: 300, top: 1050 },  // btn18
            { left: 350, top: 1100 },  // btn19
            { left: 400, top: 1150 },  // btn20
            { left: 450, top: 1200 },  // btn21
            { left: 500, top: 1250 },  // btn22

            // 19–21 → btn14, btn15, btn16 (al final del DOM)
            { left: 525, top: 800 },   // btn14
            { left: 540, top: 1300 },   // btn15
            { left: 240, top: 899 },  // btn16
        ];


        botones.forEach((btn, i) => {
            const coord = coordsMovil[i];
            if (coord) {
                btn.style.left = `${(coord.left / 720) * 100}vw`;
                btn.style.top = `${(coord.top / 1612) * 100}vh`;
            }
        });
    }

    const ytVideos = document.querySelectorAll("video.yt");

    ytVideos.forEach((el, index) => {
        const url = el.textContent.trim();
        const id = `yt-auto-${index}`;

        el.textContent = "";
        el.id = id;
        el.classList.add("video-js", "vjs-default-skin");
        el.setAttribute("controls", true);
        el.setAttribute("width", "640");
        el.setAttribute("height", "360");

        const setup = {
            techOrder: ["youtube"],
            sources: [{
                type: "video/youtube",
                src: url
            }],
            youtube: {
                modestbranding: 1,
                rel: 0
            },
            ...(isMobile ? {
                fluid: true,
                aspectRatio: "16:9"
            } : {})
        };

        el.setAttribute("data-setup", JSON.stringify(setup));
        const player = videojs(id);
        player.ready(function () {
            const el = this.el();
            el.style.borderRadius = "16px";
            el.style.overflow = "hidden";

            const iframe = el.querySelector("iframe");
            if (iframe) {
                iframe.style.borderRadius = "16px";
            }
        });
    });
    document.querySelectorAll("iframe.d").forEach(iframe => {
        const id = iframe.textContent.trim();
        iframe.textContent = ""; // limpiar contenido
        iframe.src = `https://drive.google.com/file/d/${id}/preview`;
        iframe.setAttribute("allow", "autoplay");
    });
});

/*
(function () {

  ["videojs-css", "videojs-core", "videojs-youtube"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });

  const css = document.createElement("link");
  css.id = "videojs-css";
  css.rel = "stylesheet";
  css.href = "https://vjs.zencdn.net/8.23.4/video-js.css";
  document.head.appendChild(css);

  const core = document.createElement("script");
  core.id = "videojs-core";
  core.src = "https://vjs.zencdn.net/8.23.4/video.min.js";

  core.onload = () => {
    const yt = document.createElement("script");
    yt.id = "videojs-youtube";
    yt.src = "https://cdn.jsdelivr.net/npm/videojs-youtube@3/dist/Youtube.min.js";

    yt.onload = () => {
      initYouTubeVideos(); 
    };

    document.head.appendChild(yt);
  };

  document.head.appendChild(core);

})();

function initYouTubeVideos() {

  const isMobile = window.innerWidth <= 720;
  const ytVideos = document.querySelectorAll("video.yt");

  ytVideos.forEach((el, index) => {

    const url = el.textContent.trim();
    if (!url) return;

    const id = `yt-auto-${index}`;
    el.textContent = "";
    el.id = id;
    el.classList.add("video-js", "vjs-default-skin");
    el.setAttribute("controls", true);

    if (!isMobile) {
      el.setAttribute("width", "640");
      el.setAttribute("height", "360");
    }

    const setup = {
      techOrder: ["youtube"],
      sources: [{
        type: "video/youtube",
        src: url
      }],
      youtube: {
        modestbranding: 1,
        rel: 0
      },
      ...(isMobile ? { fluid: true, aspectRatio: "16:9" } : {})
    };

    el.setAttribute("data-setup", JSON.stringify(setup));

    const player = videojs(id);
    player.ready(function () {
      const el = this.el();
      el.style.borderRadius = "16px";
      el.style.overflow = "hidden";

      const iframe = el.querySelector("iframe");
      if (iframe) iframe.style.borderRadius = "16px";
    });
  });
}
*/
