# Angular HR Management System Frontend

This Angular application serves as the frontend for the [HRManagementSystem API] (https://github.com/dgnklz/HRManagementSystem), developed during the Kreativestorm Java training, which is a Java-based backend system developed using the Spring framework for managing human resources.

## Prerequisites

Before running this Angular application, ensure that you have the following tools and dependencies installed:

- Node.js and npm
- Angular CLI
- Access to the HRManagementSystem API backend (https://github.com/dgnklz/HRManagementSystem) for setup instructions)

## Setup Instructions

Follow these steps to set up and run the Angular HR Management System Frontend:

1. Clone this repository:

    ```bash
    git clone https://github.com/viniciuslalli/HRManagementSystemFrontEnd.git
    ```

2. Navigate to the project directory:

    ```bash
    cd /CRUD/frondend/
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Configure the backend URL:

    Open the file `src/environments/environment.ts` and set the `apiUrl` property to the base URL of the HRManagementSystem API backend. For example:

    ```typescript
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:8080/api' // Set this URL to your backend API endpoint
    };
    ```

5. Start the Angular development server:

    ```bash
    ng start
    ```

6. Access the application:

    Once the server has started, you can access the application by navigating to [http://localhost:4200](http://localhost:4200) in your web browser.

## Contributing

If you wish to contribute to this project, please follow these steps:

1. Fork this repository.
2. Create your own branch: `git checkout -b feature/new-feature`.
3. Make your changes and commit them: `git commit -am 'Adding a new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Submit a pull request.

## Support

If you encounter any issues with setting up or using this application, feel free to open an issue in this repository. We're here to help!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
