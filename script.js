
document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // 1. LUCIDE ICON
    // =========================
    if (window.lucide) {
        lucide.createIcons();
    }


    // =========================
    // 2. MOBILE NAVBAR
    // =========================
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("show");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.innerHTML = isOpen
                ? '<i data-lucide="x"></i>'
                : '<i data-lucide="menu"></i>';

            if (window.lucide) {
                lucide.createIcons();
            }
        });

        // Tutup menu setelah link diklik
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("show");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.innerHTML =
                    '<i data-lucide="menu"></i>';

                if (window.lucide) {
                    lucide.createIcons();
                }
            });
        });
    }


    // =========================
    // 3. NAVBAR ACTIVE
    // =========================
    const sections = document.querySelectorAll("main section[id]");

    const activeObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const currentId = entry.target.id;

                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${currentId}`
                    );
                });

            }

        });

    }, {
        threshold: 0,
        rootMargin: "-30% 0px -60% 0px"
    });

    sections.forEach(section => {
        activeObserver.observe(section);
    });


    // =========================
    // 4. REVEAL ANIMATION
    // =========================
    const revealElements = document.querySelectorAll(
        ".impact-item, .next-section, .placeholder-section, .impact-heading"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // =========================
    // 5. BACK TO TOP
    // =========================
    const backToTop = document.createElement("button");

    backToTop.className = "back-to-top";
    backToTop.setAttribute("aria-label", "Kembali ke atas");
    backToTop.innerHTML = '<i data-lucide="arrow-up"></i>';

    document.body.appendChild(backToTop);

    if (window.lucide) {
        lucide.createIcons();
    }

    window.addEventListener("scroll", () => {

        backToTop.classList.toggle(
            "show",
            window.scrollY > 400
        );

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


});
