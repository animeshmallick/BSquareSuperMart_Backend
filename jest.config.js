module.exports = {
    testEnvironment: "node",
    reporters: [
        "default",
        ["jest-html-reporter", {
            "pageTitle": "Backend Test Report",
            "outputPath": "./test-report.html",
            "includeFailureMsg": true
        }]
    ]
};
