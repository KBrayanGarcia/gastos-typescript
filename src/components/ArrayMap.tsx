interface Props {
    data: Array<any>
}

const ArrayMap = ({data}: Props) => {
    return (
        <>
            {data.map(d => (
                <p>{d}</p>
            ))}
        </>
    )
}

export default ArrayMap
