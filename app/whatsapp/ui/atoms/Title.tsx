interface TitleProps {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    children?: string
    text?: string
}

export const Title = ({ as: Component, children, text = "" }: TitleProps) => {
    return (
        <Component>
            {children || text}
        </Component>
    )
}