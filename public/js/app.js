document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    
    // Router simple basado en el pathname
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path === '/' || path === '') {
        renderDestacados();
        renderArtesanosDestacados();
    } else if (path.includes('productos.html')) {
        initCatalog();
    } else if (path.includes('producto.html')) {
        renderProductDetail();
    } else if (path.includes('artesanos.html')) {
        renderArtisanDirectory();
    } else if (path.includes('artesano.html')) {
        renderArtisanDetail();
    } else if (path.includes('talleres.html')) {
        initWorkshopForm();
    }
});

function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const links = document.querySelector('.nav-links');
    
    if (toggle && links) {
        toggle.setAttribute('aria-expanded', 'false');
        
        toggle.addEventListener('click', () => {
            const isActive = links.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            toggle.innerHTML = isActive ? '✕' : '☰';
        });
    }
}

function createProductCard(product) {
    const artisan = window.ARTISANS.find(a => a.id === product.artisanId);
    const artisanName = artisan ? artisan.name : 'Varios artesanos';
    
    return `
        <a href="producto.html?id=${product.id}" class="card">
            <div class="card-img-wrap">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="card-content">
                <span class="card-category">${product.material}</span>
                <h3 class="card-title">${product.name}</h3>
                <span class="card-price">$${product.price.toLocaleString('es-CL')}</span>
                <div class="card-artisan">Por ${artisanName}</div>
            </div>
        </a>
    `;
}

function createArtisanCard(artisan) {
    return `
        <a href="artesano.html?id=${artisan.id}" class="card">
            <div class="card-img-wrap">
                <img src="${artisan.photo}" alt="${artisan.name}" loading="lazy">
            </div>
            <div class="card-content" style="text-align: center;">
                <h3 class="card-title">${artisan.name}</h3>
                <span class="card-category">${artisan.specialty}</span>
                <p style="margin-top: 1rem; font-size: 0.9rem;">${artisan.location}</p>
            </div>
        </a>
    `;
}

// ---- Páginas Específicas ----

function renderDestacados() {
    const container = document.getElementById('destacados-container');
    if (!container) return;
    
    // Renderizamos todos los productos para que el carrusel sea scrollable y dinámico
    const destacados = window.PRODUCTS;
    container.innerHTML = destacados.map(createProductCard).join('');
    
    // Inicializar controles interactivos
    initCarouselControls('destacados-container', 'destacados-prev', 'destacados-next', 'destacados-progress');
}

function renderArtesanosDestacados() {
    const container = document.getElementById('artesanos-container');
    if (!container) return;
    
    // Renderizamos todos los artesanos
    const destacados = window.ARTISANS;
    container.innerHTML = destacados.map(createArtisanCard).join('');
    
    // Inicializar controles interactivos
    initCarouselControls('artesanos-container', 'artesanos-prev', 'artesanos-next', 'artesanos-progress');
}

function initCarouselControls(carouselId, prevId, nextId, progressId) {
    const carousel = document.getElementById(carouselId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    const progressFill = document.getElementById(progressId);
    
    if (!carousel) return;
    
    // Configurar botones de navegación
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (typeof carousel.prev === 'function') {
                carousel.prev();
            } else {
                carousel.scrollBy({ left: -340, behavior: 'smooth' });
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (typeof carousel.next === 'function') {
                carousel.next();
            } else {
                carousel.scrollBy({ left: 340, behavior: 'smooth' });
            }
        });
    }
    
    // Configurar barra de progreso
    if (progressFill) {
        const updateProgress = () => {
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            if (maxScroll <= 0) {
                progressFill.style.width = '0%';
                return;
            }
            const percentage = (carousel.scrollLeft / maxScroll) * 100;
            progressFill.style.width = `${percentage}%`;
        };
        
        carousel.addEventListener('scroll', updateProgress);
        window.addEventListener('resize', updateProgress);
        setTimeout(updateProgress, 100);
    }
}

function initCatalog() {
    const container = document.getElementById('catalog-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!container) return;
    
    function render(filter = 'todos') {
        const filtered = filter === 'todos' 
            ? window.PRODUCTS 
            : window.PRODUCTS.filter(p => p.material.toLowerCase() === filter.toLowerCase());
        
        container.innerHTML = filtered.map(createProductCard).join('');
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            render(e.target.dataset.filter);
        });
    });
    
    render(); // Initial render
}

function renderProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const container = document.getElementById('product-detail-container');
    
    if (!container) return;

    const product = window.PRODUCTS.find(p => p.id === productId);
    
    if (!product) {
        container.innerHTML = '<div class="text-center section"><h2>Producto no encontrado</h2><a href="productos.html" class="btn btn-primary" style="margin-top: 2rem;">Volver al catálogo</a></div>';
        return;
    }
    
    const artisan = window.ARTISANS.find(a => a.id === product.artisanId);
    const whatsappMsg = `Hola Manos Maestras, me interesa comprar la pieza ${product.name} (ID: ${product.id}) del artesano ${artisan.name}`;
    const whatsappLink = `https://wa.me/56912345678?text=${encodeURIComponent(whatsappMsg)}`;
    
    document.title = `${product.name} - Manos Maestras`;
    
    // Inyectar JSON-LD para SEO
    const oldScript = document.getElementById('product-jsonld');
    if (oldScript) oldScript.remove();
    const script = document.createElement('script');
    script.id = 'product-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": window.location.origin + '/' + product.image,
        "description": product.description,
        "category": product.material,
        "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "CLP",
            "availability": "https://schema.org/InStock",
            "url": window.location.href,
            "seller": {
                "@type": "Organization",
                "name": "Manos Maestras"
            }
        },
        "brand": {
            "@type": "Brand",
            "name": artisan.name
        }
    });
    document.head.appendChild(script);
    
    container.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info-container">
                <span class="card-category">${product.material}</span>
                <h1 class="product-title">${product.name}</h1>
                <p style="font-size: 1.5rem; color: var(--color-accent); font-weight: 600; margin-bottom: 2rem;">$${product.price.toLocaleString('es-CL')}</p>
                
                <div style="margin-bottom: 2rem;">
                    <strong>Dimensiones:</strong> ${product.dimensions}
                </div>
                
                <p style="font-size: 1.1rem; line-height: 1.8;">${product.description}</p>
                
                <div class="creator-profile cursor-pointer" onclick="window.location.href='artesano.html?id=${artisan.id}'" style="cursor: pointer;">
                    <img src="${artisan.photo}" alt="${artisan.name}">
                    <div>
                        <h4>Un diseño de ${artisan.name}</h4>
                        <span class="card-category" style="font-size: 0.75rem;">Ver historia del artesano &rarr;</span>
                    </div>
                </div>
                
                <div class="transparency-box">
                    <h4>Comercio Justo Garantizado</h4>
                    <p>El 80% del valor de esta pieza va directamente a las manos de ${artisan.name}. Eliminamos intermediarios para dignificar el oficio.</p>
                </div>
                
                <a href="${whatsappLink}" target="_blank" class="btn btn-whatsapp" style="width: 100%; font-size: 1.1rem; padding: 1rem;">
                    Comprar vía WhatsApp
                </a>
            </div>
        </div>
    `;
}

function renderArtisanDirectory() {
    const container = document.getElementById('artisans-grid');
    if (!container) return;
    container.innerHTML = window.ARTISANS.map(createArtisanCard).join('');
}

function renderArtisanDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const artisanId = urlParams.get('id');
    const container = document.getElementById('artisan-detail-container');
    
    if (!container) return;
    
    const artisan = window.ARTISANS.find(a => a.id === artisanId);
    
    if (!artisan) {
        container.innerHTML = '<div class="text-center section"><h2>Artesano no encontrado</h2><a href="artesanos.html" class="btn btn-primary" style="margin-top: 2rem;">Volver al directorio</a></div>';
        return;
    }
    
    const artisanProducts = window.PRODUCTS.filter(p => p.artisanId === artisanId);
    
    document.title = `${artisan.name} - Manos Maestras`;
    
    // Inyectar JSON-LD para SEO
    const oldScript = document.getElementById('artisan-jsonld');
    if (oldScript) oldScript.remove();
    const script = document.createElement('script');
    script.id = 'artisan-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": artisan.name,
        "jobTitle": "Artesano en " + artisan.specialty,
        "description": artisan.bio,
        "image": window.location.origin + '/' + artisan.photo,
        "homeLocation": {
            "@type": "Place",
            "name": artisan.location
        },
        "worksFor": {
            "@type": "Organization",
            "name": "Manos Maestras"
        }
    });
    document.head.appendChild(script);
    
    container.innerHTML = `
        <div class="artisan-header">
            <img src="${artisan.photo}" alt="${artisan.name}">
            <h1>${artisan.name}</h1>
            <span class="card-category" style="display: block; margin: 0.5rem 0 1rem;">${artisan.specialty} • ${artisan.location}</span>
        </div>
        
        <div class="artisan-bio">
            <p>${artisan.bio}</p>
        </div>
        
        <div class="video-container" style="max-width: 800px; margin: 0 auto 4rem;">
            <video controls playsinline preload="metadata" poster="${artisan.videoPoster}">
                <source src="${artisan.videoUrl}" type="video/mp4">
                Tu navegador no soporta el formato de video.
            </video>
        </div>
        
        <hr style="border: 0; border-top: 1px solid var(--color-divider); margin: 4rem 0;">
        
        <h2 class="section-title">Obras de ${artisan.name}</h2>
        <div class="grid" id="artisan-products-grid">
            ${artisanProducts.length > 0 
                ? artisanProducts.map(createProductCard).join('') 
                : '<p class="text-center" style="grid-column: 1 / -1;">Próximamente nuevas obras.</p>'}
        </div>
    `;
}

function initWorkshopForm() {
    const form = document.getElementById('workshop-form');
    const successMsg = document.getElementById('form-success-msg');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simular guardado
            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                trade: document.getElementById('trade').value,
            };
            
            localStorage.setItem('workshopRegistration', JSON.stringify(data));
            
            form.style.display = 'none';
            successMsg.style.display = 'block';
            successMsg.innerHTML = `¡Gracias por tu interés, ${data.name}! Te avisaremos al correo ${data.email} cuando abramos los talleres de ${data.trade}.`;
        });
    }
}
