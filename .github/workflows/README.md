# Workflow Name: linting, testing, building
This GitHub Actions workflow defines two distinct jobs within a GitHub Actions workflow, each serving specific purposes tailored to different stages of the development and deployment process
It is designed to automate linting, testing, and building processes for a Node.js project on the **_'master'_** branch. It runs on every **'push'** to **_'master'_** and every **'pull request'** targeting **_'master'_**.


## Explanation:

### Workflow Triggers (on):

- The workflow triggers on **'push'** events to the **_'master'_** branch.
- It also triggers on **'pull_request'** events targeting the **_'master'_** branch.

### Jobs:
- **build-and-ui-testing**:
  - **Purpose**: This job focuses on building the production project, running UI tests, generating reports, and deploying artifacts to GitHub Pages.
  - **Runs on**: Specifies that the jobs will run on the latest Ubuntu environment.
  - **Node.js Version**:  Uses Node.js version **'17.x'**.
    
>The **'if: always()'** ensures the step runs even if previous steps fail.

  - **Steps**:
    - Checkout repository so that subsequent steps can access it (**_'actions/checkout@v2'_** ).
    - Set up Node.js with version **'17.x'** (**_'actions/setup-node@v'_** )..
    - Install project dependencies,ensuring a clean install every time (**_'npm ci --force'_**)  
      This command ensures dependencies are installed strictly based on the lock file (package-lock.json). It installs dependencies directly from this file without updating it, which helps in maintaining consistency across different builds.
    - Build production project (**_'npm run build:prod'_**).
    - Build Storybook(**_'npm run storybook:build'_**). 
    - Run screenshot testing (**_'npm run test:ui:ci'_**).
    - Run unit testing (**_'npm run test:unit'_**).
    - Generates an HTML report (**_'npm run test:ui:report'_**).
    - Moves Loki reports to a reports directory (**_'mv .loki reports/'_**).
    - Sets up GitHub Pages (**_'actions/configure-pages@v2'_**).
    - Uploads the reports directory as an artifact (a**_'ctions/upload-artifact@v2'_**).
    - Deploys to GitHub Pages (**_'actions/deploy-pages@v1'_**).
- **checks**:
  - **Purpose**: This job specifically focuses on linting checks for TypeScript and SCSS file
  - **Runs on**: Specifies that the jobs will run on the latest Ubuntu environment.
  - **Node.js Version**:  Uses Node.js version **'17.x'**.
  - **Steps**:
    - Checks out the repository (**'actions/checkout@v2'**).
    - Sets up Node.js with version 17.x (**'actions/setup-node@v1'**).
    - Installs dependencies (**'npm ci --force'**).
    - Lints TypeScript files (**'npm run lint:ts'**).
    - Lints SCSS files (**'npm run lint:scss'**).

  These jobs together ensure comprehensive testing, linting, and deployment workflows for the project, triggered on updates to the master branch, maintaining code quality and deployment readiness.


