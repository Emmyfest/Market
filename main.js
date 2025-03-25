/**
* Farm Fresh - Farmers' Marketplace
* Main JavaScript File
*/

// Product Database
const products = [{
    id: 1,
    name: "Organic Red Apples",
    price: 4.99,
    oldPrice: 6.99,
    image: "/storage/emulated/0/FarmersMarketplace/FarmersMarketplace/js/apple.jpg",
    // Direct image URL
    category: "fruits",
    farmingMethod: "organic",
    rating: 4.8,
    ratingCount: 127,
    featured: true,
    inStock: true,
    description: "Sweet and crisp organic red apples grown without pesticides. Perfect for snacking, baking, or adding to salads.",
    longDescription: "Our red apples are harvested at peak ripeness to ensure the best flavor. These organically grown apples are free from synthetic pesticides and fertilizers. They're handpicked from our partner orchards where sustainable farming practices are prioritized.<br><br>Rich in fiber, vitamin C, and antioxidants, these apples not only taste delicious but also provide numerous health benefits. Store them in your refrigerator for maximum freshness.",
    farm: "Green Valley Orchards",
    weight: "1 lb (approx. 3-4 apples)",
    nutritionInfo: {
        calories: "52 per 100g",
        carbs: "14g",
        fiber: "2.4g",
        sugar: "10g",
        protein: "0.3g",
        fat: "0.2g"
    },
    reviews: [{
        name: "Sarah Johnson",
        date: "Oct 15, 2023",
        rating: 5,
        text: "These apples are incredibly crisp and sweet. My kids love them as after-school snacks!"
    },
        {
            name: "Michael Chen",
            date: "Oct 10, 2023",
            rating: 4,
            text: "Great flavor and freshness. They arrived in perfect condition."
        }
    ]
    
},
    {
        id: 2,
        name: "Fresh Carrots Bundle",
        price: 3.49,
        oldPrice: null,
        image: "/storage/emulated/0/FarmersMarketplace/FarmersMarketplace/js/carrot.jpg",
        category: "vegetables",
        farmingMethod: "organic",
        rating: 4.6,
        ratingCount: 84,
        featured: true,
        inStock: true,
        description: "Bright orange carrots with tops, freshly harvested from local farms. Sweet, crunchy, and packed with nutrients.",
        longDescription: "Our organic carrots are harvested fresh from the soil of family-owned farms that practice sustainable agriculture. These vibrant, orange root vegetables are known for their sweet flavor and satisfying crunch.<br><br>Versatile in the kitchen, they can be enjoyed raw, juiced, roasted, or added to soups and stews. Rich in beta-carotene, fiber, and antioxidants, these carrots support eye health and overall wellbeing.",
        farm: "Sunshine Family Farm",
        weight: "1 lb bunch",
        nutritionInfo: {
            calories: "41 per 100g",
            carbs: "9.6g",
            fiber: "2.8g",
            sugar: "4.7g",
            protein: "0.9g",
            fat: "0.2g"
        },
        reviews: [{
            name: "Lisa Rodriguez",
            date: "Oct 12, 2023",
            rating: 5,
            text: "The sweetest carrots I've had in a long time. Perfect for my carrot cake recipe!"
        }]
    },
    {
        id: 3,
        name: "Free-Range Eggs",
        price: 5.99,
        oldPrice: null,
        image: "/storage/emulated/0/FarmersMarketplace/FarmersMarketplace/js/egg.jpg",
        category: "dairy",
        farmingMethod: "organic",
        rating: 4.9,
        ratingCount: 201,
        featured: true,
        inStock: true,
        description: "Farm-fresh eggs from free-range chickens. Rich, flavorful, and naturally high in protein with bright orange yolks.",
        longDescription: "Our free-range eggs come from hens that enjoy access to pasture, sunshine, and fresh air. These happy chickens produce eggs with vibrant, orange yolks and exceptional flavor.<br><br>Each egg is carefully collected, inspected, and packed with care. You'll notice the difference in both taste and appearance compared to conventional eggs. Perfect for breakfast, baking, or any recipe calling for farm-fresh quality.",
        farm: "Happy Hen Homestead",
        weight: "Dozen (12 eggs)",
        nutritionInfo: {
            calories: "72 per egg",
            protein: "6.3g per egg",
            fat: "5g per egg",
            cholesterol: "186mg per egg",
            vitamins: "A, B12, D, E"
        },
        reviews: [{
            name: "Thomas Wright",
            date: "Oct 18, 2023",
            rating: 5,
            text: "The yolks are so orange! These eggs are worth every penny."
        },
            {
                name: "Emily Turner",
                date: "Oct 5, 2023",
                rating: 5,
                text: "I can really taste the difference. Will never go back to store-bought eggs."
            }]
    },
    {
        id: 4,
        name: "Organic Raw Honey",
        price: 8.99,
        oldPrice: 10.99,
        image: "/storage/emulated/0/FarmersMarketplace/FarmersMarketplace/js/honey.jpg",
        category: "bakery",
        farmingMethod: "organic",
        rating: 4.7,
        ratingCount: 156,
        featured: true,
        inStock: true,
        description: "Unfiltered, raw honey harvested from local wildflower meadows. Pure, golden sweetness with all natural enzymes intact.",
        longDescription: "Our raw honey is collected from hives placed in pristine wildflower meadows, allowing the bees to forage on a diverse range of nectar sources. This honey is minimally processed – just strained, never heated or filtered – to preserve all the beneficial enzymes, pollen, and natural properties.<br><br>Each jar captures the unique floral essence of our region, with subtle flavor notes that change with the seasons. Use it to sweeten tea, drizzle over yogurt, or enjoy straight from the spoon as a natural energy boost.",
        farm: "Beewise Apiaries",
        weight: "16 oz jar",
        nutritionInfo: {
            calories: "64 per tablespoon",
            carbs: "17g per tablespoon",
            sugar: "16g per tablespoon"
        },
        reviews: [{
            name: "Rebecca Cohen",
            date: "Sep 30, 2023",
            rating: 5,
            text: "This honey is absolutely delicious. I love the subtle floral notes."
        },
            {
                name: "John Masterson",
                date: "Oct 2, 2023",
                rating: 4,
                text: "Great quality raw honey. I use it every morning in my tea."
            }]
    },
    {
        id: 5,
        name: "Spinach",
        price: 2.99,
        oldPrice: null,
        image: "/storage/emulated/0/FarmersMarketplace/FarmersMarketplace/js/spin.jpg",
        category: "vegetables",
        farmingMethod: "organic",
        rating: 4.5,
        ratingCount: 68,
        featured: false,
        inStock: true,
        description: "Large bunch of dark green, tender spinach leaves. Nutrient-dense and versatile for salads, smoothies, or cooking.",
        longDescription: "Our organic spinach is grown using sustainable farming practices that prioritize soil health and biodiversity. These dark, leafy greens are harvested at peak freshness to ensure optimal flavor and nutrition.<br><br>Spinach is incredibly versatile in the kitchen - enjoy it raw in salads, blended into smoothies, sautéed as a side dish, or incorporated into pasta, soups, and more. It's a nutritional powerhouse, rich in iron, vitamins A and C, antioxidants, and fiber.",
        farm: "Greens & Roots Farm",
        weight: "8 oz bunch",
        nutritionInfo: {
            calories: "23 per 100g",
            carbs: "3.6g",
            fiber: "2.2g",
            protein: "2.9g",
            vitamins: "A, C, K, Folate",
            minerals: "Iron, Calcium, Magnesium"
        },
        reviews: [{
            name: "Amanda Lewis",
            date: "Oct 7, 2023",
            rating: 5,
            text: "The spinach was fresh and delicious. Made an amazing salad!"
        }]
    },
    {
        id: 6,
        name: "Grass-Fed Ground Beef",
        price: 9.99,
        oldPrice: null,
        image: "/storage/emulated/0/FarmersMarketplace/FarmersMarketplace/js/beef.jpg",
        category: "meat",
        farmingMethod: "organic",
        rating: 4.8,
        ratingCount: 112,
        featured: false,
        inStock: true,
        description: "Premium ground beef from grass-fed, pasture-raised cattle. Lean, flavorful, and ethically produced without hormones or antibiotics.",
        longDescription: "Our ground beef comes from cattle that graze on open pastures their entire lives. These animals are never given growth hormones or routine antibiotics, and are raised according to the highest animal welfare standards.<br><br>Grass-fed beef is known for its superior nutritional profile, containing higher levels of omega-3 fatty acids and antioxidants compared to conventional beef. It also offers a richer, more complex flavor that elevates any recipe - from classic burgers and meatballs to hearty chilis and pasta sauces.",
        farm: "Green Pastures Ranch",
        weight: "1 lb package",
        nutritionInfo: {
            calories: "250 per 100g",
            protein: "26g",
            fat: "15g",
            omega3: "Higher than grain-fed beef",
            vitamins: "B12, B3, B6",
            minerals: "Iron, Zinc, Selenium"
        },
        reviews: [{
            name: "David Wilson",
            date: "Oct 10, 2023",
            rating: 5,
            text: "This is what beef should taste like! Makes the best burgers."
        },
            {
                name: "Sophia Martinez",
                date: "Sep 28, 2023",
                rating: 4,
                text: "Great quality meat. You can definitely taste the difference."
            }]
    },
    {
        id: 7,
        name: "Organic Strawberries",
        price: 6.49,
        oldPrice: 7.99,
        image: "/storage/emulated/0/FarmersMarketplace/FarmersMarketplace/js/straw.jpg",
        category: "fruits",
        farmingMethod: "organic",
        rating: 4.6,
        ratingCount: 93,
        featured: false,
        inStock: true,
        description: "Sweet, juicy organic strawberries. Perfect for snacking, desserts, or adding to breakfast dishes.",
        longDescription: "Our organic strawberries are grown without synthetic pesticides or fertilizers, resulting in berries that are better for you and the environment. They're harvested at peak ripeness to ensure the best flavor and juiciness.<br><br>These ruby-red gems are bursting with sweet flavor and packed with vitamin C, antioxidants, and dietary fiber. Enjoy them fresh as a healthy snack, add them to salads, blend them into smoothies, or use them to top desserts and breakfast dishes.",
        farm: "Berry Good Farm",
        weight: "1 pint (approx. 16-20 berries)",
        nutritionInfo: {
            calories: "32 per 100g",
            carbs: "7.7g",
            fiber: "2g",
            sugar: "4.9g",
            protein: "0.7g",
            vitamins: "C, B9, Potassium"
        },
        reviews: [{
            name: "Jessica Brown",
            date: "Oct 5, 2023",
            rating: 5,
            text: "These strawberries are incredibly sweet and juicy. My family devoured them!"
        }]
    },
    {
        id: 8,
        name: "Artisan Sourdough Bread",
        price: 7.49,
        oldPrice: null,
        image: "/storage/emulated/0/FarmersMarketplace/FarmersMarketplace/js/sbread.jpg",
        category: "bakery",
        farmingMethod: "conventional",
        rating: 4.9,
        ratingCount: 186,
        featured: true,
        inStock: true,
        description: "Handcrafted sourdough bread made with local organic flour. Crusty exterior with a tender, chewy interior and complex flavor.",
        longDescription: "Our artisan sourdough bread is crafted using traditional methods and a naturally fermented starter that's been nurtured for over a decade. Each loaf is made with locally-milled organic flour, filtered water, and sea salt - nothing else.<br><br>The dough undergoes a long, slow fermentation process that develops its distinctive tangy flavor and creates a bread that's more digestible and nutritious than conventional bread. Each loaf is shaped by hand and baked on a stone hearth, resulting in a beautiful crackling crust and moist, airy interior with a complex flavor profile.",
        farm: "Heritage Bakehouse",
        weight: "24 oz loaf",
        nutritionInfo: {
            calories: "80 per slice",
            carbs: "15g per slice",
            fiber: "0.8g per slice",
            protein: "3g per slice"
        },
        reviews: [{
            name: "Paul Thompson",
            date: "Oct 16, 2023",
            rating: 5,
            text: "Best sourdough I've had outside of San Francisco. Perfect texture and tang."
        },
            {
                name: "Laura Kim",
                date: "Oct 8, 2023",
                rating: 5,
                text: "This bread is amazing! Stays fresh for days and makes incredible toast."
            }]
    },
    {
        id: 9,
        name: "Fresh Whole Milk",
        price: 4.99,
        oldPrice: null,
        image: "/storage/emulated/0/FarmersMarketplace/FarmersMarketplace/js/milk.jpg",
        category: "dairy",
        farmingMethod: "organic",
        rating: 4.7,
        ratingCount: 142,
        featured: false,
        inStock: true,
        description: "Creamy, non-homogenized whole milk from grass-fed cows. Pasteurized but not ultra-pasteurized to preserve natural flavor.",
        longDescription: "Our fresh whole milk comes from a small herd of grass-fed cows that graze on certified organic pastures. This milk is gently pasteurized (never ultra-pasteurized) to ensure safety while preserving its natural flavor and nutritional properties.<br><br>The milk is non-homogenized, meaning the cream naturally rises to the top - just shake before pouring! This minimally processed milk has a rich, creamy taste that's worlds apart from conventional supermarket milk. It's packaged in glass bottles to maintain freshness and reduce environmental impact.",
        farm: "Meadowbrook Dairy",
        weight: "Half gallon (64 oz)",
        nutritionInfo: {
            calories: "150 per cup",
            protein: "8g per cup",
            fat: "8g per cup",
            carbs: "12g per cup",
            calcium: "30% daily value per cup",
            vitamins: "A, D, B12"
        },
        reviews: [{
            name: "Robert Jenkins",
            date: "Oct 3, 2023",
            rating: 5,
            text: "This milk reminds me of what we used to get directly from the farm when I was a child. Real milk flavor!"
        },
            {
                name: "Katherine Patel",
                date: "Sep 29, 2023",
                rating: 4,
                text: "Delicious, creamy milk. My kids have noticed the difference and ask for this specifically now."
            }]
    },
    {
        id: 10,
        name: "Heirloom Tomatoes",
        price: 5.49,
        oldPrice: 6.99,
        image: "/storage/emulated/0/FarmersMarketplace/FarmersMarketplace/js/tom.jpg",
        category: "vegetables",
        farmingMethod: "organic",
        rating: 4.5,
        ratingCount: 76,
        featured: false,
        inStock: true,
        description: "Mixed variety of colorful heirloom tomatoes. These flavor-packed tomatoes come in various sizes, colors, and distinctive shapes.",
        longDescription: "Our organic heirloom tomatoes are grown from seeds that have been passed down through generations of farmers. Unlike commercial varieties bred for uniformity and shipping durability, heirlooms are cultivated for their exceptional flavor and unique characteristics.<br><br>This mix includes varieties like Brandywine, Cherokee Purple, Green Zebra, and Yellow Pear - each with its own distinct taste profile ranging from sweet to tangy to rich and complex. These tomatoes elevate any salad, sandwich, or recipe with their vibrant colors and intense flavors.",
        farm: "Heritage Acres",
        weight: "1 lb (mixed varieties)",
        nutritionInfo: {
            calories: "22 per 100g",
            carbs: "4.8g",
            fiber: "1.5g",
            protein: "1.1g",
            vitamins: "C, A, K",
            minerals: "Potassium, Folate"
        },
        reviews: [{
            name: "Olivia Scott",
            date: "Oct 12, 2023",
            rating: 5,
            text: "These tomatoes taste like summer! So much flavor compared to grocery store varieties."
        },
            {
                name: "James Rodriguez",
                date: "Oct 4, 2023",
                rating: 4,
                text: "Beautiful colors and great taste. Made an incredible caprese salad."
            }]
    },
    {
        id: 11,
        name: "Fresh Blueberries",
        price: 6.99,
        oldPrice: null,
        image: "/storage/emulated/0/FarmersMarketplace/FarmersMarketplace/js/blue.jpg",
        category: "fruits",
        farmingMethod: "organic",
        rating: 4.8,
        ratingCount: 108,
        featured: false,
        inStock: true,
        description: "Plump, sweet organic blueberries. Packed with antioxidants and perfect for snacking, baking, or adding to breakfast dishes.",
        longDescription: "Our organic blueberries are grown using sustainable farming practices that protect both the environment and your health. These plump, juicy berries are harvested at the peak of ripeness to ensure maximum sweetness and flavor.<br><br>Blueberries are renowned as a superfood, packed with antioxidants, vitamin C, and fiber. They make a perfect healthy snack on their own, or can be added to pancakes, muffins, smoothies, salads, or desserts for a burst of flavor and nutrition.",
        farm: "Blue Sky Berries",
        weight: "1 pint (approx. 2 cups)",
        nutritionInfo: {
            calories: "57 per 100g",
            carbs: "14.5g",
            fiber: "2.4g",
            sugar: "10g",
            protein: "0.7g",
            antioxidants: "High in anthocyanins"
        },
        reviews: [{
            name: "Michelle Taylor",
            date: "Oct 14, 2023",
            rating: 5,
            text: "These blueberries are absolutely delicious! So much better than store-bought."
        }]
    },
    {
        id: 12,
        name: "Raw Artisan Cheese Assortment",
        price: 14.99,
        oldPrice: 17.99,
        image: "/storage/emulated/0/FarmersMarketplace/FarmersMarketplace/js/cheese.jpg",
        category: "dairy",
        farmingMethod: "organic",
        rating: 4.9,
        ratingCount: 132,
        featured: false,
        inStock: true,
        description: "Selection of farmstead raw milk cheeses. This assortment includes three artisan varieties made from organic grass-fed milk.",
        longDescription: "Our artisan cheese assortment features three distinct varieties made by our master cheesemaker using raw milk from our grass-fed cows. The selection includes a creamy brie-style cheese, a sharp aged cheddar, and a tangy blue cheese.<br><br>Each cheese is handcrafted in small batches and aged to perfection in our climate-controlled cheese cave. The raw milk (unpasteurized but aged over 60 days for safety) preserves beneficial enzymes and complex flavor profiles that pasteurized cheeses simply can't match. Perfect for a sophisticated cheese board or enjoying with a glass of wine.",
        farm: "Hillside Creamery",
        weight: "12 oz total (4 oz each variety)",
        nutritionInfo: {
            calories: "Varies by variety",
            protein: "High",
            calcium: "Excellent source",
            probiotics: "Contains beneficial cultures"
        },
        reviews: [{
            name: "Gregory Bennett",
            date: "Oct 9, 2023",
            rating: 5,
            text: "Exceptional quality cheeses. The blue cheese is particularly outstanding."
        },
            {
                name: "Natalie Wong",
                date: "Oct 2, 2023",
                rating: 5,
                text: "Brought this to a dinner party and everyone raved about it. Will definitely order again."
            }]
    },
    {
        id: 13,
        name: "Heritage Pork Chops",
        price: 12.99,
        oldPrice: null,
        image: "https://source.unsplash.com/500x500/?pork,meat",
        category: "meat",
        farmingMethod: "organic",
        rating: 4.7,
        ratingCount: 89,
        featured: false,
        inStock: true,
        description: "Thick-cut pork chops from heritage breed pigs. Pasture-raised without antibiotics or hormones for exceptional flavor and quality.",
        longDescription: "Our heritage pork chops come from rare breed pigs that are raised on pasture with plenty of space to roam and express their natural behaviors. These traditional breeds are known for their superior flavor and marbling compared to conventional pork.<br><br>The pigs are raised without antibiotics or growth hormones, and are fed a natural diet supplemented with organic grains. This results in pork that's more flavorful, with a richer color and better fat quality. These thick-cut chops are perfect for grilling, pan-searing, or roasting.",
        farm: "Old World Pastures",
        weight: "2 chops (approx. 1 lb)",
        nutritionInfo: {
            calories: "210 per chop",
            protein: "23g per chop",
            fat: "13g per chop",
            vitamins: "B vitamins, especially B1",
            minerals: "Zinc, Selenium, Phosphorus"
        },
        reviews: [{
            name: "Victor Hughes",
            date: "Oct 15, 2023",
            rating: 5,
            text: "These are the juiciest, most flavorful pork chops I've ever cooked. Worth every penny."
        },
            {
                name: "Heather Mills",
                date: "Oct 1, 2023",
                rating: 4,
                text: "Excellent quality meat. Made a simple recipe exceptional."
            }]
    },
    {
        id: 14,
        name: "Organic Bell Peppers",
        price: 4.49,
        oldPrice: 5.99,
        image: "https://source.unsplash.com/500x500/?bell,peppers",
        category: "vegetables",
        farmingMethod: "organic",
        rating: 4.6,
        ratingCount: 71,
        featured: false,
        inStock: true,
        description: "Mixed pack of colorful organic bell peppers. Includes red, yellow, and orange varieties for diverse flavor and nutrition.",
        longDescription: "Our organic bell peppers are grown without synthetic pesticides or fertilizers, resulting in the cleanest, most flavorful peppers possible. This mixed pack includes a selection of vibrant red, yellow, and orange bell peppers, each with its own sweet flavor profile.<br><br>Bell peppers are incredibly versatile in the kitchen - enjoy them raw in salads, roasted as a side dish, stuffed with grains and proteins, or incorporated into countless recipes. They're packed with vitamin C, antioxidants, and add beautiful color to any meal.",
        farm: "Sunshine Valley Farm",
        weight: "3 count (one of each color)",
        nutritionInfo: {
            calories: "30 per pepper",
            carbs: "7g",
            fiber: "2.5g",
            protein: "1g",
            vitamins: "Very high in Vitamin C, A, B6",
            minerals: "Potassium, Folate"
        },
        reviews: [{
            name: "Carla Jackson",
            date: "Oct 11, 2023",
            rating: 5,
            text: "Beautiful, crisp peppers with great flavor. Much better than what I find at the grocery store."
        }]
    },
    {
        id: 15,
        name: "Fresh Baked Apple Pie",
        price: 18.99,
        oldPrice: 21.99,
        image: "https://source.unsplash.com/500x500/?apple,pie",
        category: "bakery",
        farmingMethod: "conventional",
        rating: 4.9,
        ratingCount: 156,
        featured: false,
        inStock: true,
        description: "Homestyle apple pie made with local organic apples and an all-butter crust. Baked fresh daily with cinnamon and a touch of nutmeg.",
        longDescription: "Our apple pies are baked fresh daily using organic apples sourced from local orchards. The flaky, golden crust is made with European-style butter and organic flour, creating the perfect vessel for the tender, spiced apple filling.<br><br>Each pie is handcrafted using a traditional recipe that's been perfected over generations. The filling features a balanced blend of tart and sweet apple varieties, enhanced with cinnamon, a touch of nutmeg, and just the right amount of sugar. This classic dessert arrives ready to serve - just warm it in the oven for the ultimate comfort food experience.",
        farm: "Countryside Bakery",
        weight: "9-inch pie (serves 8)",
        nutritionInfo: {
            calories: "320 per slice",
            carbs: "42g per slice",
            sugar: "24g per slice",
            fat: "16g per slice"
        },
        reviews: [{
            name: "Barbara Wilson",
            date: "Oct 17, 2023",
            rating: 5,
            text: "This pie tastes exactly like my grandmother's recipe. Absolutely delicious!"
        },
            {
                name: "Martin Lee",
                date: "Oct 8, 2023",
                rating: 5,
                text: "The perfect balance of sweet and tart. The crust is amazing too - so buttery and flaky."
            }]
    },
    {
        id: 16,
        name: "Fresh Basil Bunch",
        price: 2.99,
        oldPrice: null,
        image: "https://source.unsplash.com/500x500/?basil,herb",
        category: "vegetables",
        farmingMethod: "organic",
        rating: 4.7,
        ratingCount: 63,
        featured: false,
        inStock: true,
        description: "Large bunch of fragrant organic basil. Essential for Italian cuisine, pesto, and adding fresh flavor to countless dishes.",
        longDescription: "Our organic basil is grown using sustainable methods that ensure the most vibrant flavor and aroma. Each bunch is harvested at the perfect moment, when the leaves are tender and the essential oils are at their peak.<br><br>This versatile herb is the cornerstone of Italian cuisine, perfect for making fresh pesto, adding to tomato sauces, sprinkling over pizza, or incorporating into salads. To keep your basil fresh longer, store it at room temperature with the stems in water, like a bouquet of flowers.",
        farm: "Herb Haven",
        weight: "2 oz bunch",
        nutritionInfo: {
            calories: "6 per 1/4 cup",
            carbs: "0.3g",
            protein: "0.4g",
            vitamins: "K, A, C",
            minerals: "Calcium, Magnesium, Iron"
        },
        reviews: [{
            name: "Diana Foster",
            date: "Oct 13, 2023",
            rating: 5,
            text: "The aroma is incredible! Made the best pesto I've ever tasted."
        }]
    },
    {
        id: 17,
        name: "Wild-Caught Salmon Fillets",
        price: 16.99,
        oldPrice: 19.99,
        image: "https://source.unsplash.com/500x500/?salmon,fish",
        category: "meat",
        farmingMethod: "conventional",
        rating: 4.8,
        ratingCount: 102,
        featured: false,
        inStock: true,
        description: "Premium wild-caught salmon fillets. Sustainably harvested, these fillets are rich in flavor and omega-3 fatty acids.",
        longDescription: "Our salmon fillets are wild-caught from the pristine waters of Alaska using sustainable fishing practices that preserve fish populations and marine ecosystems. Each fillet is individually portioned, deboned, and flash-frozen to lock in freshness and flavor.<br><br>Wild salmon has a richer taste and firmer texture than farmed varieties, with a beautiful deep orange-red color that comes naturally from its diet. It's an excellent source of high-quality protein and omega-3 fatty acids. These versatile fillets can be grilled, baked, pan-seared, or poached for a nutritious, flavorful main course.",
        farm: "Northern Waters Fishery",
        weight: "2 fillets (approx. 12 oz total)",
        nutritionInfo: {
            calories: "208 per 6 oz fillet",
            protein: "23g per 6 oz fillet",
            fat: "12g per 6 oz fillet",
            omega3: "High in EPA and DHA",
            vitamins: "D, B12, B3",
            minerals: "Selenium, Phosphorus"
        },
        reviews: [{
            name: "Jennifer Adams",
            date: "Oct 10, 2023",
            rating: 5,
            text: "Finally, salmon that actually tastes like salmon! The quality is outstanding."
        },
            {
                name: "Steven Park",
                date: "Oct 5, 2023",
                rating: 5,
                text: "Perfectly portioned and incredibly fresh. Made a simple dinner feel like a restaurant meal."
            }]
    },
    {
        id: 18,
        name: "Organic Avocados",
        price: 7.99,
        oldPrice: 9.99,
        image: "https://source.unsplash.com/500x500/?avocado",
        category: "fruits",
        farmingMethod: "organic",
        rating: 4.6,
        ratingCount: 87,
        featured: false,
        inStock: true,
        description: "Perfectly ripened organic avocados. Creamy, rich, and ready to eat with a buttery flavor and smooth texture.",
        longDescription: "Our organic avocados are grown using sustainable farming practices that protect the environment and ensure the highest quality fruit. Each avocado is hand-selected at the perfect stage of ripeness - not too firm and not too soft.<br><br>Avocados are known for their creamy texture and mild, buttery flavor that pairs well with almost everything. They're incredibly versatile in the kitchen - mash them for guacamole, slice them for sandwiches and salads, or simply enjoy with a sprinkle of salt. Beyond their delicious taste, avocados are nutritional powerhouses packed with healthy fats, fiber, and essential nutrients.",
        farm: "Green Grove Organics",
        weight: "3 count (medium size)",
        nutritionInfo: {
            calories: "240 per avocado",
            fat: "22g (mostly monounsaturated)",
            carbs: "12g",
            fiber: "10g",
            protein: "3g",
            vitamins: "K, E, C, B6",
            minerals: "Potassium, Magnesium"
        },
        reviews: [{
            name: "Rachel Green",
            date: "Oct 16, 2023",
            rating: 5,
            text: "Perfect ripeness and amazing flavor. Makes the best avocado toast!"
        }]
    },
    {
        id: 19,
        name: "Wildflower Honey Jar",
        price: 9.99,
        oldPrice: null,
        image: "https://source.unsplash.com/500x500/?honey,jar",
        category: "bakery",
        farmingMethod: "organic",
        rating: 4.8,
        ratingCount: 125,
        featured: false,
        inStock: true,
        description: "Pure, raw wildflower honey. Unfiltered and unpasteurized to preserve natural enzymes and subtle floral notes.",
        longDescription: "Our wildflower honey is collected from hives placed in pristine meadows with diverse wildflower populations. The bees forage freely on a variety of blossoms, creating a honey with complex flavor notes that capture the essence of the season.<br><br>This honey is truly raw - it's only gently strained to remove large particles, never heated or ultra-filtered. This careful processing preserves all the beneficial enzymes, pollen, and natural properties. Its flavor profile is medium-bodied with delicate floral undertones that vary slightly with each batch, reflecting the unique blend of flowers in bloom during collection.",
        farm: "Sunny Meadow Apiaries",
        weight: "16 oz glass jar",
        nutritionInfo: {
            calories: "64 per tablespoon",
            carbs: "17g per tablespoon",
            antioxidants: "Contains flavonoids and phenolic compounds",
            enzymes: "Preserved due to minimal processing"
        },
        reviews: [{
            name: "Alan Morris",
            date: "Oct 12, 2023",
            rating: 5,
            text: "This honey has so much more flavor than store-bought. I can actually taste the difference between this and clover honey."
        },
            {
                name: "Sandra Phillips",
                date: "Oct 3, 2023",
                rating: 4,
                text: "Delicious in tea and on toast. Love that it's raw and unfiltered."
            }]
    },
    {
        id: 20,
        name: "Fresh Baked Rustic Bread",
        price: 5.99,
        oldPrice: null,
        image: "https://source.unsplash.com/500x500/?rustic,bread",
        category: "bakery",
        farmingMethod: "conventional",
        rating: 4.7,
        ratingCount: 94,
        featured: false,
        inStock: true,
        description: "Hearty, crusty artisan bread made with locally milled flour. No preservatives or additives, just traditional ingredients and technique.",
        longDescription: "Our rustic bread is crafted using traditional European methods that require time, skill, and just four simple ingredients: flour, water, salt, and natural yeast. The dough undergoes a long fermentation process that develops its distinctive flavor and creates a bread with character.<br><br>Each loaf is shaped by hand and baked in a stone hearth oven, resulting in a thick, crackling crust and a tender interior with an open, airy crumb structure. This versatile bread is perfect for sandwiches, alongside soups and stews, or simply enjoyed with quality butter or olive oil.",
        farm: "Hearth & Mill Bakery",
        weight: "1 lb loaf",
        nutritionInfo: {
            calories: "80 per slice",
            carbs: "15g per slice",
            protein: "3g per slice",
            fiber: "1.5g per slice"
        },
        reviews: [{
            name: "Christine Taylor",
            date: "Oct 14, 2023",
            rating: 5,
            text: "This bread is outstanding - crispy crust and soft interior. Perfect with soup!"
        }]
    }];

