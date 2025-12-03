
  
    async function convertCurrency() {
      const amount = document.getElementById('fromAmount').value;
      const fromCurrency = document.getElementById('fromCurrency').value.split(' ')[0];
      const toCurrency = document.getElementById('toCurrency').value.split(' ')[0];
      const resultText = document.getElementById('resultText');

      if (!amount || !fromCurrency || !toCurrency) {
        resultText.style.display = 'block';
        resultText.style.background = '#ffebee';
        resultText.style.color = '#c62828';
        resultText.textContent = 'Please fill in all fields';
        return;
      }

      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        
        document.getElementById('toAmount').value = convertedAmount;
        
        resultText.style.display = 'block';
        resultText.style.background = '#e8f5e9';
        resultText.style.color = '#2e7d32';
        resultText.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      } catch (error) {
        resultText.style.display = 'block';
        resultText.style.background = '#ffebee';
        resultText.style.color = '#c62828';
        resultText.textContent = 'Error fetching exchange rates. Please try again.';
      }
    }

    // Allow Enter key to trigger conversion
    document.getElementById('fromAmount').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') convertCurrency();
    });
  