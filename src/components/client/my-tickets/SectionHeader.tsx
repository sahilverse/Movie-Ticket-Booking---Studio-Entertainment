interface SectionHeaderProps {
    icon: any
    title: string
    isPast?: boolean
}

export function SectionHeader({ icon: Icon, title, isPast = false }: SectionHeaderProps) {
    const textColorClass = isPast ? "text-zinc-400" : "text-yellowShade";

    return (
        <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${textColorClass} font-poppins tracking-wide`}>
            <Icon className="h-5 w-5" />
            {title}
        </h2>
    )
}

