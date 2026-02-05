(function() {
  "use strict";

  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
  const header = document.getElementById("header");
  const mobileNavContainer = document.getElementById("mobile-nav");
  const desktopNavList = document.querySelector("#navmenu ul");

  function toggleMobileNav() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
    if (mobileNavContainer) {
      const isActive = document.body.classList.contains("mobile-nav-active");
      mobileNavContainer.setAttribute("aria-hidden", isActive ? "false" : "true");
    }
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", toggleMobileNav);
  }

  if (desktopNavList && mobileNavContainer) {
    const mobileNavClone = desktopNavList.cloneNode(true);
    mobileNavClone.classList.add("mobile-nav-list");
    mobileNavContainer.appendChild(mobileNavClone);
  }

  document.querySelectorAll("#navmenu a, #mobile-nav a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        toggleMobileNav();
      }
    });
  });

  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  const scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (!scrollTop) return;
    window.scrollY > 100 ? scrollTop.classList.add("active") : scrollTop.classList.remove("active");
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);
  }

  function initAOS() {
    if (window.AOS) {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener("load", initAOS);

  const navLinks = document.querySelectorAll('#navmenu a[href^="#"]');
  const mobileNavLinks = document.querySelectorAll('#mobile-nav a[href^="#"]');
  const sectionMap = [];

  navLinks.forEach((link) => {
    const target = document.querySelector(link.hash);
    if (target) {
      sectionMap.push({ link, section: target });
    }
  });

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 120;
    let activeLink = document.querySelector('#navmenu a[href="#hero"]') || navLinks[0];

    sectionMap.forEach(({ link, section }) => {
      const sectionTop = section.offsetTop - 140;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeLink = link;
      }
    });

    navLinks.forEach((nav) => nav.classList.remove("active"));
    mobileNavLinks.forEach((nav) => nav.classList.remove("active"));
    activeLink?.classList.add("active");
    const activeHref = activeLink?.getAttribute("href");
    if (activeHref) {
      mobileNavLinks.forEach((link) => {
        if (link.getAttribute("href") === activeHref) {
          link.classList.add("active");
        }
      });
    }
  }

  window.addEventListener("load", updateActiveNav);
  document.addEventListener("scroll", updateActiveNav);

  function updateHeaderShrink() {
    if (!header) return;
    const shouldShrink = window.scrollY > 40;
    header.classList.toggle("header-scrolled", shouldShrink);
  }

  window.addEventListener("load", updateHeaderShrink);
  document.addEventListener("scroll", updateHeaderShrink);
})();
