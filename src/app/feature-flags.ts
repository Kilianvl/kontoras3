export const featureFlags = {
  navigation: {
    showCustomerOverview: true,
    showNewInvoice: true,
  },
  crmOverview: {
    enabled: true,
    showIdColumn: true,
    showTypeColumn: true,
    showNameColumn: true,
    showCreatedAtColumn: true,
    showUpdatedAtColumn: true,
    includePersons: true,
    includeCompanies: true,
    enableCompanyCreation: true,
    enablePersonCreation: true,
  },
  personView: {
    showPerson: true,
    showCustomerNumber: true,
    showCreatedAt: true,
    showAddresses: true,
    showBirthdate: true,
  },
  companyView: {
    showCompanyName: true,
    showCustomerNumber: true,
    showCreatedAt: true,
    showAddresses: true
  },
  companyEdit: {
    showNameField: true,
    showCustomerNumberField: true,
    showAddresses: true,
    showContactDetails: true,
    showPaymentInformation: true,
    showConditions: true,
    showAdditional: true
  },
  personEdit: {
    showSalutation: true,
    showFirstname: true,
    showLastname: true,
    showCustomerNumber: true,
    showBirthdate: true,
    showAddresses: true,
    showContactDetails: true,
    showPaymentInformation: true,
    showConditions: true,
    showAdditional: true,
  }
};
