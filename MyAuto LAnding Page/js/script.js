// document.addEventListener('DOMContentLoaded', function() {
//     const animationElement = document.getElementById('text');
//     let currentIndex = 0;
//     let intervalId;
//     const texts = [ "MyAuto", "O grupo TechLine Apresenta...." ];
//     let currentTextIndex = 0;

//     // Função para mostrar uma letra de cada vez
//     function showNextLetter(text) {
//         if (currentIndex < text.length) {
//             animationElement.textContent += text[currentIndex];
//             currentIndex++;
//         } else {
//             clearInterval(intervalId);
//             // Espera 1 segundo antes de chamar a função para desaparecer o texto
//             setTimeout(function() {
//                 currentIndex = 0;
//                 intervalId = setInterval(function() {
//                     if (currentIndex <= text.length) {
//                         animationElement.textContent = text.substring(0, text.length - currentIndex);
//                         currentIndex++;
//                     } else {
//                         clearInterval(intervalId);
//                         // Chama a função para mostrar o próximo texto
//                         showNextText();
//                     }
//                 }, 50); // Tempo de aparição das letras
//             }, 1000);
//         }
//     }

//     // Função para exibir o próximo texto
//     function showNextText() {
//         currentIndex = 0;
//         currentTextIndex = (currentTextIndex + 1) % texts.length; // Avança para o próximo texto
//         const currentText = texts[currentTextIndex];
//         intervalId = setInterval(function() {
//             showNextLetter(currentText);
//         }, 200);
//     }

//     // Inicia a animação
//     showNextText();
// });
