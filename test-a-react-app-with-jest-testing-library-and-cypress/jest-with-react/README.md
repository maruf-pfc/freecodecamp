# React + TypeScript + Vite + Jest + Tailwind

This project demonstrates a **React + TypeScript + Vite setup** with **Jest** and **React Testing Library**. The UI uses **Tailwind CSS** for styling, and the tests include user interactions using **@testing-library/user-event**.

Followed Blog: [Effortless Testing Setup for React with Vite + TS + Jest + Testing Library](https://dev.to/teyim/effortless-testing-setup-for-react-with-vite-typescript-jest-and-react-testing-library-1c48)

## Create a new React project

```bash
pnpm create vite@latest
```

Choose **React + TypeScript** when prompted.

## Install all necessary dependencies

```bash
pnpm install -D jest @testing-library/react ts-jest @types/jest @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

## Handling Styles and SVGs in Jest

```bash
pnpm install -D identity-obj-proxy jest-transformer-svg
```

- `identity-obj-proxy` → for CSS modules
- `jest-transformer-svg` → for importing SVG files

## Create `jest.config.ts`

```ts
import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};

export default config;
```

## Create `jest.setup.ts`

```ts
import "@testing-library/jest-dom";
```

This globally adds custom matchers like `.toBeInTheDocument()`.

## Updated `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["jest", "@testing-library/jest-dom"]
  },
  "include": ["src"]
}
```

## Updated `tsconfig.app.json`

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "types": ["jest", "@testing-library/jest-dom"]
  },
  "include": ["src"]
}
```

## About Component Example (Tailwind + Emoji)

`src/pages/About.tsx`

```tsx
import { useState } from "react";

export default function About() {
  const [isOn, setIsOn] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [printed, setPrinted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 drop-shadow-lg">
        Welcome to the About Page!
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center mb-6">
        <p className="text-xl font-medium mb-4">{isOn ? "🔥 It's on!" : "🎢 It's rolling!"}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
          onClick={() => setIsOn(!isOn)}
        >
          Switch state
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
        <input
          data-testid="testInput"
          placeholder="Type something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition mb-4 cursor-pointer"
          onClick={() => setShowInput(!showInput)}
        >
          Print input
        </button>

        {showInput && printed && <p>{inputValue}</p>}
      </div>
    </div>
  );
}
```

## About Component Test Example

`src/tests/About.test.tsx`

```ts
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import About from "../pages/About";

describe("About", () => {
  test("About renders correctly", () => {
    render(<About />);
    expect(screen.getByText("Welcome to the About Page!")).toBeInTheDocument();
  });

  test("Switch state works correctly", async () => {
    render(<About />);
    expect(screen.getByText("🔥 It's on!")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Switch state"));
    expect(screen.getByText("🎢 It's rolling!")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Switch state"));
    expect(screen.getByText("🔥 It's on!")).toBeInTheDocument();
  });

  test("Input works correctly", async () => {
    render(<About />);
    await userEvent.type(screen.getByTestId("testInput"), "Testing the test");
    await userEvent.click(screen.getByText("Print input"));

    expect(screen.getByText("Testing the test")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Print input"));
    expect(screen.queryByText("Testing the test")).not.toBeInTheDocument();
  });
});
```
