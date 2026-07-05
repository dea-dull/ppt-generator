import fs from 'fs/promises';
import path from 'path';

export async function readFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, 'utf-8');
}

export async function writeFile(filePath: string, content: string): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  return fs.writeFile(filePath, content, 'utf-8');
}

export async function writeJSON(filePath: string, data: unknown): Promise<void> {
  const content = JSON.stringify(data, null, 2);
  return writeFile(filePath, content);
}

export async function readJSON<T>(filePath: string): Promise<T> {
  const content = await readFile(filePath);
  return JSON.parse(content);
}