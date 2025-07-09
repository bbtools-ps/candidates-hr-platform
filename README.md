# Candidates - HR assistance platform

Small web application for every HR professional. Some of the features:

- Search candidate by name or by skill
- Add/remove/edit candidate

This project uses [React.js](https://reactjs.org/), functional components and hooks.
It also uses 3rd party packages such as:

- [zustand](https://zustand-demo.pmnd.rs/) for the global store management,
- [zod](https://zod.dev/) for schema validation,
- [tanstack-form](https://tanstack.com/form/latest/docs/overview) for form validation,
- [tanstack-virtual](https://tanstack.com/virtual/latest/docs/introduction) for making virtual lists.

For now this project doesn't communicate with a database, everything is done in the current session of the page. If the page is reloaded (e.g. Logo is clicked, or F5 key on the keyboard is pressed) all data is lost and the application is back to it's initial state.

## Live demo

[Click here for the live demo](https://bbtools-candidates.netlify.app/)

## GitHub Actions Setup for Netlify Deployment

This repository includes a GitHub Action workflow that automatically:

1. Runs linting checks
2. Executes unit tests
3. Builds the project
4. Deploys to Netlify (on main/master branch)
5. Creates preview deployments for pull requests

## Netlify Configuration

### Disable Auto-Build

To prevent Netlify from building automatically and only deploy from GitHub Actions:

#### Option 1: Netlify Dashboard

1. Go to **Site settings** → **Build & deploy**
2. In **Continuous Deployment**:
   - Build command: `# Build disabled - deployed from CI`
   - Publish directory: `build`
3. In **Deploy contexts**:
   - Disable **Production branch** auto-deploy
   - Disable **Deploy previews** and **Branch deploys**

#### Option 2: netlify.toml (Already configured)

The `netlify.toml` file includes:

```toml
[build]
  command = "# Build disabled - deployed from CI"
  publish = "build"
  ignore = "exit 1"  # Always skip auto-builds
```

## Security Considerations

### GitHub Secrets Safety

- ✅ **Secrets are encrypted** and safe even in public repositories
- ✅ **Auto-masked in logs** - secret values appear as `***`
- ✅ **Access-controlled** - only available during workflow execution

### Security Measures Implemented

- 🔒 **Fork protection**: Preview deployments only run for PRs from the same repository
- 🔒 **Branch protection**: Production deployments only from main/master branches
- 🔒 **Limited scope**: Netlify tokens have minimal required permissions
- 🔒 **Manual deploy only**: Netlify auto-build disabled

## Required Secrets

To enable Netlify deployment, you need to add the following secrets to your GitHub repository:

### Getting Netlify Credentials

1. **NETLIFY_AUTH_TOKEN**:

   - Go to https://app.netlify.com/user/applications#personal-access-tokens
   - Click "New access token"
   - Give it a descriptive name (e.g., "GitHub Actions")
   - Copy the generated token

2. **NETLIFY_SITE_ID**:
   - Go to your Netlify site dashboard
   - Navigate to Site settings → General → Site details
   - Copy the "Site ID" (or "API ID")

### Adding Secrets to GitHub

1. Go to your GitHub repository
2. Click on "Settings" tab
3. Click on "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add the following secrets:
   - Name: `NETLIFY_AUTH_TOKEN`, Value: [your auth token]
   - Name: `NETLIFY_SITE_ID`, Value: [your site ID]

## Workflow Behavior

- **On push to main/master**: Runs tests, builds, and deploys to production
- **On pull request**: Runs tests, builds, and creates a preview deployment
- **Test failure**: Stops the workflow and prevents deployment
- **Build failure**: Stops the workflow and prevents deployment
- **Netlify auto-build**: Disabled - only GitHub Actions can deploy

## Manual Deployment

You can also trigger the workflow manually from the GitHub Actions tab if needed.

## Local Development

The workflow uses the same commands as your local development:

```bash
# Install dependencies
pnpm install

# Run linting
pnpm run fix

# Run tests
pnpm run test:unit

# Build project
pnpm run build
```

## Troubleshooting

If the deployment fails:

1. Check that your Netlify secrets are correctly set
2. Verify your Netlify site is properly configured
3. Ensure Netlify auto-build is disabled
4. Ensure all tests pass locally
5. Check the build logs in the GitHub Actions tab
