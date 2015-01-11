/*
Welcome to the 60fps project! Your goal is to make Cam's Pizzeria website run
jank-free at 60 frames per second.

There are two major issues in this code that lead to sub-60fps performance. Can
you spot and fix both?


Built into the code, you'll find a few instances of the User Timing API
(window.performance), which will be console.log()ing frame rate data into the
browser console. To learn more about User Timing API, check out:
http://www.html5rocks.com/en/tutorials/webperformance/usertiming/

Creator:
Cameron Pittman, Udacity Course Developer
cameron *at* udacity *dot* com
*/

// As you may have realized, this website randomly generates pizzas.
// Here are arrays of all possible pizza ingredients.
var pizzaIngredients = {};
pizzaIngredients.meats = [
  "Pepperoni",
  "Sausage",
  "Fennel Sausage",
  "Spicy Sausage",
  "Chicken",
  "BBQ Chicken",
  "Chorizo",
  "Chicken Andouille",
  "Salami",
  "Tofu",
  "Bacon",
  "Canadian Bacon",
  "Proscuitto",
  "Italian Sausage",
  "Ground Beef",
  "Anchovies",
  "Turkey",
  "Ham",
  "Venison",
  "Lamb",
  "Duck",
  "Soylent Green",
  "Carne Asada",
  "Soppressata Picante",
  "Coppa",
  "Pancetta",
  "Bresola",
  "Lox",
  "Guanciale",
  "Chili",
  "Beef Jerky",
  "Pastrami",
  "Kielbasa",
  "Scallops",
  "Filet Mignon"
];
pizzaIngredients.nonMeats = [
  "White Onions",
  "Red Onions",
  "Sauteed Onions",
  "Green Peppers",
  "Red Peppers",
  "Banana Peppers",
  "Ghost Peppers",
  "Habanero Peppers",
  "Jalapeno Peppers",
  "Stuffed Peppers",
  "Spinach",
  "Tomatoes",
  "Pineapple",
  "Pear Slices",
  "Apple Slices",
  "Mushrooms",
  "Arugula",
  "Basil",
  "Fennel",
  "Rosemary",
  "Cilantro",
  "Avocado",
  "Guacamole",
  "Salsa",
  "Swiss Chard",
  "Kale",
  "Sun Dried Tomatoes",
  "Walnuts",
  "Artichoke",
  "Asparagus",
  "Caramelized Onions",
  "Mango",
  "Garlic",
  "Olives",
  "Cauliflower",
  "Polenta",
  "Fried Egg",
  "Zucchini",
  "Hummus"
];
pizzaIngredients.cheeses = [
  "American Cheese",
  "Swiss Cheese",
  "Goat Cheese",
  "Mozzarella Cheese",
  "Parmesean Cheese",
  "Velveeta Cheese",
  "Gouda Cheese",
  "Muenster Cheese",
  "Applewood Cheese",
  "Asiago Cheese",
  "Bleu Cheese",
  "Boursin Cheese",
  "Brie Cheese",
  "Cheddar Cheese",
  "Chevre Cheese",
  "Havarti Cheese",
  "Jack Cheese",
  "Pepper Jack Cheese",
  "Gruyere Cheese",
  "Limberger Cheese",
  "Manchego Cheese",
  "Marscapone Cheese",
  "Pecorino Cheese",
  "Provolone Cheese",
  "Queso Cheese",
  "Roquefort Cheese",
  "Romano Cheese",
  "Ricotta Cheese",
  "Smoked Gouda"
];
pizzaIngredients.sauces = [
  "Red Sauce",
  "Marinara",
  "BBQ Sauce",
  "No Sauce",
  "Hot Sauce"
];
pizzaIngredients.crusts = [
  "White Crust",
  "Whole Wheat Crust",
  "Flatbread Crust",
  "Stuffed Crust"
];

