import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={12}
      viewBox="0 0 24 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M22.88 1.908a.56.56 0 10-.88-.694c-.046.06-4.582 5.756-10.007 5.756S2.03 1.273 1.986 1.214A.563.563 0 001.2 1.12c-.798.586.944 1.978 2.731 3.608L2.363 6.295a.563.563 0 00.396.955c.328.116 1.817-1.664 2.063-1.828 1.772 1.298 4.063 2.492 6.611 2.649v2.444a.56.56 0 101.12 0V8.07c2.548-.157 4.85-1.35 6.61-2.649.258.175 1.732 1.94 2.064 1.828a.563.563 0 00.395-.955l-1.567-1.567a19.954 19.954 0 002.825-2.82z"
        fill="#000"
        stroke="#000"
        opacity={0.291132}
      />
    </Svg>
  )
}

export default React.memo(SvgComponent);
