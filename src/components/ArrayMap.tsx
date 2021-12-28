interface Props {
    data: Array<any>
    renderComponent: (element: any, index: number) => any
}

const ArrayMap = ({ data, renderComponent }: Props) => {
    return (
        <>
            {data.map((element, index) => (
                renderComponent(element, index)
            ))}
        </>
    )
}

export default ArrayMap
