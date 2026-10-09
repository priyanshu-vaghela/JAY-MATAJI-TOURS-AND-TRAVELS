<?php
include '../config.php';

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo "<p>Invalid destination ID.</p>";
    exit;
}

$id = intval($_GET['id']);
$result = mysqli_query($connection, "SELECT * FROM destinations_details WHERE id = $id");
$destination_details = mysqli_fetch_assoc($result);
// print_r($destination_details);
if (!$destination_details) {
    echo "<p>Destination not found.</p>";
    exit;
}

// Fetch attractions related to the destination
$attractions = [];
$attr_result = mysqli_query($connection, "SELECT name, description FROM key_attractions WHERE destination_id = $id");
while ($attr = mysqli_fetch_assoc($attr_result)) {
    $attractions[] = $attr;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($destination_details['name']); ?> - Jay Mataji Tours and Travels</title>
    <link rel="stylesheet" href="../style/detail.css">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #f4f8fb;
            color: #222;
        }

        .dwarka-hero {
            position: relative;
            height: 160px;
            background: linear-gradient(120deg, #007bff 60%, #00c6ff 100%);
            display: flex;
            align-items: flex-end;
            justify-content: center;
        }

        .dwarka-hero-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: center/cover no-repeat;
            opacity: 0.18;
            z-index: 1;
        }

        .dwarka-hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
            width: 100%;
            padding-bottom: 30px;
        }

        .dwarka-hero-content h1 {
            font-size: 2.8rem;
            color: #fff;
            margin: 0;
            letter-spacing: 2px;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
        }

        .dwarka-location {
            color: #e0e0e0;
            font-size: 1.2rem;
            margin-top: 8px;
            letter-spacing: 1px;
        }

        .dwarka-main {
            display: flex;
            max-width: 1100px;
            margin: 40px auto;
            gap: 36px;
            padding: 0 16px;
        }

        .dwarka-sidebar {
            flex: 0 0 300px;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
            padding: 24px 18px;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 220px;
        }

        .dwarka-img {
            width: 100%;
            max-width: 280px;
            border-radius: 10px;
            margin-bottom: 18px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .dwarka-facts {
            width: 100%;
        }

        .dwarka-facts h3 {
            font-size: 1.1rem;
            color: #007bff;
            margin-bottom: 10px;
            text-align: center;
        }

        .dwarka-facts ul {
            list-style: none;
            padding: 0;
            margin: 0;
            color: #444;
            font-size: 0.98rem;
        }

        .dwarka-facts li {
            margin-bottom: 8px;
            border-bottom: 1px solid #f0f0f0;
            padding-bottom: 5px;
        }

        .dwarka-content {
            flex: 1 1 0;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
            padding: 36px 32px;
        }

        .dwarka-content h2 {
            color: #007bff;
            font-size: 1.35rem;
            margin-top: 0;
            margin-bottom: 12px;
            border-bottom: 2px solid #e0eaff;
            display: inline-block;
            padding-bottom: 3px;
        }

        .dwarka-content ul {
            margin: 12px 0 24px 18px;
            color: #555;
            font-size: 1.05rem;
            padding-left: 0;
        }

        .dwarka-content li {
            margin-bottom: 10px;
            line-height: 1.6;
        }

        .dwarka-content p {
            font-size: 1.08rem;
            color: #444;
            margin-bottom: 18px;
            text-align: justify;
        }

        .dwarka-btn {
            display: inline-block;
            padding: 13px 36px;
            background: linear-gradient(90deg, #007bff 60%, #0056b3 100%);
            color: #fff;
            border: none;
            border-radius: 6px;
            font-size: 1.08rem;
            font-weight: 600;
            letter-spacing: 1px;
            cursor: pointer;
            text-decoration: none;
            box-shadow: 0 2px 8px rgba(0, 123, 255, 0.08);
            transition: background 0.2s, box-shadow 0.2s;
            margin-top: 18px;
        }

        .dwarka-btn:hover {
            background: linear-gradient(90deg, #0056b3 60%, #007bff 100%);
            box-shadow: 0 4px 16px rgba(0, 123, 255, 0.16);
        }

        .rating {
            display: flex;
            align-items: center;
            gap: 8px;

            & ion-icon {
                color: goldenrod;
            }
        }

        /* Responsive Design */
        @media (max-width: 900px) {
            .dwarka-main {
                flex-direction: column;
                gap: 24px;
            }

            .dwarka-sidebar,
            .dwarka-content {
                max-width: 100%;
                padding: 24px 10px;
            }

            .dwarka-content {
                padding: 24px 10px;
            }

            .dwarka-hero-content h1 {
                font-size: 2rem;
            }
        }
    </style>
    <?php include './link.php' ?>
</head>

<body>
    <main>
        <section class="dwarka-hero">
            <div class="dwarka-hero-bg" style="background-image:url('<?php echo htmlspecialchars($destination_details['image']); ?>');"></div>
            <div class="dwarka-hero-content">
                <h1><?php echo htmlspecialchars($destination_details['name']); ?></h1>
                <p class="dwarka-location"><?php echo htmlspecialchars($destination_details['location']); ?></p>
            </div>
        </section>

        <section class="dwarka-main">
            <aside class="dwarka-sidebar">
                <img src="<?php echo htmlspecialchars($destination_details['image']); ?>" alt="<?php echo htmlspecialchars($destination_details['name']); ?>" class="dwarka-img">
                <div class="dwarka-facts">
                    <h3>Quick Facts</h3>
                    <ul>
                        <li><strong>State:</strong> <?php echo htmlspecialchars($destination_details['location']); ?></li>
                        <li><strong>Best Time to Visit:</strong> <?php echo htmlspecialchars($destination_details['best_time']); ?></li>
                        <li><strong>Famous For:</strong> <?php echo htmlspecialchars($destination_details['famous_for']); ?></li>
                        <li class="rating"><strong>Rating:</strong>
                            <?php for ($i = 0; $i < $destination_details['rating']; $i++): ?>
                                <ion-icon name="star"></ion-icon>
                            <?php endfor; ?>
                        </li>
                    </ul>
                </div>
            </aside>
            <article class="dwarka-content">
                <h2>About <?php echo htmlspecialchars($destination_details['name']); ?></h2>
                <p><?php echo htmlspecialchars($destination_details['description']); ?></p>
                <h2>Key Attractions</h2>
                <ul>
                    <?php foreach ($attractions as $attr): ?>
                        <li>
                            <strong><?php echo htmlspecialchars($attr['name']); ?>:</strong>
                            <?php echo htmlspecialchars($attr['description']); ?>
                        </li>
                    <?php endforeach; ?>
                </ul>

                <h2>Why With Us</h2>
                <ul>
                    <li>Expert local guides for every destination</li>
                    <li>Personalized travel experiences</li>
                    <li>24/7 customer support</li>
                    <li>Best price guarantee</li>
                    <li>Trusted by thousands of happy travelers</li>
                </ul>

                <a href="../booking.php" class="dwarka-btn">Book Your Trip</a>
            </article>
        </section>
    </main>

</body>

</html>