// Anna: I capitalized all the words to avoid having to use the capitalize function for both adjective and nouns
// cleaned up retriving adjectives and nouns
var adjectives = [
  ["Dark","Morbid", "Scary", "Spooky", "Gothic", "Deviant", "Creepy", "Sadistic", "Black", "Dangerous", "Dejected", "Haunted", 
"Morose", "Tragic", "Shattered", "Broken", "Sad", "Melancholy", "Somber", "Dark", "Gloomy", "Homicidal", "Murderous", "Shady", "Misty", 
"Dusky", "Ghostly", "Shadowy", "Demented", "Cursed", "Insane", "Possessed", "Grotesque", "Obsessed"],
  ["Blue", "Green", "Purple", "Grey", "Scarlet", "NeonGreen", "NeonBlue", "NeonPink", "HotPink", "Pink", "Black", "Red", 
"Maroon", "Silver", "Golden", "Yellow", "Orange", "Mustard", "Plum", "Violet", "Cerulean", "Brown", "Lavender", "Violet", "Magenta",
"Chestnut", "Rosy", "Copper", "Crimson", "Teal", "Indigo", "Navy", "Azure", "Periwinkle", "Brassy", "Verdigris", "Veridian", "Tan", 
"Raspberry", "Beige", "Sandy", "ElectricBlue", "White", "Champagne", "Coral", "Cyan"],
  ["Whimsical", "Silly", "Drunken", "Goofy", "Funny", "Weird", "Strange", "Odd", "Playful", "Clever", "Boastful", "Breakdancing",
"Hilarious", "Conceited", "Happy", "Comical", "Curious", "Peculiar", "Quaint", "Quirky", "Fancy", "Wayward", "Fickle", "Yawning", "Sleepy",
"Cockeyed", "Dizzy", "Dancing", "Absurd", "Laughing", "Hairy", "Smiling", "Perplexed", "Baffled", "Cockamamie", "Vulgar", "Hoodwinked", 
"Brainwashed"],
  ["Sapphire", "Opal", "Silver", "Gold", "Platinum", "Ruby", "Emerald", "Topaz", "Diamond", "Amethyst", "Turquoise", 
"Starlit", "Moonlit", "Bronze", "Metal", "Jade", "Amber", "Garnet", "Obsidian", "Onyx", "Pearl", "Copper", "Sunlit", "Brass", "Brassy",
"Metallic"],
  ["Untuned", "Loud", "Soft", "Shrieking", "Melodious", "Musical", "Operatic", "Symphonic", "Dancing", "Lyrical", "Harmonic", 
"Orchestral", "Noisy", "Dissonant", "Rhythmic", "Hissing", "Singing", "Crooning", "Shouting", "Screaming", "Wailing", "Crying", "Howling",
"Yelling", "Hollering", "Caterwauling", "Bawling", "Bellowing", "Roaring", "Squealing", "Beeping", "Knocking", "Tapping", "Rapping", 
"Humming", "Scatting", "Whispered", "Whispering", "Rasping", "Buzzing", "Whirring", "Whistling", "Whistled"],
  ["Nuclear", "Apocalyptic", "Desolate", "Atomic", "Zombie", "Collapsed", "Grim", "Fallen", "Collapsed", "Cannibalistic", 
"Radioactive", "Toxic", "Poisonous", "Venomous", "Disastrous", "Grimy", "Dirty", "Undead", "Bloodshot", "Rusty", "Glowing", "Decaying",
"Rotten", "Deadly", "Plagued", "Decimated", "Rotting", "Putrid", "Decayed", "Deserted", "Acidic"],
  ["Stupid", "Idiotic", "Fat", "Ugly", "Hideous", "Grotesque", "Dull", "Dumb", "Lazy", "Sluggish", "Brainless", "Slow", 
"Gullible", "Obtuse", "Dense", "Dim", "Dazed", "Ridiculous", "Witless", "Daft", "Crazy", "Vapid", "Inane", "Mundane", "Hollow", "Vacuous",
"Boring", "Insipid", "Tedious", "Monotonous", "Weird", "Bizarre", "Backward", "Moronic", "Ignorant", "Scatterbrained", "Forgetful", "Careless", 
"Lethargic", "Insolent", "Indolent", "Loitering", "Gross", "Disgusting", "Bland", "Horrid", "Unseemly", "Revolting", "Homely", "Deformed",
"Disfigured", "Offensive", "Cowardly", "Weak", "Villainous", "Fearful", "Monstrous", "Unattractive", "Unpleasant", "Nasty", "Beastly", "Snide", 
"Horrible", "Syncophantic", "Unhelpful", "Bootlicking"],
  ["Beautiful", "Intelligent", "Smart", "Genius", "Ingenious", "Gorgeous", "Pretty", "Witty", "Angelic", "Handsome", "Graceful",
"Talented", "Exquisite", "Enchanting", "Fascinating", "Interesting", "Divine", "Alluring", "Ravishing", "Wonderful", "Magnificient", "Marvelous",
"Dazzling", "Cute", "Charming", "Attractive", "Nifty", "Delightful", "Superior", "Amiable", "Gentle", "Heroic", "Courageous", "Valiant", "Brave", 
"Noble", "Daring", "Fearless", "Gallant", "Adventurous", "Cool", "Enthusiastic", "Fierce", "Awesome", "Radical", "Tubular", "Fearsome", 
"Majestic", "Grand", "Stunning"],
  ["Scientific", "Technical", "Digital", "Programming", "Calculating", "Formulating", "Cyberpunk", "Mechanical", "Technological", 
"Innovative", "Brainy", "Chemical", "Quantum", "Astro", "Space", "Theoretical", "Atomic", "Electronic", "Gaseous", "Investigative", "Solar", 
"Extinct", "Galactic"]
]

