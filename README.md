# Setup Guide

This guide provides installation instructions for setting up the Laravel application both via CLI and Docker.

**Steps:**

1. Clone the repository: [https://github.com/Solutech-Limited/booking-challenge
   ](https://github.com/Solutech-Limited/booking-challenge)

## Installation via Docker

This is the recommended development platform.

### Prerequisites

Before running with Docker, ensure that the following dependencies are installed:

- docker. See [https://docs.docker.com/engine/installation](https://docs.docker.com/engine/installation)
- docker-compose. See [docs.docker.com/compose/install](https://docs.docker.com/compose/install/)

### Steps:

1. Clone the repository and navigate to the project folder:
    ```bash
    git clone https://github.com/Solutech-Limited/booking-challenge.git
   
    cd booking-challenge
    ```

2. Navigate to the `/docker` folder:
    ```bash
    cd docker
    ```
3. Build and start the containers:
    ```bash
    ./build.sh
     # Rebuilds container image
    ./start.sh
   # Starts containers in the background
    ```

* Fix for file permission issue when running on Linux or Mac
    ```bash
  sudo chmod +x *.sh 
  sudo chmod +x setup/setup.sh
    ```
* Sudo maybe required on Ubuntu to run the scripts

4. Configure application container default setup and seed database:
   ```bash
   ./config.sh
   ```
5. Stop containers:
    ```bash
    ./stop.sh
    ```
6. Connect to application container via Terminal:
    ```bash
    ./connect.sh
    # Opens a terminal inside the container
    ```

### External Services

These are web services running exposed for access outside container:

| Service    | Address (outside containers)            |
|------------|-----------------------------------------|
| Webserver  | [localhost:8000](http://localhost:8000) |
| PHPMyAdmin | [localhost:8002](http://localhost:8002) |
| Mailhog    | [localhost:8001](http://localhost:8001) |

These credentials are provided as the initial setup for accessing the booking challange application.

| **Username**      | **Password** |
|:------------------|--------------|
| admin@account.com | password     |

### Internal Services

Below are the hostnames and ports for the
internal services running as containers:

| Service        | Hostname | Port Number |
|----------------|----------|-------------|
| PHP-FPM        | php-fpm  | 9000        |
| MySQL          | mysql    | 3306        |
| Redis          | redis    | 6379        |
| SMTP (Mailhog) | mailhog  | 1025        |

### Application file permissions #

As in all server environments, your application needs the correct file permissions to work properly. You can change the
files throughout the container, so you won't care if the user exists or has the same ID on your host.

* Fix for public file permission

```bash
docker-compose exec booking-php-fpm chown -R www-data:www-data ./public
```

* Fix for public file permission

## Installation via CLI

### Prerequisite

Tools need to run via CLI

1. [Composer](https://getcomposer.org/download/)
2. PHP (preferably version 7.4 or above)
3. Node.js (for compiling assets)
4. Git

### Steps:

1. Clone the repository:
   `git clone https://github.com/Solutech-Limited/booking-challenge.git
   cd booking-challenge`

2. Install dependencies:
    * Install PHP dependencies with Composer:
      `composer install`
    * Install JavaScript dependencies:
      `npm install`
3. Set up environment variables:
   &Copy `.env.example` to `.env`:
   `cp .env.example .env`
4. Generate the application key:
   `php artisan key:generate`
5. Set up the database:
    * Run migrations and seed the database:
      `php artisan migrate:fresh --seed`
6. Compile assets:
   `npm run build`
7. Serve Laravel files:
   `php artisan serve`


## Run Cypress Tests:
Follow these additional steps to run Cypress e2e tests:

### (Optional) Interactive Script Execution with Node Task List

- You can optionally install the `Node Task List` (`ntl`) package, which provides an interactive interface that lists all the scripts defined in your `package.json` file. This tool can be helpful in executing Cypress commands more conveniently.

- To install `ntl` globally, run the following command:

```bash
npm install -g ntl
```

### Verify Cypress Installation

   - Once the dependencies are installed, verify that Cypress is installed correctly by running:

     ```bash
     npx cypress --version
     ```

   - This should display the installed version of Cypress.

### Open Cypress Test Runner

   - To open the Cypress Test Runner, run on your CLI:

     ```bash
     npx cypress open
     ```

   - This command will open the Cypress Test Runner, where you can select and run your tests.

### Run Cypress Tests

   - To run Cypress tests headlessly (in the background), you can use the following command:

     ```bash
     npx cypress run
     ```

### Run Cypress with Node Task List

   - Instead of using the commands `npx cypress open` or `npx cypress run`, you can simply type `ntl` in the command line interface (CLI) within your project directory. This will launch an interactive interface where you can select any item to execute that task.

   - For example, you can select the `cypress:web` or `cypress:headless` tasks from the list to open the Cypress UI Test Runner or run your Cypress tests via CLI, respectively.

     ```bash
     Node Task List
        ? Select a task to run: (Use arrow keys)
        ❯ cypress:web
        cypress:headless
     ```

### Run Specific Cypress Test

- If you need to run only a specific test or a subset of tests, you can use the `--spec` or `--spec-file` flag with the Cypress CLI command. This allows you to specify the path to the test file(s) you want to execute.

- To run a specific test, use the following command:

      ```bash
      npx cypress run --spec "cypress/e2e/guest/booktour.cy.js"
      ```

- Note: Replace `cypress/e2e/guest/booktour.cy.js` with the actual path to your test file or folder containing the tests you want to run.

- You can also run multiple test files by providing a comma-separated list of file paths:

      ```bash
      npx cypress run --spec "cypress/e2e/guest/booktour.cy.js,cypress/e2e/admin/allbookings.cy.js"
      ```

- Alternatively, you can use the `--spec-file` flag to provide a text file containing a list of test file paths:

      ```bash
      npx cypress run --spec-file cypress/e2e/myTestsToBeExecuted.txt
      ```

- Where `myTestsToBeExecuted.txt` contains one test file path per line, like:

      ```bash
      cypress/e2e/guest/booktour.cy.js
      cypress/e2e/admin/allbookings.cy.js
      ```

- By specifying the test files you want to run, you can save time and resources by executing only the relevant tests instead of running the entire test suite.
- Remember to adjust the paths according to your project's file structure and the location of your Cypress test files.

### Configure Cypress

- If needed, configure Cypress by editing the `cypress.config.js` file located in the root of root project directory. You can customize various settings such as base URL, viewport size, and more.

### Additional Notes

- Make sure your development environment meets the [system requirements](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements) specified by Cypress.
- Refer to the [Cypress documentation](https://docs.cypress.io/) for detailed information on writing and running tests using Cypress.

