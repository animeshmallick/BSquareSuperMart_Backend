module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ["routes/**/*.js", "internal/**/*.js", "helpers/**/*.js", "constants/**/*.js",
    "exceptions/**/*.js", "utils/**/*.js", "test/**/*.js", "!**/database.js"],
    coverageDirectory: "coverage",
    coverageReporters: ["html", "text-summary"],
    reporters: [
        "default",
        ["jest-html-reporters", {
            outputPath: "./test_results",
            filename: "report.html",
            pageTitle: "BSquare SuperMart Test Report",
            expand: true,
            includeFailureMsg: true,
            includeConsoleLog: true
        }]
    ]

};
