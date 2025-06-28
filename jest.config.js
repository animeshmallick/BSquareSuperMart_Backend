module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ["routes/**/*.js"],
    coverageDirectory: "coverage",
    coverageReporters: ["html", "text-summary"],
    reporters: [
        "default",
        ["jest-stare", {
            resultDir: "test_results",
            reportTitle: "Backend Test Report",
            coverageLink: "../coverage/lcov-report/index.html", // this links coverage
            additionalResultsProcessors: [],
            includeConsoleOutput: true
        }]
    ]
};
