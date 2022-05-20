// Global Variables
let apiQuotes = [];
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const btnTwitter = document.getElementById("twitter");
const btnNewQuote = document.getElementById("new-quote");
const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Complete Loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
  loading();
  const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // If Author Entry Property Value is Blank
  if (!randomQuote.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = randomQuote.author;
  }

  // If Quote is Too Long
  if (randomQuote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = randomQuote.text;
  complete();
}

// Get Quotes From the API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (e) {
    // Catch An Error
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
btnTwitter.addEventListener("click", tweetQuote);
btnNewQuote.addEventListener("click", newQuote);

// On Load
getQuotes();
