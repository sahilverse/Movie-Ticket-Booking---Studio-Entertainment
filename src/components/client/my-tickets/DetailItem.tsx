interface DetailItemProps {
    icon: any
    label: string
    value: string
    isPast?: boolean
}

export function DetailItem({ icon: Icon, label, value, isPast = false }: DetailItemProps) {
    const textColor = isPast ? "text-zinc-300" : "text-white";
    const iconColor = isPast ? "text-zinc-500" : "text-yellowShade";
    const labelColor = isPast ? "text-zinc-500" : "text-zinc-400";

    return (
        <div className="flex items-start gap-2">
            <Icon className={`h-4 w-4 ${iconColor} mt-0.5`} />
            <div className="flex flex-col gap-2">
                <p className={`${labelColor} text-xs font-roboto tracking-wider uppercase`}>{label}</p>
                <p className={`${textColor} font-roboto tracking-wide`}>{value}</p>
            </div>
        </div>
    )
}

