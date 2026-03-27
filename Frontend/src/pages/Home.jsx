import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const imagesRef = useRef([]);
    const playheadRef = useRef({ frame: 0 });

    const frameCount = 240;

    // 🚀 LENIS SMOOTH SCROLL
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smooth: true,
            lerp: 0.1,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        lenis.on("scroll", ScrollTrigger.update);

        return () => {
            lenis.destroy();
        };
    }, []);

    // 🔥 FRAME URL
    const getFrameUrl = (index) => {
        if (index < 120) {
            const frameNum = String(index + 1).padStart(3, "0");
            return `/frames/seq1/frame_${frameNum}.webp`;
        } else {
            const frameNum = String(index - 120 + 1).padStart(3, "0");
            return `/frames/seq2/frame_${frameNum}.webp`;
        }
    };

    // 🎬 RENDER FRAME
    const renderFrame = (index) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // 🔥 SMOOTH QUALITY
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        let img = imagesRef.current[index];

        // fallback if broken
        while (index > 0 && (!img || !img.complete || img.naturalWidth === 0)) {
            index--;
            img = imagesRef.current[index];
        }

        if (!img) return;

        context.clearRect(0, 0, canvas.width, canvas.height);

        // 🔥 COVER MODE
        const scale = Math.max(
            canvas.width / img.width,
            canvas.height / img.height
        );

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const x = (canvas.width - newWidth) / 2;
        const y = (canvas.height - newHeight) / 2;

        context.drawImage(img, x, y, newWidth, newHeight);
    };

    // 📦 PRELOAD IMAGES
    useEffect(() => {
        let loadedCount = 0;

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = getFrameUrl(i);
            imagesRef.current.push(img);

            img.onload = () => {
                loadedCount++;
                setLoadingProgress((loadedCount / frameCount) * 100);

                if (loadedCount === 1) {
                    setTimeout(() => renderFrame(0), 100);
                }

                if (loadedCount === frameCount) {
                    setImagesLoaded(true);
                }
            };

            img.onerror = () => {
                loadedCount++;
            };
        }
    }, []);

    // 📐 CANVAS RESIZE
    useEffect(() => {
        const canvas = canvasRef.current;

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;

            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            renderFrame(Math.floor(playheadRef.current.frame));
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 🎞️ GSAP SCROLL ANIMATION
    useEffect(() => {
        if (!imagesLoaded) return;

        const playhead = playheadRef.current;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => "+=" + window.innerHeight * 4, // 🔥 PERFECT
                pin: true,
                scrub: 1.2,
                anticipatePin: 1,
            },
        });

        tl.to(playhead, {
            frame: frameCount - 1,
            ease: "power1.out",
        });

        let rafId;
        let currentFrame = -1;

        const renderLoop = () => {
            const frameIndex = Math.min(
                Math.floor(playhead.frame),
                imagesRef.current.length - 1
            );

            if (frameIndex !== currentFrame) {
                renderFrame(frameIndex);
                currentFrame = frameIndex;
            }

            rafId = requestAnimationFrame(renderLoop);
        };

        setTimeout(() => renderFrame(0), 200);

        renderLoop();

        return () => {
            cancelAnimationFrame(rafId);
            tl.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [imagesLoaded]);

    return (
        <div
            ref={containerRef}
            style={{
                height: "100vh",
                position: "relative",
                background: "black",
            }}
        >
            {!imagesLoaded && (
                <div className="absolute inset-0 z-50 flex items-center justify-center text-white">
                    <p>Loading... {Math.round(loadingProgress)}%</p>
                </div>
            )}

            <canvas
                ref={canvasRef}
                style={{
                    position: "sticky",
                    top: 0,
                    width: "100%",
                    height: "100vh",
                }}
            />
        </div>
    );
};

export default Home;