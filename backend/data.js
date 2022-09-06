const PRODUCTS = [
  {
    name: "Basic Cake Topper",
    category: "Cake Topper",
    price: 15,
    image_src: "/assets/CakeTopper.jpg",
    min: 1,
    max: 10,
    options: {
      color: [
        "glitter gold",
        "glitter silver",
        "glitter blue",
        "glitter black",
        "glitter pink",
        "glitter fuschia",
        "glitter purple",
        "chrome gold",
        "chrome silver",
        "blue",
        "white",
        "black",
        "purple",
        "red",
        "custom",
        "pink",
      ],
    },
  },
  {
    name: "3D Cake Topper",
    category: "Cake Topper",
    price: 25,
    image_src: "/assets/3DCakeTopper.jpg",
    min: 1,
    max: 10,
    options: {
      theme: ["mermaid", "construction", "dinosaur", "unicorn", "custom"],
    },
  },
  {
    name: "Shaker Cake Topper",
    category: "Cake Topper",
    price: 30,
    image_src: "/assets/ShakerCakeTopper.jpg",
    min: 1,
    max: 10,
    options: {
      theme: ["mermaid", "construction", "dinosaur", "unicorn", "custom"],
      ledLight: false,
    },
  },
  {
    name: "Premade Cake Toppers 2d",
    category: "Cake Topper",
    price: 10,
    image_src: "/assets/PremaidCakeTopper.jpg",
    min: 1,
    max: 10,
    options: {
      theme: ["mermaid", "dinosaur", "unicorn", "Super heroes"],
    },
  },
  {
    name: "basic Cupcake Topper",
    category: "Cupcake Topper",
    price: 0.5,
    image_src: "/assets/CupcakeTopper.jpg",
    min: 12,
    max: 99,
    options: {
      color: [
        "glitter gold",
        "glitter silver",
        "glitter blue",
        "glitter black",
        "glitter pink",
        "glitter fuschia",
        "glitter purple",
        "chrome gold",
        "chrome silver",
        "blue",
        "white",
        "black",
        "purple",
        "red",
        "custom",
        "pink",
      ],
    },
  },
  {
    name: "Intricate Cupcake Topper",
    category: "Cupcake Topper",
    price: 0.75,
    image_src: "/assets/IntricateCupcakeTopper.jpg",
    min: 12,
    max: 99,
    options: {
      color: [
        "glitter gold",
        "glitter silver",
        "glitter blue",
        "glitter black",
        "glitter pink",
        "glitter fuschia",
        "glitter purple",
        "chrome gold",
        "chrome silver",
        "blue",
        "white",
        "black",
        "purple",
        "red",
        "custom",
        "pink",
      ],
    },
  },
  {
    name: "Custom Chip Bags",
    category: "Chips",
    price: 6.75,
    image_src: "/assets/CustomChipBags.jpg",
    min: 10,
    max: 150,
    options: {
      theme: ["mermaid", "construction", "dinosaur", "unicorn", "custom"],
    },
  },
  {
    name: "Custom Pringle chips",
    category: "Chips",
    price: 7,
    image_src: "/assets/CustomPringleChips.jpg",
    min: 10,
    max: 150,
    options: {
      theme: ["mermaid", "construction", "dinosaur", "unicorn", "custom"],
    },
  },
  {
    name: "Piñatas",
    category: "Piñatas",
    price: 20,
    image_src: "/assets/pinata.jpg",
    min: 1,
    max: 5,
    options: {
      size: ["6", "18", "2'", "custom"],
    },
  },
  {
    name: "Cake Topper Set",
    category: "Cake Toppers",
    price: 22,
    image_src: "/assets/cake-topper-set.jpg",
    min: 1,
    max: 1,
    options: {},
  },
  {
    name: "Photo Props (10pc)",
    category: "Photography",
    price: 25,
    image_src: "/assets/photo-props.jpg",
    min: 1,
    max: 5,
    options: {},
  },
  {
    name: "Acrylic Circle Cake Topper",
    category: "Cake Toppers",
    price: 28,
    image_src: "/assets/acrylic-circle-topper.jpg",
    min: 1,
    max: 5,
    options: {},
  },
  {
    name: "Number Candles",
    category: "Candles",
    price: 10,
    image_src: "/assets/number-candles.jpg",
    min: 1,
    max: 1,
    options: {
      number: ["custom"],
    },
  },
  {
    name: "Goodie Box",
    category: "Boxes",
    price: 7,
    image_src: "/assets/goodie-box.jpg",
    min: 1,
    max: 30,
    options: {
      shape: ["custom"],
    },
  },
  {
    name: "Combo 1",
    category: "Packages",
    price: 15,
    image_src: "/assets/combo1.jpg",
    min: 10,
    max: 20,
    options: {
      theme: ["mermaid", "construction", "dinosaur", "unicorn", "custom"],
      shirts: false,
      balloons: false,
    },
  },
  {
    name: "Combo 2",
    category: "Packages",
    price: 23,
    image_src: "/assets/combo2.jpg",
    min: 10,
    max: 20,
    options: {
      theme: ["mermaid", "construction", "dinosaur", "unicorn", "custom"],
      shirts: false,
      balloons: false,
    },
  },
  {
    name: "Goodie Box (empty)",
    category: "Boxes",
    price: 6,
    image_src: "/assets/goodie-box-empty.jpg",
    min: 1,
    max: 20,
    options: {
      shape: ["custom"],
    },
  },
  {
    name: "Goodie Bag (empty)",
    category: "Boxes",
    price: 6,
    image_src: "/assets/goodie-bag-empty.jpg",
    min: 1,
    max: 20,
    options: {
      theme: ["mermaid", "construction", "dinosaur", "unicorn", "custom"],
      shirts: false,
      balloons: false,
    },
  },
];

module.exports = { PRODUCTS };