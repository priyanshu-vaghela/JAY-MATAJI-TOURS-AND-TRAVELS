-- Run once on an existing Jay Mataji database after deploying assets/optimized/rajasthan.jpg.
UPDATE destinations
SET image = './assets/optimized/rajasthan.jpg'
WHERE id = 3;

UPDATE destinations_details
SET image = '../assets/optimized/rajasthan.jpg'
WHERE id = 3;
