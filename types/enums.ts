export enum DifficultyLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum GoalType {
  IMPROVE_SKILLS = "IMPROVE_SKILLS",
  EXPERIENCE_TEAM_DEV = "EXPERIENCE_TEAM_DEV",
  CREATE_PORTFOLIO = "CREATE_PORTFOLIO",
}

// 選択肢として表示するためのラベル
export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  [DifficultyLevel.BEGINNER]: "初心者",
  [DifficultyLevel.INTERMEDIATE]: "中級者",
  [DifficultyLevel.ADVANCED]: "上級者",
};

export const GOAL_LABELS: Record<GoalType, string> = {
  [GoalType.IMPROVE_SKILLS]: "スキル向上",
  [GoalType.EXPERIENCE_TEAM_DEV]: "チーム開発経験",
  [GoalType.CREATE_PORTFOLIO]: "ポートフォリオ作成",
};
