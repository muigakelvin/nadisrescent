document.addEventListener("DOMContentLoaded", function () {
  // =============== MOBILE MENU ===============
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("hidden");
    });

    document.querySelectorAll("#mobile-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });

    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && e.target !== mobileMenuButton) {
        mobileMenu.classList.add("hidden");
      }
    });
  }

  // =============== ACTIVE SECTION HIGHLIGHTING ===============
  const activeSectionName = document.getElementById("active-section-name");

  function highlightActiveSection() {
    const sections = [
      { id: "home", element: document.querySelector(".hero-gradient") },
      { id: "about", element: document.getElementById("about") },
      { id: "services", element: document.getElementById("services") },
      { id: "contact", element: document.getElementById("contact") },
    ];

    const scrollPosition = window.scrollY + 100;
    let activeSection = "home";

    sections.forEach((section) => {
      if (section.element) {
        const offsetTop = section.element.offsetTop;
        const offsetHeight = section.element.offsetHeight || 0;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          activeSection = section.id;
        }
      }
    });

    // ✅ Update lower tier section name immediately
    if (activeSectionName) {
      activeSectionName.textContent = capitalizeFirstLetter(activeSection);
    }

    // Update nav links
    document.querySelectorAll(".nav-link").forEach((link) => {
      if (link.dataset.section === activeSection) {
        link.classList.remove("text-gray-600");
        link.classList.add("text-blue-600");
      } else {
        link.classList.remove("text-blue-600");
        link.classList.add("text-gray-600");
      }
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // ✅ Update section name immediately on scroll
  window.addEventListener("scroll", function () {
    highlightActiveSection();
  });

  // Initial call
  highlightActiveSection();

  // =============== SERVICE SUBMENU CLICK HANDLER ===============
  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const serviceId = this.getAttribute("data-service");
      window.location.hash = `services?service=${serviceId}`;
      handleServiceNavigation(); // Trigger immediately
    });
  });

  // =============== FADE-IN ANIMATION ===============
  const fadeElements = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((element) => {
    element.style.opacity = 0;
    fadeObserver.observe(element);
  });

  // =============== SMOOTH SCROLLING ===============
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // =============== HANDLE SERVICE NAVIGATION FROM URL ===============
  function handleServiceNavigation() {
    if (window.location.hash.startsWith("#services?service=")) {
      const serviceId = window.location.hash.split("=")[1];
      highlightService(serviceId);
    }
  }

  window.addEventListener("load", handleServiceNavigation);
  window.addEventListener("hashchange", handleServiceNavigation);

  // =============== TOGGLE EXPANDABLE CONTENT ===============
  window.toggleExpand = function (contentId, iconId) {
    const content = document.getElementById(contentId);
    const icon = iconId ? document.getElementById(iconId) : null;

    if (!content) return;

    // Close all other expanded content
    document.querySelectorAll(".expandable-content").forEach((el) => {
      if (el !== content) el.classList.remove("expanded");
    });

    document.querySelectorAll(".learn-more-btn i").forEach((el) => {
      const id = el.id.replace("-icon", "");
      if (id !== contentId.replace("-content", "")) {
        el.classList.remove("rotate-180");
      }
    });

    // Toggle selected content
    content.classList.toggle("expanded");
    if (icon) icon.classList.toggle("rotate-180");

    // Add visual effects
    const cardElem = content.closest(".service-card");
    if (cardElem) {
      cardElem.classList.add(
        "ring-2",
        "ring-blue-300",
        "shadow-xl",
        "animate-pulse"
      );
      setTimeout(() => {
        cardElem.classList.remove(
          "ring-2",
          "ring-blue-300",
          "shadow-xl",
          "animate-pulse"
        );
      }, 3000);
    }
  };

  // =============== HIGHLIGHT SERVICE CARD ===============
  window.highlightService = function (serviceId) {
    if (!serviceId) return;

    // Remove highlight from all service links
    document.querySelectorAll("[data-service]").forEach((link) => {
      link.classList.remove("bg-blue-50", "text-blue-600", "font-semibold");
    });

    // Highlight the selected service link
    const activeLink = document.querySelector(`[data-service="${serviceId}"]`);
    if (activeLink) {
      activeLink.classList.add("bg-blue-50", "text-blue-600", "font-semibold");
    }

    // Try to find the main service card
    let card = document.getElementById(serviceId);
    let content = document.getElementById(serviceId);
    let icon = document.getElementById(`${serviceId}-icon`);

    // Fallback to additional service card
    if (!card) {
      card = document.getElementById(`${serviceId}-content`);
      content = document.getElementById(`${serviceId}-content`);
      icon = document.getElementById(`${serviceId}-icon`);
    }

    if (!card) {
      console.warn(`Service card not found: ${serviceId}`);
      return;
    }

    // Scroll to services section
    document.getElementById("services").scrollIntoView({ behavior: "smooth" });

    // Scroll to the specific card after a short delay
    setTimeout(() => {
      card.scrollIntoView({ behavior: "smooth", block: "center" });

      // Expand content
      if (content) {
        content.classList.add("expanded");
        if (icon) icon.classList.add("rotate-180");

        // Add visual effects
        const cardElem = card.classList.contains("service-card")
          ? card
          : card.closest(".service-card");

        if (cardElem) {
          cardElem.classList.add(
            "ring-2",
            "ring-blue-300",
            "shadow-xl",
            "animate-pulse"
          );
        }

        // Remove effects after 3s
        setTimeout(() => {
          if (cardElem) {
            cardElem.classList.remove(
              "ring-2",
              "ring-blue-300",
              "shadow-xl",
              "animate-pulse"
            );
          }
        }, 3000);
      }
    }, 300);
  };

  // =============== SWIPER CAROUSEL ===============
  if (typeof Swiper !== "undefined") {
    new Swiper(".mySwiper", {
      loop: true,
      pagination: { el: ".swiper-pagination", clickable: true },
      autoplay: { delay: 5000 },
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  // =============== ANIMATE COUNTERS ===============
  function animateCounters() {
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = Math.ceil(target / 200);
      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document
    .querySelectorAll(".counter")
    .forEach((el) => statsObserver.observe(el));

  // =============== EMAILJS CONTACT FORM ===============
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    emailjs.init("ha0AZRjteLYVFd7q1");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const firstName = document.getElementById("first-name").value.trim();
      const lastName = document.getElementById("last-name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const service = document.getElementById("service").value;
      const message = document.getElementById("message").value.trim();

      if (!firstName || !lastName || !email || !service || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      const templateParams = {
        name: `${firstName} ${lastName}`,
        email,
        phone,
        service,
        message,
      };

      emailjs
        .send("service_td095q6", "template_ohd2c7m", templateParams)
        .then(() => {
          alert("Thank you! Your message has been sent.");
          contactForm.reset();
        })
        .catch((err) => {
          alert("Oops! Something went wrong. Please try again.");
          console.error("EmailJS Error:", err);
        });
    });
  }
});
