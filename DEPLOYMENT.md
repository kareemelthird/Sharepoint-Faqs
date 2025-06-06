# Deployment Guide - SharePoint FAQ Web Part

## Quick Start

### For Developers
```bash
# Clone the repository
git clone https://github.com/kareemelthird/Sharepoint-Faqs.git
cd Sharepoint-Faqs

# Install dependencies
npm install

# Start development server
npm run serve
# or
gulp serve
```

### For Production Deployment
```bash
# Build production package
npm run build-production
# This runs: gulp clean && gulp build --ship && gulp bundle --ship && gulp package-solution --ship

# The .sppkg file will be created in: sharepoint/solution/
```

## SharePoint Setup

### 1. Create FAQ List
Create a SharePoint list with these columns:
- **Title** (Single line of text) - Required
- **Answer** (Multiple lines of text) - Required  
- **HelpWord** (Single line of text) - Optional
- **Explain** (Multiple lines of text) - Optional

### 2. Deploy Web Part
1. Upload `sharepoint/solution/*.sppkg` to App Catalog
2. Deploy the solution
3. Add app to your site
4. Add web part to page
5. Configure list selection in web part properties

## Available Scripts

- `npm run serve` - Start development server
- `npm run build` - Build for development
- `npm run build-production` - Build for production deployment
- `npm run clean` - Clean build artifacts
- `npm run test` - Run tests

## Project Structure Summary

### Core Components
- `src/webparts/faqs/components/Faqs.tsx` - Main container
- `src/webparts/faqs/components/FaqItem.tsx` - Individual FAQ
- `src/webparts/faqs/components/SearchBox.tsx` - Search functionality

### Services & Models
- `src/webparts/faqs/services/SharePointService.ts` - Data layer
- `src/webparts/faqs/models/IFaqItem.ts` - TypeScript interfaces

### Styling
- `*.module.scss` files for component-specific styles
- Uses SharePoint Fabric design tokens

## Features Implemented

✅ **Search Functionality** - Across all FAQ fields  
✅ **Pagination** - 4 items per page with navigation  
✅ **Interactive Tooltips** - Hover help for keywords  
✅ **Responsive Design** - Mobile and desktop friendly  
✅ **Modern UI** - SharePoint Fabric styling  
✅ **Configurable** - Property pane for list selection  
✅ **Accessible** - Keyboard navigation support  

## GitHub Repository

Repository: https://github.com/kareemelthird/Sharepoint-Faqs

The repository includes:
- Complete source code
- Build configuration
- Documentation (README.md, CONTRIBUTING.md)
- GitHub Actions CI/CD workflow
- License (MIT)

## Support

For issues or questions:
1. Check the troubleshooting section in README.md
2. Create an issue on GitHub
3. Review the CONTRIBUTING.md for development guidelines

---

**Repository URL**: https://github.com/kareemelthird/Sharepoint-Faqs  
**Version**: 1.0.0  
**Last Updated**: June 5, 2025
