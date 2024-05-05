export interface TestResult {
  route: string;
  status: 'Passed' | 'Failed';
}

export function printResults(results: TestResult[]) {
  console.table(results);
}
