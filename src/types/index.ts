export interface Brick {
  id: string;
  number: string;
  title?: string;
  tags: string[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrickFormData {
  number: string;
  title?: string;
  tags: string[];
  imageUrl?: string;
}

export type ExportFormat = 'json' | 'csv' | 'xml';

export interface ExternalLink {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
}

export interface AppState {
  bricks: Brick[];
  tags: string[];
  externalLinks?: ExternalLink[];
}
