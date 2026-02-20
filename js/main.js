/**
 * ABChicomo Services - Main JavaScript
 * Autor: Artur Chicomo
 * Versão: 2.0.0
 * Descrição: Funcionalidades interativas para o site profissional
 */

// =============================================
// INICIALIZAÇÃO PRINCIPAL
// =============================================
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa todas as funções
  initMobileMenu();
  initScrollEffects();
  initSmoothScroll();
  initContactForm();
  initAnimations();
  initActiveMenu();
  initBackToTop();
  initCounterAnimation(); // NOVO: Contadores animados
  initCopyToClipboard(); // NOVO: Copiar telefone/email
  initPhoneMask(); // NOVO: Máscara de telefone
  initLazyLoading(); // NOVO: Lazy loading de imagens
  initDropdowns(); // NOVO: Dropdowns para mobile
  initYearUpdate(); // NOVO: Atualizar ano automaticamente
  initWhatsappLinks(); // NOVO: Rastrear cliques no WhatsApp
});

// =============================================
// MENU MOBILE
// =============================================
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
    body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
  });

  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      body.style.overflow = "";
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      body.style.overflow = "";
    }
  });
}

// =============================================
// EFEITOS DE SCROLL
// =============================================
function initScrollEffects() {
  const header = document.querySelector("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    // Header scroll effect
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// =============================================
// BOTÃO VOLTAR AO TOPO
// =============================================
function initBackToTop() {
  // Criar botão se não existir
  let backToTop = document.querySelector(".back-to-top");

  if (!backToTop) {
    backToTop = document.createElement("button");
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = "back-to-top";
    backToTop.setAttribute("aria-label", "Voltar ao topo");
    document.body.appendChild(backToTop);

    // Estilos do botão
    const style = document.createElement("style");
    style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 90px;
                left: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--accent-color), #d35400);
                color: white;
                border: none;
                cursor: pointer;
                display: none;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                box-shadow: 0 4px 15px rgba(230, 126, 34, 0.4);
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                z-index: 99;
                border: 2px solid white;
            }
            
            .back-to-top:hover {
                transform: translateY(-5px) scale(1.1);
                box-shadow: 0 8px 25px rgba(230, 126, 34, 0.6);
            }
            
            .back-to-top.show {
                display: flex;
                animation: fadeIn 0.3s ease;
            }
            
            header.scrolled {
                padding: 0.5rem 0;
                background: rgba(255, 255, 255, 0.98);
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
    document.head.appendChild(style);
  }

  // Mostrar/esconder botão
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  // Voltar ao topo
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// =============================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// =============================================
function initSmoothScroll() {
  document
    .querySelectorAll('a[href^="#"]:not([href="#"])')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerHeight = document.querySelector("header").offsetHeight;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
}

// =============================================
// DROPDOWNS PARA MOBILE
// =============================================
function initDropdowns() {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = toggle.closest(".dropdown");
        dropdown.classList.toggle("active");
      }
    });
  });
}

// =============================================
// ANIMAÇÃO DE CONTADORES
// =============================================
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll(".stat-number");
  if (!statNumbers.length) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const finalValue = element.textContent;
        const isPercentage = finalValue.includes("%");
        const hasPlus = finalValue.includes("+");
        const finalNumber = parseInt(finalValue.replace(/[^0-9]/g, ""));

        if (!isNaN(finalNumber)) {
          animateNumber(element, 0, finalNumber, 2000, (value) => {
            let formatted = value;
            if (isPercentage) formatted = value + "%";
            if (hasPlus) formatted = value + "+";
            return formatted;
          });
        }

        observer.unobserve(element);
      }
    });
  }, observerOptions);

  statNumbers.forEach((number) => observer.observe(number));
}

function animateNumber(element, start, end, duration, formatCallback) {
  let startTimestamp = null;

  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

    const value = Math.floor(progress * (end - start) + start);
    element.textContent = formatCallback ? formatCallback(value) : value;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = formatCallback ? formatCallback(end) : end;
    }
  }

  window.requestAnimationFrame(step);
}

// =============================================
// FORMULÁRIO DE CONTATO
// =============================================
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Validação
      if (!validateForm(this)) return;

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Mostrar loading
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;

      try {
        // Coletar dados do formulário
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Enviar para o servidor (simulado)
        await sendContactForm(data);

        showNotification(
          "✅ Mensagem enviada com sucesso! Entraremos em contato em breve.",
          "success",
        );
        this.reset();
      } catch (error) {
        console.error("Erro no envio:", error);
        showNotification(
          "❌ Erro ao enviar mensagem. Tente novamente mais tarde.",
          "error",
        );
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
}

