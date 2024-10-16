const reponse = await fetch('http://localhost:5678/api/works');
const woorks = await reponse.json();

/* MODAL */
const modal = document.querySelector('.modal');
const openModalButton = document.querySelector('.open__modal');
const closeModalButton = document.querySelector('.close__modal');
const previousModal = document.querySelector('.modal__previous');

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
