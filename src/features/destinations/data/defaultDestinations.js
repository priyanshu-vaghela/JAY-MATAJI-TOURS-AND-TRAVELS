import { appPath } from '../../../app/paths.js';

export const defaultDestinations = [
  {
    id: 1,
    name: 'Dwarka',
    location: 'Gujarat, India',
    image: appPath('/assets/Popular/Dwarka.jpeg'),
    rating: 5,
    description:
      'Explore the spiritual and historical charm of Dwarka, one of the four sacred Char Dham pilgrimage sites, revered as the ancient kingdom of Lord Krishna with breathtaking coastal serenity.',
    best_time: 'Oct - Mar',
    famous_for: 'Dwarkadhish Temple, Coastal Pilgrimage, Beyt Dwarka',
    attractions: [
      {
        name: 'Dwarkadhish Temple',
        description: 'The grand 5-storey temple dedicated to Lord Krishna, towering majestically on the Gomti confluence.',
      },
      {
        name: 'Bet Dwarka (Beyt Dwarka)',
        description: 'A sacred island accessed by boat or the Sudarshan Setu bridge, home to ancient Krishna shrines and tranquil beaches.',
      },
      {
        name: 'Nageshwar Jyotirlinga',
        description: 'One of the twelve revered Jyotirlinga shrines, renowned for its towering 85-foot Shiva statue.',
      },
      {
        name: 'Gomti Ghat & Sudama Setu',
        description: 'Sacred riverfront where holy rituals take place, with scenic sea views and camel rides.',
      },
      {
        name: 'Shivrajpur Beach',
        description: 'Blue Flag certified pristine white-sand beach ideal for swimming, dolphin spotting, and water sports.',
      },
    ],
  },
  {
    id: 2,
    name: 'Somnath & Gir',
    location: 'Gujarat, India',
    image: appPath('/assets/Popular/The Cape.jpeg'),
    rating: 5,
    description:
      'Experience the eternal shrine of Somnath on the Arabian Sea coast, paired with the wild beauty of Sasan Gir, the world’s only natural sanctuary of Asiatic lions.',
    best_time: 'Nov - Mar',
    famous_for: 'First Jyotirlinga, Asiatic Lion Safari, Coastal Temples',
    attractions: [
      {
        name: 'Somnath Jyotirlinga Temple',
        description: 'The first among the twelve holy Jyotirlingas, built in classical Chalukya architecture overlooking the sea with evening light and sound show.',
      },
      {
        name: 'Gir National Park & Safari',
        description: 'Embark on open jeep safaris through dry deciduous teak forests to sight majestic Asiatic lions in their natural habitat.',
      },
      {
        name: 'Triveni Sangam',
        description: 'The holy confluence of three sacred rivers: Hiran, Kapila, and Saraswati, holding deep mythological significance.',
      },
      {
        name: 'Bhalka Tirth',
        description: 'The sacred grove where Lord Krishna rested and concluded his earthly pastimes.',
      },
    ],
  },
  {
    id: 3,
    name: 'Rajasthan',
    location: 'India',
    image: appPath('/assets/optimized/rajasthan.jpg'),
    rating: 5,
    description:
      'Immerse yourself in royal heritage, grand hilltop forts, ornate palace courtyards, vibrant bazaars, and timeless desert landscapes shaped by centuries of royal history.',
    best_time: 'Oct - Mar',
    famous_for: 'Amber Fort, City Palaces, Royal Heritage, Desert Culture',
    attractions: [
      {
        name: 'Amber Fort, Jaipur',
        description: 'A hilltop fort outside Jaipur with grand courtyards, Sheesh Mahal (Mirror Palace), and sweeping valley views.',
      },
      {
        name: 'City Palace & Lake Pichola, Udaipur',
        description: 'Lakeside palace complex and romantic boat cruises that reflect Rajasthan’s royal heritage.',
      },
      {
        name: 'Jaisalmer Fort & Thar Desert',
        description: 'A living desert fort of golden sandstone rising above the Thar, with camel safaris and folk dances under desert stars.',
      },
      {
        name: 'Mehrangarh Fort, Jodhpur',
        description: 'One of the largest fortresses in India, towering 400 feet above the blue city of Jodhpur.',
      },
    ],
  },
  {
    id: 4,
    name: 'Goa',
    location: 'India',
    image: appPath('/assets/Popular/Goa.jpeg'),
    rating: 5,
    description:
      'Experience golden beaches, palm-lined coastal villages, vibrant nightlife, water sports, and colorful Portuguese-influenced heritage.',
    best_time: 'Nov - Mar',
    famous_for: 'Beaches, Portuguese Architecture, Coastal Cruises, Nightlife',
    attractions: [
      {
        name: 'Baga & Calangute Beaches',
        description: 'Lively shorelines known for water sports, beach cafés, and sunset walks.',
      },
      {
        name: 'Basilica of Bom Jesus',
        description: 'UNESCO World Heritage landmark in Old Goa holding the mortal remains of St. Francis Xavier.',
      },
      {
        name: 'Fontainhas (Latin Quarter)',
        description: 'Panjim’s colourful Portuguese-era character precinct with heritage villas and art cafés.',
      },
      {
        name: 'Dudhsagar Waterfalls',
        description: 'Majestic four-tiered waterfall cascading through lush Western Ghats greenery.',
      },
    ],
  },
];