// Função para enviar dados do formulário
async function sendContactForm(data) {
  // Simular envio (substituir por fetch real)
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Dados enviados:", data);
      resolve({ success: true });
    }, 1500);
  });
}

// Validação de formulário
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll(
    "input[required], select[required], textarea[required]",
  );

  inputs.forEach((input) => {
    clearFieldError(input);

    if (!input.value.trim()) {
      showFieldError(input, "Este campo é obrigatório");
      isValid = false;
    }

    // Validação específica para email
    if (input.type === "email" && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        showFieldError(input, "Email inválido");
        isValid = false;
      }
    }

    // Validação específica para telefone
    if (input.id === "telefone" && input.value) {
      const phoneDigits = input.value.replace(/\D/g, "");
      if (phoneDigits.length < 9) {
        showFieldError(input, "Telefone deve ter 9 dígitos");
        isValid = false;
      }
    }
  });

  return isValid;
}

function showFieldError(input, message) {
  input.style.borderColor = "#e74c3c";
  input.style.backgroundColor = "#fff8f8";

  let errorDiv = input.nextElementSibling;
  if (!errorDiv || !errorDiv.classList.contains("error-message")) {
    errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 0.3rem;
            display: flex;
            align-items: center;
            gap: 0.3rem;
        `;
    errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
  }
}

function clearFieldError(input) {
  input.style.borderColor = "";
  input.style.backgroundColor = "";
  const errorDiv = input.nextElementSibling;
  if (errorDiv && errorDiv.classList.contains("error-message")) {
    errorDiv.remove();
  }
}

// =============================================
// SISTEMA DE NOTIFICAÇÕES MELHORADO
// =============================================
function showNotification(message, type = "info", duration = 5000) {
  // Remover notificações antigas
  const oldNotifications = document.querySelectorAll(".notification");
  oldNotifications.forEach((notif) => notif.remove());

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;

  // Ícones diferentes para cada tipo
  const icons = {
    success: '<i class="fas fa-check-circle"></i>',
    error: '<i class="fas fa-exclamation-circle"></i>',
    info: '<i class="fas fa-info-circle"></i>',
    warning: '<i class="fas fa-exclamation-triangle"></i>',
  };

  notification.innerHTML = `
        <div class="notification-icon">${icons[type] || icons.info}</div>
        <div class="notification-message">${message}</div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
        <div class="notification-progress"></div>
    `;

  // Estilos da notificação
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        min-width: 300px;
        max-width: 400px;
        padding: 1rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        overflow: hidden;
    `;

  // Cores baseadas no tipo
  const colors = {
    success: "linear-gradient(135deg, #27ae60, #2ecc71)",
    error: "linear-gradient(135deg, #e74c3c, #c0392b)",
    info: "linear-gradient(135deg, #3498db, #2980b9)",
    warning: "linear-gradient(135deg, #f39c12, #e67e22)",
  };
  notification.style.background = colors[type] || colors.info;

  document.body.appendChild(notification);

  // Estilo adicional
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%) scale(0.8);
                opacity: 0;
            }
            to {
                transform: translateX(0) scale(1);
                opacity: 1;
            }
        }
        .notification-icon {
            font-size: 1.5rem;
        }
        .notification-message {
            flex: 1;
        }
        .notification-close {
            background: transparent;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1rem;
            padding: 0.3rem;
            opacity: 0.7;
            transition: opacity 0.3s;
        }
        .notification-close:hover {
            opacity: 1;
        }
        .notification-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: rgba(255, 255, 255, 0.5);
            width: 100%;
            animation: progress ${duration}ms linear forwards;
        }
        @keyframes progress {
            from { width: 100%; }
            to { width: 0%; }
        }
    `;
  document.head.appendChild(style);

  // Fechar ao clicar no botão
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => notification.remove());

  // Auto-remover após duração
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease";
      notification.style.opacity = "0";
      setTimeout(() => notification.remove(), 300);
    }
  }, duration);
}

// =============================================
// ANIMAÇÃO DE ELEMENTOS AO SCROLL
// =============================================
function initAnimations() {
  const animatedElements = document.querySelectorAll(
    ".service-card, .portfolio-item, .step, .blog-card, .service-detail-card, .package-card, .audience-item",
  );

  if (!animatedElements.length) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) scale(1)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px) scale(0.98)";
    el.style.transition =
      "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    observer.observe(el);
  });
}

// =============================================
// MENU ATIVO BASEADO NA URL
// =============================================
function initActiveMenu() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    link.classList.remove("active");

    if (linkHref === currentPage) {
      link.classList.add("active");
    } else if (
      currentPage.includes("servicos") &&
      linkHref.includes("servicos")
    ) {
      link.classList.add("active");
    }
  });
}

// =============================================
// MÁSCARA DE TELEFONE
// =============================================
function initPhoneMask() {
  const phoneInput = document.getElementById("telefone");

  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");

      if (value.length > 0) {
        // Formato: 9XX XXX XXX (para Angola)
        if (value.length <= 3) {
          value = value;
        } else if (value.length <= 6) {
          value = value.substring(0, 3) + " " + value.substring(3);
        } else {
          value =
            value.substring(0, 3) +
            " " +
            value.substring(3, 6) +
            " " +
            value.substring(6, 9);
        }
      }

      e.target.value = value;
    });
  }
}

// =============================================
// COPIAR PARA AREA DE TRANSFERÊNCIA
// =============================================
function initCopyToClipboard() {
  const copyButtons = document.querySelectorAll("[data-copy]");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const textToCopy = button.getAttribute("data-copy");

      try {
        await navigator.clipboard.writeText(textToCopy);
        showNotification("Copiado: " + textToCopy, "success", 2000);
      } catch (err) {
        showNotification("Erro ao copiar", "error");
      }
    });
  });

  // Adicionar botões de cópia aos contatos
  addCopyButtonsToContacts();
}

function addCopyButtonsToContacts() {
  const contactItems = document.querySelectorAll(
    ".footer-contact li, .contact-info-small span",
  );

  contactItems.forEach((item) => {
    const text = item.textContent.trim();
    const phoneRegex = /[9][0-9]{2}[-\s]?[0-9]{3}[-\s]?[0-9]{3}/;
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    if (phoneRegex.test(text) || emailRegex.test(text)) {
      item.style.cursor = "pointer";
      item.setAttribute("data-copy", text);
      item.title = "Clique para copiar";

      item.addEventListener("click", async () => {
        await navigator.clipboard.writeText(text);
        showNotification(`Copiado: ${text}`, "success", 2000);
      });
    }
  });
}

// =============================================
// LAZY LOADING PARA IMAGENS
// =============================================
function initLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;

          if (src) {
            img.src = src;
            img.removeAttribute("data-src");
            img.classList.add("loaded");
          }

          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback para navegadores antigos
    document.querySelectorAll("img[data-src]").forEach((img) => {
      img.src = img.dataset.src;
    });
  }
}

// =============================================
// ATUALIZAR ANO NO FOOTER
// =============================================
function initYearUpdate() {
  const yearElements = document.querySelectorAll(".current-year");
  const currentYear = new Date().getFullYear();

  yearElements.forEach((el) => {
    el.textContent = currentYear;
  });

  // Se não tiver elementos com classe .current-year, atualiza no copyright
  const copyright = document.querySelector(".copyright p");
  if (copyright && !yearElements.length) {
    const yearMatch = copyright.textContent.match(/\d{4}/);
    if (yearMatch) {
      copyright.textContent = copyright.textContent.replace(
        /\d{4}/,
        currentYear,
      );
    }
  }
}

// =============================================
// RASTREAR CLIQUES NO WHATSAPP (ANALYTICS)
// =============================================
function initWhatsappLinks() {
  const whatsappLinks = document.querySelectorAll(
    'a[href*="wa.me"], a[href*="whatsapp"]',
  );

  whatsappLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Enviar evento para Google Analytics (se existir)
      if (typeof gtag !== "undefined") {
        gtag("event", "click", {
          event_category: "whatsapp",
          event_label: link.href,
        });
      }

      console.log("WhatsApp click tracked:", link.href);
    });
  });
}

// =============================================
// DARK MODE (OPCIONAL)
// =============================================
function initDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");

  if (darkModeToggle) {
    // Verificar preferência salva
    const isDarkMode = localStorage.getItem("darkMode") === "true";

    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    }

    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode"),
      );
    });
  }
}

// =============================================
// UTILITÁRIOS
// =============================================

// Debounce para eventos de scroll/resize
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Detecção de conexão com internet
window.addEventListener("online", () => {
  showNotification("🌐 Conexão restabelecida", "success", 3000);
});

window.addEventListener("offline", () => {
  showNotification("📡 Sem conexão com internet", "warning", 0); // Não fecha automaticamente
});

// Detectar velocidade de conexão (opcional)
if ("connection" in navigator) {
  const connection = navigator.connection;
  if (connection) {
    console.log("Tipo de conexão:", connection.effectiveType);
  }
}

// =============================================
// INICIALIZAÇÕES ADICIONAIS
// =============================================

// Fechar dropdowns ao clicar fora
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown.active").forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
});

// Adicionar classe de carregamento ao body
document.body.classList.add("js-loaded");
