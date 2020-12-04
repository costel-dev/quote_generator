const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

/* ParticleJS */
  window.onload = function(){
    Particles.init({
      // normal options
      selector: '.background',
      maxParticles: 250,
      color: '#38a1f3',
      connectParticles: 'true',
      // options for breakpoints
      responsive: [
        {
          breakpoint: 1000,
          options: {
            maxParticles: 50,
            color: '#38a1f3',
            connectParticles: true
          }
        }
      ]
    });
  }

// Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    if(!loader.hidden){
       quoteContainer.hidden = false;
         loader.hidden = true;
    }
}

// get quote from API
async function getQuote(){
    // before start fetching our quote we display our Loader
    loading();
    const proxyUrl = "https://quiet-hamlet-76148.herokuapp.com/"
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if(data.quoteAuthor === ""){
            authorText.innerText = "Unknown"
        }else {
            authorText.innerText ="- " + data.quoteAuthor + " -";
        } 
        // Reduce font size for long quotes
        if(data.quoteText.length > 120){
            quoteText.classList.add("long-quote");
        }else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader and Show the Quote 
        complete();
    } catch (error) {
        getQuote();
    }
}
// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();