#!/bin/bash

# Aura Wellness Chatbot Setup Script
# This script sets up the development environment for the Aura chatbot

set -e

echo "🌟 Setting up Aura Wellness Chatbot..."
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    print_status "Checking Node.js installation..."
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed: $NODE_VERSION"
        
        # Check if version is 18 or higher
        NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
        if [ "$NODE_MAJOR_VERSION" -lt 18 ]; then
            print_warning "Node.js version 18 or higher is recommended. Current version: $NODE_VERSION"
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 18 or higher."
        echo "Visit: https://nodejs.org/"
        exit 1
    fi
}

# Check if npm is installed
check_npm() {
    print_status "Checking npm installation..."
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_success "npm is installed: $NPM_VERSION"
    else
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install root dependencies
    print_status "Installing root dependencies..."
    npm install
    
    # Install server dependencies
    print_status "Installing server dependencies..."
    cd server
    npm install
    cd ..
    
    # Install client dependencies
    print_status "Installing client dependencies..."
    cd client
    npm install
    cd ..
    
    print_success "All dependencies installed successfully!"
}

# Setup environment files
setup_environment() {
    print_status "Setting up environment files..."
    
    # Server environment
    if [ ! -f "server/.env" ]; then
        print_status "Creating server environment file..."
        cp server/env.example server/.env
        print_warning "Please edit server/.env with your Google Cloud credentials"
    else
        print_success "Server environment file already exists"
    fi
    
    # Client environment
    if [ ! -f "client/.env" ]; then
        print_status "Creating client environment file..."
        cp client/env.example client/.env
        print_warning "Please edit client/.env with your configuration"
    else
        print_success "Client environment file already exists"
    fi
}

# Check Google Cloud CLI
check_gcloud() {
    print_status "Checking Google Cloud CLI..."
    if command -v gcloud &> /dev/null; then
        GCLOUD_VERSION=$(gcloud --version | head -n1)
        print_success "Google Cloud CLI is installed: $GCLOUD_VERSION"
        
        # Check if user is authenticated
        if gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q "@"; then
            ACTIVE_ACCOUNT=$(gcloud auth list --filter=status:ACTIVE --format="value(account)")
            print_success "Authenticated as: $ACTIVE_ACCOUNT"
        else
            print_warning "Not authenticated with Google Cloud. Run 'gcloud auth login'"
        fi
    else
        print_warning "Google Cloud CLI is not installed."
        echo "Install it from: https://cloud.google.com/sdk/docs/install"
    fi
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    
    # Create logs directory
    mkdir -p logs
    
    # Create uploads directory
    mkdir -p uploads
    
    # Create temp directory
    mkdir -p temp
    
    print_success "Directories created successfully!"
}

# Setup Git hooks (optional)
setup_git_hooks() {
    if [ -d ".git" ]; then
        print_status "Setting up Git hooks..."
        
        # Create pre-commit hook
        cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# Pre-commit hook for Aura project

echo "Running pre-commit checks..."

# Check for sensitive files
if git diff --cached --name-only | grep -E "\.(env|key|pem|crt)$"; then
    echo "Error: Attempting to commit sensitive files!"
    exit 1
fi

# Check for large files
if git diff --cached --name-only | xargs ls -la | awk '$5 > 10485760 {print $9 " is larger than 10MB"}'; then
    echo "Error: Large files detected!"
    exit 1
fi

echo "Pre-commit checks passed!"
EOF
        
        chmod +x .git/hooks/pre-commit
        print_success "Git hooks set up successfully!"
    else
        print_warning "Not a Git repository. Skipping Git hooks setup."
    fi
}

# Display next steps
show_next_steps() {
    echo ""
    echo "🎉 Setup completed successfully!"
    echo "================================"
    echo ""
    echo "Next steps:"
    echo "1. Configure Google Cloud:"
    echo "   - Enable Vertex AI API"
    echo "   - Enable Cloud Language API"
    echo "   - Create service account and download key"
    echo ""
    echo "2. Update environment files:"
    echo "   - Edit server/.env with your Google Cloud credentials"
    echo "   - Edit client/.env with your configuration"
    echo ""
    echo "3. Start development server:"
    echo "   npm run dev"
    echo ""
    echo "4. Or start services separately:"
    echo "   npm run server  # Backend on port 5000"
    echo "   npm run client  # Frontend on port 3000"
    echo ""
    echo "5. Access the application:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend: http://localhost:5000"
    echo ""
    echo "📚 Documentation:"
    echo "   - README.md - Project overview"
    echo "   - DEPLOYMENT.md - Deployment guide"
    echo ""
    echo "🆘 Crisis Support:"
    echo "   If you're in immediate danger, call: 1800-599-0019"
    echo ""
    echo "Happy coding! 🌟"
}

# Main setup function
main() {
    echo "Starting Aura Wellness Chatbot setup..."
    echo ""
    
    check_node
    check_npm
    check_gcloud
    install_dependencies
    setup_environment
    create_directories
    setup_git_hooks
    show_next_steps
}

# Run main function
main "$@"