// Anna: precalculate the lengths
var adjectiveLens = [];
for (k in adjectives)
  adjectiveLens.push(adjectives[k].length);

var nouns = [
  ["Flamingo", "Hedgehog", "Owl", "Elephant", "Pussycat", "Alligator", "Dachsund", "Poodle", "Beagle", "Crocodile", "Kangaroo", 
"Wallaby", "Woodpecker", "Eagle", "Falcon", "Canary", "Parrot", "Parakeet", "Hamster", "Gerbil", "Squirrel", "Rat", "Dove", "Toucan", 
"Raccoon", "Vulture", "Peacock", "Goldfish", "Rook", "Koala", "Skunk", "Goat", "Rooster", "Fox", "Porcupine", "Llama", "Grasshopper", 
"Gorilla", "Monkey", "Seahorse", "Wombat", "Wolf", "Giraffe", "Badger", "Lion", "Mouse", "Beetle", "Cricket", "Nightingale", 
"Hawk", "Trout", "Squid", "Octopus", "Sloth", "Snail", "Locust", "Baboon", "Lemur", "Meerkat", "Oyster", "Frog", "Toad", "Jellyfish", 
"Butterfly", "Caterpillar", "Tiger", "Hyena", "Zebra", "Snail", "Pig", "Weasel", "Donkey", "Penguin", "Crane", "Buzzard", "Vulture", 
"Rhino", "Hippopotamus", "Dolphin", "Sparrow", "Beaver", "Moose", "Minnow", "Otter", "Bat", "Mongoose", "Swan", "Firefly", "Platypus"],
  ["Doctor", "Lawyer", "Ninja", "Writer", "Samurai", "Surgeon", "Clerk", "Artist", "Actor", "Engineer", "Mechanic",
"Comedian", "Fireman", "Nurse", "RockStar", "Musician", "Carpenter", "Plumber", "Cashier", "Electrician", "Waiter", "President", "Governor", 
"Senator", "Scientist", "Programmer", "Singer", "Dancer", "Director", "Mayor", "Merchant", "Detective", "Investigator", "Navigator", "Pilot",
"Priest", "Cowboy", "Stagehand", "Soldier", "Ambassador", "Pirate", "Miner", "Police"],
  ["Centaur", "Wizard", "Gnome", "Orc", "Troll", "Sword", "Fairy", "Pegasus", "Halfling", "Elf", "Changeling", "Ghost", 
"Knight", "Squire", "Magician", "Witch", "Warlock", "Unicorn", "Dragon", "Wyvern", "Princess", "Prince", "King", "Queen", "Jester", 
"Tower", "Castle", "Kraken", "Seamonster", "Mermaid", "Psychic", "Seer", "Oracle"],
  ["Violin", "Flute", "Bagpipe", "Guitar", "Symphony", "Orchestra", "Piano", "Trombone", "Tuba", "Opera", "Drums", 
"Harpsichord", "Harp", "Harmonica", "Accordion", "Tenor", "Soprano", "Baritone", "Cello", "Viola", "Piccolo", "Ukelele", "Woodwind", "Saxophone",
"Bugle", "Trumpet", "Sousaphone", "Cornet", "Stradivarius", "Marimbas", "Bells", "Timpani", "Bongos", "Clarinet", "Recorder", "Oboe", "Conductor",
"Singer"],
  ["Murderer", "Chainsaw", "Knife", "Sword", "Murder", "Devil", "Killer", "Psycho", "Ghost", "Monster", "Godzilla", "Werewolf", 
"Vampire", "Demon", "Graveyard", "Zombie", "Mummy", "Curse", "Death", "Grave", "Tomb", "Beast", "Nightmare", "Frankenstein", "Specter", 
"Poltergeist", "Wraith", "Corpse", "Scream", "Massacre", "Cannibal", "Skull", "Bones", "Undertaker", "Zombie", "Creature", "Mask", "Psychopath",
"Fiend", "Satanist", "Moon", "FullMoon"],
  ["Slime", "Bug", "Roach", "Fluid", "Pus", "Booger", "Spit", "Boil", "Blister", "Orifice", "Secretion", "Mucus", "Phlegm", 
"Centipede", "Beetle", "Fart", "Snot", "Crevice", "Flatulence", "Juice", "Mold", "Mildew", "Germs", "Discharge", "Toilet", "Udder", "Odor", "Substance", 
"Fluid", "Moisture", "Garbage", "Trash", "Bug"],
  ["Mirror", "Knife", "Fork", "Spork", "Spoon", "Tupperware", "Minivan", "Suburb", "Lamp", "Desk", "Stereo", "Television", "TV",
"Book", "Car", "Truck", "Soda", "Door", "Video", "Game", "Computer", "Calender", "Tree", "Plant", "Flower", "Chimney", "Attic", "Kitchen",
"Garden", "School", "Wallet", "Bottle"],
  ["Earrings", "Ring", "Necklace", "Pendant", "Choker", "Brooch", "Bracelet", "Cameo", "Charm", "Bauble", "Trinket", "Jewelry", 
"Anklet", "Bangle", "Locket", "Finery", "Crown", "Tiara", "BlingBling", "Chain", "Rosary", "Jewel", "Gemstone", "Beads", "Armband", "Pin",
"Costume", "Ornament", "Treasure"],
  ["Swamp", "Graveyard", "Cemetery", "Park", "Building", "House", "River", "Ocean", "Sea", "Field", "Forest", "Woods", "Neighborhood",
"City", "Town", "Suburb", "Country", "Meadow", "Cliffs", "Lake", "Stream", "Creek", "School", "College", "University", "Library", "Bakery",
"Shop", "Store", "Theater", "Garden", "Canyon", "Highway", "Restaurant", "Cafe", "Diner", "Street", "Road", "Freeway", "Alley"],
  ["Robot", "Alien", "Raygun", "Spaceship", "UFO", "Rocket", "Phaser", "Astronaut", "Spaceman", "Planet", "Star", "Galaxy", 
"Computer", "Future", "TimeMachine", "WormHole", "TimeTraveler", "Scientist", "Invention", "Martian", "Pluto", "Jupiter", "Saturn", "Mars",
"Quasar", "BlackHole", "WarpDrive", "Laser", "Orbit", "Gears", "Molecule", "Electron", "Neutrino", "Proton", "Experiment", "Photon", "Apparatus",
"Universe", "Gravity", "DarkMatter", "Constellation", "Circuit", "Asteroid"]
]

