// Eda Güzellik & Makeup — Ana JS
document.addEventListener('DOMContentLoaded', function () {
  // Mobil menü
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Ana sayfa hero görsel slider'ı (4 saniyede bir geçiş)
  var heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    var currentSlide = 0;
    setInterval(function () {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 4000);
  }

  // Galeri filtre
  var filterButtons = document.querySelectorAll('.gallery-filters button');
  var galleryItems = document.querySelectorAll('.gallery-item');
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        var show = cat === 'all' || item.getAttribute('data-cat') === cat;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  // Lightbox
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lbContent = lightbox.querySelector('.lightbox-inner');
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var full = item.getAttribute('data-full');
        var type = item.getAttribute('data-type') || 'image';
        lbContent.innerHTML = '';
        if (type === 'video') {
          var v = document.createElement('video');
          v.src = full; v.controls = true; v.autoplay = true;
          lbContent.appendChild(v);
        } else {
          var img = document.createElement('img');
          img.src = full;
          lbContent.appendChild(img);
        }
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('open');
        lbContent.innerHTML = '';
      }
    });
  }

  // İletişim formu -> WhatsApp'a yönlendirme
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var phone = form.querySelector('#phone').value.trim();
      var service = form.querySelector('#service').value;
      var message = form.querySelector('#message').value.trim();

      var text = 'Merhaba, randevu/bilgi almak istiyorum.%0A' +
        'Ad Soyad: ' + encodeURIComponent(name) + '%0A' +
        'Telefon: ' + encodeURIComponent(phone) + '%0A' +
        'İlgilenilen Hizmet: ' + encodeURIComponent(service) + '%0A' +
        'Mesaj: ' + encodeURIComponent(message);

      var waUrl = 'https://wa.me/905532419889?text=' + text;
      window.open(waUrl, '_blank');
    });
  }
});
