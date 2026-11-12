
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://cdn.shopify.com/s/files/1/0766/2066/1053/files/16-web-or-mls-016_DSC00310_1ef3b9f5-dbb5-4ac0-bd9d-99b79e6a9863.jpg?v=1774908396",
    alt: "Bright professional photography studio",
    label: "SPACE TO CREATE",
    title: "Find the perfect space for your next big idea.",
    description:
      "Discover inspiring photography studios, creative spaces, and production environments ready for your next project.",
  },
  {
    image:
      "https://www.combo-studio.com/_next/image?q=75&url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fhnghx32v%2Fproduction%2Fdf2ee0db7c5972573eb3957918e9589d040ef1aa-7476x4984.jpg%3Fw%3D1000%26fit%3Dmax%26auto%3Dformat%26dpr%3D2&w=3840",
    alt: "Warm podcast and video recording studio",
    label: "BRING YOUR VOICE TO LIFE",
    title: "Every great story deserves a great setting.",
    description:
      "From podcast rooms to professional recording studios, find the right atmosphere to bring your ideas to life.",
  },
  {
    image:
      "https://locationhero.de/cdn/shop/articles/chatgpt-image-19.-dez.-2025-18_32_22.jpg?v=1766167924",
    alt: "Professional film production studio",
    label: "MAKE SOMETHING EXTRAORDINARY",
    title: "Your next creative production starts here.",
    description:
      "Explore production-ready spaces designed for filmmakers, creators, photographers, and dreamers.",
  },
];

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative mx-auto w-full max-w-[1600px] px-4 pt-5 md:px-8 md:pt-8">
      <div className="relative min-h-135 overflow-hidden rounded-2xl bg-[#292b27] md:min-h-155">

        {slides.map((slide, index) => (
          <div
            key={slide.label}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              unoptimized
              loading="eager"
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/45 to-black/10" />

        <div className="relative z-10 flex min-h-135 items-center px-7 py-16 md:min-h-155 md:px-16 lg:px-24">
          <div className="max-w-2xl text-white">

            <p className="mb-5 text-xs font-semibold tracking-[0.25em] text-[#d4b69e] md:text-sm">
              {slides[activeSlide].label}
            </p>

            <h1 className="font-heading text-3xl sm:text-5xl font-medium leading-[1.08] md:text-6xl lg:text-7xl">
              {slides[activeSlide].title}
            </h1>

            <p className="mt-3 sm:mt-4 md:mt-6 max-w-lg text-sm leading-5 sm:leading-7 text-white/80 md:text-base md:leading-8">
              {slides[activeSlide].description}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/studios"
                className="rounded-full bg-background px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-[#e9e8df] hover:text-background"
              >
                Explore Studios
              </Link>

              <Link
                href="/add-studio"
                className="rounded-full border border-white/70 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#344638]"
              >
                Host Your Space
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 right-7 z-20 flex items-center gap-3 md:bottom-10 md:right-12">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 text-xl text-white transition-colors hover:bg-white hover:text-[#344638]"
          >
            &#8592;
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 text-xl text-white transition-colors hover:bg-white hover:text-[#344638]"
          >
            &#8594;
          </button>
        </div>

        <div className="absolute bottom-10 left-7 z-20 flex gap-2 md:left-16 lg:left-24">
          {slides.map((slide, index) => (
            <button
              key={slide.label}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "w-9 bg-white"
                  : "w-5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
