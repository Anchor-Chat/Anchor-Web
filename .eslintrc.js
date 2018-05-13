module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jquery": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": process.env.NODE_ENV === 'production' ? 2 : 0,
        "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 0,
        "no-unused-vars": "warn",
        "no-empty": "warn"
    },
    "globals": {
        "IpfsApi": false,
        "Web3": false,
        "web3": true,
        "artifacts": false,
        "Decentracord": false
    }
};