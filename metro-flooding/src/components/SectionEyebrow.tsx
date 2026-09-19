type Props = {
    number: string;
    label: string;
};

export default function SectionEyebrow({ number, label }: Props) {
    return (
        <span className="section-eyebrow">
            <span className="section-eyebrow-number">{number}</span>
            <span className="section-eyebrow-sep">-</span>
            <span className="section-eyebrow-label">{label}</span>
        </span>
    )
}