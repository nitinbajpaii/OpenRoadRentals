import React from 'react';
import './About.css';

const About = () => {
  const services = [
    {
      icon: '🚗',
      title: 'Premium Car Rentals',
      description: 'Choose from our fleet of well-maintained SUVs, sedans, and luxury vehicles perfect for hill station terrain. All vehicles undergo rigorous safety checks.'
    },
    {
      icon: '🏍️',
      title: 'Adventure Bike Rentals',
      description: 'Experience the thrill of mountain roads on our performance bikes. Perfect for solo travelers and adventure enthusiasts.'
    },
    {
      icon: '🧭',
      title: 'Guided Tours',
      description: 'Opt for our guided tour packages with experienced local drivers who know the best routes and hidden gems in each hill station.'
    },
    {
      icon: '🛡️',
      title: '24/7 Roadside Assistance',
      description: 'Travel with peace of mind knowing our support team is available round-the-clock for any roadside emergencies.'
    }
  ];

  const teamMembers = [
    {
      name: 'Nitin Bajpai',
      role: 'Web Developer',
      bio: "Nitin's vision drives our commitment to excellence and customer satisfaction.",
      image: '/Nitin.jpg',
      social: {
        facebook: '#',
        instagram: 'https://www.instagram.com/nitinbajpaii?igsh=am5ubnRkaHV3dWk5',
        twitter: '#'
      }
    },
    {
      name: 'Nishant Jha',
      role: 'Front End Developer',
      bio: 'Nishant ensures our fleet is always in top condition and handles the logistics of our multi-location operations.',
      image: '/Nishant.jpg',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      name: 'Pawni Raheja',
      role: 'Web Developer',
      bio: 'Pawni leads our customer service team, ensuring every rental experience exceeds expectations from booking to return.',
      image: '',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      name: 'Palak',
      role: 'Front End Developer',
      bio: "Palak's creative approach to marketing has established Open Road Rentals as a premier brand in hill station tourism.",
      image: '',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    }
  ];

  const whyUsItems = [
    {
      icon: '🏆',
      title: 'Quality Vehicles',
      description: 'Our fleet consists of latest models, regularly serviced and maintained to the highest standards for your safety and comfort.'
    },
    {
      icon: '💰',
      title: 'Transparent Pricing',
      description: 'No hidden charges or surprise fees. Our pricing is straightforward with all inclusions clearly mentioned upfront.'
    },
    {
      icon: '🔄',
      title: 'Flexible Booking',
      description: 'Easy booking modifications, free cancellation up to 24 hours before pickup, and multiple pickup/drop-off locations.'
    },
    {
      icon: '⭐',
      title: '5-Star Service',
      description: 'With over 10,000 satisfied customers and a 4.8/5 rating, our commitment to exceptional service speaks for itself.'
    }
  ];

  return (
    <div className="about-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">About Open Road Rentals</h1>
          <p className="page-subtitle">Your trusted partner for unforgettable hill station adventures since 2010</p>
        </div>
      </div>

      {/* Our Story */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          
          <div className="about-content">
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Open Road Rentals Story" />
            </div>
            
            <div className="about-text">
              <h3>How We Started</h3>
              <p>Open Road Rentals was founded in 2025 by a group of passionate travelers who saw a need for reliable, high-quality vehicle rentals in India's most beautiful hill stations. What started as a small fleet of just 5 vehicles in Shimla has now grown to over 200 cars and bikes across 10 hill stations.</p>
              
              <h3>Our Mission</h3>
              <p>To provide travelers with safe, reliable, and affordable vehicles that enhance their hill station experience, allowing them to explore breathtaking landscapes at their own pace while delivering exceptional customer service.</p>
              
              <h3>Our Vision</h3>
              <p>To become India's most trusted vehicle rental service for hill station tourism, known for our commitment to quality, safety, and customer satisfaction, while promoting responsible tourism in fragile mountain ecosystems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-image">
                  <img 
                    src={member.image || 'https://via.placeholder.com/250x250?text=Team+Member'} 
                    alt={member.name} 
                  />
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                  <div className="social-icons">
                    <a href={member.social.facebook} aria-label="Facebook">FB</a>
                    <a href={member.social.instagram} aria-label="Instagram">IN</a>
                    <a href={member.social.twitter} aria-label="Twitter">TW</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          
          <div className="why-us-grid">
            {whyUsItems.map((item, index) => (
              <div key={index} className="why-us-item">
                <div className="why-us-icon">{item.icon}</div>
                <h3 className="why-us-title">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;