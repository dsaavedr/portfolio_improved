import MatterSketch from "./MatterSketch";

const Hero = () => {
  return (
    <div className="relative h-screen pt-40 text-center">
      <h1 className="text-9xl font-bold uppercase">Daniel Saavedra</h1>
      <h2 className="text-muted-foreground text-7xl font-semibold uppercase">
        Full Stack Developer
      </h2>
      <MatterSketch />
    </div>
  );
};

export default Hero;
