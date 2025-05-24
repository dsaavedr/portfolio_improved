"use client";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import { random } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const MatterSketch = () => {
  const simDiv = useRef(null);
  const [width, height] = useWindowDimensions();
  const [[debouncedWidth, debouncedHeight], setDebouncedDimensions] = useState([
    width,
    height,
  ]);

  useEffect(() => {
    if (!simDiv.current) return;
    const { Engine, Render, Runner, Bodies, Body, Composite } = Matter;

    const engine = Engine.create();
    const render = Render.create({
      element: simDiv.current,
      engine,
      options: {
        width: debouncedWidth,
        height: debouncedHeight,
        wireframes: false,
        background: "rgba(0, 0, 0, 0)",
      },
    });

    // TODO: Create boxes
    const boxes: Matter.Body[] = [];

    for (let i = 0; i < 10; i++) {
      const box = Bodies.rectangle(
        Math.floor(Math.random() * (debouncedWidth - 80)),
        Math.floor(Math.random() * 300),
        100,
        50,
        {
          chamfer: { radius: 8 },
        },
      );

      Body.rotate(box, random({ min: -Math.PI / 4, max: Math.PI / 4 }));
      boxes.push(box);
    }

    const ground = Bodies.rectangle(
      0,
      debouncedHeight - 10,
      debouncedWidth * 2,
      1,
      {
        isStatic: true,
      },
    );

    Composite.add(engine.world, [...boxes, ground]);

    Render.run(render);

    const runner = Runner.create();

    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
    };
  }, [debouncedWidth, debouncedHeight]);

  useEffect(() => {
    const debounceDimensions = setTimeout(() => {
      setDebouncedDimensions([width, height]);
    }, 500);

    return () => clearTimeout(debounceDimensions);
  }, [width, height]);

  return (
    <div
      id="hero-animation"
      className="absolute top-0 -z-10"
      ref={simDiv}
    ></div>
  );
};

export default MatterSketch;
