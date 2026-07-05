/**
 * File system utilities
 */

import { promises as fs } from 'fs';
import path from 'path';
import { logger } from './logger.js';

export async function readFile(filePath: string): Promise<string> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    logger.debug(`Read file: ${filePath}`);
    return content;
  } catch (error) {
    logger.error(`Failed to read file: ${filePath}`, error);
    throw error;
  }
}

export async function readJSON<T>(filePath: string): Promise<T> {
  try {
    const content = await readFile(filePath);
    const data = JSON.parse(content) as T;
    logger.debug(`Parsed JSON: ${filePath}`);
    return data;
  } catch (error) {
    logger.error(`Failed to parse JSON: ${filePath}`, error);
    throw error;
  }
}

export async function writeFile(
  filePath: string,
  content: string
): Promise<void> {
  try {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, content, 'utf-8');
    logger.debug(`Wrote file: ${filePath}`);
  } catch (error) {
    logger.error(`Failed to write file: ${filePath}`, error);
    throw error;
  }
}

export async function writeJSON<T>(
  filePath: string,
  data: T,
  pretty = true
): Promise<void> {
  const content = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
  await writeFile(filePath, content);
  logger.debug(`Wrote JSON: ${filePath}`);
}
