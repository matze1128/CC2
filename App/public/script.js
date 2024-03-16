async function translateText() {
    const textToTranslate = document.getElementById('textToTranslate').value;
    const targetLanguage = document.getElementById('targetLanguage').value;
    const translationResultElement = document.getElementById('translationResult');
    const detectedLanguageElement = document.getElementById('detectedLanguage');
  
    const backendUrl = "http://localhost:3001/translate"; // Anpassen
  
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: textToTranslate,
          targetLang: targetLanguage
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        const translation = data.translation;
        translationResultElement.textContent = `Übersetzung: ${translation}`;
        detectedLanguageElement.textContent = `Quelle: ${data.source}`;
      } else {
        console.log(response);
        console.error('Fehler beim Anfordern der Übersetzung', response);
        translationResultElement.textContent = 'Fehler bei der Übersetzung.';
        detectedLanguageElement.textContent = ''; // Löscht den Text der erkannten Sprache im Fehlerfall
      }
    } catch (error) {
      console.error('Fehler beim Anfordern der Übersetzung', error);
      translationResultElement.textContent = 'Fehler bei der Übersetzung.';
      detectedLanguageElement.textContent = ''; // Löscht den Text der erkannten Sprache im Fehlerfall
    }
  }
  