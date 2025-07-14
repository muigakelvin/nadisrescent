// Extracted JavaScript from <script> tag in index.html
// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevents bubbling up to the document
  mobileMenu.classList.toggle("hidden");
});

document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && e.target !== mobileMenuButton) {
    mobileMenu.classList.add("hidden");
  }
});

// Toggle mobile services menu
function toggleMobileServices() {
  const menu = document.getElementById("mobile-services-menu");
  const icon = document.getElementById("mobile-services-icon");
  menu.classList.toggle("hidden");
  icon.classList.toggle("rotate-180");
}

// Toggle expandable content
function toggleExpand(contentId, iconId) {
  const content = document.getElementById(contentId);
  const icon = iconId ? document.getElementById(iconId) : null;
  console.log("Toggling additional service:", contentId, iconId);
  if (!content) return;
  content.classList.toggle("expanded");
  if (icon) {
    icon.classList.toggle("rotate-180");
  }
}

// //Toggle additional service content
// function additionalService(contentId, iconId) {
//   const content = document.getElementById(contentId);
//   const icon = iconId ? document.getElementById(iconId) : null;
//   console.log("Toggling additional service:", contentId, iconId);
//   if (!content) return;
//   if (content.style.display === "none" || content.style.display === "") {
//     content.style.display = "block";
//     if (icon) icon.classList.add("rotate-180");
//   } else {
//     content.style.display = "none";
//     if (icon) icon.classList.remove("rotate-180");
//   }
// }

function additionalService(contentId, iconId) {
  const content = document.getElementById(contentId);
  const icon = iconId ? document.getElementById(iconId) : null;

  console.log("Toggling additional service:", contentId, iconId);

  if (!content) return;

  // Toggle the 'expanded' class
  content.classList.toggle("expanded");

  // Rotate the icon if provided
  if (icon) {
    icon.classList.toggle("rotate-180");
  }
}

// Initialize Swiper
const swiper = new Swiper(".mySwiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});

// Animated counters
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  const speed = 200;
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / speed;
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateCounters, 1);
    } else {
      counter.innerText = target;
    }
  });
}

// Initialize counters when section comes into view
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
const statsSection = document.querySelector("#stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Highlight active service and expand card
function highlightService(serviceId) {
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

  // If 'all' is selected, just scroll to services section
  if (serviceId === "all") {
    document.getElementById("services").scrollIntoView({ behavior: "smooth" });
    return;
  }

  // Find the service card
  let card = document.getElementById(serviceId);
  let content = document.getElementById(serviceId);
  let icon = document.getElementById(`${serviceId}-icon`);
  // For additional services, use the new id pattern
  if (!card) {
    card = document.getElementById(serviceId + "-content");
    content = document.getElementById(serviceId + "-content");
    icon = document.getElementById(serviceId + "-icon");
  }
  if (card) {
    // First scroll to the services section
    document.getElementById("services").scrollIntoView({ behavior: "smooth" });

    // Then scroll to the specific card after a small delay
    setTimeout(() => {
      card.scrollIntoView({ behavior: "smooth", block: "center" });

      // Close all other expanded cards first
      document.querySelectorAll(".expandable-content").forEach((el) => {
        // Remove expanded from all except the current content
        if (el !== content) {
          el.classList.remove("expanded");
        }
      });
      document.querySelectorAll(".learn-more-btn i").forEach((el) => {
        if (el !== icon) {
          el.classList.remove("rotate-180");
        }
      });

      // Expand the content if not already expanded
      if (content) {
        content.classList.add("expanded");
        if (icon) icon.classList.add("rotate-180");

        // Add glow effect to card and highlight learn more button
        // For additional services, card is the content div, so get parent
        let cardElem = card.classList.contains("service-card")
          ? card
          : card.closest(".service-card, .bg-white.rounded-xl");
        const learnMoreBtn = cardElem
          ? cardElem.querySelector(".learn-more-btn")
          : null;
        if (cardElem) {
          cardElem.classList.add("ring-2", "ring-blue-300", "shadow-xl");
        }
        if (learnMoreBtn) {
          learnMoreBtn.classList.add("text-blue-700", "font-bold");
        }

        // Add animation class for glow effect
        if (cardElem) cardElem.classList.add("animate-pulse");

        // Remove effects after 3 seconds
        setTimeout(() => {
          if (cardElem) {
            cardElem.classList.remove(
              "ring-2",
              "ring-blue-300",
              "shadow-xl",
              "animate-pulse"
            );
          }
          if (learnMoreBtn) {
            learnMoreBtn.classList.remove("text-blue-700", "font-bold");
          }
        }, 3000);
      }
    }, 300);
  }
}

// Handle service navigation from hash
function handleServiceNavigation() {
  if (window.location.hash.startsWith("#services")) {
    const url = new URL(window.location.href);
    const serviceId = url.searchParams.get("service");
    if (serviceId) {
      // Wait for DOM to be fully loaded if needed
      if (document.readyState === "complete") {
        highlightService(serviceId);
      } else {
        document.addEventListener("DOMContentLoaded", () =>
          highlightService(serviceId)
        );
      }
    }
  }
}

// Add click handlers for service submenu items
document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const serviceId = this.getAttribute("data-service");
    window.location.hash = `services?service=${serviceId}`;
    highlightService(serviceId);
  });
});

// Highlight active nav link based on scroll position
function highlightActiveSection() {
  const sections = [
    { id: "home", element: document.querySelector(".hero-gradient") },
    { id: "about", element: document.getElementById("about") },
    { id: "services", element: document.getElementById("services") },
    { id: "contact", element: document.getElementById("contact") },
  ];

  const scrollPosition = window.scrollY + 100;
  let activeSection = null;

  sections.forEach((section) => {
    if (section.element) {
      const offsetTop = section.element.offsetTop;
      const offsetHeight = section.element.offsetHeight;

      if (
        scrollPosition >= offsetTop &&
        scrollPosition < offsetTop + offsetHeight
      ) {
        activeSection = section.id;
      }
    }
  });

  // If we're at the very top of the page, highlight home
  if (scrollPosition < 100) {
    activeSection = "home";
  }

  // Update all nav links
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

// Throttle scroll events for better performance
let isScrolling;
window.addEventListener(
  "scroll",
  function () {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(highlightActiveSection, 100);
  },
  false
);

// Simple fade-in animation for elements when they come into view
document.addEventListener("DOMContentLoaded", function () {
  // Initial check on page load
  handleServiceNavigation();

  // Also handle when URL changes (like when using back/forward buttons)
  window.addEventListener("hashchange", handleServiceNavigation);

  // Close all expanded service cards when clicking elsewhere
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".service-card") &&
      !e.target.closest("[data-service]")
    ) {
      document.querySelectorAll(".expandable-content").forEach((content) => {
        content.classList.remove("expanded");
      });
      document.querySelectorAll(".learn-more-btn i").forEach((icon) => {
        icon.classList.remove("rotate-180");
      });
    }
  });

  // Add scroll event listener for nav highlighting
  window.addEventListener("scroll", highlightActiveSection);
  highlightActiveSection(); // Run once on load
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

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });
});
