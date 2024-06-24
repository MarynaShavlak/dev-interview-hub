# Workflow Name: linting, testing, building
This GitHub Actions workflow is designed to automate linting, testing, and building processes for a Node.js project on the **_'master'_** branch. It runs on every **'push'** to **_'master'_** and every **'pull request'** targeting **_'master'_**.


## Explanation:

### Workflow Triggers (on):

- The workflow triggers on **'push'** events to the **_'master'_** branch.
- It also triggers on **'pull_request'** events targeting the **_'master'_** branch.

### Jobs:
- **pipeline**:
  - **runs-on**: Specifies that the jobs will run on the latest Ubuntu environment.
  - **strategy**: Uses a matrix strategy to specify different versions of Node.js to test against (**'17.x'** in this case).

### Steps:
>The **'if: always()'** ensures the step runs even if previous steps fail.

- **Checkout repository**: Checks out the repository's codebase so that subsequent steps can access it.
- **Set up Node.js**: Uses the **_'setup-node'_** action to set up Node.js environment with the specified version (**'17.x'** ).
- **Install project dependencies**: Uses **_'npm ci --force'_** to install project dependencies, ensuring a clean install every time.
  The command **_'npm ci --force'_** ensures dependencies are installed strictly based on the lock file (package-lock.json). It installs dependencies directly from this file without updating it, which helps in maintaining consistency across different builds.
- **Build production project**: Runs **_'npm run build:prod'_** to build the production-ready artifacts of the project. 
- **Lint TypeScript**: Executes **_'npm run lint:ts'_** to lint TypeScript files in the project. 
- **Lint CSS**: Runs **_'npm run lint:scss'_** to lint SCSS (or CSS) files in the project.
- **Unit testing**: Executes **_'npm run test:unit'_** to run unit tests for the project. 
- **Build Storybook**: Runs **_'npm run storybook:build'_** to build Storybook for the project. 
- **Run screenshot testing**: Executes **_'npm run test:ui:ci'_** to perform screenshot testing for the project. 


This workflow provides a comprehensive automation setup for linting, testing, and building  Node.js project whenever changes are made to the master branch. 
