import sum from "../sum";

test("Should returm sum of numbers", () => {
    const result = sum(3, 2);
    expect(result).toBe(5);
})