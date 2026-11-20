/**
 * Elevé Departamentos - Navegación por pantallas (Desktop) y animaciones
 */
document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------------------
     1. CAMBIO DIRECTO DE PANTALLAS EN PC (FULLPAGE CON GPU TRANSFORM)
     ------------------------------------------------------------------------ */
 const wrapper = document.getElementById("fullpage-wrapper");
  const navbar = document.querySelector(".navbar");
  const footer = document.querySelector("footer");
  const slides = Array.from(
    document.querySelectorAll("#hero-section, #info, #caracteristicas, #planos, #renders, #nosotros")
  );
  let currentSlide = 0;
  let isAnimating = false;
  let wheelTimeout = null;
  const slideDuration = 950; // Sincronizado con los 0.95s del CSS

  const getNavHeight = () => (navbar ? navbar.offsetHeight : 56);

  // Marca cuál diapositiva está activa para la animación de escala/opacidad
  const updateActiveSlideClass = (index) => {
    slides.forEach((slide, i) => {
      // Si estamos en el footer (index === slides.length), mantenemos activo #nosotros
      const activeIdx = index === slides.length ? slides.length - 1 : index;
      slide.classList.toggle("is-active-slide", i === activeIdx);
    });
  };

  // Inicializar la primera diapositiva como activa al cargar
  updateActiveSlideClass(0);

  const goToSlide = (index) => {
    if (index < 0 || index > slides.length || isAnimating) return;
    isAnimating = true;
    currentSlide = index;
    updateActiveSlideClass(currentSlide);

    if (window.innerWidth > 991 && wrapper) {
      let targetOffset;
      if (currentSlide === slides.length && footer) {
        targetOffset = wrapper.scrollHeight - window.innerHeight;
      } else {
        targetOffset = slides[currentSlide].offsetTop - getNavHeight();
      }
      wrapper.style.transform = `translate3d(0, -${Math.max(0, targetOffset)}px, 0)`;
    } else {
      const targetEl = currentSlide === slides.length && footer ? footer : slides[currentSlide];
      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
    }

    if (slides[currentSlide]) {
      const revealChild = slides[currentSlide].querySelector(".reveal-section");
      if (revealChild) revealChild.classList.add("is-revealed");

      if (slides[currentSlide].id === "caracteristicas") {
        triggerSpecsAnimation();
      }
    }

    setTimeout(() => {
      isAnimating = false;
    }, slideDuration);
  };

  // Escuchar rueda del mouse filtrando inercia residual
  window.addEventListener(
    "wheel",
    (e) => {
      if (window.innerWidth <= 991 || !wrapper) return;
      if (document.body.classList.contains("modal-open")) return;

      e.preventDefault();
      if (isAnimating) return;
      if (Math.abs(e.deltaY) < 20) return;

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {}, 50);

      if (e.deltaY > 0) {
        goToSlide(currentSlide + 1);
      } else {
        goToSlide(currentSlide - 1);
      }
    },
    { passive: false }
  );

  /* ------------------------------------------------------------------------
     2. GALERÍA MODAL DE RENDERS
     ------------------------------------------------------------------------ */
  const imageModal = document.getElementById("imageModal");

  if (imageModal) {
    imageModal.addEventListener("show.bs.modal", (event) => {
      const triggerLink = event.relatedTarget;
      if (!triggerLink) return;

      const imageUrl = triggerLink.getAttribute("data-image-url");
      const modalImage = imageModal.querySelector("#modalImage");

      if (modalImage && imageUrl) {
        modalImage.src = imageUrl;
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. CONTADOR ANIMADO DE CIFRAS DEL PROYECTO
     ------------------------------------------------------------------------ */
  const specsSection = document.querySelector("#caracteristicas");
  let specsAnimated = false;

  const animateCounter = (el, target, duration = 850) => {
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(update);
  };

  const triggerSpecsAnimation = () => {
    if (!specsSection || specsAnimated) return;
    specsAnimated = true;

    const cards = specsSection.querySelectorAll(".spec-card");
    cards.forEach((card) => {
      const delay = parseInt(card.dataset.delay || "0", 10) * 0.5;
      const numberEl = card.querySelector(".spec-number");
      const target = parseInt(numberEl.dataset.target, 10);

      setTimeout(() => {
        card.classList.add("is-visible");
        animateCounter(numberEl, target);
      }, delay);
    });
  };

  if (specsSection) {
    const specsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerSpecsAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    specsObserver.observe(specsSection);
  }

  /* ------------------------------------------------------------------------
     4. REVELACIÓN SUAVE DE CONTENIDO (PC Y MOBILE)
     ------------------------------------------------------------------------ */
  const sectionsToReveal = document.querySelectorAll(
    "#info .info-content, #caracteristicas .container, #planos .container, #renders .container, #nosotros .container"
  );

  sectionsToReveal.forEach((el) => el.classList.add("reveal-section"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  sectionsToReveal.forEach((el) => revealObserver.observe(el));
});