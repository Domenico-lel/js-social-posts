/*Milestone 1 - Prendendo come riferimento il layout di esempio presente nell’html, stampiamo i post del nostro feed, prendendo le informazioni che ci servono dall’array di oggetti che già trovate.

Milestone 2 - Se clicchiamo sul tasto “Mi Piace” cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo. Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.*/

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Funzione per creare un elemento post nel DOM
function createPostElement(post) {
    // Creazione di un nuovo elemento div per rappresentare il post
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    // Utilizzo di template string per comporre l'HTML interno del post in base ai dati forniti
    postElement.innerHTML = `
        <div class="post__header">
            <div class="post-meta">
                <div class="post-meta__icon">
                    ${post.author.image
                        ? `<img class="profile-pic" src="${post.author.image}" alt="${post.author.name}">`
                        : `<div class="profile-pic-default"><span>${post.author.name.charAt(0)}</span></div>`
                    }
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${post.author.name}</div>
                    <div class="post-meta__time">${post.created}</div>
                </div>
            </div>
        </div>
        <div class="post__text">${post.content}</div>
        ${post.media ? `<div class="post__image"><img src="${post.media}" alt=""></div>` : ''}
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button js-like-button" href="#" data-postid="${post.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone
                </div>
            </div>
        </div>
    `;

    // Aggiunta di un event listener al pulsante "Mi Piace"
    const likeButton = postElement.querySelector('.js-like-button');
    likeButton.addEventListener('click', handleLikeClick);

    // Restituzione dell'elemento post completo
    return postElement;
}

// Funzione per gestire il clic sul pulsante "Mi Piace"
function handleLikeClick(event) {
    event.preventDefault();

    // Recupero dell'ID del post
    const postId = event.currentTarget.dataset.postid;
    const likeCounter = document.getElementById(`like-counter-${postId}`);
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];

    // Verifica se l'utente ha già messo "Mi Piace" a questo post
    if (!likedPosts.includes(postId)) {
        // Incremento del contatore dei "Mi Piace"
        const currentLikes = parseInt(likeCounter.textContent, 10);
        likeCounter.textContent = currentLikes + 1;

        // Aggiunta della classe per cambiare lo stile del pulsante "Mi Piace"
        event.currentTarget.classList.add('like-button--liked');

        // Aggiunta dell'ID del post ai post che hanno ricevuto "Mi Piace"
        likedPosts.push(postId);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }
}

// Funzione per inizializzare il feed con i post al caricamento della pagina
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');

    // Creazione dinamica degli elementi dei post e aggiunta al DOM
    posts.forEach(post => {
        const postElement = createPostElement(post);
        container.appendChild(postElement);
    });
});
