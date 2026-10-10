-- Run once for existing installations. The original SQL seed has matching values.
START TRANSACTION;

UPDATE destinations
SET location = 'Gujarat'
WHERE id = 1;

UPDATE destinations_details
SET rating = 5,
    best_time = 'Nov - Mar',
    famous_for = 'Beaches, heritage, nightlife',
    description = 'Goa pairs golden beaches and palm-lined villages with colourful markets, coastal food, and a vibrant Portuguese-influenced heritage.'
WHERE id = 2;

UPDATE destinations_details
SET rating = 5,
    best_time = 'Oct - Mar',
    famous_for = 'Forts, palaces, desert culture',
    description = 'Rajasthan brings together grand forts, ornate palaces, living traditions, and vast desert landscapes shaped by centuries of royal history.'
WHERE id = 3;

INSERT INTO key_attractions (id, destination_id, name, description) VALUES
  (5, 2, 'Baga Beach', 'A lively beach known for water sports, cafés, and sunset walks.'),
  (6, 2, 'Basilica of Bom Jesus', 'A UNESCO-listed church and an important landmark of Old Goa.'),
  (7, 2, 'Fontainhas', 'Panjim’s colourful Latin Quarter, full of Portuguese-era character.'),
  (8, 3, 'Amber Fort', 'A hilltop fort outside Jaipur with grand courtyards and sweeping views.'),
  (9, 3, 'City Palace, Udaipur', 'A lakeside palace complex that reflects Rajasthan’s royal heritage.'),
  (10, 3, 'Jaisalmer Fort', 'A living desert fort of golden sandstone, rising above the Thar.');

COMMIT;
