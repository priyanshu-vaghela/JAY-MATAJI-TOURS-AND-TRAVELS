<style>
    /*-----------------------------------*\
    * #PACKAGE
    \*-----------------------------------*/

    .package {
        padding-block: var(--section-padding);
    }

    .package-list {
        margin-bottom: 40px;
    }

    .package-list>li:not(:last-child) {
        margin-bottom: 30px;
    }

    .package-card {
        background: var(--cultured);
        overflow: hidden;
        border-radius: 15px;
    }

    .package-card .card-banner {
        height: 250px;
    }

    .package-card .card-banner img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .package-card .card-content {
        padding: 30px 20px;
    }

    .package-card .card-title {
        margin-bottom: 15px;
    }

    .package-card .card-text {
        line-height: 1.6;
        margin-bottom: 20px;
    }

    .card-meta-list {
        background: var(--white);
        max-width: max-content;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 8px;
        box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.15);
        border-radius: 50px;
    }

    .card-meta-item {
        position: relative;
    }

    .card-meta-item:not(:last-child)::after {
        content: "";
        position: absolute;
        top: 4px;
        right: -1px;
        bottom: 4px;
        width: 1px;
        background: hsla(0, 0%, 0%, 0.3);
    }

    .meta-box {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        padding-inline: 9px;
        color: var(--black-coral);
        font-size: var(--fs-8);
    }

    .meta-box>ion-icon {
        color: var(--bright-navy-blue);
        font-size: 13px;
    }

    .package-card .card-price {
        background: var(--united-nations-blue);
        color: var(--white);
        padding: 25px 20px;
        text-align: center;
    }

    .package-card .card-price .wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 5px 15px;
        margin-bottom: 10px;
    }

    .package-card .card-price .reviews {
        font-size: var(--fs-5);
    }

    .package-card .card-rating {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1px;
        font-size: 14px;
    }

    .package-card .card-rating ion-icon:last-child {
        color: hsl(0, 0%, 80%);
    }

    .package-card .price {
        font-size: var(--fs-2);
        font-family: var(--ff-montserrat);
        font-weight: var(--fw-800);
        margin-bottom: 20px;
    }

    .package-card .price span {
        font-size: var(--fs-7);
        font-weight: initial;
    }

    .package .btn {
        margin-inline: auto;
    }
</style>

<section class="package" id="choose-your-ride">
    <div class="container">

        <p class="section-subtitle">Choose Your Ride</p>
        <h2 class="h2 section-title">Select the Perfect Vehicle for Your Journey</h2>
        <p class="section-text">
            Whether you’re traveling solo, with family, or in a group, we have the right vehicle for you. All rides come with professional drivers, comfort, and safety.
        </p>

        <ul class="package-list">

            <li>
                <div class="package-card">
                    <figure class="card-banner">
                        <img src="./assets/choose_ride/Suzuki_Swift.jpg" alt="Four Seater Car" loading="lazy">
                    </figure>
                    <div class="card-content">
                        <h3 class="h3 card-title">Four Seater Car</h3>
                        <p class="card-text">
                            Ideal for small families or business trips. Enjoy AC comfort, music system, and ample luggage space.
                        </p>
                        <ul class="card-meta-list">
                            <li class="card-meta-item">
                                <div class="meta-box">
                                    <ion-icon name="people"></ion-icon>
                                    <p class="text">Seats: 4</p>
                                </div>
                            </li>
                            <li class="card-meta-item">
                                <div class="meta-box">
                                    <ion-icon name="snow"></ion-icon>
                                    <p class="text">AC/Non-AC</p>
                                </div>
                            </li>
                            <li class="card-meta-item">
                                <div class="meta-box">
                                    <ion-icon name="briefcase"></ion-icon>
                                    <p class="text">Luggage: 2 Bags</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="card-price">
                        <p class="price">
                            ₹12/km
                            <span>+ driver</span>
                        </p>
                        <button class="btn btn-secondary">Book Now</button>
                    </div>
                </div>
            </li>

            <li>
                <div class="package-card">
                    <figure class="card-banner">
                        <img src="./assets/choose_ride/Suzuki_Ertiga.jpg" alt="Mini Van" loading="lazy">
                    </figure>
                    <div class="card-content">
                        <h3 class="h3 card-title">Mini Van</h3>
                        <p class="card-text">
                            Perfect for families or small groups. Spacious, comfortable, and equipped with modern amenities.
                        </p>
                        <ul class="card-meta-list">
                            <li class="card-meta-item">
                                <div class="meta-box">
                                    <ion-icon name="people"></ion-icon>
                                    <p class="text">Seats: 7</p>
                                </div>
                            </li>
                            <li class="card-meta-item">
                                <div class="meta-box">
                                    <ion-icon name="snow"></ion-icon>
                                    <p class="text">AC</p>
                                </div>
                            </li>
                            <li class="card-meta-item">
                                <div class="meta-box">
                                    <ion-icon name="briefcase"></ion-icon>
                                    <p class="text">Luggage: 4 Bags</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="card-price">
                        <p class="price">
                            ₹18/km
                            <span>+ driver</span>
                        </p>
                        <button class="btn btn-secondary">Book Now</button>
                    </div>
                </div>
            </li>

            <li>
                <div class="package-card">
                    <figure class="card-banner">
                        <img src="./assets/choose_ride/urbania.jpg" alt="Mini Bus" loading="lazy">
                    </figure>
                    <div class="card-content">
                        <h3 class="h3 card-title">Mini Bus</h3>
                        <p class="card-text">
                            Best for group tours, events, or corporate outings. Enjoy a smooth ride with plenty of space.
                        </p>
                        <ul class="card-meta-list">
                            <li class="card-meta-item">
                                <div class="meta-box">
                                    <ion-icon name="people"></ion-icon>
                                    <p class="text">Seats: 17</p>
                                </div>
                            </li>
                            <li class="card-meta-item">
                                <div class="meta-box">
                                    <ion-icon name="snow"></ion-icon>
                                    <p class="text">AC</p>
                                </div>
                            </li>
                            <li class="card-meta-item">
                                <div class="meta-box">
                                    <ion-icon name="briefcase"></ion-icon>
                                    <p class="text">Luggage: 8 Bags</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="card-price">
                        <p class="price">
                            ₹28/km
                            <span>+ driver</span>
                        </p>
                        <button class="btn btn-secondary">Book Now</button>
                    </div>
                </div>
            </li>

        </ul>

        <button class="btn btn-primary">View All Rides</button>

    </div>
</section>