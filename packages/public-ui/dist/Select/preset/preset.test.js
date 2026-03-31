import { sharedApply as a } from "./onApply.js";
import { onChangePreprocessor as o } from "./OnChangePreprocessor.js";
import { generateOptions as e } from "./OptionsGenerator.js";
const t = [
  {
    label: "DB2 Subsystems",
    value: "KDP",
    id: "%IBM.STATIC017",
    apply: a
  },
  {
    label: "MVS CICSTG",
    value: "KGW",
    id: "%IBM.STATIC115",
    apply: a
  },
  {
    label: "IMS Subsystems",
    value: "KIP",
    id: "%IBM.STATIC014",
    apply: a
  }
], n = [
  {
    id: "db2id",
    value: "${db2id}",
    label: "DB2 variable",
    apply: a
  }
];
describe("OnChangePreprocessor multi", () => {
  it("empty state", () => {
    expect(o([], "", { startIdx: 0, endIdx: 0 })).toMatchSnapshot();
  }), it("empty input", () => {
    expect(o(t, "", { startIdx: 0, endIdx: 0 })).toMatchSnapshot();
  }), it("input is not empty and in variables", () => {
    expect(
      o([...t, ...n], "testOfVar:${", { startIdx: 12, endIdx: 12 })
    ).toMatchSnapshot();
  }), it("input is not empty and in closed variables", () => {
    expect(
      o([...t, ...n], "testOfVar:${}", { startIdx: 12, endIdx: 12 })
    ).toMatchSnapshot();
  }), it("input is not empty and not in variables", () => {
    expect(
      o([...t, ...n], "testOfVar:${}", { startIdx: 13, endIdx: 13 })
    ).toMatchSnapshot();
  });
});
describe("Options Generator", () => {
  it("empty state", () => {
    expect(e([], [], "")).toMatchSnapshot();
  }), it("empty input", () => {
    expect(e(t, [], "")).toMatchSnapshot();
  }), it("empty input, few options selected, all selected", () => {
    expect(e(t, [t[0]], "")).toMatchSnapshot();
  }), it("empty input, all selected", () => {
    expect(e(t, t, "")).toMatchSnapshot();
  }), it("some input, all selected, custom values are not allowed", () => {
    expect(e(t, t, "testOfFunctions")).toMatchSnapshot();
  }), it("some input, all selected, custom values are allowed", () => {
    expect(e(t, t, "testOfFunctions", 0, !0)).toMatchSnapshot();
  }), it("some input, some selected, no options returns", () => {
    expect(e(t, [t[0]], "KD")).toMatchSnapshot();
  }), it("some input, some selected, one option returns", () => {
    expect(e(t, [t[1]], "KD")).toMatchSnapshot();
  }), it("some input, some selected, few options returns", () => {
    expect(e(t, [t[1]], "K")).toMatchSnapshot();
  }), it("some input, some selected, allows custom - custom option returns", () => {
    const s = e(t, [t[0]], "KD", 0, !0);
    expect(s).toMatchSnapshot(), expect(s[0].isNewCustom).toBe(!0);
  }), it("some input, some selected, allows custom - one and custom options returns", () => {
    const s = e(t, [t[1]], "KD", 0, !0), p = s.find((c) => c.isNewCustom);
    expect(s).toMatchSnapshot(), expect(p).toMatchSnapshot();
  }), it("some input, some selected, allows custom - few and custom options returns", () => {
    const s = e(t, [t[1]], "K", 0, !0);
    expect(s).toMatchSnapshot();
  });
});
export {
  t as options,
  n as variables
};
