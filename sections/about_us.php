<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    /* About Us Page Stylish CSS */
    .section.about {
      background: linear-gradient(120deg, #f4f8fb 60%, #e6f0fa 100%);
      padding: 60px 0 50px 0;
      border-radius: 22px;
      box-shadow: 0 6px 32px rgba(0,0,0,0.07);
    }
    
    .about-flex {
      display: flex;
      align-items: center;
      gap: 60px;
      /* max-width: 1050px; */
      margin: 0 auto;
      flex-wrap: wrap;
    }
    
    .about-content {
      flex: 1 1 380px;
      min-width: 280px;
      margin-bottom: 0;
    }
    
    .about .section-subtitle {
      /* text-align: left !important; */
      margin-bottom: 10px;
      color: var(--bright-navy-blue);
      font-weight: var(--fw-600);
      letter-spacing: 1px;
      font-size: 15px;
    }

    .about .section-title {
      font-size: 35px;
      text-align: left !important;
      margin-bottom: 20px;
    }

    .about-text,
    .about-item-text {
      color: var(--black-coral);
      font-size: var(--fs-5);
      line-height: 1.7;
    }

    .about-text {
      margin-bottom: 30px;
    }

    .about-list {
      display: grid;
      gap: 20px;
      margin-bottom: 40px;
    }

    .about-item {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      background: var(--cultured);
      border-radius: var(--radius-15);
      box-shadow: 0 1px 6px rgba(0,0,0,0.04);
      padding: 18px 16px;
    }

    .about-item-icon {
      background: var(--bright-navy-blue);
      color: var(--white);
      font-size: 26px;
      padding: 16px;
      border-radius: 50%;
      margin-top: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .about-item-title {
      color: var(--gunmetal);
      font-weight: var(--fw-600);
      margin-bottom: 5px;
    }

    .about-banner {
      flex:450px;
      /* min-width: 220px; */
      /* max-width: 400px; */
      display: flex;
      align-items: stretch;
      justify-content: center;
      margin: 0;
      overflow: hidden;
    }

    .about-img {
      width:600px;
      height: 100%;
      min-height: 100%;
      object-fit: cover;
      /* border-radius: var(--radius-15);
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      background: var(--cultured); */
      display: block;
    }

    /* Responsive: stack on mobile */
    @media (max-width: 900px) {
      .about-flex {
        flex-direction: column;
        padding: 0 10px;
      }
      .about-banner {
        max-width: 100%;
        height: auto;
      }
      .about-img {
        max-width: 100%;
        height: auto;
        min-height: 280px;
        object-fit: cover;
      }
    }
  </style>
</head>
<body>
  <main>
    <section class="section about" >
      <div class="container about-flex" id="about_us">
        <!-- Left: About Content -->
        <div class="about-content">
          <p class="section-subtitle">About Us</p>
          <h2 class="section-title">Explore all tours of the world with us.</h2>
          <p class="about-text">
            At Jay Mataji Tours and Travels, we believe every journey should be inspiring, safe, and memorable. With years of experience and a passion for travel, we offer expertly crafted tours, personalized service, and unbeatable value for every traveler.
          </p>
          <ul class="about-list">
            <li class="about-item">
              <div class="about-item-icon">
                <ion-icon name="compass"></ion-icon>
              </div>
              <div class="about-item-content">
                <h3 class="h3 about-item-title">Expert Tour Guides</h3>
                <p class="about-item-text">
                  Our knowledgeable and friendly guides ensure you experience every destination like a local, sharing hidden gems and fascinating stories.
                </p>
              </div>
            </li>
            <li class="about-item">
              <div class="about-item-icon">
                <ion-icon name="briefcase"></ion-icon>
              </div>
              <div class="about-item-content">
                <h3 class="h3 about-item-title">Affordable Packages</h3>
                <p class="about-item-text">
                  We offer a wide range of tours to suit every budget, with transparent pricing and no hidden costs.
                </p>
              </div>
            </li>
            <li class="about-item">
              <div class="about-item-icon">
                <ion-icon name="umbrella"></ion-icon>
              </div>
              <div class="about-item-content">
                <h3 class="h3 about-item-title">Reliable & Safe Travel</h3>
                <p class="about-item-text">
                  Your comfort and safety are our top priorities. Enjoy well-planned itineraries, secure transport, and 24/7 support throughout your journey.
                </p>
              </div>
            </li>
          </ul>
          <!-- <a href="#" class="btn btn-primary">Book Now</a> -->
        </div>
        <!-- Right: About Image -->
        <figure class="about-banner">
          <img src="./assets/about_us/about-banner.png" loading="lazy" alt="About Jay Mataji Tours and Travels" class="about-img">
        </figure>
      </div>
    </section>
  </main>
</body>
</html>