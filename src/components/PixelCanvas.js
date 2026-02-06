// pixel-canvas.js

class Pixel {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.reset();
  }

  reset(delay = Math.random() * 60) {
    this.size = 0;
    this.maxSize = Math.random() * 2 + 0.4;
    this.opacity = 0;
    this.delay = delay;
    this.life = 0;
    this.speed = 0.04;
  }

  draw(color) {
    if (this.life < this.delay) {
      this.life++;
      return;
    }

    if (this.size < this.maxSize) {
      this.size += this.speed;
      this.opacity = Math.min(this.opacity + 0.02, 0.85);
    }

    this.ctx.globalAlpha = this.opacity;
    this.ctx.fillStyle = color;

    this.ctx.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );

    this.ctx.globalAlpha = 1;
  }
}

class PixelCanvas extends HTMLElement {
  connectedCallback() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    Object.assign(this.style, {
      display: "block",
      width: "100%",
      height: "100%",
      pointerEvents: "none"
    });

    this.appendChild(this.canvas);

    this.radius = 0;
    this.targetRadius = 0;
    this.revealSpeed = 0.035;

    this.hovered = false;
    this.twinkleIndex = 0;

    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);

    this.resize();
    window.addEventListener("resize", this.resize);

    const parent = this.parentElement;
    parent?.addEventListener("mouseenter", () => this.onEnter());
    parent?.addEventListener("mouseleave", () => this.onLeave());

    this.running = true;
    this.animate();
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.resize);
    cancelAnimationFrame(this.raf);
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.getBoundingClientRect();

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + "px";
    this.canvas.style.height = rect.height + "px";

    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.center = {
      x: rect.width / 2,
      y: rect.height / 2
    };

    this.maxRadius = Math.hypot(rect.width, rect.height);

    this.init();
  }

  init() {
    this.pixels = [];
    const gap = window.innerWidth < 768 ? 16 : 13;

    for (let y = 0; y < this.canvas.height; y += gap) {
      for (let x = 0; x < this.canvas.width; x += gap) {
        this.pixels.push(new Pixel(this.ctx, x, y));
      }
    }
  }

  get color() {
    const raw = getComputedStyle(this).getPropertyValue("--pixel-color").trim();
    return raw ? `hsl(${raw})` : "hsl(173 80% 40%)";
  }

  onEnter() {
    this.hovered = true;
    this.targetRadius = this.maxRadius;

    // reseed all pixels softly
    this.pixels.forEach(p => p.reset(Math.random() * 40));
  }

  onLeave() {
    this.hovered = false;
    this.targetRadius = 0;
  }

  twinkle() {
    // reset a small batch every frame (infinite shimmer)
    const batchSize = Math.max(5, Math.floor(this.pixels.length * 0.02));

    for (let i = 0; i < batchSize; i++) {
      const p = this.pixels[this.twinkleIndex];
      p.reset();

      this.twinkleIndex++;
      if (this.twinkleIndex >= this.pixels.length) {
        this.twinkleIndex = 0;
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.radius += (this.targetRadius - this.radius) * this.revealSpeed;

    if (this.radius > 1) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(
        this.center.x,
        this.center.y,
        this.radius,
        0,
        Math.PI * 2
      );
      this.ctx.clip();
    }

    if (this.hovered) {
      this.twinkle();
    }

    this.pixels.forEach(p => p.draw(this.color));

    if (this.radius > 1) {
      this.ctx.restore();
    }

    this.raf = requestAnimationFrame(this.animate);
  }
}

if (!customElements.get("pixel-canvas")) {
  customElements.define("pixel-canvas", PixelCanvas);
}

export {};
