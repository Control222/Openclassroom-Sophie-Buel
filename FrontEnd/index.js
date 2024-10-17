const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();

/* GALLERY MAIN */
function genererProjets(works) {
  const mainGalleryContainer = document.querySelector('.gallery');

  mainGalleryContainer.innerHTML = '';

  for (let i = 0; i < works.length; i++) {
    const article = works[i];

    const projetElement = document.createElement('figure');

    const imageElement = document.createElement('img');
    imageElement.src = article.imageUrl;

    const captionElement = document.createElement('figcaption');
    captionElement.innerText = article.title;

    mainGalleryContainer.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(captionElement);
  }
}

genererProjets(works);

/* FILTERS */

const btnFiltrerTous = document.getElementById('btn__tous');
btnFiltrerTous.addEventListener('click', () => {
  const filtrerTous = works.slice();
  genererProjets(filtrerTous);
});

const btnFiltrerObjets = document.getElementById('btn__objets');
btnFiltrerObjets.addEventListener('click', () => {
  const filtreObjets = works.filter(function (work) {
    return work.category.name === 'Objets';
  });
  genererProjets(filtreObjets);
});

const btnFiltrerAppartements = document.getElementById('btn__appartements');
btnFiltrerAppartements.addEventListener('click', () => {
  const filtrerAppartements = works.filter(function (work) {
    return work.category.name === 'Appartements';
  });
  genererProjets(filtrerAppartements);
});

const btnFiltrerHotels = document.getElementById('btn__hotels');
btnFiltrerHotels.addEventListener('click', () => {
  const filtreHotels = works.filter((work) => {
    return work.category.name === 'Hotels & restaurants';
  });
  genererProjets(filtreHotels);
});

/* MODE ADMIN */

const token = localStorage.getItem('token');

const bandeau = document.querySelector('.bandeau');
const filtersContainer = document.querySelector('.div__filter');
const loginButton = document.querySelector('.login');
const logoutButton = document.querySelector('.logout');
const projetsContainer = document.querySelector('.projets');

function modeAdmin() {
  if (token) {
    bandeau.classList.remove('hidden');

    filtersContainer.classList.add('hidden');

    loginButton.classList.add('hidden');
    logoutButton.classList.remove('hidden');

    projetsContainer.style.marginBottom = '90px';

    openModalButton.classList.remove('hidden');
  } else {
    bandeau.classList.add('hidden');

    filtersContainer.classList.remove('hidden');

    loginButton.classList.remove('hidden');
    logoutButton.classList.add('hidden');

    projetsContainer.style.marginBottom = '50px';

    openModalButton.classList.add('hidden');
  }
}

modeAdmin();

// Deconnexion

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token');
});

/* MODAL */
const modal = document.querySelector('.modal');
const openModalButton = document.querySelector('.open__modal');
const closeModalButton = document.querySelector('.close__modal');
const previousModalButton = document.querySelector('.modal__previous');

openModalButton.addEventListener('click', () => {
  modal.showModal();
});

closeModalButton.addEventListener('click', () => {
  modal.close();
});

modal.addEventListener('click', (e) => {
  console.log(e.target);
  if (e.target === modal) {
    modal.close();
  }
});

// Changer de modal

const ajouterPhotoButton = document.querySelector('.modal__btn');
const secondModal = document.querySelector('.modal__container__ajouter');
const galleryContainer = document.querySelector('.modal__container__gallery');
const modalHeader = document.querySelector('.modal__header');

ajouterPhotoButton.addEventListener('click', () => {
  galleryContainer.classList.add('hidden');
  secondModal.classList.remove('hidden');
  previousModalButton.classList.remove('hidden');
  modalHeader.style.justifyContent = 'space-between';
});

previousModalButton.addEventListener('click', () => {
  secondModal.classList.add('hidden');
  galleryContainer.classList.remove('hidden');
  previousModalButton.classList.add('hidden');
  modalHeader.style.justifyContent = 'end';
});
