export type HeroMetaItem = {
    label: string;
    value: string,
    highlight?: boolean;
}

export const HERO_META: HeroMetaItem[] = [
    { label: 'Scope', value: '17 LGUs' },
    { label: 'Season', value: 'Jun - Nov' },
    { label: 'Status', value: 'Ongoing', highlight: true },
]