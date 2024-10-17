export const fadeInAnimationVariants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * index,
            duration: 0.5,
        },
    }),
}