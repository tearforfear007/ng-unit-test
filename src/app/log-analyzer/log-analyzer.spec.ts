import { LogAnalyzer } from "./log-analyzer"

describe('LogAnalyzer', () => {

  let analyzer: LogAnalyzer = null;

  // set up before each test running
  beforeEach(async () => {
    analyzer = new LogAnalyzer();
  });

  it('should return true when file name ends with .SLF', () => {
    // 準備物件 Arrange
    // const analyzer: LogAnalyzer = new LogAnalyzer();

    // 操作 Act
    const result = analyzer.isValidLogFileName("myFileName.SLF");

    // 驗證 Assert
    expect(result).toBe(true);
    // expect(result).toBeTruthy();
  })

  it('should return true when file name ends with lowercase extension', () => {
    const result = analyzer.isValidLogFileName("myFileName.slf");
    expect(result).toBe(true);
  })

  it('should return true when file name ends with uppercase extension', () => {
    const result = analyzer.isValidLogFileName("myFileName.SLF");
    expect(result).toBe(true);
  })

  // 2.5 使用參數來重構測試
  const testCases = [
    { fileName: "myFileName.slf", expectedValue: true },
    { fileName: "myFileName.SLF", expectedValue: true },
    { fileName: "myFileName.jpg", expectedValue: false }
  ];

  // using for ... of inside of it
  it('should return true when file name ends with .slf or .SLF', () => {
    for (const { fileName, expectedValue } of testCases) {
      const result = analyzer.isValidLogFileName(fileName);
      expect(result).toBe(expectedValue);
    }
  })


  // or move it into the for ... of loop
  // add testId to each object of keeping track of which testing is failing
  const testCases_2 = [
    { testId: 1, fileName: "myFileName.slf", expectedValue: true },
    { testId: 2, fileName: "myFileName.SLF", expectedValue: true },
    { testId: 3, fileName: "myFileName.jpg", expectedValue: false }
  ];

  for (const { testId, fileName, expectedValue } of testCases_2) {
    it(`testId: ${testId}, should return true when file name ends with .slf or .SLF`, () => {
      const result = analyzer.isValidLogFileName(fileName);
      expect(result).toBe(expectedValue);
    })
  }

  describe("should throw error when file name is not provided", () => {
    // 2.6.2
    const testCases_3 = [
      { testId: 1, fileName: "" },
      { testId: 2, fileName: null },
      { testId: 3, fileName: undefined }
    ];

    for (const { testId, fileName } of testCases_3) {
      it(`testId: ${testId}`, () => {
        expect(() => { analyzer.isValidLogFileName(fileName) }).toThrow(new Error("fileName has to be provided"));
      })
    }
  })


  // 2.6.3 忽略此測試
  // 在 it 的 前面加個 x, describe 也是一樣 => xdescribe
  // 注意在 terminal 的地方會有 skipped 1 字樣，代表有跳過 1 個測試情景
  xit('should return true when file name ends with lowercase extension', () => {
    const result = analyzer.isValidLogFileName("myFileName.slf");
    expect(result).toBe(true);
  })

  // 2.7
  describe("wasLastFileNameValid should change when isValidLogFileName is called", () => {
    const testCases = [
      { testId: 1, fileName: "myFileName.slf", expectedValue: true },
      { testId: 2, fileName: "myFileName.SLF", expectedValue: true },
      { testId: 3, fileName: "myFileName.jpg", expectedValue: false }
    ];

    for (const { testId, fileName, expectedValue } of testCases) {
      it(`testId: ${testId}`, () => {
        expect(analyzer.wasLastFileNameValid).toBeFalsy();
        analyzer.isValidLogFileName(fileName);
        expect(analyzer.wasLastFileNameValid).toBe(expectedValue);
      })
    }
  })
})