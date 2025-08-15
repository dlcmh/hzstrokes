// Add real-time mirroring of input
document.getElementById('character-input').addEventListener('input', function () {
  const mirrorDisplay1 = document.getElementById('mirror-display-1');
  const mirrorDisplay2 = document.getElementById('mirror-display-2');
  const inputValue = this.value.trim();
  
  if (inputValue.length > 0) {
    mirrorDisplay1.textContent = inputValue;
    mirrorDisplay2.textContent = inputValue;
    mirrorDisplay1.classList.remove('hidden');
    mirrorDisplay2.classList.remove('hidden');
  } else {
    mirrorDisplay1.classList.add('hidden');
    mirrorDisplay2.classList.add('hidden');
  }
});

// Function to trigger animation
function triggerAnimation(characterInput) {
  const charactersContainer = document.getElementById('characters-container');

  // Clear previous characters
  charactersContainer.innerHTML = '';

  if (characterInput.length > 0) {
    const characters = characterInput.split(''); // Split input into individual characters

    characters.forEach((char, index) => {
      // Create the main container for the character
      const charWrapper = document.createElement('div');
      // w-24 h-24 sets a base responsive size (6rem * 16px = 96px)
      // aspect-square ensures it stays square
      // border border-red-300 adds a border
      // rounded-lg gives it rounded corners
      // relative is needed for absolute positioning of children
      // grid grid-cols-1 grid-rows-1 places children in the same cell
      charWrapper.className = 'w-24 h-24 aspect-square border border-red-300 rounded-lg relative grid grid-cols-1 grid-rows-1';
      charWrapper.id = `character-${index}-wrapper`; // Give wrapper a new ID
      charactersContainer.appendChild(charWrapper);

      // --- Create Guide Layer ---
      const guideLayer = document.createElement('div');
      // col-start-1 row-start-1 places it in the first grid cell
      // z-0 sets z-index to 0 (lower)
      guideLayer.className = 'col-start-1 row-start-1 z-0';
      guideLayer.id = `character-${index}-guide`;
      charWrapper.appendChild(guideLayer);

      // --- Create Stroke Layer ---
      const strokeLayer = document.createElement('div');
      // col-start-1 row-start-1 places it in the first grid cell
      // z-10 sets z-index to 10 (higher than guide)
      // flex items-center justify-center centers the canvas
      strokeLayer.className = 'col-start-1 row-start-1 z-10 flex items-center justify-center';
      strokeLayer.id = `character-${index}`; // This is the ID HanziWriter will target
      charWrapper.appendChild(strokeLayer);

      // --- Create SVG Guide Lines inside guideLayer ---
      const svgNS = "http://www.w3.org/2000/svg";
      const size = 96; // Matches w-24/h-24

      // Create an SVG element for the guide lines
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("class", "absolute inset-0 w-full h-full");
      svg.setAttribute("viewBox", `0 0 ${size} ${size}`); // Set viewBox for correct scaling

      // Style for all lines
      const lineStyle = "stroke:#fecaca;stroke-width:0.5"; // Tailwind red-200

      const center = size / 2;
      // Create lines: Horizontal, Vertical, Diagonal 1, Diagonal 2
      const linesData = [
        { x1: 0, y1: center, x2: size, y2: center }, // Horizontal
        { x1: center, y1: 0, y2: size, x2: center }, // Vertical (corrected order)
        { x1: 0, y1: 0, x2: size, y2: size },       // Diagonal 1
        { x1: 0, y1: size, x2: size, y2: 0 }        // Diagonal 2
      ];

      linesData.forEach(data => {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", data.x1);
        line.setAttribute("y1", data.y1);
        line.setAttribute("x2", data.x2);
        line.setAttribute("y2", data.y2);
        line.setAttribute("style", lineStyle);
        svg.appendChild(line);
      });

      // Append the SVG guide lines to the guide layer
      guideLayer.appendChild(svg);

      // Initialize HanziWriter for each character, targeting the strokeLayer
      const writer = HanziWriter.create(`character-${index}`, char, {
        width: size,
        height: size,
        padding: 5,
        strokeAnimationSpeed: 2,
        delayBetweenStrokes: 300,
        radicalColor: '#EF4444', // Tailwind red-500
      });

      // Animate the character
      writer.animateCharacter();
    });
  } else {
    alert('Please enter at least one Chinese character.');
  }
}

// Handle form submission
document.getElementById('character-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  const characterInput = document.getElementById('character-input').value.trim();
  
  // Update URL with the current text
  const url = new URL(window.location);
  url.searchParams.set('text', characterInput);
  window.history.replaceState({}, '', url);

  triggerAnimation(characterInput);
});

// Check for 'text' query parameter on page load
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const textParam = urlParams.get('text');

  if (textParam) {
    // Populate the input field
    document.getElementById('character-input').value = textParam;
    
    // Trigger the animation
    triggerAnimation(textParam);
    
    // Update the mirror displays
    const mirrorDisplay1 = document.getElementById('mirror-display-1');
    const mirrorDisplay2 = document.getElementById('mirror-display-2');
    
    if (textParam.length > 0) {
      mirrorDisplay1.textContent = textParam;
      mirrorDisplay2.textContent = textParam;
      mirrorDisplay1.classList.remove('hidden');
      mirrorDisplay2.classList.remove('hidden');
    } else {
      mirrorDisplay1.classList.add('hidden');
      mirrorDisplay2.classList.add('hidden');
    }
  }
});
