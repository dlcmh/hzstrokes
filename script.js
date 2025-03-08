document.getElementById('character-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  const characterInput = document.getElementById('character-input').value.trim();
  const charactersContainer = document.getElementById('characters-container');

  // Clear previous characters
  charactersContainer.innerHTML = '';

  if (characterInput.length > 0) {
    const characters = characterInput.split(''); // Split input into individual characters

    characters.forEach((char, index) => {
      // Create a container for each character
      const charWrapper = document.createElement('div');
      charWrapper.classList.add('character-wrapper');
      charWrapper.id = `character-${index}`;
      charactersContainer.appendChild(charWrapper);

      // Initialize HanziWriter for each character
      const writer = HanziWriter.create(`character-${index}`, char, {
        width: 100,
        height: 100,
        padding: 5,
        strokeAnimationSpeed: 2,
        delayBetweenStrokes: 300,
        radicalColor: '#FF0000',
      });

      // Animate the character
      writer.animateCharacter();
    });
  } else {
    alert('Please enter at least one Chinese character.');
  }
});
