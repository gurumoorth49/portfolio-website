// ============ SMOOTH SCROLL FOR ALL NAV/ANCHOR LINKS ============
try {
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
} catch (err) {
  console.error("Smooth scroll setup failed:", err);
}

// ============ HERO BUTTONS: "Viwe my projects" & "Contact Me" ============
try {
  const heroButtons = document.querySelectorAll("#home .home-text > button");
  if (heroButtons.length >= 2) {
    heroButtons[0].addEventListener("click", () => {
      document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
    });
    heroButtons[1].addEventListener("click", () => {
      document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    });
  }
} catch (err) {
  console.error("Hero buttons setup failed:", err);
}

// ============ PROJECT "Viwe on GitHub" BUTTONS ============
try {
  document.querySelectorAll(".project button[data-link]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const link = btn.getAttribute("data-link") || "https://github.com/gurumoorth49";
      window.open(link, "_blank");
    });
  });
} catch (err) {
  console.error("Project GitHub buttons setup failed:", err);
}

// ============ ACTIVE NAV LINK HIGHLIGHT ON SCROLL ============
try {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");

  const highlightNav = () => {
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
  };

  window.addEventListener("scroll", highlightNav);
  window.addEventListener("load", highlightNav);
} catch (err) {
  console.error("Nav highlight setup failed:", err);
}

// ============ HEADER SHRINK/SHADOW ON SCROLL ============
try {
  const header = document.querySelector("header");

  const shrinkHeader = () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", shrinkHeader);
  window.addEventListener("load", shrinkHeader);
} catch (err) {
  console.error("Header shrink setup failed:", err);
}

// ============ SCROLL-TO-TOP BUTTON ============
try {
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
} catch (err) {
  console.error("Scroll-to-top button setup failed:", err);
}

// ============ SCROLL REVEAL: slide in from the side ============
try {
  const revealEls = document.querySelectorAll(".reveal-left, .reveal-right");

  if (revealEls.length && "IntersectionObserver" in window) {
    // Only hide elements once we know JS + IntersectionObserver work,
    // so content never disappears if something goes wrong.
    revealEls.forEach((el) => el.classList.add("reveal-init"));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }
} catch (err) {
  console.error("Scroll reveal setup failed:", err);
}

// ============ PROJECT DESCRIPTIONS: bullet-point "Read more" toggle ============
try {
  const VISIBLE_ITEMS = 3;

  document.querySelectorAll(".project .desc-list").forEach((list) => {
    const items = Array.from(list.querySelectorAll("li"));
    const btn = list.parentElement.querySelector(".read-more-btn");

    if (items.length <= VISIBLE_ITEMS) {
      // Nothing to hide, so no need for a toggle button.
      if (btn) btn.style.display = "none";
      return;
    }

    // Hide everything past the first 3 bullet points by default.
    items.slice(VISIBLE_ITEMS).forEach((li) => li.classList.add("hidden-item"));

    if (btn) {
      btn.addEventListener("click", () => {
        const isHidden = items[VISIBLE_ITEMS].classList.contains("hidden-item");
        items.slice(VISIBLE_ITEMS).forEach((li) => li.classList.toggle("hidden-item", !isHidden));
        btn.textContent = isHidden ? "Read less" : "Read more";
      });
    }
  });
} catch (err) {
  console.error("Read-more setup failed:", err);
}

// ============ CONTACT FORM SUBMIT (sends via Formspree) ============
try {
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
} catch (err) {
  console.error("Contact form setup failed:", err);
}
