import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={21}
      height={24}
      viewBox="0 0 21 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle
        cx={10.453}
        cy={6.409}
        r={5.409}
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M1.873 19.34c-.001-.38.084-.756.249-1.098.518-1.036 1.979-1.585 3.191-1.834.874-.187 1.76-.311 2.653-.373a28.37 28.37 0 014.963 0c.892.062 1.778.187 2.653.373 1.212.248 2.673.746 3.191 1.834a2.57 2.57 0 010 2.207c-.518 1.088-1.979 1.585-3.191 1.824-.874.194-1.76.322-2.653.383a29.227 29.227 0 01-4.041.062c-.31 0-.611 0-.922-.062a17.47 17.47 0 01-2.642-.383c-1.223-.239-2.674-.736-3.202-1.824a2.58 2.58 0 01-.249-1.109z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
