var mykey = "get_your_own_key";
let character;
let charcterQuote;
let imgLink;
const quoteFetch = async () => {
	let response = await fetch(
		"https://adventure-time-quote-api.glitch.me/api/random"
	);
	let quote = await response.json();
	let quoteSplit = quote.split(":");
	characterQuote = quoteSplit[1];
	character = quoteSplit[0];
	imgFetch();
};
const imgFetch = async () => {
	let imgResponse = await fetch(
		`https://app.zenserp.com/api/v2/search?apikey=${mykey}&q=Adventure%20Time%20${character.replace(
			" ",
			"%20"
		)}&tbm=isch`
	);
	console.log(imgResponse);
	if (imgResponse.ok === true) {
		let imgJson = await imgResponse.json();
		imgLink = await imgJson.image_results[0].sourceUrl;
		enterTheDOM(character, characterQuote, imgLink);
	} else {
		imgLink = "charactercast.png";
	}
	enterTheDOM(character, characterQuote, imgLink);
};

const enterTheDOM = (name, quote, imgUrl) => {
	let container = document.createElement("div");
	container.classList.add("container");
	container.style.display = "none";
	let titleElement = document.createElement("h1");
	let quoteElement = document.createElement("div");
	let imgElement = document.createElement("img");
	imgElement.src = imgUrl;
	imgElement.classList.add("bounce");
	titleElement.textContent = name.replace("%20", " ");
	titleElement.style.fontFamily = "Playfair Display,serif";
	titleElement.style.fontSize = "6vh";
	titleElement.style.textShadow = "5px 5px 5px whitesmoke";
	quoteElement.textContent = quote;
	quoteElement.style.fontFamily = "Prata,serif";
	quoteElement.style.fontSize = "2vh";
	document.querySelector("main").appendChild(container);
	container.appendChild(imgElement);
	container.appendChild(titleElement);
	container.appendChild(quoteElement);
	reveal(true);
};
function reveal(finished) {
	if (finished === true) {
		document
			.querySelector("main")
			.removeChild(document.querySelector(".spinner"));
		document.querySelector(".container").style.display = "block";
	} else console.log("adventure cancelled");
}
quoteFetch();
