module.exports = {
    // BAD_REQUEST
    BAD_REQUEST: {
        customCode: 4000
    },

    // JOI
    JOI_VALIDATION: {
        customCode: 4001
    },

    // AUTH - BAD REQUEST
    WRONG_EMAIL_OR_PASSWORD: {
        customCode: 4002
    },

    ACCESS_TOKEN_IS_REQUIRED: {
        customCode: 4003
    },

    REFRESH_TOKEN_IS_REQUIRED: {
        customCode: 4004
    },

    INCORRECT_EMAIL_ACTION: {
        customCode: 4005,
        en: 'Incorrect email action',
        ua: 'Некорректна дія в електронній пошті',
    },

    // AUTH -UNAUTHORIZED
    ACCESS_TOKEN_IS_NOT_VALID: {
        customCode: 4011
    },

    REFRESH_TOKEN_IS_NOT_VALID: {
        customCode: 4012
    },

    // AUTH - FORBIDDEN
    ACCESS_TOKEN_IS_NOT_VALID_VERIFY: {
        customCode: 4031
    },

    REFRESH_TOKEN_IS_NOT_VALID_VERIFY: {
        customCode: 4032
    },

    // MUTUAL FOR CAR & USER

    EMPTY: {
        customCode: 4001

    },

    INVALID_ID: {
        customCode: 4002
    },

    // CAR

    INVALID_EDITION: {
        customCode: 4003
    },

    NO_CAR: {
        customCode: 4004
    },

    NO_CARS: {
        customCode: 4005
    },

    CAR_EXISTS: {
        customCode: 4006
    },

    // USER
    TOO_WEAK_PASSWORD: {
        customCode: 4007
    },

    TOO_STRONG_PASSWORD: {
        customCode: 4008
    },

    INVALID_MAIL: {
        customCode: 4009
    },

    NO_USER: {
        customCode: 40010
    },

    NO_USERS: {
        customCode: 40011
    },

    USER_EXISTS: {
        customCode: 40012
    }
};
