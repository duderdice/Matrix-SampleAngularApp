# this script documents the steps to get the app resources and deployment pipelines configured in Azure via azure-cli
# (may require 'az login' steps in order to log into azure and set azure context)


# create deployment user
# NOTE - only need to do this once, can use for all Azure deployments
UserName=secret!
Password=secret!
#az appservice web deployment user set --user-name ${UserName} --password ${Password}
az webapp deployment user set --user-name ${UserName} --password ${Password}

# create resource groups for app
MyResourceGroup=Matrix-SampleAngularApp
MyLocation=eastus
az group create --name ${MyResourceGroup} --location ${MyLocation}

# create service plan
MyAppServicePlan=serviceplanX
az appservice plan create --name ${MyAppServicePlan} --resource-group ${MyResourceGroup} --sku FREE

# create web app within the service plan
MyAppName=Matrix-SampleAngularApp
#az appservice web create --name ${MyAppName} --resource-group ${MyResourceGroup} --plan ${MyAppServicePlan}
az webapp create --name ${MyAppName} --resource-group ${MyResourceGroup} --plan ${MyAppServicePlan}


# various ways to query; use "--output table" to get data in tabular form instead of json
az group list
az group list --output table
az group list --ResourceGroup ${MyResourceGroup}
az group list --query "[?contains(name,'${MyResourceGroup}')]"
az group list --query "[?name=='${MyResourceGroup}']"


az resource list
az resource list --output table


az webapp list --output table
az webapp list --output table


# delete resource groups for app
az group delete --name ${MyResourceGroup} --location ${MyLocation}
