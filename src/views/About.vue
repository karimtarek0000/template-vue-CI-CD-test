<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">About Us</h1>
          <p class="hero-description">
            We are passionate about creating innovative solutions that make a difference. Our team
            is dedicated to delivering excellence and pushing the boundaries of what's possible.
          </p>
          <button class="cta-button">Learn More</button>
        </div>
        <div class="hero-image">
          <div class="image-placeholder">
            <svg
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">Why Choose Us</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3 class="feature-title">Fast Performance</h3>
            <p class="feature-description">
              Lightning-fast solutions optimized for maximum performance and efficiency.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3 class="feature-title">Reliable & Secure</h3>
            <p class="feature-description">
              Built with security in mind, ensuring your data is always protected and safe.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3 class="feature-title">Expert Team</h3>
            <p class="feature-description">
              Our experienced team brings years of expertise to every project we undertake.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'About',
  };
</script>

<style scoped>
  .about-page {
    min-height: 100vh;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Hero Section */
  .hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 100px 0;
    min-height: 70vh;
    display: flex;
    align-items: center;
  }

  .hero-section .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .hero-description {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 30px;
    opacity: 0.9;
  }

  .cta-button {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid white;
    padding: 12px 30px;
    font-size: 1.1rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .cta-button:hover {
    background: white;
    color: #667eea;
    transform: translateY(-2px);
  }

  .hero-image {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-placeholder {
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .image-placeholder svg {
    width: 100px;
    height: 100px;
    color: white;
  }

  /* Features Section */
  .features-section {
    padding: 100px 0;
    background: #f8fafc;
  }

  .section-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 60px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
  }

  .feature-card {
    background: white;
    padding: 40px 30px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 1px solid #e2e8f0;
  }

  .feature-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .feature-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    margin-bottom: 20px;
    color: white;
  }

  .feature-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 15px;
  }

  .feature-description {
    color: #718096;
    line-height: 1.6;
    font-size: 1rem;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-section .container {
      grid-template-columns: 1fr;
      gap: 40px;
      text-align: center;
    }

    .hero-title {
      font-size: 2.5rem;
    }

    .hero-description {
      font-size: 1.1rem;
    }

    .image-placeholder {
      width: 250px;
      height: 250px;
    }

    .section-title {
      font-size: 2rem;
    }

    .features-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .hero-section {
      padding: 60px 0;
    }

    .features-section {
      padding: 60px 0;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 15px;
    }

    .hero-title {
      font-size: 2rem;
    }

    .feature-card {
      padding: 30px 20px;
    }

    .image-placeholder {
      width: 200px;
      height: 200px;
    }

    .image-placeholder svg {
      width: 60px;
      height: 60px;
    }
  }
</style>
