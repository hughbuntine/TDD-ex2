import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["test/testing.mjs"],
    passWithNoTests: true,
    forceRerunTriggers: ["**"],
  },
});
