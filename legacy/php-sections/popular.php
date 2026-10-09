<section class="popular" id="destination">
    <div class="container">
        <p class="section-subtitle">Uncover place</p>
        <h2 class="h2 section-title">Popular destination</h2>
        <p class="section-text">
            Explore some of the most breathtaking and culturally rich destinations. From serene beaches to historic landmarks, discover your next adventure.
        </p>

        <?php
        $result = mysqli_query($connection, "SELECT * FROM destinations LIMIT 3");
        ?>

        <ul class="popular-list">
        <?php while($row = mysqli_fetch_assoc($result)): ?>
            <li>
                <div class="popular-card">
                    <figure class="card-img">
                        <img src="<?php echo htmlspecialchars($row['image']); ?>" alt="<?php echo htmlspecialchars($row['name']); ?>" loading="lazy">
                    </figure>
                    <div class="card-content">
                        <div class="card-rating">
                            <?php for($i=0; $i<$row['rating']; $i++): ?>
                                <ion-icon name="star"></ion-icon>
                            <?php endfor; ?>
                        </div>
                        <p class="card-subtitle">
                            <a href="#"><?php echo htmlspecialchars($row['location']); ?></a>
                        </p>
                        <h3 class="h3 card-title">
                            <a href="sections/detail.php?id=<?php echo $row['id']; ?>"><?php echo htmlspecialchars($row['name']); ?></a>
                        </h3>
                        <p class="card-text">
                            <?php echo htmlspecialchars($row['description']); ?>
                        </p>
                    </div>
                </div>
            </li>
        <?php endwhile; ?>
        </ul>

        <button class="btn btn-primary">More destination</button>
    </div>
</section>



