const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = function override(config, env) {
  let destinationDirectoryImages;
  let destinationDirectoryUploads;
  
  if (env === 'production') {
    destinationDirectoryImages = 'build/images';
  }
  if (env === 'development') {
    destinationDirectoryImages = 'public/images'
  }
  if (env === 'production') {
    destinationDirectoryUploads = 'build/uploads';
  }
  if (env === 'development') {
    destinationDirectoryUploads = 'public/uploads'
  }


  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../images'), // Assuming 'react-app' is inside 'SoundUp'
          to: path.resolve(__dirname, destinationDirectoryImages),
        },
        {
          from: path.resolve(__dirname, '../uploads'),
          to: path.resolve(__dirname, destinationDirectoryUploads)
        }
      ],
    })
  );

  return config;
};