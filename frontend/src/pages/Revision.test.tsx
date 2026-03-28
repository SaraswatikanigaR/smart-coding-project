import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import Revision from "./Revision";
import "@testing-library/jest-dom/vitest";

// 1. Setup the Life Support (Providers)
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false }, // Fails fast so tests are quick
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  );
};

// 2. Mock the Global Fetch
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() => 
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]), // Mocking an empty list of questions
    })
  ));
});

describe("Revision Page", () => {
  it("shows the loading state initially", () => {
    // 3. Pass the wrapper here
    render(<Revision />, { wrapper });
    
    // 4. Check for your loading indicator
    // (Ensure your Revision component actually has text that says "Loading...")
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });
});