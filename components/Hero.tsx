import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative py-10">
      {/* Gradient Background */}
      <Image
        className="absolute inset-0 z-0 opacity-30"
        fill
        src="/gradient.png"
        alt="gradient png"
      />

      {/* Music Notes */}
      <Image
        className="absolute top-10 left-4 md:left-16 z-10"
        width={28}
        height={28}
        src="/music-note-1.png"
        alt="music png"
      />
      <Image
        className="absolute top-16 right-4 md:right-16 z-10"
        width={28}
        height={28}
        src="/music-note-2.png"
        alt="music png"
      />
      <Image
        className="absolute bottom-10 left-2 opacity-90 md:left-24 z-10"
        width={28}
        height={28}
        src="/music-note-3.png"
        alt="music png"
      />

      {/* Hero Text */}
      <h1 className="text-3xl sm:text-5xl font-bold text-center py-10 z-20 relative">
        MAKE A CHOICE,
        <br /> HEAR THE NOISE!
      </h1>
    </div>
  );
};

export default Hero;