// Anna: precalculate the lengths
var nounLens = [];
for (k in nouns)
  nounLens.push(nouns[k].length);

// Anna: precalculate the lengths
var adjectivesLen = adjectives.length;
var nounsLen = nouns.length;

// Generates random numbers for getAdj and getNoun functions and returns a new pizza name
// Anna: Cleaned up generating nouns and adjectives to be more efficient
function generator(adj, noun) {
  var adjectivesLocal = adjectives[adj];
  var nounsLocal = nouns[noun];
  var randomAdjective = (Math.random() * adjectiveLens[adj]) >> 0;
  var randomNoun = (Math.random() * nounLens[noun]) >> 0;
  var name = "The " + adjectivesLocal[randomAdjective] + " " + nounsLocal[randomNoun];
  return name;
};

// Anna: For all of the below randomizing functions, precalculated the length
// Chooses random adjective and random noun
function randomName() {
  var randomNumberAdj = (Math.random() * adjectivesLen) >> 0;
  var randomNumberNoun = (Math.random() * nounsLen) >> 0;
  return generator(randomNumberAdj, randomNumberNoun);
};

var meatsLen = pizzaIngredients.meats.length;
// These functions return a string of a random ingredient from each respective category of ingredients.
var selectRandomMeat = function() {
  return pizzaIngredients.meats[(Math.random() * meatsLen) >> 0];
}

