import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollPosition } from "./useScrollPosition";

describe("useScrollPosition", () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns initial scroll position of 0", () => {
    const { result } = renderHook(() => useScrollPosition());
    expect(result.current.scrollPosition).toBe(0);
    expect(result.current.isScrolled).toBe(false);
  });

  it("updates when window is scrolled", () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 100 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.scrollPosition).toBe(100);
    expect(result.current.isScrolled).toBe(true);
  });

  it("isScrolled is false when scroll < 50", () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 30 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.scrollPosition).toBe(30);
    expect(result.current.isScrolled).toBe(false);
  });

  it("cleans up event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useScrollPosition());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });
});
