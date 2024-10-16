const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();

/* GALLERY MAIN */
function genererProjets(works) {
  const mainGalleryContainer = document.querySelector('.gallery');

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

genererProjets();

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
