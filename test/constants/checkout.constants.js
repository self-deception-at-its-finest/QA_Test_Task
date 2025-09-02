export const CHECKOUT_DATA = {
    VALID: {
        SCOOBY_DOO: {
            firstName: 'Scooby',
            lastName: 'Doo',
            zipCode: '12345'
        },
        RAYAN_GOSLING: {
            firstName: 'Rayan',
            lastName: 'Gosling', 
            zipCode: '67890'
        }
    },
    INVALID: {
        EMPTY_FIELDS: {
            firstName: '',
            lastName: '',
            zipCode: ''
        },
        MISSING_ZIP: {
            firstName: 'John',
            lastName: 'Doe',
            zipCode: ''
        }
    }
};