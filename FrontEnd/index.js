const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();

const maxSize = 4 * 1024 * 1024; /* 4mo */

/* GALLERY MAIN */
function genererProjets(works) {
  const mainGalleryContainer = document.querySelector('.gallery');

  mainGalleryContainer.innerHTML = '';

  for (let i = 0; i < works.length; i++) {
    const article = works[i];

    const projetElement = document.createElement('figure');
    projetElement.setAttribute('id', article.id);

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

  // Reset to first modal after closed
  secondModal.classList.add('hidden');
  galleryContainer.classList.remove('hidden');
  previousModalButton.classList.add('hidden');
  modalHeader.style.justifyContent = 'end';

  // Clear the image preview
  previewImage.innerHTML = `
    <i class="fa-regular fa-image photo-icon"></i>
    <button class="modal__ajouter__button">+ Ajouter photo</button>
    <p class="modal__image__max">jpg, png : 4mo max</p>
  `;
  previewImage.style.padding = '20px';
  fileInput.value = '';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.close();

    // Reset to first modal after closed
    secondModal.classList.add('hidden');
    galleryContainer.classList.remove('hidden');
    previousModalButton.classList.add('hidden');
    modalHeader.style.justifyContent = 'end';

    // Clear the image preview
    previewImage.innerHTML = `
  <i class="fa-regular fa-image photo-icon"></i>
  <button class="modal__ajouter__button">+ Ajouter photo</button>
  <p class="modal__image__max">jpg, png : 4mo max</p>
`;
    previewImage.style.padding = '20px';
    fileInput.value = '';
  }
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

// Changer de modal

const buttonToSecondModal = document.querySelector('.modal__btn');
const secondModal = document.querySelector('.modal__container__ajouter');
const galleryContainer = document.querySelector('.modal__container__gallery');
const modalHeader = document.querySelector('.modal__header');

buttonToSecondModal.addEventListener('click', () => {
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

/* GALLERY MODAL */

function genererProjetsModal(works) {
  const modalGalleryContainer = document.querySelector('.modal__gallery');

  modalGalleryContainer.innerHTML = '';

  for (let i = 0; i < works.length; i++) {
    const modalArticle = works[i];

    const modalProjetElement = document.createElement('figure');
    modalProjetElement.setAttribute('id', modalArticle.id);

    const modalImageElement = document.createElement('img');
    modalImageElement.src = modalArticle.imageUrl;
    modalImageElement.className += 'gallery__image';

    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa-solid', 'fa-trash-can', 'delete__icon');
    const trashButton = document.createElement('button');
    trashButton.classList.add('delete__button');

    trashButton.appendChild(trashIcon);
    modalGalleryContainer.appendChild(modalProjetElement);
    modalProjetElement.appendChild(modalImageElement);
    modalProjetElement.appendChild(trashButton);

    trashButton.addEventListener('click', () => {
      deleteProjet(modalArticle.id);
    });
  }
}

/* DELETE PROJET */

async function deleteProjet(imageId) {
  const confirmDelete = confirm(
    'Etes-vous sûr de vouloir supprimer ce projet?'
  );
  if (!confirmDelete) {
    return;
  }

  try {
    //Request to API
    const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      removeImageFromGallery(imageId);
    } else {
      console.error('Echec de la suppression du projet');
    }
  } catch (error) {
    console.error('Une erreur est survenue lors de la suppression du projet');
  }
}

function removeImageFromGallery(imageId) {
  const modalImage = document.getElementById(imageId);
  if (modalImage) {
    modalImage.remove();
  }
  const mainImage = document.getElementById(imageId);
  console.log(mainImage);
  if (mainImage) {
    mainImage.remove();
  }
}

genererProjetsModal(works);

/* CATEGORIE OPTIONS */

async function categorieOptions() {
  const response = await fetch('http://localhost:5678/api/categories');
  const categories = await response.json();

  const categorieSelect = document.getElementById('modal__image__categorie');
  categories.forEach((categorie) => {
    const option = document.createElement('option');
    option.value = categorie.id;
    option.innerText = categorie.name;
    option.classList.add('modal__option');

    categorieSelect.appendChild(option);
  });
}

categorieOptions();

/* FORM */

const addPhotoForm = document.querySelector('.modal__form__upload');
const titleInput = document.getElementById('modal__input__title');
const categorySelect = document.getElementById('modal__image__categorie');

const fileInput = document.getElementById('modal__file__input');
const previewImage = document.querySelector('.modal__upload');
const ajouterPhotoButton = document.querySelector('.modal__ajouter__button');

addPhotoForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const file = fileInput.files[0];

  // File size limit
  if (file && file.size > maxSize) {
    alert('La taille du fichier doit être inférieure à 4mo.');
    return;
  }

  // Prepare the data
  const formData = new FormData();
  formData.append('title', titleInput.value);
  formData.append('category', categorySelect.value);
  formData.append('image', fileInput.files[0]);

  // TEST
  console.log('Title:', titleInput.value);
  console.log('Category:', categorySelect.value);
  console.log('Image:', fileInput.files[0]);

  try {
    // POST request to the API
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Response status:', response.status); /* TEST */
    console.log(response); /* TEST */

    if (response.ok) {
      const newWork = await response.json();

      genererProjets([...works, newWork]);
      genererProjetsModal([...works, newWork]);

      addPhotoForm.reset();
      alert('Photo ajoutée avec succès!');
    } else if (response.status === 401) {
      alert('Non autorisé. Veuillez vous reconnecter.');
    } else {
      alert("Échec de l'ajout de la photo. Veuillez réessayer.");
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors du téléchargement de la photo:",
      error
    );
    alert("Une erreur s'est produite, veuillez réessayer.");
  }
});

/* PREVIEW IMAGE */

ajouterPhotoButton.addEventListener('click', (event) => {
  event.preventDefault();
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
    // File size limit
    if (file.size > maxSize) {
      alert('La taille du fichier doit être inférieure à 4mo.');
      return;
    }
    console.log('File selected', file.name);

    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.innerHTML = `<img src="${e.target.result}" height= "177px" width= "130px" alt="Image preview"  />`;
      previewImage.style.padding = '0';
    };
    reader.readAsDataURL(file);
  } else {
    alert('Veuillez télécharger un fichier image valide (jpg, png).');
  }
});
