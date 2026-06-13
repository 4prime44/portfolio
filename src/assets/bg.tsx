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

    // initial speed
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

    if (distance < 100) {
      const directionX = dx / distance;
      const directionY = dy / distance;

      this.acceleration = {
        // mouse influence
        x: directionX * 0.1,
        y: directionY * 0.1,
      };

      this.velocity.x += this.acceleration.x;
      this.velocity.y += this.acceleration.y;

      const speed = Math.sqrt(
        this.velocity.x ** 2 + this.velocity.y ** 2
      );

      // max speed
      if (speed > 1) {
        this.velocity.x = (this.velocity.x / speed) * 0.001;
        this.velocity.y = (this.velocity.y / speed) * 0.001;
      }
    }
  }

  detectEdges(width: number, height: number) {
    if (this.position.x > width || this.position.x < 0) {
      this.velocity.x *= -1; // bounce X axis
    }

    if (this.position.y > height || this.position.y < 0) {
      this.velocity.y *= -1; // bounce Y axis
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(0,255,255)`;
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
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = (canvas.width = window.innerWidth); // set canvas width to viewport
    let height = (canvas.height = window.innerHeight); // set canvas height to viewport

    const particles: Particle[] = [];

    for (let i = 0; i < 80; i++) {
      particles.push(new Particle(width, height));
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }; // track mouse position
    };

    window.addEventListener("mousemove", handleMouseMove); // listen for mouse movement

    const animate = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height); // clear canvas each frame

      particles.forEach((p, i) => {
        p.update(width, height, mouseRef.current);
        p.draw(ctx);
        p.drawLines(ctx, particles.slice(i));
      });

      requestAnimationFrame(animate); // animation loop
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth; // update width on resize
      height = canvas.height = window.innerHeight; // update height on resize
    };

    window.addEventListener("resize", handleResize); // handle responsive canvas

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}