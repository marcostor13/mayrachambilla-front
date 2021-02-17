export interface FormInvestment {
    title: String,
    summary: String,
    ubication: String,
    minimumAmount: String,
    totalInversion: String,
    duration: String,
    profitability: String,
    startAcquisition: String,
    endAcquisition: String,
    generalInformation: {
        globalSupportInvestmentPlatform: String,
        marketValue: String,
        acquisitionvalue: String,
        commissionForSale: String,
        taxes: String,
    },
    attractivePoints: {
        locationAndValueProposition: String,
        experiencedInvestorLeader: String,
        administrativeAndLegalManagement: String,
        propertyTitle: String,
    },
    projectManager: {
        name: String,
        position: String,
        documentType: String,
        documentNumber: String,
        documentImage: String,
    },
    images: Array<any>
}
