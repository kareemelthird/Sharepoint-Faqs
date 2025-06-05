# Contributing to SharePoint FAQ Web Part

Thank you for your interest in contributing to the SharePoint FAQ Web Part! This document provides guidelines and information for contributors.

## How to Contribute

### Reporting Issues

1. **Search existing issues** first to avoid duplicates
2. **Use the issue template** when creating new issues
3. **Provide detailed information** including:
   - SPFx version
   - SharePoint environment (Online/On-premises)
   - Browser version
   - Steps to reproduce
   - Expected vs actual behavior

### Submitting Pull Requests

1. **Fork the repository** and create a feature branch
2. **Follow the coding standards** (see below)
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a pull request** with a clear description

## Development Setup

### Prerequisites

- Node.js (version 16 or 18)
- SharePoint Framework development environment
- Git

### Getting Started

```bash
# Clone your fork
git clone https://github.com/yourusername/sharepoint-faq-webpart.git
cd sharepoint-faq-webpart

# Install dependencies
npm install

# Start development server
gulp serve
```

### Building

```bash
# Build for development
gulp build

# Build for production
gulp bundle --ship
gulp package-solution --ship
```

## Coding Standards

### TypeScript/React

- Use **TypeScript** for all new code
- Follow **React best practices**
- Use **functional components** with hooks when possible
- Implement **proper error handling**
- Add **JSDoc comments** for public methods

### Code Style

- Use **4 spaces** for indentation
- Use **semicolons** consistently
- Follow **SharePoint Framework** conventions
- Use **meaningful variable names**
- Keep **functions small** and focused

### File Structure

```
src/webparts/faqs/
├── components/           # React components
│   ├── *.tsx            # Component files
│   └── *.module.scss    # Component styles
├── models/              # TypeScript interfaces
├── services/            # Data services
└── loc/                 # Localization files
```

## Testing

### Manual Testing

1. Test in **SharePoint Workbench**
2. Test in **SharePoint Online**
3. Test **different browsers**
4. Test **mobile responsiveness**
5. Test **accessibility features**

### Test Cases

- [ ] Web part loads without errors
- [ ] Search functionality works across all fields
- [ ] Pagination works correctly
- [ ] Tooltips display properly
- [ ] Responsive design on mobile
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility

## Documentation

### README Updates

When adding features, update:
- Feature list
- Configuration instructions
- Usage examples
- Technical details

### Code Documentation

- Add JSDoc comments for public methods
- Document complex algorithms
- Include usage examples
- Document breaking changes

## Submission Guidelines

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add search highlighting functionality
fix: resolve pagination reset issue
docs: update installation instructions
style: improve responsive design
refactor: extract tooltip logic to service
test: add unit tests for search component
```

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested in SharePoint Workbench
- [ ] Tested in SharePoint Online
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified

## Screenshots
(if applicable)

## Additional Notes
Any additional information for reviewers
```

## Feature Requests

### Before Submitting

1. Check if the feature already exists
2. Search existing feature requests
3. Consider the scope and complexity
4. Think about backward compatibility

### Feature Request Template

- **Feature Description**: What you want to achieve
- **Use Case**: Why this feature is needed
- **Proposed Implementation**: How it could work
- **Alternatives Considered**: Other approaches
- **Additional Context**: Screenshots, examples, etc.

## Code of Conduct

### Our Standards

- **Be respectful** and inclusive
- **Be constructive** in feedback
- **Focus on the code**, not the person
- **Help others learn** and grow
- **Follow project guidelines**

### Unacceptable Behavior

- Harassment or discrimination
- Offensive language or imagery
- Personal attacks
- Spam or off-topic discussions

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributors graph

## Questions?

- Create an issue for technical questions
- Use discussions for general questions
- Contact maintainers for private matters

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to the SharePoint FAQ Web Part! 🎉
