"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { Particle } from "@/lib/Particle";
import { random, scale } from "@/lib/utils";
import { Vector } from "@/lib/Vector";

type Params = {
  particles?: number;
};

const BgSketch = ({ particles = 40 }: Params) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, height] = useWindowDimensions();
  const [[debouncedWidth, debouncedHeight], setDebouncedDimensions] = useState([
    width,
    height,
  ]);
  const [canvasBg, setCanvasBg] = useState("rgb(0, 0, 0)");
  const [strokeColor, setStrokeColor] = useState("gray");
  const { theme } = useTheme();
  const n = particles;

  useEffect(() => {
    // TODO: refactor to access TW variables from JS: https://tailwindcss.com/docs/theme#referencing-in-javascript
    // ! Above doesn't work well
    let bg: string;
    let stroke: string;
    const dark = "oklch(0.141 0.005 285.823)";
    const light = "oklch(0.985 0 0)";
    if (theme === "system") {
      // Check for user's preference
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        bg = dark;
        stroke = "lightgray";
      } else {
        bg = light;
        stroke = "gray";
      }
    } else {
      bg = theme === "dark" ? dark : light;
      stroke = theme === "dark" ? "lightgray" : "gray";
    }
    setCanvasBg(bg);
    setStrokeColor(stroke);
  }, [theme]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const WIDTH = debouncedWidth;
    const HEIGHT = debouncedHeight;
    const CUTOFF = scale(WIDTH, 400, 3000, 200, 600);

    const particles: Particle[] = [];

    let drawLoop: NodeJS.Timeout;

    const point = (x: number, y: number, c = "white", r = 2) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI, true);
      ctx.fillStyle = c;
      ctx.fill();
      //ctx.stroke();
      ctx.closePath();
      ctx.restore();
    };

    const ani = () => {
      ctx.beginPath();
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.closePath();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.borders(1, WIDTH, HEIGHT);
        p.update();

        for (let j = 0; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Vector.dist(p.pos, p2.pos);

          if (dist <= CUTOFF) {
            ctx.save();
            ctx.globalAlpha = 0.8 - scale(dist, CUTOFF / 2, CUTOFF, 0, 0.8);
            ctx.lineWidth = 2 - scale(dist, 0, CUTOFF, 0.2, 2);
            ctx.beginPath();
            ctx.moveTo(p.pos.x, p.pos.y);
            ctx.lineTo(p2.pos.x, p2.pos.y);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
          }
        }

        p.show(point);
      }
    };

    const init = () => {
      clearInterval(drawLoop);
      canvas.setAttribute("width", WIDTH.toString());
      canvas.setAttribute("height", HEIGHT.toString());

      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.beginPath();
      ctx.fillStyle = canvasBg;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.closePath();

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;

      for (let i = 0; i < n; i++) {
        const x = random({ max: WIDTH }),
          y = random({ max: HEIGHT });

        const pos = new Vector(x, y);
        const vel = Vector.random();
        vel.setMag(random({ min: 0.3, max: 1.3 }));

        particles.push(
          new Particle(
            pos,
            vel,
            strokeColor,
            Math.floor(random({ min: 4, max: 8 })),
          ),
        );
      }

      drawLoop = setInterval(ani, 100 / 6);
    };

    init();

    return () => {
      clearInterval(drawLoop);
    };
  }, [debouncedWidth, debouncedHeight, n, canvasBg, strokeColor]);

  useEffect(() => {
    const debounceDimensions = setTimeout(() => {
      setDebouncedDimensions([width, height]);
    }, 500);

    return () => clearTimeout(debounceDimensions);
  }, [width, height]);

  return (
    <>
      <h1 className="text-red text-3xl">{theme}</h1>
      <canvas
        id="hero-animation"
        className="absolute top-0 -z-10"
        ref={canvasRef}
      />
    </>
  );
};

export default BgSketch;
