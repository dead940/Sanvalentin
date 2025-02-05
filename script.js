const rows = 4, cols = 4;
const puzzleContainer = document.getElementById("puzzle-container");
const imageUrl = "amor.jpg"; // Reemplaza esto con el nombre de tu imagen
let pieces = [];

// Crear piezas
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        let piece = document.createElement("div");
        piece.classList.add("piece");
        piece.style.backgroundImage = `url(${imageUrl})`;
        piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
        piece.setAttribute("data-row", row);
        piece.setAttribute("data-col", col);
        piece.draggable = true;
        puzzleContainer.appendChild(piece);
        pieces.push(piece);
    }
}

// Mezclar piezas
pieces.sort(() => Math.random() - 0.5);
pieces.forEach(piece => puzzleContainer.appendChild(piece));

let draggedPiece = null;

// Eventos de arrastrar y soltar
pieces.forEach(piece => {
    piece.addEventListener("dragstart", (e) => {
        draggedPiece = piece;
        setTimeout(() => piece.style.visibility = "hidden", 0);
    });

    piece.addEventListener("dragend", (e) => {
        setTimeout(() => {
            piece.style.visibility = "visible";
            draggedPiece = null;
        }, 0);
    });

    piece.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    piece.addEventListener("drop", (e) => {
        e.preventDefault();
        if (piece !== draggedPiece) {
            // Intercambiar posiciones
            let draggedIndex = pieces.indexOf(draggedPiece);
            let targetIndex = pieces.indexOf(piece);

            puzzleContainer.insertBefore(draggedPiece, piece);
            puzzleContainer.insertBefore(piece, puzzleContainer.children[draggedIndex]);

            // Actualizar el array de piezas
            [pieces[draggedIndex], pieces[targetIndex]] = [pieces[targetIndex], pieces[draggedIndex]];

            // Verificar si el rompecabezas está completo
            checkWin();
        }
    });
});

// Verificar si el rompecabezas está armado correctamente
function checkWin() {
    let isComplete = pieces.every((piece, index) => {
        let correctRow = piece.getAttribute("data-row");
        let correctCol = piece.getAttribute("data-col");
        let currentRow = Math.floor(index / cols);
        let currentCol = index % cols;
        return correctRow == currentRow && correctCol == currentCol;
    });

    if (isComplete) {
        setTimeout(() => alert("¡Feliz San Valentín! Has completado el rompecabezas."), 100);
    }
}
