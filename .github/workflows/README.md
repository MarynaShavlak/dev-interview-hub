# Workflow Name: linting, testing, building
This GitHub Actions workflow defines two distinct jobs within a GitHub Actions workflow, each serving specific purposes tailored to different stages of the development and deployment process
It is designed to automate linting, testing, and building processes for a Node.js project on the `master` branch. It runs on every `push` to `master` and every `pull request` targeting `master`.


## Explanation:

### Workflow Triggers (on):

- The workflow triggers on `push` events to the `master` branch.
- It also triggers on `pull_request` events targeting the `master` branch.

### Jobs:
- **build-and-ui-testing**:
  - **Purpose**: This job focuses on building the production project, running UI tests, generating reports, and deploying artifacts to GitHub Pages.
  - **Runs on**: Specifies that the jobs will run on the latest Ubuntu environment.
  - **Node.js Version**:  Uses Node.js version `17.x`.
    
>The `if: always()` ensures the step runs even if previous steps fail.

  - **Steps**:
    - Checkout repository so that subsequent steps can access it (`actions/checkout@v2` ).
    - Set up Node.js with version `17.x` (`actions/setup-node@v` )..
    - Install project dependencies,ensuring a clean install every time (`npm ci --force`)  
      This command ensures dependencies are installed strictly based on the lock file (package-lock.json). It installs dependencies directly from this file without updating it, which helps in maintaining consistency across different builds.
    - Build production project (`npm run build:prod`).
    - Build Storybook(`npm run storybook:build`). 
    - Run screenshot testing (`npm run test:ui:ci`).
    - Run unit testing (`npm run test:unit`).
    - Generates an HTML report (`npm run test:ui:report`).
    - Moves Loki reports to a reports directory (`mv .loki reports/`).
    - Sets up GitHub Pages (`actions/configure-pages@v2`).
    - Uploads the reports directory as an artifact (a`ctions/upload-artifact@v2`).
    - Deploys to GitHub Pages (`actions/deploy-pages@v1`).
- **checks**:
  - **Purpose**: This job specifically focuses on linting checks for TypeScript and SCSS file
  - **Runs on**: Specifies that the jobs will run on the latest Ubuntu environment.
  - **Node.js Version**:  Uses Node.js version `17.x`.
  - **Steps**:
    - Checks out the repository (`actions/checkout@v2`).
    - Sets up Node.js with version 17.x (`actions/setup-node@v1`).
    - Installs dependencies (`npm ci --force`).
    - Lints TypeScript files (`npm run lint:ts`).
    - Lints SCSS files (`npm run lint:scss`).

  These jobs together ensure comprehensive testing, linting, and deployment workflows for the project, triggered on updates to the master branch, maintaining code quality and deployment readiness.


