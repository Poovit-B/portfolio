import { describe, it, expect } from "vitest";

// ตัวอย่าง utility functions สำหรับ test
// เพิ่ม functions ใน helpers.ts แล้ว import มา test

describe("Utils - Example Tests", () => {
  describe("String utilities", () => {
    it("should format name correctly", () => {
      const formatName = (first: string, last: string) =>
        `${first} ${last}`.trim();

      expect(formatName("Poovit", "Banton")).toBe("Poovit Banton");
      expect(formatName("", "Banton")).toBe("Banton");
    });

    it("should truncate long strings", () => {
      const truncate = (str: string, maxLength: number) =>
        str.length > maxLength ? str.slice(0, maxLength) + "..." : str;

      expect(truncate("Hello World", 5)).toBe("Hello...");
      expect(truncate("Hi", 5)).toBe("Hi");
    });
  });

  describe("Number utilities", () => {
    it("should clamp numbers within range", () => {
      const clamp = (num: number, min: number, max: number) =>
        Math.min(Math.max(num, min), max);

      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it("should calculate percentage", () => {
      const percentage = (value: number, total: number) =>
        total === 0 ? 0 : (value / total) * 100;

      expect(percentage(50, 100)).toBe(50);
      expect(percentage(25, 100)).toBe(25);
      expect(percentage(0, 0)).toBe(0);
    });
  });

  describe("Array utilities", () => {
    it("should remove duplicates", () => {
      const unique = <T>(arr: T[]) => [...new Set(arr)];

      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
      expect(unique(["a", "b", "a"])).toEqual(["a", "b"]);
    });

    it("should chunk array into groups", () => {
      const chunk = <T>(arr: T[], size: number): T[][] =>
        arr.reduce((acc, _, i) => {
          if (i % size === 0) acc.push(arr.slice(i, i + size));
          return acc;
        }, [] as T[][]);

      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
    });
  });
});

