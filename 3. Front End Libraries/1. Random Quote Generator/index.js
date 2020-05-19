const colors = [
  "#00909e",
  "#649d66",
  "#f4a548",
  "#862a5c",
  "#af8baf",
  "#f79071",
  "#fa744f",
  "#43d8c9",
  "#95389e",
  "#512b58",
  "#d8345f",
  "#342ead",
  "#efa8e4",
];

const quotes = [
  {
    text:
      "I was looking for something a lot heavier, yet melodic at the same time. Something different from heavy metal, a different attitude.",
    author: "Kurt Cobain",
  },
  {
    text:
      "All that stuff about heavy metal and hard rock, I don't subscribe to any of that. It's all just music. I mean, the heavy metal from the '70s sounds nothing like the stuff from the '80s, and that sounds nothing like the stuff from the '90s. Who's to say what is and isn't a certain type of music?",
    author: "Neil Young",
  },
  {
    text:
      "All that stuff about heavy metal and hard rock, I don't subscribe to any of that. It's all just music. I mean, the heavy metal from the Seventies sounds nothing like the stuff from the Eighties, and that sounds nothing like the stuff from the Nineties. Who's to say what is and isn't a certain type of music?",
    author: "Ozzy Osbourne",
  },
  {
    text:
      "You have to respect people for what they do. Just because you don't like it, it's like, I don't like heavy metal too much, but I can still respect it.",
    author: "Logic",
  },
  {
    text:
      "The misunderstanding out there is that we are a 'hard rock' band or a 'heavy metal' band. We've only ever been a rock n' roll band.",
    author: "Angus Young",
  },
  {
    text:
      "It's a heavy weight, the camera. Now we have modern and lightweight, small plastic cameras, but in the '70s they were heavy metal.",
    author: "Annie Leibovitz",
  },
  {
    text:
      "I like to put on hardcore when I have to clean my apartment, which I hate to do, but it's motivational. I like old heavy metal when I'm outside working on my car. Music has definite functions for me.",
    author: "Peter Steele",
  },
  {
    text:
      "When I was a kid, I loved a heavy metal band called Motley Crue. I was thirteen when they came to my city, and I called every hotel in the Yellow Pages asking for a room by the name of their manager in hopes of meeting the band. After two or three hours of calling hotels, I got through, and the manager's brother answered the phone.",
    author: "Steve-O",
  },
  {
    text:
      "Venom was a joke in the '80s, their heavy metal music sucked big time, and I really have no interest in them - not then, not now.",
    author: "Varg Vikernes",
  },
  {
    text:
      "I write almost all my songs on an acoustic guitar, even if they turn into rock songs, hard rock songs, metal songs, heavy metal songs, really heavy songs... I love writing on an acoustic because I can hear what every string is doing; the vibrations haven't been combined in a collision of distortion or effects yet.",
    author: "Corey Taylor",
  },
  {
    text:
      "I truly believe heavy metal has gone south. Too many people are focusing on, will the songs be on the radio, will the shirt be in Hot Topic?",
    author: "Ivan Moody",
  },
  {
    text:
      "When Klopp speaks about his football being heavy metal, I understand completely. It is so aggressive. For the fans, it is really good.",
    author: "Pep Guardiola",
  },
  {
    text:
      "It was a free-for-all with music when I was growing up. My mother was a huge music fanatic so I was listening to everything from country to heavy metal to Indigo Girls to Elton John. I guess when I was really young I didn't like Willie Nelson, and she obviously loved him. Now I do too, I'm so thankful to her for playing his music nonstop.",
    author: "Tig Notaro",
  },
  {
    text:
      "The guitar influence that affected my songwriting came from the New Wave of British Heavy Metal.",
    author: "Dave Mustaine",
  },
  {
    text:
      "Everything I do is autobiographical in some way. 'Wayne's World' was me growing up in the suburbs of Toronto and listening to heavy metal, and 'Austin Powers' was every bit of British culture that my father, who passed away in 1991, had forced me to watch and taught me to love.",
    author: "Mike Myers",
  },
  {
    text:
      "I wasn't that wild about that. I told them basically if they were really going to want to bring back heavy metal to a program on MTV, then they are really going to have to get in touch with what real heavy metal is.",
    author: "Phil Anselmo",
  },
  {
    text:
      "I tried to take heavy metal... and balled it up and chopped it in half and really tried to create a new form of energy. I really tried to re-shape extreme music as I see it through my eyes.",
    author: "Phil Anselmo",
  },
  {
    text:
      "In grade one and two, I was definitely into heavy metal and Satanic rock music, bands that had attributes that were quote-unquote 'Satanic,' even things like the Rolling Stones with 'Their Satanic Majesties Request' and 'Sympathy for the Devil,' but also like Motley Crue and Kiss and Alice Cooper.",
    author: "Tobias Forge",
  },
  {
    text: "If heavy metal bands ruled the world, we'd be a lot better off.",
    author: "Bruce Dickinson",
  },
  {
    text:
      "At 15, I started listening to hard rock and heavy metal, but I would say it was more hard rock because I liked Kiss, Aerosmith, Ted Nugent, and eventually AC/DC.",
    author: "Rick Rubin",
  },
];

// Get the first random quote
let index = Math.floor(Math.random() * 10) % quotes.length;
$("#text").text(quotes[index].text);
$("#author").text("- " + quotes[index].author);

// Update the colors for the first time
let colorIndex = Math.floor((Math.random() * 10) % colors.length);
let color = colors[colorIndex];
$("body").css("background-color", color);
$("#tweet-quote").css("background-color", color);
$("#new-quote").css("background-color", color);

// When new-quote is clicked
function getAnotherQuote() {
  let nextIndex = getRandNum();
  // We want a different quote, not the same one
  if (nextIndex === index) {
    getAnotherQuote();
  } else {
    console.log("RANDOM NUM: " + index);
    $("#text").text(quotes[nextIndex].text);
    $("#author").text("- " + quotes[nextIndex].author);
    index = nextIndex;
    document.getElementById("tweet-quote").href =
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(quotes[nextIndex].text);

    // Now update the color
    colorIndex = Math.floor((Math.random() * 10) % colors.length);
    color = colors[colorIndex];
    $("body").css("background-color", color);
    $("#tweet-quote").css("background-color", color);
    $("#new-quote").css("background-color", color);
    return;
  }

  function getRandNum() {
    let nextIndex = Math.floor(Math.random() * 10) % quotes.length;
    return nextIndex;
  }
}

document.getElementById("new-quote").addEventListener("click", getAnotherQuote);
