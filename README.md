# SharePoint FAQ Web Part

## Overview

A modern SharePoint Framework (SPFx) web part for displaying Frequently Asked Questions (FAQs) from SharePoint lists. This web part provides a clean, interactive interface with advanced features like search, pagination, collapsible items, and tooltips for help words.

![FAQ Web Part](./assets/faq-webpart-preview.png)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.16.1-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-16.13.0+-blue.svg)
![npm](https://img.shields.io/badge/npm-8.0.0+-red.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx) v1.16.1
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- SharePoint Online
- SharePoint 2019 (with SPFx extensions)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Features

- 🔍 **Advanced Search**: Search through questions, answers, help words, and explanations
- 📋 **Dynamic List Selection**: Choose any SharePoint list as your FAQ source
- 🎨 **Modern UI**: Clean, responsive design with smooth animations and SharePoint Fabric styling
- 📖 **Collapsible Questions**: Click to expand/collapse answers with smooth transitions
- 💡 **Interactive Tooltips**: Hover over help words to see detailed explanations
- 📄 **Smart Pagination**: Navigate through FAQs with 4 items per page
- 🎯 **Search Highlighting**: Highlighted search terms in results
- 📱 **Mobile Responsive**: Works great on all screen sizes and devices
- ♿ **Accessible**: Keyboard navigation and screen reader support
- ⚙️ **Configurable**: Easy web part configuration through property pane

## Prerequisites

### System Requirements

- **Node.js**: Version 16.13.0 or higher (but less than 17.0.0)
- **npm**: Version 8.0.0 or higher
- **SharePoint Framework**: v1.16.1
- **SharePoint Online** environment or **SharePoint 2019** (with Feature Pack)

### Development Tools (Recommended)

- **Visual Studio Code** with SharePoint Framework extensions
- **SharePoint Framework Yeoman generator** (`@microsoft/generator-sharepoint`)
- **Git** for version control

### SharePoint List Structure

Create a SharePoint list with these 4 columns:

| Column Name | Type | Required | Description |
|-------------|------|----------|-------------|
| **Title** | Single line of text | ✅ Yes | The FAQ question (default SharePoint column) |
| **Answer** | Multiple lines of text | ✅ Yes | The detailed answer to the question |
| **HelpWord** | Single line of text | ❌ No | Comma-separated words that will show tooltips |
| **Explain** | Multiple lines of text | ❌ No | Explanation text shown in tooltips for help words |

### Sample Data Structure
```
Title: "How do I reset my password?"
Answer: "To reset your password, go to the authentication portal and click on the API settings."
HelpWord: "authentication, API"
Explain: "Authentication portal is where you manage your login credentials and API refers to the programming interface."
```

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| SharePoint FAQ Web Part | [Kareem Hassan](https://github.com/kareemelthird) |

## Project Structure

```
sharepoint-faq-webpart/
├── src/
│   ├── webparts/faqs/
│   │   ├── components/
│   │   │   ├── Faqs.tsx              # Main FAQ container component
│   │   │   ├── Faqs.module.scss      # Main styling
│   │   │   ├── FaqItem.tsx           # Individual FAQ item component
│   │   │   ├── FaqItem.module.scss   # FAQ item styling
│   │   │   ├── SearchBox.tsx         # Search functionality component
│   │   │   ├── SearchBox.module.scss # Search box styling
│   │   │   └── IFaqsProps.ts         # Props interface
│   │   ├── models/
│   │   │   └── IFaqItem.ts           # TypeScript interfaces & state
│   │   ├── services/
│   │   │   └── SharePointService.ts  # SharePoint data service
│   │   ├── loc/
│   │   │   └── *.js                  # Localization files
│   │   └── FaqsWebPart.ts           # Web part definition & properties
│   └── index.ts                      # Entry point
├── config/                           # SPFx configuration files
├── sharepoint/solution/              # Generated .sppkg files
├── lib/                             # Compiled JavaScript output
├── release/                         # Production build output
├── .gitignore                       # Git ignore patterns
├── package.json                     # Node.js dependencies
├── tsconfig.json                    # TypeScript configuration
├── gulpfile.js                      # Build configuration
└── README.md                        # This file
```

## Customization

### Styling Customization

The web part uses SCSS modules for styling. Customize appearance by modifying:

- **`Faqs.module.scss`** - Main container, layout, pagination, and search styling
- **`FaqItem.module.scss`** - Individual FAQ item styling, animations, and tooltips
- **`SearchBox.module.scss`** - Search box appearance and interactions

### Functionality Customization

- **`SharePointService.ts`** - Modify data fetching logic, add caching, or change API calls
- **`FaqItem.tsx`** - Customize how questions and answers are displayed
- **`IFaqItem.ts`** - Extend interfaces to add more fields or properties
- **`Faqs.tsx`** - Modify pagination logic, search behavior, or add new features

### Adding New Features

1. **Additional Fields**: Add new columns to SharePoint list and update interfaces
2. **Advanced Search**: Enhance search with filters, categories, or tags
3. **Theming**: Add theme switching or custom color schemes
4. **Export**: Add functionality to export FAQs to PDF or other formats
5. **Analytics**: Integrate with application insights or custom analytics

## Browser Support

- ✅ **Modern Browsers**: Chrome 80+, Firefox 74+, Safari 13+, Edge 80+
- ✅ **Internet Explorer 11** (with polyfills included in SPFx)
- ✅ **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- ✅ **Accessibility**: WCAG 2.1 compliant, screen reader compatible

## Troubleshooting

### Common Issues

1. **Web part not loading**:
   - Check if the app is deployed and activated
   - Verify SharePoint list permissions
   - Check browser console for errors

2. **No FAQs showing**:
   - Ensure the selected list has the required columns
   - Check if list contains data
   - Verify list permissions

3. **Search not working**:
   - Clear browser cache and reload
   - Check if all required fields exist in the list
   - Verify data in the list items

### Development Issues

1. **Build errors**:
   - Run `npm install` to ensure all dependencies are installed
   - Check Node.js version compatibility (16.13.0+)
   - Clear gulp cache: `gulp clean`

2. **Serve command fails**:
   - Ensure you're in the correct directory
   - Check if port 4321 is available
   - Try running with `--nobrowser` flag

## Version History

| Version | Date           | Comments                                    |
| ------- | -------------- | ------------------------------------------- |
| 1.0.0   | June 5, 2025   | Initial release with full functionality     |
|         |                | - Search across all FAQ fields             |
|         |                | - Pagination with 4 items per page         |
|         |                | - Tooltip support for help words           |
|         |                | - Modern responsive design                  |
|         |                | - SharePoint list integration              |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Installation & Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/kareemelthird/Sharepoint-Faqs
cd sharepoint-faq-webpart

# Install dependencies
npm install
```

### 2. Create SharePoint List

1. Go to your SharePoint site
2. Create a new list called "FAQs" (or any name you prefer)
3. Add the required columns as described in Prerequisites
4. Add some sample FAQ items for testing

### 3. Development Setup

```bash
# Start development server
gulp serve

# This will open SharePoint Workbench in your browser
# Add the FAQ web part and configure it
```

### 4. Build and Deploy

```bash
# Build for production
gulp clean
gulp build --ship
gulp bundle --ship
gulp package-solution --ship
```

The `.sppkg` file will be created in `sharepoint/solution/` folder.

### 5. Deploy to SharePoint

1. Upload the `.sppkg` file to your SharePoint **App Catalog**
2. **Deploy** the solution when prompted
3. Go to your SharePoint site and **Add the app**
4. Add the **FAQ web part** to a page
5. **Configure** the web part by selecting your FAQ list
6. **Save and publish** the page

## Configuration

### Web Part Properties

1. **Edit the page** and add the "FAQs" web part
2. Click the **edit (pencil) icon** on the web part
3. In the property pane, configure:
   - **List Title**: Select the SharePoint list containing your FAQ data
4. **Save and publish** the page

### Property Pane Options

- **List Title**: Dropdown to select any list in the current site that contains FAQ data

## Usage

### End User Guide

- **Browse FAQs**: Click on question headers to expand/collapse answers
- **Search**: Use the search box to find specific FAQs across all content (questions, answers, help words, explanations)
- **Navigation**: Use pagination controls to browse through multiple pages (4 items per page)
- **Tooltips**: Hover over highlighted help words in answers to see additional explanations
- **Mobile**: Fully responsive design works on tablets and mobile devices

### Features in Action

1. **Search Functionality**: 
   - Type in the search box to filter FAQs
   - Search works across all fields (Title, Answer, HelpWord, Explain)
   - Search terms are highlighted in results

2. **Pagination**:
   - Shows 4 FAQs per page
   - Previous/Next buttons for navigation
   - Page numbers for quick jumping
   - Shows current page info (e.g., "Showing 1-4 of 12 questions")

3. **Interactive Elements**:
   - Smooth expand/collapse animations
   - Hover effects on interactive elements
   - Loading states while fetching data
   - Error handling with user-friendly messages

## Technical Details

### Architecture

- **Framework**: SharePoint Framework (SPFx) 1.16.1
- **Frontend**: React 17.0.1 with TypeScript
- **Styling**: SCSS modules with SharePoint Fabric design tokens
- **Data**: SharePoint REST API integration
- **State Management**: React component state with hooks
- **Build**: Gulp-based build system

### Key Technologies

- **TypeScript**: Strongly typed components and services
- **React**: Modern React components with functional programming
- **SCSS**: Modular styling with CSS modules
- **Office UI Fabric React**: SharePoint-consistent UI components
- **SharePoint REST API**: For data retrieval and list operations

### Performance Features

- **Pagination**: Limits rendering to 4 items per page
- **Efficient Search**: Client-side filtering for fast results
- **Lazy Loading**: Components load only when needed
- **Optimized Builds**: Production builds are minified and optimized

## Key Features Explained

### Search Functionality
The web part includes a powerful search feature that works across all FAQ fields:
- **Title**: Searches question text
- **Answer**: Searches answer content
- **HelpWord**: Searches tooltip keywords
- **Explain**: Searches tooltip explanations

### Pagination System
- Shows 4 FAQs per page for optimal performance
- Previous/Next navigation buttons
- Numbered page buttons for quick access
- Page information display (e.g., "Showing 1-4 of 12 questions")

### Interactive Tooltips
- Help words in answers are automatically highlighted
- Hover over highlighted words to see explanations
- Uses browser's default tooltip for reliability
- No complex JavaScript positioning required

### Responsive Design
- Mobile-first approach with responsive breakpoints
- Touch-friendly interface for tablets and phones
- Adaptive layouts that work on all screen sizes
- Accessible keyboard navigation

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

> **Note**: This web part demonstrates modern SharePoint Framework development practices and can be used as a template for building similar solutions. Feel free to customize and extend it for your specific requirements.
