import EBug from "./src/app";

const test = new EBug("test", [ { name: "test", message: "error {test}, {test1}" } ]);
test.error("test", { test: "asd", test1: "12" });