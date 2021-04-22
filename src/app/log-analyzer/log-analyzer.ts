export class LogAnalyzer {

  wasLastFileNameValid: boolean;

  isValidLogFileName(fileName: string) {

    this.wasLastFileNameValid = false;

    if (!fileName) {
      throw new Error("fileName has to be provided");
    }

    if (!fileName.toUpperCase().endsWith(".SLF")) {
      return false;
    }
    
    this.wasLastFileNameValid = true;
    return true;
  }
}