import BgSketch from "./BgSketch";

const Hero = () => {
  return (
    <div className="h-full pt-40 text-center">
      <h1 className="mb-10 text-6xl font-bold uppercase md:text-9xl">
        Daniel Saavedra
      </h1>
      <h2 className="text-muted-foreground text-3xl font-semibold uppercase md:text-7xl">
        Full Stack Developer
      </h2>
      <BgSketch />
    </div>
  );
};

export default Hero;
