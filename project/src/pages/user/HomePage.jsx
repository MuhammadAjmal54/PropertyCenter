// // pages/user/HomePage.jsx












import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building, Home as HomeIcon, LineChart, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for programmatic navigation
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';

const HomePage = () => {
  const navigate = useNavigate();  // Initialize navigate function

  const services = [
    {
      icon: <HomeIcon className="w-8 h-8 text-blue-900" />,
      title: 'Buy Property',
      description: 'Find your dream property from our extensive listings.',
      link: '/user/buy',  // Corrected the route for Buy Page
    },
    {
      icon: <Building className="w-8 h-8 text-blue-900" />,
      title: 'Sell Property',
      description: 'List your property and reach thousands of potential buyers.',
      link: '/user/sell',  // Corrected the route for Sell Page
    },
    {
      icon: <LineChart className="w-8 h-8 text-blue-900" />,
      title: 'Price Prediction',
      description: 'Get an estimated value for any property using our AI-powered tool.',
      link: '/user/prediction',  // Corrected the route for Prediction Page
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-blue-900" />,
      title: 'FAQs',
      description: 'Find answers to commonly asked questions about real estate.',
      link: '/user/faqs',  // Corrected the route for FAQs Page
    },
  ];

  const handleBrowseProperties = () => {
    navigate('/user/buy');  // Navigate to Buy Page
  };

  const handlePricePrediction = () => {
    navigate('/user/prediction');  // Navigate to Price Prediction Page
  };

  const handleGetStarted = () => {
    navigate('/user/buy');  // Navigate to Buy Page on Get Started button click
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                PropertyCenter - Choose your property with the help of us
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Your trusted partner in finding the perfect property. We help you make informed decisions for your real estate investments.
              </p>
              <div className="flex flex-wrap gap-4">
                {/* "Browse Properties" button */}
                <Button variant="secondary" size="lg" onClick={handleBrowseProperties}>
                  Browse Properties
                </Button>
                {/* "Get Price Prediction" button */}
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-blue-900"
                  onClick={handlePricePrediction}
                >
                  Get Price Prediction
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <img
                src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
                alt="Beautiful house"
                className="rounded-lg shadow-2xl w-full object-cover h-[400px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Main Services</h2>
            <p className="text-gray-600 mt-2">Explore our comprehensive real estate services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hoverable className="h-full text-center p-6" onClick={() => navigate(service.link)}>
                  <div className="flex justify-center mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center justify-center text-blue-900 font-medium">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-4xl font-bold text-blue-900 mb-2">500+</div>
              <div className="text-gray-600">Properties Listed</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-4xl font-bold text-blue-900 mb-2">300+</div>
              <div className="text-gray-600">Happy Customers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-4xl font-bold text-blue-900 mb-2">10+</div>
              <div className="text-gray-600">Cities Covered</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to find your dream property?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking to buy, sell, or just exploring the market, we're here to help you every step of the way.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handleGetStarted}  // Clicking this button will navigate to Buy page
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
