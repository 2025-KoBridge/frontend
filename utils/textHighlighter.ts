export interface HighlightedWord {
  text: string;
  key: number;
  percentage?: number; // 단어별 점수
}

export function highlightWords(
  phrase: string,
  percentages: number[], // 단어 순서대로 점수
  options?: { punctuation?: boolean },
): HighlightedWord[] {
  const punctuationRegex = options?.punctuation ? /[.,!?;:]/g : undefined;

  return phrase.split(/\s+/).map((word, idx) => {
    const cleanWord = punctuationRegex
      ? word.replace(punctuationRegex, '')
      : word;
    return {
      text: word,
      key: idx,
      percentage: percentages[idx] ?? 0,
    };
  });
}
