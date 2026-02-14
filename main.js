gsap.registerPlugin(ScrollTrigger);

// Force scroll to top on refresh/load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Global WOW Entrance (40% Faster) ---
    const entranceTl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.08 }
    });

    entranceTl
        .from(".nav-island", { y: -100, opacity: 0, duration: 1.2 })
        .from(".badge-elite", { y: 30, opacity: 0, filter: "blur(10px)" }, "-=0.9")
        .from(".hero h1", { y: 150, opacity: 0, rotationX: -30, filter: "blur(20px)", stagger: 0.09 }, "-=0.9")
        .from(".hero-sub", { y: 50, autoAlpha: 0, filter: "blur(10px)" }, "-=0.84")
        .from(".hero-cta .btn-futuristic", { x: -30, autoAlpha: 0, stagger: 0.15, clearProps: "all" }, "-=0.8")
        .from(".hero-visual", { scale: 0.8, autoAlpha: 0, rotationY: 45, filter: "blur(20px)", duration: 1.5 }, "-=1.1")
        .from(".tech-stat", { scale: 0, autoAlpha: 0, stagger: 0.2, ease: "back.out(1.7)" }, "-=1.0");

    // --- Navbar Scroll Behavior ---
    const navbarElement = document.querySelector('.nav-island');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbarElement.classList.add('scrolled');
        } else {
            navbarElement.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // --- 2. Advanced Scroll Reveals (WOW Effects) ---

    // Bento Cards 3D Tilt & Reveal
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            rotationX: -15,
            filter: "blur(20px)",
            duration: 0.9,
            ease: "expo.out",
            delay: i % 3 * 0.06
        });

        // Hover Effect: Fluid Gradient
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            gsap.to(card, {
                '--x': `${x}%`,
                '--y': `${y}%`,
                duration: 0.6,
                ease: "power2.out"
            });
        });
    });

    // Sections Titles Split Effect
    const sectionHeads = document.querySelectorAll('.section-head h2');
    sectionHeads.forEach(head => {
        gsap.from(head, {
            scrollTrigger: {
                trigger: head,
                start: "top 85%",
            },
            y: 80,
            opacity: 0,
            filter: "blur(15px)",
            duration: 1.6,
            ease: "expo.out"
        });
    });

    // --- 3. Persistent Interactions ---

    // Magnetic Power Buttons
    const magnets = document.querySelectorAll('.btn-futuristic');
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.4;

            gsap.to(btn, {
                x: x,
                y: y,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        });
    });

    // Specialist Marquee Velocity Control
    const marquee = document.querySelector('.marquee-content');
    if (marquee) {
        let marqueeTl = gsap.to(".marquee-content", {
            xPercent: -50,
            repeat: -1,
            duration: 30,
            ease: "none"
        });

        // Slow down on scroll up, speed up on scroll down
        ScrollTrigger.create({
            onUpdate: (self) => {
                let velocity = self.getVelocity() / 500;
                gsap.to(marqueeTl, { timeScale: 1 + Math.abs(velocity), duration: 0.5 });
            }
        });
    }

    // --- 5. Global Cursor Glow ---
    const cursor = document.querySelector('.cursor-glow');
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 1.5,
            ease: "power3.out"
        });
    });

    // Medical Decor Floating
    gsap.to(".medical-decor", {
        y: "20px",
        rotation: 5,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 1
    });

    // Scroll refresh for dynamic layouts
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
});
