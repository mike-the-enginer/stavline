# Stavline - Construction Company Website

A modern, responsive corporate website for Stavline, a Slovak construction company. Built with Next.js, featuring a dynamic Google Drive-powered gallery and deployed to Google Cloud Run.

## Features

- 🏗️ **Hero Slider**: Dynamic image slider showcasing projects
- 🎨 **Services Section**: Maximized images for mobile-first design
- 📸 **Google Drive Gallery**: Automatically categorized gallery based on Drive folder structure
- 🌐 **Multi-language**: Slovak (Slovenčina)
- 🐳 **Dockerized**: Production-ready Docker setup
- ☁️ **Cloud Run**: Automated deployment pipeline

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm
- **Slider**: Swiper.js
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **Deployment**: Google Cloud Run

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/web-dev-studio/stavline.git
cd stavline
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Building for Production

```bash
pnpm build
pnpm start
```

## Docker

### Build Docker Image

```bash
docker build -t stavline:latest .
```

### Run Docker Container

```bash
docker run -d -p 8080:8080 --name stavline-app stavline:latest
```

Access the app at [http://localhost:8080](http://localhost:8080)

## Google Drive Integration

The gallery fetches images from a Google Drive folder structure. Each subfolder in the root folder becomes a category tab.

### Setup

1. Create a Google Cloud Project
2. Enable Google Drive API
3. Create a Service Account with Drive API access
4. Share your Google Drive root folder with the service account email
5. Set environment variables (see below)

## GitHub Secrets

To deploy this application to Google Cloud Run, you need to configure the following secrets in your GitHub repository under the **dev** environment:

### Required Secrets

| Secret Name | Description | How to Obtain |
|------------|-------------|---------------|
| `GCP_PROJECT_ID` | Your Google Cloud Project ID | Go to [Google Cloud Console](https://console.cloud.google.com) → Select your project → Copy the Project ID from the dashboard |
| `GCP_SA_KEY` | Service Account JSON key with Cloud Run permissions | 1. Go to [IAM & Admin > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)<br>2. Create a service account with roles: `Cloud Run Admin`, `Service Account User`, `Storage Admin`<br>3. Click on the service account → Keys → Add Key → Create new key → JSON<br>4. Copy the entire JSON content |
| `GOOGLE_DRIVE_ROOT_FOLDER_ID` | The Google Drive folder ID containing your image subfolders | 1. Open your root folder in Google Drive<br>2. Copy the folder ID from the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`<br>3. Share this folder with the service account email (from `GCP_SA_KEY`) |
| `GOOGLE_DRIVE_CREDENTIALS` | Service Account JSON for Google Drive API access | Same as `GCP_SA_KEY` if using the same service account, or create a separate one with `Google Drive API` permissions |

### Setting Up Secrets in GitHub

1. Go to your GitHub repository
2. Navigate to **Settings** → **Environments** → **dev**
3. Click **Add secret** for each secret above
4. Paste the values and save

### Google Cloud Setup Steps

1. **Create a Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Click "Select a project" → "New Project"
   - Enter project name and create

2. **Enable Required APIs**:
   - Go to [APIs & Services > Library](https://console.cloud.google.com/apis/library)
   - Enable: `Cloud Run API`, `Container Registry API`, `Google Drive API`

3. **Create Service Account**:
   - Go to [IAM & Admin > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
   - Click "Create Service Account"
   - Grant roles: 
     - `Cloud Run Admin`
     - `Service Account User`
     - `Storage Admin`
     - `Artifact Registry Writer`

4. **Share Google Drive Folder**:
   - Create a root folder in Google Drive for your images
   - Create subfolders (e.g., "Kúpeľne", "Fasády", "Zateplenie")
   - Right-click root folder → Share
   - Add the service account email (found in the JSON key)
   - Give "Viewer" permission

## Deployment

This project uses GitHub Actions for automated deployment to Google Cloud Run.

### Manual Deployment

1. Go to **Actions** tab in GitHub
2. Select **Deploy to Cloud Run** workflow
3. Click **Run workflow**
4. Select environment: `dev` (or `production` when available)
5. Click **Run workflow**

The workflow will:
- Build a Docker image
- Push to Google Container Registry
- Deploy to Cloud Run
- Output the service URL

## Project Structure

```
stavline/
├── src/
│   ├── app/
│   │   ├── api/gallery/images/   # API route for gallery images
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Main page
│   ├── components/
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Gallery.tsx            # Dynamic gallery component
│   │   ├── Hero.tsx               # Slider hero section
│   │   ├── Navbar.tsx
│   │   ├── Services.tsx
│   │   └── Team.tsx
│   ├── lib/
│   │   ├── google-drive.ts        # Google Drive API logic
│   │   └── google-drive.test.ts   # Unit tests
│   └── types/
│       └── index.ts               # TypeScript types
├── public/images/                 # Static images
├── .github/workflows/
│   └── deploy-cloudrun.yml        # Deployment pipeline
├── Dockerfile                     # Multi-stage Docker build
└── jest.config.js                 # Test configuration
```

## Testing

Run unit tests:
```bash
pnpm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

Copyright © 2025 Stavline. All rights reserved.
