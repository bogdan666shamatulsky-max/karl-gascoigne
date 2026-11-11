
document.addEventListener("DOMContentLoaded", () => {

  // ЗАГРУЗОЧНЫЙ ЭКРАН
  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader?.classList.add("hidden");
      document.body.classList.remove("loading");
    }, 700);
  });

  // ГОД В ПОДВАЛЕ
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // МОБИЛЬНОЕ МЕНЮ
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  menuToggle?.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuToggle.classList.toggle("active");
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle?.classList.remove("active");
    });
  });

  // ИНТЕРАКТИВНЫЕ УСЛУГИ
  const services = [
    {
      number: "01",
      title: "Маркетинг<br>и реклама",
      description: "Находим точку роста, формируем понятное позиционирование и создаём рекламные кампании, которые говорят с нужной аудиторией.",
      tags: ["Стратегия", "Креатив", "Рекламные кампании"]
    },
    {
      number: "02",
      title: "PR и<br>репутация",
      description: "Формируем публичный образ компании, выстраиваем коммуникацию с аудиторией, СМИ и партнёрами.",
      tags: ["PR-стратегия", "Медиа", "Репутация"]
    },
    {
      number: "03",
      title: "SMM и<br>социальные сети",
      description: "Создаём контент, развиваем сообщества, оформляем страницы и помогаем брендам выстраивать отношения с подписчиками.",
      tags: ["Контент", "Сообщества", "Продвижение"]
    },
    {
      number: "04",
      title: "Разработка<br>сайтов",
      description: "Разрабатываем современные сайты с продуманной структурой, удобной навигацией и выразительным дизайном.",
      tags: ["Landing page", "Корпоративные сайты", "Интернет-магазины"]
    },
    {
      number: "05",
      title: "Дизайн и<br>айдентика",
      description: "Создаём визуальную систему бренда: от логотипа и фирменного стиля до рекламных материалов.",
      tags: ["Брендинг", "Графика", "Фирменный стиль"]
    },
    {
      number: "06",
      title: "SEO-<br>продвижение",
      description: "Оптимизируем сайты для поисковых систем, работаем над видимостью компании и привлечением органического трафика.",
      tags: ["SEO-аудит", "Оптимизация", "Аналитика"]
    },
    {
      number: "07",
      title: "Бизнес-<br>консалтинг",
      description: "Анализируем бизнес-процессы, маркетинг и коммуникации. Помогаем находить точки роста и разрабатывать планы развития.",
      tags: ["Анализ", "Стратегия", "Развитие"]
    },
    {
      number: "08",
      title: "Организация<br>мероприятий",
      description: "Разрабатываем концепции, организуем деловые и рекламные мероприятия, презентации, открытия и специальные проекты.",
      tags: ["Концепция", "Организация", "Продвижение"]
    }
  ];

  const serviceItems = document.querySelectorAll(".service-item");
  const serviceDetail = document.getElementById("serviceDetail");

  serviceItems.forEach(item => {
    item.addEventListener("click", () => {
      const index = Number(item.dataset.service);
      const service = services[index];

      if (!service || !serviceDetail) return;

      serviceItems.forEach(button => {
        button.classList.remove("active");
      });

      item.classList.add("active");

      serviceDetail.style.opacity = "0";
      serviceDetail.style.transform = "translateY(10px)";

      setTimeout(() => {
        serviceDetail.innerHTML = `
          <div class="detail-top">
            <span>НАПРАВЛЕНИЕ / ${service.number}</span>
            <span class="detail-symbol">✳</span>
          </div>

          <h3>${service.title}</h3>

          <p>${service.description}</p>

          <div class="detail-tags">
            ${service.tags.map(tag => `<span>${tag}</span>`).join("")}
          </div>

          <a href="#contact" class="detail-link">
            Обсудить задачу <span>↗</span>
          </a>

          <div class="detail-watermark">${service.number}</div>
        `;

        serviceDetail.style.opacity = "1";
        serviceDetail.style.transform = "translateY(0)";
      }, 180);
    });
  });

  // АНИМАЦИЯ ПРИ ПРОКРУТКЕ
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // ЭФФЕКТ НАКЛОНА КАРТОЧЕК
  const tiltCards = document.querySelectorAll("[data-tilt]");

  tiltCards.forEach(card => {
    card.addEventListener("mousemove", event => {
      if (window.innerWidth <= 760) return;

      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (centerY - y) / 30;
      const rotateY = (x - centerX) / 30;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // ДВИЖЕНИЕ HERO-ЭЛЕМЕНТА
  const heroArt = document.querySelector(".hero-art");

  if (heroArt && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", event => {
      const x = (event.clientX / window.innerWidth - 0.5) * 15;
      const y = (event.clientY / window.innerHeight - 0.5) * 15;

      heroArt.style.marginLeft = `${x}px`;
      heroArt.style.marginTop = `${y}px`;
    });
  }

  // КАСТОМНЫЙ КУРСОР
  const cursor = document.querySelector(".cursor");
  const cursorRing = document.querySelector(".cursor-ring");

  if (cursor && cursorRing && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", event => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;

      cursorRing.style.left = `${event.clientX}px`;
      cursorRing.style.top = `${event.clientY}px`;
    });

    document.querySelectorAll("a, button, input, textarea, select").forEach(element => {
      element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("active");
      });

      element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("active");
      });
    });
  }

  // УВЕДОМЛЕНИЕ
  const toast = document.getElementById("toast");

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 4500);
  }

  // ФОРМА ЗАЯВКИ
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  contactForm?.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    showToast("Спасибо! Форма заполнена. Для отправки заявки необходимо подключить почту или CRM.");

    contactForm.reset();

    if (formNote) {
      formNote.textContent =
        "Демонстрационный режим: заявка пока не отправляется на сервер.";
    }
  });

});
