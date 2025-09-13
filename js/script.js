//efecto transición hero

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('hero-section');
    const heroContent = document.querySelector('.hero-content');
    
    // Si quieres un efecto de desvanecimiento del contenido
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection.offsetHeight;

        // Calcular la opacidad del contenido: se desvanece al hacer scroll
        // Ajusta el 0.7 para que se desvanezca más rápido o más lento
        const opacity = 1 - (scrollPosition / (heroHeight * 0.7));
        heroContent.style.opacity = Math.max(0, opacity); // No menor a 0

        // Opcional: efecto de escala o paralaje más pronunciado para el fondo
        // Puedes jugar con estos valores
        heroSection.style.backgroundPositionY = -scrollPosition * 0.5 + 'px';
    });
});

//modal de renders


    document.addEventListener('DOMContentLoaded', function() {
        const imageModal = document.getElementById('imageModal');
        imageModal.addEventListener('show.bs.modal', function (event) {
            // El elemento que activó el modal (la miniatura)
            const relatedTarget = event.relatedTarget;
            // Obtenemos la URL de la imagen grande del atributo data
            const imageUrl = relatedTarget.getAttribute('data-image-url');
            
            // Buscamos la imagen dentro del modal
            const modalImage = imageModal.querySelector('#modalImage');
            
            // Asignamos la URL a la imagen del modal
            modalImage.src = imageUrl;
        });
    });
