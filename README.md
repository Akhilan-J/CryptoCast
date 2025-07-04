# CryptoCast 🚀

A full-stack cryptocurrency price prediction application that uses machine learning to forecast Bitcoin and Ethereum prices. Built with React/TypeScript frontend, Flask backend, and TensorFlow/Keras ML models.

## 🌟 Features

- **Real-time Cryptocurrency Data**: Live price feeds for Bitcoin and Ethereum
- **ML-Powered Predictions**: LSTM neural networks trained on historical price data
- **Interactive Dashboard**: Beautiful React-based UI with real-time charts
- **Automated Pipeline**: Scheduled predictions every 4 hours
- **Data Persistence**: MongoDB integration for storing predictions
- **Prediction Verification**: Automatic accuracy tracking against actual prices
- **Dockerized Deployment**: Easy setup with Docker Compose

## 🏗️ Architecture

```
CryptoCast/
├── Frontend/          # React + TypeScript + Vite
│   ├── src/
│   │   ├── Components/    # Reusable UI components
│   │   ├── Pages/         # Main application pages
│   │   └── assets/        # Static assets
│   └── Dockerfile
├── Backend/           # Flask API + ML Models
│   ├── api/               # Flask REST API
│   ├── Model/             # ML models and training scripts
│   └── prediction_pipeline.py
└── docker-compose.yml
```

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Framer Motion** for animations
- **Axios** for API calls

### Backend

- **Flask** web framework
- **MongoDB** for data storage
- **TensorFlow/Keras** for ML models
- **Pandas/NumPy** for data processing
- **CoinGecko API** for live crypto data

### ML Models

- **LSTM Neural Networks** for time series prediction
- **Technical Analysis** features (OHLCV data)
- **Automated retraining** pipeline
- **Real-time prediction** updates

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- MongoDB Atlas account (for database)
- CoinGecko API access (free tier available)

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/CryptoCast.git
   cd CryptoCast
   ```

2. **Setup environment variables**

   Create a `.env` file in the `Backend/api/` directory:

   ```env
   MONGO_URI=your_mongodb_connection_string
   CLUSTER=your_database_name
   ```

### 🐳 Docker Deployment (Recommended)

**Build and run with Docker Compose:**

```bash
# Build the images
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Services will be available at:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### 🔧 Development Setup

#### Frontend Development

```bash
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

#### Backend Development

```bash
cd Backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start Flask development server
cd api
python api.py

# Run prediction pipeline (optional)
cd ..
python prediction_pipeline.py
```

## 🤖 Machine Learning Pipeline

The ML pipeline consists of several automated processes:

### 1. Data Collection

- **API Scripts**: `api_btc.py` and `api_eth.py` fetch live market data
- **Historical Data**: Stored in CSV files for model training
- **Real-time Updates**: Continuous data collection every 4 hours

### 2. Model Training

- **LSTM Networks**: Trained on OHLCV (Open, High, Low, Close, Volume) data
- **Sequence Length**: 12 time steps (2 days of 4-hour intervals)
- **Features**: Technical indicators and price movements

### 3. Prediction Generation

- **Automated Predictions**: Generated every 4 hours
- **Multi-currency Support**: Bitcoin and Ethereum
- **Confidence Metrics**: Trend analysis and price change calculations

### 4. Verification System

- **Accuracy Tracking**: Compares predictions with actual prices
- **Performance Metrics**: 2% margin of error tolerance
- **Continuous Learning**: Models can be retrained based on performance

## 📊 API Endpoints

### Prediction Endpoints

- `GET /btc` - Get latest Bitcoin prediction
- `GET /eth` - Get latest Ethereum prediction
- `POST /record/btc` - Store Bitcoin prediction
- `POST /record/eth` - Store Ethereum prediction

### Verification Endpoints

- `POST /verify/btc` - Verify Bitcoin prediction accuracy
- `POST /verify/eth` - Verify Ethereum prediction accuracy

## 🔍 Monitoring and Logs

- **Prediction Logs**: `Backend/logs/prediction_logs.txt`
- **Docker Logs**: `docker-compose logs [service_name]`
- **Flask Debug Mode**: Enabled in development

## 🛡️ Security Considerations

- Environment variables for sensitive data
- CORS properly configured
- Input validation on all endpoints
- Rate limiting recommended for production

## 🚀 Deployment

### Production Deployment

1. **Environment Variables**: Set all required environment variables
2. **Database Setup**: Ensure MongoDB is properly configured
3. **SSL/TLS**: Configure HTTPS for production
4. **Monitoring**: Set up application monitoring
5. **Backup**: Regular database backups

### Scaling Considerations

- **Load Balancing**: Multiple backend instances
- **Database Sharding**: For large datasets
- **CDN**: For static frontend assets
- **Caching**: Redis for API response caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📈 Future Enhancements

- [ ] Support for additional cryptocurrencies
- [ ] Advanced technical indicators
- [ ] Mobile app development
- [ ] Real-time WebSocket connections
- [ ] Advanced ML models (Transformer, CNN)
- [ ] Portfolio tracking features
- [ ] Social sentiment analysis

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- CoinGecko API for cryptocurrency data
- TensorFlow/Keras for ML framework
- React and Vite communities
- MongoDB for database services

## 📞 Support

For support, email support@cryptocast.com or join our Discord server.

---

**⚠️ Disclaimer**: This application is for educational purposes only. Cryptocurrency investments carry significant risk. Always do your own research and consult with financial advisors before making investment decisions.

