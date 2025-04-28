import { describe, expect, test } from "vitest";
import { merge } from "./merge.js";

describe("merge", () => {
  test("merge two object", () => {
    const merged = merge(
      {
        name: "karim",
      },
      {
        job: "developer",
      }
    );

    expect(merged).toEqual({
      name: "karim",
      job: "developer",
    });
  });

  test("Shallow merge object with overlaps keys", () => {
    const merged = merge(
      {
        name: "karim",
      },
      {
        job: "developer",
        name: "newName",
      }
    );

    expect(merged).toEqual({
      name: "newName",
      job: "developer",
    });
  });

  test("Deep merge object", () => {
    const merged = merge(
      {
        name: "karim",
        contacts: {
          twitter: "twitter",
          instagram: "instagram",
        },
      },
      {
        name: "another name",
        contacts: {
          facebook: "facebook",
          twitter: "twitter2",
        },
      }
    );

    expect(merged).toEqual({
      name: "another name",
      contacts: {
        twitter: "twitter2",
        facebook: "facebook",
        instagram: "instagram",
      },
    });
  });

  test("merge 2 array", () => {
    const merged = merge(["one", "two"], ["three", "four"]);

    expect(merged).toEqual(["one", "two", "three", "four"]);
  });
});
