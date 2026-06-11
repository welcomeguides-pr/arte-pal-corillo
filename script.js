const WHATSAPP_NUMBER = '17873906136';

const services = {
  adultos: {
    icon: '🎨',
    title: 'Talleres para Adultos',
    price: '$35',
    priceLabel: 'por persona',
    includes: ['Snack', 'Bebida', 'Todos los materiales'],
    description: 'Una experiencia creativa diseñada para adultos de todos los niveles. No se necesita experiencia previa — solo ganas de divertirse y expresarte a través del arte.',
    note: '⚠️ Cupos limitados: máx. 12 personas por sesión.',
    waMessage: 'Hola Ivelisse! Me interesa el Taller para Adultos ($35). ¿Cuándo es la próxima sesión?',
    photos: [],
  },
  ninos: {
    icon: '🖌️',
    title: 'Talleres para Niños',
    price: '$25',
    priceLabel: 'por niño',
    includes: ['Snacks', 'Bebida', 'Todos los materiales'],
    description: 'Clases pensadas para los pequeños artistas de 4 a 9 años. Un espacio seguro, divertido y lleno de color donde los niños exploran su creatividad.',
    note: '⚠️ Edades: 4 a 9 años. Cupos limitados: máx. 12 por sesión.',
    waMessage: 'Hola Ivelisse! Me interesa el Taller para Niños ($25). ¿Cuándo es la próxima sesión?',
    photos: [],
  },
  brisa: {
    icon: '🌊',
    title: 'Arte con Brisa',
    price: '$48',
    priceLabel: 'por persona',
    includes: ['Snacks', 'Bebida', 'Todos los materiales', 'Música'],
    description: '¡Pinta frente al mar! Un taller único en la playa donde el ambiente natural inspira tu obra. Relájate, crea y disfruta de una experiencia artística inolvidable.',
    note: '⚠️ Cupos limitados: máx. 12 personas por sesión.',
    waMessage: 'Hola Ivelisse! Me interesa el Taller Arte con Brisa en la playa ($48). ¿Cuándo es la próxima sesión?',
    photos: [],
  },
  empresas: {
    icon: '🏢',
    title: 'Talleres para Empresas',
    price: 'Bajo cotización',
    priceLabel: '',
    includes: ['Experiencia personalizada', 'Para equipos de trabajo', 'Compañías y/o empresas'],
    description: 'Ofrecemos talleres creativos especialmente diseñados para compañías y empresas. Una experiencia única para fortalecer equipos y fomentar la creatividad en tu organización.',
    note: '📩 Escríbenos para recibir tu cotización personalizada.',
    waMessage: 'Hola Ivelisse! Me interesa cotizar un Taller para Empresas. ¿Me puedes dar más información?',
    photos: [],
  },
  murales: {
    icon: '🏛️',
    title: 'Murales',
    price: 'Bajo cotización',
    priceLabel: '',
    includes: ['Diseño personalizado', 'Arte a gran escala', 'Transformación de espacios'],
    description: 'Transformamos tus espacios con arte a gran escala. Creamos murales personalizados para hogares, negocios y espacios públicos. Cada proyecto es único.',
    note: '📩 Contáctanos con fotos y medidas del espacio para recibir tu cotización.',
    waMessage: 'Hola Ivelisse! Me interesa cotizar un Mural. ¿Me puedes dar más información?',
    photos: [],
  },
};

function buildWaLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Modal
const overlay = document.getElementById('modalOverlay');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalPriceLabel = document.getElementById('modalPriceLabel');
const modalPriceBlock = document.getElementById('modalPriceBlock');
const modalDesc = document.getElementById('modalDesc');
const modalList = document.getElementById('modalList');
const modalNote = document.getElementById('modalNote');
const modalCta = document.getElementById('modalCta');

function openModal(key) {
  const s = services[key];
  if (!s) return;

  // Fotos
  const photosEl = document.getElementById('modalPhotos');
  photosEl.innerHTML = '';
  if (s.photos && s.photos.length > 0) {
    s.photos.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = s.title;
      img.className = 'modal-photo-img';
      photosEl.appendChild(img);
    });
    photosEl.style.display = 'grid';
  } else {
    photosEl.style.display = 'none';
  }

  modalIcon.textContent = s.icon;
  modalTitle.textContent = s.title;
  modalPrice.textContent = s.price;
  modalPriceLabel.textContent = s.priceLabel;
  modalPriceBlock.style.display = s.priceLabel ? 'flex' : 'none';
  modalDesc.textContent = s.description;
  modalNote.textContent = s.note;
  modalCta.href = buildWaLink(s.waMessage);

  modalList.innerHTML = '';
  s.includes.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    modalList.appendChild(li);
  });

  overlay.classList.add('open');
  overlay.querySelector('.modal').scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});

document.getElementById('modalClose').addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

document.querySelectorAll('[data-service]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.service));
});

// Galería lightbox
const allPhotos = [...Array.from({length: 22}, (_, i) => `${i + 1}.png`), '23.jpeg'];
let lightboxIndex = 0;

const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');

function openLightbox(index) {
  lightboxIndex = index;
  lightboxImg.src = allPhotos[lightboxIndex];
  lightboxCounter.textContent = `${lightboxIndex + 1} / ${allPhotos.length}`;
  lightboxOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxStep(dir) {
  lightboxIndex = (lightboxIndex + dir + allPhotos.length) % allPhotos.length;
  lightboxImg.src = allPhotos[lightboxIndex];
  lightboxCounter.textContent = `${lightboxIndex + 1} / ${allPhotos.length}`;
}

document.getElementById('navGalleryBtn').addEventListener('click', () => openLightbox(0));
document.getElementById('galleryCtaBtn').addEventListener('click', () => openLightbox(0));
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => lightboxStep(-1));
document.getElementById('lightboxNext').addEventListener('click', () => lightboxStep(1));

lightboxOverlay.addEventListener('click', e => {
  if (e.target === lightboxOverlay) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightboxOverlay.classList.contains('open')) return;
  if (e.key === 'ArrowRight') lightboxStep(1);
  if (e.key === 'ArrowLeft')  lightboxStep(-1);
  if (e.key === 'Escape')     closeLightbox();
});

// Nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Contact form
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  ['nombre', 'email', 'mensaje'].forEach(id => {
    const input = document.getElementById(id);
    const error = document.getElementById(`error-${id}`);
    if (!input.value.trim()) {
      error.classList.add('visible');
      valid = false;
    } else {
      error.classList.remove('visible');
    }
  });

  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('error-email');
  if (emailInput.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    emailError.textContent = 'Ingresa un correo válido.';
    emailError.classList.add('visible');
    valid = false;
  }

  if (!valid) return;

  const servicio = document.getElementById('servicio').value || 'sin especificar';
  const mensaje = `Hola Ivelisse! Me llamo ${document.getElementById('nombre').value.trim()}. Me interesa: ${servicio}. ${document.getElementById('mensaje').value.trim()} (Correo: ${document.getElementById('email').value.trim()})`;

  window.open(buildWaLink(mensaje), '_blank');

  form.reset();
  form.style.display = 'none';
  successMsg.classList.add('visible');
});
