document.addEventListener('DOMContentLoaded', function () {

    // LÓGICA DO MENU MOBILE
    
    const toggleButton = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (toggleButton && mobileMenu) {
        
        // Adiciona o evento de clique ao botão hambúrguer
        toggleButton.addEventListener('click', function() {
            // Alterna a classe 'show' no menu, acionando o CSS de animação
            mobileMenu.classList.toggle('show');
            
            // Acessibilidade
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });

        // Fechar o menu ao clicar em um link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
                toggleButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- 3. LÓGICA DO CARROSSEL PRINCIPAL (slides) ---

    const slides = document.querySelectorAll(".slide");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots");

    if (slides.length > 0 && prev && next && dotsContainer) {

        let current = 0;

        // cria bolinhas dinamicamente
        slides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.addEventListener("click", () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll("button");

        function updateCarousel() {
            slides.forEach((slide, i) =>
                slide.classList.toggle("active", i === current)
            );
            dots.forEach((dot, i) =>
                dot.classList.toggle("active", i === current)
            );
        }

        function goToSlide(index) {
            current = index;
            updateCarousel();
        }

        function nextSlide() {
            current = (current + 1) % slides.length;
            updateCarousel();
        }

        function prevSlide() {
            current = (current - 1 + slides.length) % slides.length;
            updateCarousel();
        }

        prev.addEventListener("click", prevSlide);
        next.addEventListener("click", nextSlide);
        
        // autoplay
        setInterval(nextSlide, 6000);

        updateCarousel();
    }
    
    // --- 4. LÓGICA DO CARROSSEL DE CITAÇÕES (quote cards) ---

    const quoteCards = document.querySelectorAll('.quote-card');
    const nextQuote = document.querySelector('.quote-next');
    const prevQuote = document.querySelector('.quote-prev');
    let quoteIndex = 0;

    // 🟢 VERIFICAÇÃO ESSENCIAL: O código SÓ roda se os elementos existirem!
    if (quoteCards.length > 0 && nextQuote && prevQuote) {
        
        function showQuote(i) {
            quoteCards.forEach(q => q.classList.remove('active'));
            
            // 🟢 Adicionando segurança
            if (quoteCards[i]) {
                quoteCards[i].classList.add('active');
            }
        }

        function nextQ() {
            quoteIndex = (quoteIndex + 1) % quoteCards.length;
            showQuote(quoteIndex);
        }

        function prevQ() {
            quoteIndex = (quoteIndex - 1 + quoteCards.length) % quoteCards.length;
            showQuote(quoteIndex);
        }

        nextQuote.addEventListener('click', nextQ);
        prevQuote.addEventListener('click', prevQ);

        // Rotação automática (7 segundos)
        setInterval(nextQ, 7000);

        showQuote(0); 
    } 

    /* Botão "Voltar ao topo" — integrado ao script.js existente */
    (function createBackToTop() {
      if (document.getElementById('back-to-top')) return; // evita duplicata

      const btn = document.createElement('button');
      btn.id = 'back-to-top';
      btn.setAttribute('aria-label', 'Voltar ao topo');
      btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l-8 8h5v8h6v-8h5z"/></svg><span class="back-text">Volte ao topo</span>';
      document.body.appendChild(btn);

      const THRESHOLD_PX = 24;
      let visible = false;

      function checkScroll() {
        const scrolledToBottom = (window.innerHeight + window.pageYOffset) >= (document.documentElement.scrollHeight - THRESHOLD_PX);
        if (scrolledToBottom && !visible) {
          visible = true;
          btn.classList.add('visible');
        } else if (!scrolledToBottom && visible) {
          visible = false;
          btn.classList.remove('visible');
        }
      }

      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      window.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      // checa agora (útil se já estiver no fim)
      checkScroll();
    })();

});