import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={23}
            height={25}
            viewBox="0 0 23 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M8.358 21.747v-3.39c0-.861.703-1.562 1.574-1.568h3.19c.874 0 1.584.703 1.584 1.569v3.4c0 .732.59 1.33 1.329 1.347h2.127c2.12 0 3.838-1.701 3.838-3.8v0-9.642a2.696 2.696 0 00-1.063-2.105l-7.273-5.8a3.515 3.515 0 00-4.36 0l-7.24 5.81A2.675 2.675 0 001 9.673v9.632c0 2.099 1.719 3.8 3.838 3.8h2.127c.758 0 1.372-.608 1.372-1.358v0"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

const HomeIcon = React.memo(SvgComponent)
export default HomeIcon