/**
* Main JavaScript functionality
*/
document.addEventListener('DOMContentLoaded', function() {

    // Initialize site functionality
    initializeMobileMenu();
    updateCartCount();

    // Handle form submissions
    handleFormSubmissions();
});

/**
* Initialize mobile menu functionality
*/
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

/**
* Update the cart count in the header
*/
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cart = getCart();

    let totalItems = 0;

    if (cart && cart.items) {
        totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    }

    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

/**
* Get cart from localStorage
*/
function getCart() {
    const cart = localStorage.getItem('farmFreshCart');
    return cart ? JSON.parse(cart): {
        items: [],
        subtotal: 0
    };
}

/**
* Save cart to localStorage
*/
function saveCart(cart) {
    localStorage.setItem('farmFreshCart', JSON.stringify(cart));
    updateCartCount();
}

/**
* Add a product to the cart
*/
function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const product = products.find(p => p.id === parseInt(productId));

    if (!product) return;

    const existingItem = cart.items.find(item => item.id === parseInt(productId));

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    // Calculate subtotal
    cart.subtotal = calculateSubtotal(cart.items);

    // Save updated cart
    saveCart(cart);

    // Show a confirmation message
    showNotification(`${product.name} added to cart!`);
}

/**
* Calculate the subtotal of items in the cart
*/
function calculateSubtotal(items) {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
* Show a notification message
*/
function showNotification(message, type = 'success') {
    // Check if notification container exists, if not create it
    let notificationContainer = document.querySelector('.notification-container');

    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);

        // Add styles
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.top = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '9999';
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.backgroundColor = type === 'success' ? 'var(--primary-color)': '#e74c3c';
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = 'var(--border-radius-md)';
    notification.style.marginBottom = '10px';
    notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    notification.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

    // Add to container
    notificationContainer.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';

        // Remove from DOM after animation completes
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
* Format currency for display
*/
function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}

