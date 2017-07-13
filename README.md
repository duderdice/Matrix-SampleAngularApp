# MatrixSampleAngularApp

Sample app for demonstrating Angular architectural and project patterns.

## Development server

Run `npm run start` to run the app locally.
Alternatively, run `npm run start:mock` to run the app locally using mock data.
Navigate to `http://localhost:4200/` in your browser. Note, the app should automatically reload if you change any of the source files.


## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm run start`.


## Recommended Reading => Angular topics
* [Making your Angular app AOT friendly](https://medium.com/@isaacplmann/making-your-angular-2-library-statically-analyzable-for-aot-e1c6f3ebedd5)


## Continuous Integration

This app has been configured on Azure App Service for continuous integration, triggered by git commits to the main repo.  Available at the following links:
* [UAT](http://matrix-sampleangularapp-uat.azurewebsites.net)
* [PROD](http://matrix-sampleangularapp.azurewebsites.net)

## Recommended Reading => Automating Azure deployments from Github commits
* [Setting up Azure deployments](https://blogs.msdn.microsoft.com/microsoftimagine/2015/09/01/using-continuous-integration-with-azure-github/)
* [Azure Web Apps](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-web-overview)
* [Azure Web Apps: Create a HTML app in Azure](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-web-get-started-html)
* [Azure Web Apps: Create a Node app in Azure](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-web-get-started-nodejs)
* [Automating deployments on Azure](https://blogs.msdn.microsoft.com/mvpawardprogram/2015/11/24/automating-deployment-on-azure-web-apps/)
* [Get Started with Azure CLI](https://docs.microsoft.com/en-us/cli/azure/get-started-with-azure-cli)
* [Kudu deployment scripts](https://github.com/projectkudu/kudu/wiki/Custom-Deployment-Script)
* [Kudu for Angular](https://medium.com/@premchandrasingh/custom-continuous-deployment-script-kudu-for-azure-75217ddcebc5)
