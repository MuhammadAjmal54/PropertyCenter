// pages/user/PredictionPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calculator } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';

const PredictionPage = () => {
  const streamlitUrl = 'https://example-streamlit-prediction-app.com';

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-gray-900">Property Price Prediction</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Our AI-powered price prediction tool helps you estimate property values based on location, size, and features.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:pr-8">
                <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                  <Calculator className="h-10 w-10 text-blue-900" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Get Accurate Property Valuations
                </h2>
                <p className="text-gray-600 mb-6">
                  Our prediction tool uses machine learning algorithms trained on extensive real estate data to provide accurate price estimates for your property.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center text-white font-medium">
                        1
                      </div>
                    </div>
                    <p className="ml-3 text-gray-600">Enter your property details</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center text-white font-medium">
                        2
                      </div>
                    </div>
                    <p className="ml-3 text-gray-600">Select location and amenities</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center text-white font-medium">
                        3
                      </div>
                    </div>
                    <p className="ml-3 text-gray-600">Get instant price prediction</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="flex items-center"
                    onClick={() => window.open(streamlitUrl, '_blank')}
                  >
                    <span>Open Prediction Tool</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-2/5">
                <img
                  src="https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg"
                  alt="Property Prediction"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-blue-50 rounded-lg p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Why Use Our Prediction Tool?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow">
              <h4 className="font-medium text-lg text-gray-900 mb-2">Accuracy</h4>
              <p className="text-gray-600">
                Our model is trained on thousands of real estate transactions for high accuracy predictions.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow">
              <h4 className="font-medium text-lg text-gray-900 mb-2">Up-to-Date</h4>
              <p className="text-gray-600">
                Regularly updated with the latest market data to reflect current trends and prices.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow">
              <h4 className="font-medium text-lg text-gray-900 mb-2">Comprehensive</h4>
              <p className="text-gray-600">
                Takes into account location, size, amenities, and market conditions for holistic evaluation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PredictionPage;
