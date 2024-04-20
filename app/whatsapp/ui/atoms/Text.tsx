interface TextProps {
    children?: string
    text?: string
}

export const Text = ({ children, text = "" }: TextProps) => {
    return (
        <p>
            {children || text}
        </p>
    )
}