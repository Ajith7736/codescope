import { useSpring , animated } from '@react-spring/web'


function Number({ n }: { n: number }) {
    const { number } = useSpring({
        from: { number: 0 },
        number: n,
        delay: 150,
        config: { mass: 1, tension: 30, friction: 10 }
    })
    return (
        <animated.div>
            {number.to((n) => Math.round(n))}
        </animated.div>
    )
}

export default Number
