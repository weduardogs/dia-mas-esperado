#!/bin/bash

# FastAPI Deployment Script for VPS Hostinger
# This script automates the deployment process

set -e

echo "=== FastAPI Deployment Script ==="

# Configuration
APP_NAME="fastapi-app"
APP_DIR="/var/www/fastapi"
VENV_DIR="$APP_DIR/venv"
REPO_URL="your-git-repo-url"
DOMAIN="your-domain.com"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_info() {
    echo -e "${YELLOW}[INFO]${NC} $1"
}

# Update system
print_info "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install dependencies
print_info "Installing system dependencies..."
sudo apt install -y python3.11 python3.11-venv python3-pip nginx postgresql postgresql-contrib git certbot python3-certbot-nginx

# Create application directory
print_info "Setting up application directory..."
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

# Clone or update repository
if [ -d "$APP_DIR/.git" ]; then
    print_info "Updating repository..."
    cd $APP_DIR
    git pull origin main
else
    print_info "Cloning repository..."
    git clone $REPO_URL $APP_DIR
    cd $APP_DIR
fi

# Create virtual environment
print_info "Creating virtual environment..."
python3.11 -m venv $VENV_DIR

# Activate virtual environment and install dependencies
print_info "Installing Python dependencies..."
source $VENV_DIR/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Setup environment file
if [ ! -f "$APP_DIR/.env" ]; then
    print_info "Creating .env file..."
    cp $APP_DIR/.env.example $APP_DIR/.env
    print_info "Please edit $APP_DIR/.env with your configuration"
fi

# Setup PostgreSQL database
print_info "Setting up PostgreSQL database..."
sudo -u postgres psql <<EOF
CREATE DATABASE IF NOT EXISTS fastapi_db;
CREATE USER IF NOT EXISTS fastapi_user WITH ENCRYPTED PASSWORD 'change-this-password';
GRANT ALL PRIVILEGES ON DATABASE fastapi_db TO fastapi_user;
\q
EOF

# Run database migrations (if using Alembic)
if [ -d "$APP_DIR/alembic" ]; then
    print_info "Running database migrations..."
    alembic upgrade head
fi

# Setup systemd service
print_info "Setting up systemd service..."
sudo cp $APP_DIR/deployment/fastapi.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable fastapi
sudo systemctl restart fastapi

# Setup Nginx
print_info "Setting up Nginx..."
sudo cp $APP_DIR/deployment/nginx.conf /etc/nginx/sites-available/$APP_NAME
sudo sed -i "s/your-domain.com/$DOMAIN/g" /etc/nginx/sites-available/$APP_NAME
sudo ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Setup SSL with Let's Encrypt
read -p "Do you want to setup SSL with Let's Encrypt? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Setting up SSL certificate..."
    sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN
fi

# Setup firewall
print_info "Configuring firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw --force enable

# Check status
print_info "Checking application status..."
sudo systemctl status fastapi --no-pager

print_success "Deployment completed successfully!"
print_info "Application is running at: https://$DOMAIN"
print_info "API Documentation: https://$DOMAIN/docs"
print_info "Health Check: https://$DOMAIN/api/v1/health"

echo ""
echo "=== Post-Deployment Steps ==="
echo "1. Edit .env file: nano $APP_DIR/.env"
echo "2. Restart service: sudo systemctl restart fastapi"
echo "3. Check logs: sudo journalctl -u fastapi -f"
echo "4. Check nginx logs: sudo tail -f /var/log/nginx/fastapi_error.log"
