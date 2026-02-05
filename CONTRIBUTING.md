# Contributing to Discord Music Bot

Thank you for your interest in contributing! 🎵

## How to Contribute

### Reporting Bugs

1. Check if the issue already exists
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Node.js and discord.js versions

### Suggesting Features

1. Open an issue with the "enhancement" label
2. Describe the feature and its use case
3. Provide examples if possible

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m "Add amazing feature"`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Use ESLint for linting
- Follow existing code patterns
- Add comments for complex logic
- Keep functions small and focused

### Adding New Commands

1. Create a new file in `commands/` folder
2. Follow the existing command structure
3. Add translations to `locales/en.js` and `locales/tr.js`
4. Update README if needed
5. Run `npm run deploy` to register the command

## Development Setup

```bash
# Clone your fork
git clone https://github.com/justthendra/discord-music-bot.git
cd discord-music-bot

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Add your bot token and client ID to .env

# Deploy commands
npm run deploy

# Start the bot
npm start
```

## Questions?

Feel free to open an issue for any questions!
