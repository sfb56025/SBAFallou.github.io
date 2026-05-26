// ============================================
// 1. MENU BURGER (mobile)
// ============================================

// On récupère les éléments HTML dont on a besoin
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

// Quand on clique sur le bouton burger...
burger.addEventListener('click', () => {

  // ...on ajoute ou enlève la classe "open" sur le menu
  navLinks.classList.toggle('open');

  // ...on ajoute ou enlève la classe "active" sur le burger
  burger.classList.toggle('active');
});

// Quand on clique sur un lien du menu mobile, on ferme le menu
navLinks.querySelectorAll('a').forEach(lien => {
  lien.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
  });
});


// ============================================
// 2. NAVBAR — change de style au scroll
// ============================================

const navbar = document.getElementById('navbar');

// Cette fonction s'exécute à chaque fois qu'on scrolle
window.addEventListener('scroll', () => {

  // Si on a scrollé plus de 50px vers le bas...
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');    // fond solide
  } else {
    navbar.classList.remove('scrolled'); // fond transparent
  }

  // On en profite aussi pour lancer les animations
  animerAuScroll();
});


// ============================================
// 3. ANIMATION DES CARTES AU SCROLL
// ============================================

// On sélectionne toutes les cartes de projets
const cartes = document.querySelectorAll('.projet-card');

function animerAuScroll() {
  cartes.forEach(carte => {

    // getBoundingClientRect() donne la position de l'élément
    // par rapport à la fenêtre visible
    const position = carte.getBoundingClientRect().top;
    const hauteurFenetre = window.innerHeight;

    // Si la carte est visible dans la fenêtre (avec 80px de marge)...
    if (position < hauteurFenetre - 80) {
      carte.classList.add('visible'); // ...elle apparaît !
    }
  });
}

// On lance une première fois au chargement de la page
// (pour les éléments déjà visibles sans scroller)
animerAuScroll();


// ============================================
// 4. ANIMATION BURGER (les 3 traits → croix)
// ============================================

// On ajoute ce style dynamiquement pour l'animation du burger
const style = document.createElement('style');
style.textContent = `
  .burger.active span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .burger.active span:nth-child(2) {
    opacity: 0;
  }
  .burger.active span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
`;
document.head.appendChild(style);


// ============================================
// 5. FORMULAIRE DE CONTACT
// ============================================

const formulaire = document.getElementById('contact-form');

formulaire.addEventListener('submit', (evenement) => {

  // Empêche le rechargement de la page (comportement par défaut)
  evenement.preventDefault();

  // Récupère le bouton d'envoi
  const bouton = formulaire.querySelector('button[type="submit"]');

  // Change le texte du bouton pour donner un retour visuel
  bouton.textContent = '✅ Message envoyé !';
  bouton.style.background = '#22c55e';
  bouton.disabled = true;

  // Remet le bouton à l'état normal après 3 secondes
  setTimeout(() => {
    bouton.textContent = 'Envoyer le message';
    bouton.style.background = '';
    bouton.disabled = false;
    formulaire.reset(); // vide les champs
  }, 3000);
});


// ============================================
// 6. LIEN ACTIF dans la navigation au scroll
// ============================================

const sections = document.querySelectorAll('section');
const liensNav = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let sectionActuelle = '';

  sections.forEach(section => {
    const haut = section.offsetTop - 100;
    if (window.scrollY >= haut) {
      sectionActuelle = section.getAttribute('id');
    }
  });

  liensNav.forEach(lien => {
    lien.style.color = '';  // remet la couleur normale
    if (lien.getAttribute('href') === `#${sectionActuelle}`) {
      lien.style.color = 'var(--couleur-principale)'; // violet = actif
    }
  });
});