var nonMeatsLen = pizzaIngredients.nonMeats.length;
var selectRandomNonMeat = function() {
  return pizzaIngredients.nonMeats[(Math.random() * nonMeatsLen) >> 0];
}

var cheesesLen = pizzaIngredients.cheeses.length;
var selectRandomCheese = function() {
  return pizzaIngredients.cheeses[(Math.random() * cheesesLen) >> 0];
}

var saucesLen = pizzaIngredients.sauces.length;
var selectRandomSauce = function() {
  return pizzaIngredients.sauces[(Math.random() * saucesLen) >> 0];
}

var crustsLen = pizzaIngredients.crusts.length;
var selectRandomCrust = function() {
  return pizzaIngredients.crusts[(Math.random() * crustsLen) >> 0];
}

var ingredientItemizer = function(string) {
  return "<li>" + string + "</li>";
}

// Returns a string with random pizza ingredients nested inside <li> tags
var makeRandomPizza = function() {
  var pizza = "";

  var numberOfMeats = (Math.random() * 4) >> 0;
  var numberOfNonMeats = (Math.random() * 3) >> 0;
  var numberOfCheeses = (Math.random() * 2) >> 0;
  var i;

  for (i = 0; i < numberOfMeats; i++) {
    pizza = pizza + ingredientItemizer(selectRandomMeat());
  }

  for (i = 0; i < numberOfNonMeats; i++) {
    pizza = pizza + ingredientItemizer(selectRandomNonMeat());
  }

  for (i = 0; i < numberOfCheeses; i++) {
    pizza = pizza + ingredientItemizer(selectRandomCheese());
  }

  pizza = pizza + ingredientItemizer(selectRandomSauce());
  pizza = pizza + ingredientItemizer(selectRandomCrust());

  return pizza;
}

// returns a DOM element for each pizza
var pizzaElementGenerator = function(i) {
  var pizzaContainer,             // contains pizza title, image and list of ingredients
      pizzaImageContainer,        // contains the pizza image
      pizzaImage,                 // the pizza image itself
      pizzaDescriptionContainer,  // contains the pizza title and list of ingredients
      pizzaName,                  // the pizza name itself
      ul;                         // the list of ingredients

  pizzaContainer  = document.createElement("div");
  pizzaImageContainer = document.createElement("div");
  pizzaImage = document.createElement("img");
  pizzaDescriptionContainer = document.createElement("div");

  pizzaContainer.classList.add("randomPizzaContainer");
  pizzaContainer.style.width = "33.33%";
  pizzaContainer.style.height = "325px";
  pizzaContainer.id = "pizza" + i;                // gives each pizza element a unique id
  pizzaImageContainer.classList.add("col-md-6");

  // Anna: use optimized image
  pizzaImage.src = "build/images/pizza.svg";
  pizzaImage.classList.add("img-responsive");
  pizzaImage.classList.add("pizza-img");
  pizzaImageContainer.appendChild(pizzaImage);
  pizzaContainer.appendChild(pizzaImageContainer);


  pizzaDescriptionContainer.classList.add("col-md-6");

  pizzaName = document.createElement("h4");
  pizzaName.innerHTML = randomName();
  pizzaDescriptionContainer.appendChild(pizzaName);

  ul = document.createElement("ul");
  ul.innerHTML = makeRandomPizza();
  pizzaDescriptionContainer.appendChild(ul);
  pizzaContainer.appendChild(pizzaDescriptionContainer);

  return pizzaContainer;
}

