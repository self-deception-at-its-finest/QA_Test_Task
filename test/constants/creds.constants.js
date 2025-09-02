export const CREDENTIALS = {

    VALID: {
        STANDARD_USER: {
            username: 'standard_user',
            password: 'secret_sauce'
        },
        PROBLEM_USER: {
            username: 'problem_user', 
            password: 'secret_sauce'
        },
        PERFORMANCE_USER: {
            username: 'performance_glitch_user',
            password: 'secret_sauce'
        }
    },
    

    INVALID: {
        LOCKED_USER: {
            username: 'locked_out_user',
            password: 'secret_sauce'
        },
        INVALID_USER: {
            username: 'not_a_standard_user',
            password: 'not_a_secret_sauce'
        },
        EMPTY_CREDENTIALS: {
            username: '',
            password: ''
        }
    }
};