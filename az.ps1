# this script documents the steps to get the app resources and deployment pipelines configured in Azure via azure-cli
# (may require 'az login' steps in order to log into azure and set azure context)


# create resource groups for app
MyResourceGroup=MatrixServicesAPI
MyLocation=eastus
az group create --name ${MyResourceGroup} --location ${MyLocation}

# various ways to query; use "--output table" to get data in tabular form instead of json
az group list
az group list --output table
az group list --ResourceGroup ${MyResourceGroup}
az group list --query "[?contains(name,'${MyResourceGroup}')]"
az group list --query "[?name=='${MyResourceGroup}']"


az resource list
az resource list --output table


# delete resource groups for app
az group delete --name ${MyResourceGroup} --location ${MyLocation}
