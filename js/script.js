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


      // Este código se ejecuta cuando la página está completamente cargada
    document.addEventListener('DOMContentLoaded', function() {
        // Obtenemos el elemento modal de la galería por su ID
        const imageModal = document.getElementById('imageModal');
        
        // Añadimos un "escucha" que se activa justo antes de que el modal se muestre
        imageModal.addEventListener('show.bs.modal', function (event) {
            
            // event.relatedTarget es el enlace (<a>) que el usuario acaba de hacer clic
            const relatedTarget = event.relatedTarget;

            // Obtenemos la URL de la imagen grande del atributo 'data-image-url' de ese enlace
            const imageUrl = relatedTarget.getAttribute('data-image-url');
            
            // Seleccionamos la etiqueta <img> dentro del modal para cambiar su fuente
            const modalImage = imageModal.querySelector('#modalImage');
            
            // Finalmente, asignamos la URL de la imagen grande a la fuente (src) del <img>
            modalImage.src = imageUrl;
        });
    });
