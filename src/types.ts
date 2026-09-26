export interface ReferenceEvent {
  id: string;
  name: string;
  location: string;
  venueDetail?: string;
  year: number;
  category: 'mestsky' | 'svatba' | 'benefice' | 'festival';
  categoryLabel: string;
  description: string;
  highlights: string[];
}

export interface ShowFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tag: string;
}
