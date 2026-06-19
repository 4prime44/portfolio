import { useEffect, useRef } from "react";

type Vector = {
  x: number;
  y: number;
};

class Particle {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;

  constructor(width: number, height: number) {
    this.position = {
      x: Math.random() * width,
      y: Math.random() * height,
    };

    this.velocity = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
    };

    this.acceleration = { x: 0, y: 0 };
  }

  update(width: number, height: number, mouse: Vector | null) {
    this.detectMouseInteraction(mouse);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.detectEdges(width, height);
  }

  detectMouseInteraction(mouse: Vector | null) {
    if (!mouse) return;

    const dx = mouse.x - this.position.x;
    const dy = mouse.y - this.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100 && distance > 0) {
      const directionX = dx / distance;
      const directionY = dy / distance;

      this.acceleration = {
        x: directionX * 0.1,
        y: directionY * 0.1,
      };

      this.velocity.x += this.acceleration.x;
      this.velocity.y += this.acceleration.y;

      const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);

      if (speed > 1) {
        this.velocity.x = (this.velocity.x / speed) * 1;
        this.velocity.y = (this.velocity.y / speed) * 1;
      }
    }
  }

  detectEdges(width: number, height: number) {
    if (this.position.x > width || this.position.x < 0) {
      this.velocity.x *= -1;
    }

    if (this.position.y > height || this.position.y < 0) {
      this.velocity.y *= -1;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(0,255,255,1)";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  drawLines(ctx: CanvasRenderingContext2D, particles: Particle[]) {
    particles.forEach((p) => {
      const dx = this.position.x - p.position.x;
      const dy = this.position.y - p.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 300) {
        const alpha = 1 - distance / 300;

        ctx.strokeStyle = `rgba(0,255,255,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(p.position.x, p.position.y);
        ctx.stroke();
      }
    });
  }
}

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Vector | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.style.width = "100vw";
      canvas.style.height = "100vh";

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      return { width, height };
    };

    let { width, height } = resizeCanvas();

    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 1000 ? 20 : 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(width, height));
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      const size = resizeCanvas();
      width = size.width;
      height = size.height;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    let animationId = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.update(width, height, mouseRef.current);
        p.draw(ctx);
        p.drawLines(ctx, particles.slice(i));
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        display: "block",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    />
  );
}