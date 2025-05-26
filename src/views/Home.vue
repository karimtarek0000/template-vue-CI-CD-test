<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <span class="hero-badge">Welcome to Our Platform</span>
          <h1 class="hero-title">Building the Future with Innovation</h1>
          <p class="hero-description">
            Transform your ideas into reality with our cutting-edge solutions. We provide powerful
            tools and expert guidance to help you succeed in the digital world.
          </p>
          <div class="hero-buttons">
            <button class="btn-primary">Get Started</button>
            <button class="btn-secondary">Watch Demo</button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-cards">
            <div class="card card-1">
              <div class="card-icon">💡</div>
              <span>Innovation</span>
            </div>
            <div class="card card-2">
              <div class="card-icon">🚀</div>
              <span>Performance</span>
            </div>
            <div class="card card-3">
              <div class="card-icon">🎯</div>
              <span>Precision</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Our Services</span>
          <h2 class="section-title">What We Offer</h2>
          <p class="section-description">
            Comprehensive solutions designed to accelerate your business growth and digital
            transformation.
          </p>
        </div>

        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">
              <svg
                width="48"
                height="48"
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
            <h3 class="service-title">Web Development</h3>
            <p class="service-description">
              Modern, responsive websites built with the latest technologies to deliver exceptional
              user experiences.
            </p>
            <div class="service-features">
              <span class="feature-tag">React</span>
              <span class="feature-tag">Vue.js</span>
              <span class="feature-tag">Node.js</span>
            </div>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="3"
                  width="20"
                  height="14"
                  rx="2"
                  ry="2"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" stroke-width="2" />
                <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="2" />
              </svg>
            </div>
            <h3 class="service-title">UI/UX Design</h3>
            <p class="service-description">
              Beautiful, intuitive designs that focus on user experience and drive engagement across
              all devices.
            </p>
            <div class="service-features">
              <span class="feature-tag">Figma</span>
              <span class="feature-tag">Adobe XD</span>
              <span class="feature-tag">Sketch</span>
            </div>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <polyline
                  points="7.5,4.21 12,6.81 16.5,4.21"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <polyline points="7.5,19.79 7.5,14.6 3,12" stroke="currentColor" stroke-width="2" />
                <polyline
                  points="21,12 16.5,14.6 16.5,19.79"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <polyline points="12,22.08 12,17" stroke="currentColor" stroke-width="2" />
              </svg>
            </div>
            <h3 class="service-title">Cloud Solutions</h3>
            <p class="service-description">
              Scalable cloud infrastructure and deployment solutions to ensure your applications run
              smoothly at any scale.
            </p>
            <div class="service-features">
              <span class="feature-tag">AWS</span>
              <span class="feature-tag">Azure</span>
              <span class="feature-tag">Docker</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Home',
  };
</script>

<style scoped>
  .home-page {
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
    padding: 120px 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    pointer-events: none;
  }

  .hero-section .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .hero-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .hero-title {
    font-size: 4rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 24px;
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-description {
    font-size: 1.3rem;
    line-height: 1.6;
    margin-bottom: 40px;
    opacity: 0.9;
    max-width: 500px;
  }

  .hero-buttons {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .btn-primary {
    background: white;
    color: #667eea;
    border: none;
    padding: 15px 35px;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }

  .btn-secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
    padding: 13px 35px;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .btn-secondary:hover {
    background: white;
    color: #667eea;
    transform: translateY(-3px);
  }

  .floating-cards {
    position: relative;
    height: 400px;
  }

  .card {
    position: absolute;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    padding: 30px;
    text-align: center;
    color: white;
    animation: float 6s ease-in-out infinite;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  .card-1 {
    top: 0;
    left: 0;
    animation-delay: 0s;
  }

  .card-2 {
    top: 100px;
    right: 0;
    animation-delay: 2s;
  }

  .card-3 {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    animation-delay: 4s;
  }

  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  /* Services Section */
  .services-section {
    padding: 120px 0;
    background: #ffffff;
  }

  .section-header {
    text-align: center;
    margin-bottom: 80px;
  }

  .section-badge {
    display: inline-block;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 3rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 20px;
  }

  .section-description {
    font-size: 1.2rem;
    color: #718096;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 40px;
  }

  .service-card {
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid #f1f5f9;
    position: relative;
    overflow: hidden;
  }

  .service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  .service-card:hover::before {
    transform: scaleX(1);
  }

  .service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }

  .service-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    color: white;
    margin-bottom: 30px;
  }

  .service-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 15px;
  }

  .service-description {
    color: #718096;
    line-height: 1.6;
    margin-bottom: 25px;
  }

  .service-features {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .feature-tag {
    background: #f8fafc;
    color: #4a5568;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    border: 1px solid #e2e8f0;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-section .container {
      grid-template-columns: 1fr;
      gap: 60px;
      text-align: center;
    }

    .hero-title {
      font-size: 2.5rem;
    }

    .hero-description {
      font-size: 1.1rem;
    }

    .hero-buttons {
      justify-content: center;
    }

    .floating-cards {
      height: 300px;
    }

    .card {
      padding: 20px;
    }

    .section-title {
      font-size: 2rem;
    }

    .services-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .hero-section {
      padding: 80px 0;
    }

    .services-section {
      padding: 80px 0;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 15px;
    }

    .hero-title {
      font-size: 2rem;
    }

    .hero-buttons {
      flex-direction: column;
      align-items: center;
    }

    .btn-primary,
    .btn-secondary {
      width: 100%;
      max-width: 250px;
    }

    .service-card {
      padding: 30px 20px;
    }

    .services-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
