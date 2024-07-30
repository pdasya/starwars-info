import "@testing-library/jest-dom";
import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { vi } from "vitest";

expect.extend(matchers);
vi.mock("next/router", () => require("next-router-mock"));
