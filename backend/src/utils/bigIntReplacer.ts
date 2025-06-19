export function bigintReplacer(_key: string, value: any) {
    // Convert bigint to string for JSON serialization
    return typeof value === 'bigint' ? value.toString() : value;
}