// Anna: variables to hold pizzas elements and their lenght
var pizzas;
var pizzasLen;
// resizePizzas(size) is called when the slider in the "Our Pizzas" section of the website moves.
var resizePizzas = function(size) { 
  window.performance.mark("mark_start_resize");   // User Timing API function

  var size = parseInt(size) - 1;
  var sizes = ["pizza-small", "pizza-medium", "pizza-large"];
  var sizeNames = ["Small", "Medium", "Large"];

  // Changes the value for the size of the pizza above the slider
  document.querySelector("#pizzaSize").innerHTML = sizeNames[size];

  // Returns the size difference to change a pizza element from one size to another. Called by changePizzaSlices(size).
  // function determineSize (elem, size) {
  //   var oldwidth = elem.offsetWidth;
  //   var windowwidth = document.querySelector("#randomPizzas").offsetWidth;
  //   var oldsize = oldwidth / windowwidth;
  // 	var newsize;
  // 	var dx;

  //   newsize = sizes[size];
  //   dx = (newsize - oldsize) * windowwidth;

  //   return (oldwidth + dx) + 'px';
  // }

  // Iterates through pizza elements on the page and changes their widths
  // Anna: Use classes when resizing pizza rather than recalculating styles on the fly
  function changePizzaSizes(size) {
    // var dx = null;
    // var newwidth;
    var i;
    var pizza;
    // if (pizzasLen) {
    //   newwidth = determineSize(pizzas[0], size);
    // }
    for (i = 0; i < pizzasLen; i++) {
      pizza = pizzas[i]; //style.width = newwidth;
      if (pizza.classList.contains('pizza-small'))
        pizza.classList.remove('pizza-small');
      if (pizza.classList.contains('pizza-medium'))
        pizza.classList.remove('pizza-medium');
      if (pizza.classList.contains('pizza-large'))
        pizza.classList.remove('pizza-large');
      pizza.classList.add(sizes[size]);
    }
  }

  changePizzaSizes(size);

  // User Timing API is awesome
  window.performance.mark("mark_end_resize");
  window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
  var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
  console.log("Time to resize pizzas: " + timeToResize[0].duration + "ms");
}


// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;

// Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
function logAverageFrame(times) {   // times is the array of User Timing measurements from updatePositions()
  var numberOfEntries = times.length;
  var sum = 0;
  var i;
  for (i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
    sum = sum + times[i].duration;
  }
  console.log("Average time to generate last 10 frames: " + sum / 10 + "ms");
}


// Anna: use requestAnimationFrame to optimize backround repaining
/**
* Provides requestAnimationFrame in a cross browser way.
* @author paulirish / http://paulirish.com/
*/
 
if ( !window.requestAnimationFrame ) {
 
  window.requestAnimationFrame = ( function() {
   
    return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
       
        window.setTimeout( callback, 1000 / 60 );
     
      };
   
  } )();
 
} 

// The following code for sliding background pizzas was pulled from Ilya's demo found at:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html

// Anna: variables to store background pizzas and their length
var movers = null;
var moversLength = 0;

// Moves the sliding background pizzas based on scroll position
function updatePositions() {
  frame++;
  window.performance.mark("mark_start_frame");

  requestAnimationFrame(function(){
    // Anna: get scrollTop only once
    var scrollTop = document.body.scrollTop;
    var phase;
    var mover;
    var i;
    for (i = 0; i < moversLength; i++) {
      mover = movers[i];
      phase = Math.sin((scrollTop / 1250) + (i % 5));
      mover.style.left = mover.basicLeft + 100 * phase + 'px';
    }
  });

  // User Timing API to the rescue again. Seriously, it's worth learning.
  // Super easy to create custom metrics.
  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
    logAverageFrame(timesToUpdatePosition);
  }
}

// runs updatePositions on scroll
window.addEventListener('scroll', updatePositions);

// Generates the sliding pizzas when the page loads.
document.addEventListener('DOMContentLoaded', function() {
  var cols = 8;
  var s = 256;
  // Anna: only paint as many background pizzas as needed
  var count = Math.ceil(window.innerHeight/s) * Math.ceil(window.innerWidth/s);
  for (var i = 0; i < count; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover';
    // Anna: use optimized version of the image from the build folder
    elem.src = "build/images/pizza.svg";
    elem.style.height = "100px";
    elem.style.width = "73.333px";
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    document.querySelector("#movingPizzas1").appendChild(elem);
  }
  movers = Array.prototype.slice.call(document.querySelectorAll('.mover'));
  moversLength = movers.length;
  updatePositions();
	window.performance.mark("mark_start_generating"); // collect timing data

	// This for-loop actually creates and appends all of the pizzas when the page loads
	var pizzasDiv = document.getElementById("randomPizzas");
  var i;
	for (i = 2; i < 100; i++) {
	  pizzasDiv.appendChild(pizzaElementGenerator(i));
	}
  pizzas = document.querySelectorAll(".randomPizzaContainer");
  pizzasLen = pizzas.length;

	// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
	window.performance.mark("mark_end_generating");
	window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
	var timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
	console.log("Time to generate pizzas on load: " + timeToGenerate[0].duration + "ms");
});
