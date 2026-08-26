// ============ SMOOTH SCROLL FOR ALL NAV/ANCHOR LINKS ============
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ============ HERO BUTTONS: "Viwe my projects" & "Contact Me" ============
const heroButtons = document.querySelectorAll("#home .home-text > button");
if (heroButtons.length >= 2) {
  heroButtons[0].addEventListener("click", () => {
    document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
  });
  heroButtons[1].addEventListener("click", () => {
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
  });
}

// ============ PROJECT "Viwe on GitHub" BUTTONS ============
document.querySelectorAll(".project button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const link = btn.getAttribute("data-link") || "https://github.com/gurumoorth49";
    window.open(link, "_blank");
  });
});

// ============ ACTIVE NAV LINK HIGHLIGHT ON SCROLL ============
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

function highlightNav() {
  let currentId = "";
  const scrollPos = window.scrollY + 120; // offset for sticky header

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === `#${currentId}`) {
      link.classList.add("active-link");
    }
  });
}

window.addEventListener("scroll", highlightNav);
window.addEventListener("load", highlightNav);

// ============ HEADER SHRINK/SHADOW ON SCROLL ============
const header = document.querySelector("header");

function shrinkHeader() {
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", shrinkHeader);
window.addEventListener("load", shrinkHeader);

// ============ SCROLL-TO-TOP BUTTON ============
const scrollTopBtn = document.createElement("button");
scrollTopBtn.textContent = "↑";
scrollTopBtn.id = "scrollTopBtn";
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 400 ? "flex" : "none";
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============ SCROLL REVEAL: slide in from the side ============
const revealEls = document.querySelectorAll(".reveal-left, .reveal-right");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.2 }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ============ CONTACT FORM SUBMIT (sends via Formspree) ============
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields before sending.");
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        alert(`Thanks, ${name}! Your message has been sent. I'll get back to you at ${email} soon.`);
        contactForm.reset();
      } else {
        alert("Something went wrong. Please try again or email me directly.");
      }
    } catch (err) {
      alert("Network error. Please check your connection and try again.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
