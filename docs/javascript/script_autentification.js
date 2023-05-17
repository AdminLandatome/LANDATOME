 function sha256(str) {
      const buffer = new TextEncoder().encode(str);
  
      return crypto.subtle.digest('SHA-256', buffer)
        .then(hash => {
          const hexHash = Array.from(new Uint8Array(hash))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
            
          return hexHash;
        });
    }
  
    function handleHash() {
      const plaintextInput = document.getElementById('plaintext');
      const plaintext = plaintextInput.value;
      sha256(plaintext)
        .then(hash => {
          const modifiedHash = hash.slice(0, 20) + '/' + hash.slice(20) + '.html';
          document.getElementById('hashResult').textContent = modifiedHash;
          
          openPage(modifiedHash);
        })
        .catch(error => {
          console.error('Une erreur s\'est produite :', error);
        })
        .finally(() => {
          plaintextInput.value = ''; // Réinitialiser le champ de saisie
        });
    }
    
    function openPage(pageName) {
      window.open(pageName, '_blank');
    }