/**
* Handle form submissions
*/
function handleFormSubmissions() {
    // Handle subscribe form
    const subscribeForms = document.querySelectorAll('.subscribe-form');

    subscribeForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                showNotification('Thank you for subscribing!');
                emailInput.value = '';
            }
        });
    });
}

/**
* Add a product to recently viewed
*/
function addToRecentlyViewed(productId) {
    let recentlyViewed = localStorage.getItem('farmFreshRecentlyViewed');
    recentlyViewed = recentlyViewed ? JSON.parse(recentlyViewed): [];

    // Remove the product if it's already in the list
    recentlyViewed = recentlyViewed.filter(id => id !== productId);

    // Add to the beginning of the array
    recentlyViewed.unshift(productId);

    // Limit to 4 items
    recentlyViewed = recentlyViewed.slice(0, 4);

    // Save to localStorage
    localStorage.setItem('farmFreshRecentlyViewed', JSON.stringify(recentlyViewed));
}

/**
* Get product by ID
*/
function getProductById(productId) {
    return products.find(p => p.id === parseInt(productId));
}

/**
* Generate product HTML for display
*/
function generateProductCardHtml(product) {
    return `
    <div class="product-card">
    <div class="product-image">
    <img src="${product.image}" alt="${product.name}">
    ${product.farmingMethod === 'organic' ? '<span class="product-badge organic">Organic</span>': ''}
    ${product.oldPrice ? '<span class="product-badge sale">Sale</span>': ''}
    </div>
    <div class="product-info">
    <span class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
    <h3 class="product-title">
    <a href="product-details.html?id=${product.id}">${product.name}</a>
    </h3>
    <div class="product-price">
    <span class="current-price">${formatCurrency(product.price)}</span>
    ${product.oldPrice ? `<span class="old-price">${formatCurrency(product.oldPrice)}</span>`: ''}
    </div>
    <div class="product-footer">
    <div class="product-rating">
    ${generateRatingStars(product.rating)}
    <span class="rating-count">(${product.ratingCount})</span>
    </div>
    <button class="add-to-cart-btn" data-product-id="${product.id}" aria-label="Add to cart">
    <i class="fas fa-shopping-basket"></i>
    </button>
    </div>
    </div>
    </div>
    `;
}

/**
* Generate HTML for rating stars
*/
function generateRatingStars(rating) {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }

    // Add half star if needed
    if (halfStar) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }

    // Add empty stars
    const emptyStars = 5 - fullStars - (halfStar ? 1: 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star"></i>';
    }

    return starsHtml;
}

// Initialize "Add to Cart" buttons
function initAddToCartButtons() {
    // Get all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // Add click event listener to each button
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            addToCart(productId);
        });
    });
}

// Export functions for use in other modules
window.farmFresh = {
    products,
    addToCart,
    getCart,
    saveCart,
    formatCurrency,
    updateCartCount,
    generateProductCardHtml,
    generateRatingStars,
    showNotification,
    getProductById,
    addToRecentlyViewed,
    initAddToCartButtons
};