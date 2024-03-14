// DOM Elements
let main = document.querySelector('section');
let input = document.querySelector('#search');
let button = document.querySelector('#submit');
let option = document.querySelector('select');

// Function to fetch top headlines when the page loads
function fetchTopHeadlines() {
    const url = 'https://newsapi.org/v2/top-headlines?country=in&pageSize=12&apiKey=c3c7d221da0b4df8abff5ef607b0c168';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayArticles(data.articles);
        })
        .catch(error =>
            console.log(error)
        );
}

// Function to display articles on the page
function displayArticles(articles) {
    main.innerHTML = '';
    articles.forEach(article => {
        let div = document.createElement('div');
        let img = document.createElement('img');
        let content = document.createElement('p');
        let heading = document.createElement('h3');
        let link = document.createElement('a');

        // Set image source and alt text
        if (article.urlToImage) {
            img.src = article.urlToImage;
            img.alt = "Image";
        } else {
            img.src = './image/noImage.jpg';
            img.alt = "No Image Available";
            noImage = true;
        }

        // Set content, heading, and link properties
        content.textContent = article.description;
        heading.textContent = article.title;
        link.textContent = `Read More >>`;
        link.target = `_blank`;
        link.href = article.url;

        main.append(div);
        div.appendChild(img);
        div.append(heading);
        div.appendChild(content);
        div.append(link);
    })
}

// Fetch top headlines when the page loads
fetchTopHeadlines();

// Event listener for search button click
button.addEventListener("click", () => {
    let formattedDate = LatestDate();
    let sort = option.value;
    let url = `https://newsapi.org/v2/everything?q=${input.value}&from=${formattedDate}&sortBy=${sort}&pageSize=12&apiKey=c3c7d221da0b4df8abff5ef607b0c168`;
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            if (data.articles.length === 0) {
                alert("No data found for the searched query.");
                return;
            }
            displayArticles(data.articles);

        })
        .catch((error) =>
            alert(`Unable to retrieve articles: ${error}. Please try again later.`));
});

// Function to get the latest date in the required format
function LatestDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day - 1}`;
    return formattedDate;
} 
